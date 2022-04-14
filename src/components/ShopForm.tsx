import Layout from "./Layout";
import { ErrorText } from "../styles/shared";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  SeeCoffeeShopsDocument,
  useCreateCoffeeShopMutation,
  useEditCoffeeShopMutation,
} from "../graphql/generated";

const Container = styled.form`
  padding: 40px 20px;
`;

const UploadLabel = styled.label`
  width: 100%;
  height: 300px;
  cursor: pointer;
  border: 1.5px dashed black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin-bottom: 20px;
  font-weight: 200;
`;

const UploadInput = styled.input`
  display: none;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

interface Form {
  name: string;
  latitude: string;
  longitude: string;
  categories: string;
  photos: FileList;
}

type State =
  | {
      name?: string;
      latitude?: string;
      longitude?: string;
      categories?: { id: number; name: string }[];
      photos?: { id: number; url: string }[];
    }
  | undefined;

function ShopForm() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const state = location.state as State;
  const isCreate = location.pathname.includes("create");
  const refetchQueries = [{ query: SeeCoffeeShopsDocument }];
  const [create, { loading: createLoading }] = useCreateCoffeeShopMutation({
    refetchQueries,
    onCompleted: (data) => {
      if (!data.createCoffeeShop?.ok) return;
      navigate(-1);
    },
  });
  const [update, { loading: updateLoading }] = useEditCoffeeShopMutation({
    refetchQueries,
    onCompleted: (data) => {
      if (!data.editCoffeeShop?.ok) return;
      navigate(-1);
    },
  });
  const loading = createLoading || updateLoading;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Form>({
    defaultValues: {
      name: state?.name || "",
      latitude: state?.latitude || "",
      longitude: state?.longitude || "",
      categories:
        state?.categories?.map((category) => category.name)?.join(", ") || "",
    },
  });
  const [files, setFiles] = useState<File[]>([]);
  const [photoIdsToDelete, setPhotoIdsToDelete] = useState<number[]>([]);

  const makeFileList = (data: File[]) => {
    const dt = new DataTransfer();
    data.forEach((file) => {
      dt.items.add(file);
    });
    return dt.files;
  };

  const onDeletePhoto = (index: number, id?: number) => {
    if (id) {
      setPhotoIdsToDelete((prev) => [...prev, id]);
      state?.photos?.splice(
        state.photos?.findIndex((photo) => photo.id === id),
        1
      );
    } else {
      setFiles((prev) => {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      });
    }
  };

  const onChangePhoto = ({
    target: { files: added },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFiles([...files, ...Array.from(added as ArrayLike<File>)]);
    clearErrors("photos");
  };

  const onValid = (data: Form) => {
    if (loading) return;
    const formatCategories = data.categories
      .split(",")
      .map((str) => str.trimStart().trimEnd())
      .filter((str) => Boolean(str));
    if (isCreate) {
      create({ variables: { ...data, categories: formatCategories } });
    } else {
      update({
        variables: {
          ...data,
          categories: formatCategories,
          editCoffeeShopId: +(params?.id as string),
          photoIdsToDelete,
          newPhotos: data.photos,
        },
      });
    }
  };

  const onInvalid = () => {
    if (!files.length) {
      setError("photos", { message: "Photos are required." });
    }
  };

  useEffect(() => {
    setValue("photos", makeFileList(files));
  }, [files, setValue]);

  const onDeleteCoffeeShop = () => {
    update({
      variables: {
        editCoffeeShopId: +(params?.id as string),
        deleteShop: true,
      },
    });
  };

  return (
    <Layout
      headerTitle={`${isCreate ? "Create" : "Update"} Coffee Shop`}
      canGoBack
    >
      <Container onSubmit={handleSubmit(onValid, onInvalid)}>
        <Input
          register={register("name", { required: "Name is required." })}
          label="Name"
          id="name"
        />
        {errors.name?.message && <ErrorText>{errors.name.message}</ErrorText>}
        <Input
          register={register("latitude", { required: "Latitude is required." })}
          label="Latitude"
          id="latitude"
        />
        {errors.latitude?.message && (
          <ErrorText>{errors.latitude.message}</ErrorText>
        )}
        <Input
          register={register("longitude", {
            required: "Longitude is required.",
          })}
          label="Longitude"
          id="longitude"
        />
        {errors.longitude?.message && (
          <ErrorText>{errors.longitude.message}</ErrorText>
        )}
        <Input
          register={register("categories", {
            required: "Categories are required.",
          })}
          label="Categories (Use , to write multiple categories)"
          id="categories"
        />
        {state?.photos?.map((photo, i) => (
          <Thumbnail
            key={i}
            src={photo.url}
            onClick={() => onDeletePhoto(i, photo.id)}
          />
        ))}
        {files
          .map((file) => URL.createObjectURL(file))
          .map((url, i) => (
            <Thumbnail key={i} src={url} onClick={() => onDeletePhoto(i)} />
          ))}
        <UploadLabel htmlFor="photos">+</UploadLabel>
        <UploadInput
          {...register("photos")}
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={onChangePhoto}
        />
        {errors.photos?.message && (
          <ErrorText>{errors.photos.message}</ErrorText>
        )}
        {!isCreate && (
          <Button
            text="Delete"
            style={{ backgroundColor: "red" }}
            onClick={onDeleteCoffeeShop}
            loading={loading}
          />
        )}
        <Button
          type="submit"
          text={isCreate ? "Create" : "Update"}
          loading={loading}
        />
      </Container>
    </Layout>
  );
}

export default ShopForm;
