import { Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import { useSeeCoffeeShopsQuery } from "../graphql/generated";

const Thumbnail = styled.div`
  width: 100%;
  height: 300px;
  transition: transform 0.1s;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Contents = styled.div`
  padding: 20px;
  z-index: 100;
  background-color: #8a624a;
  position: relative;
  z-index: 0;
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 10px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Name = styled.span`
  margin-left: 5px;
`;

const Category = styled.span`
  padding: 5px 15px;
  background-color: #6f4e37;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 14px;
`;

const AddButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 24px;
  -webkit-box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const Item = styled.div`
  width: 100%;
  overflow: hidden;
  &:hover {
    ${Thumbnail} {
      transform: scale(1.1);
    }
  }
`;

const NothingToSee = styled.span`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  span {
    display: block;
    margin-top: 10px;
  }
`;

function Home() {
  const { data: { seeCoffeeShops } = {} } = useSeeCoffeeShopsQuery();

  return (
    <Layout headerTitle="Coffee Shops">
      {seeCoffeeShops?.map((shop) => (
        <Link
          key={shop?.id}
          to={`shop/${shop?.id}`}
          state={{
            name: shop?.name,
            latitude: shop?.latitude,
            longitude: shop?.longitude,
            categories: shop?.categories,
            photos: shop?.photos,
          }}
        >
          <Item>
            <Thumbnail
              style={{ backgroundImage: `url(${shop?.photos?.[0]?.url})` }}
            />
            <Contents>
              <Title>{shop?.name}</Title>
              <FlexContainer>
                <Avatar src={shop?.user.avatarUrl as string} />
                <Name>{shop?.user.username}</Name>
              </FlexContainer>
              {shop?.categories?.length && (
                <FlexContainer>
                  {shop.categories.map((category) => (
                    <Category key={category?.id}>{category?.name}</Category>
                  ))}
                </FlexContainer>
              )}
            </Contents>
          </Item>
        </Link>
      ))}
      {seeCoffeeShops && !seeCoffeeShops.length && (
        <NothingToSee>
          There is nothing to see here yet.
          <br />
          <span>💖</span>
        </NothingToSee>
      )}
      <Link to="/create">
        <AddButton>➕</AddButton>
      </Link>
    </Layout>
  );
}

export default Home;
