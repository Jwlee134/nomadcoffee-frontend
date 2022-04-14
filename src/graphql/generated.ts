import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  shops?: Maybe<Array<Maybe<CoffeeShop>>>;
  slug?: Maybe<Scalars['String']>;
  totalShops?: Maybe<Scalars['Int']>;
};

export type CoffeeShop = {
  __typename?: 'CoffeeShop';
  categories?: Maybe<Array<Maybe<Category>>>;
  id: Scalars['Int'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  photos?: Maybe<Array<Maybe<CoffeeShopPhoto>>>;
  user: User;
};

export type CoffeeShopPhoto = {
  __typename?: 'CoffeeShopPhoto';
  id: Scalars['Int'];
  shop: CoffeeShop;
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<MutationResponse>;
  createCoffeeShop?: Maybe<MutationResponse>;
  editCoffeeShop?: Maybe<MutationResponse>;
  editProfile?: Maybe<MutationResponse>;
  login?: Maybe<MutationResponse>;
  toggleFollow?: Maybe<MutationResponse>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCoffeeShopArgs = {
  categories: Array<InputMaybe<Scalars['String']>>;
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  photos: Array<InputMaybe<Scalars['Upload']>>;
};


export type MutationEditCoffeeShopArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  deleteShop?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newPhotos?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  photoIdsToDelete?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  email?: InputMaybe<Scalars['String']>;
  githubUsername?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationToggleFollowArgs = {
  follow: Scalars['Boolean'];
  id: Scalars['Int'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  searchUsers?: Maybe<Array<Maybe<User>>>;
  seeCategories?: Maybe<Array<Maybe<Category>>>;
  seeCategory?: Maybe<Array<Maybe<CoffeeShop>>>;
  seeCoffeeShop?: Maybe<CoffeeShop>;
  seeCoffeeShops?: Maybe<Array<Maybe<CoffeeShop>>>;
  seeProfile?: Maybe<User>;
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
  lastKeyword?: InputMaybe<Scalars['String']>;
};


export type QuerySeeCategoriesArgs = {
  lastId?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeCategoryArgs = {
  keyword: Scalars['String'];
  lastId?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeCoffeeShopArgs = {
  id: Scalars['Int'];
};


export type QuerySeeCoffeeShopsArgs = {
  lastId?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeProfileArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  githubUsername?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};


export type UserFollowersArgs = {
  lastId?: InputMaybe<Scalars['Int']>;
};


export type UserFollowingArgs = {
  lastId?: InputMaybe<Scalars['Int']>;
};

export type CreateAccountMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, token?: string | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, token?: string | null } | null };

export type CreateCoffeeShopMutationVariables = Exact<{
  name: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  photos: Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>;
  categories: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
}>;


export type CreateCoffeeShopMutation = { __typename?: 'Mutation', createCoffeeShop?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type EditCoffeeShopMutationVariables = Exact<{
  editCoffeeShopId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  newPhotos?: InputMaybe<Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>>;
  photoIdsToDelete?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  deleteShop?: InputMaybe<Scalars['Boolean']>;
}>;


export type EditCoffeeShopMutation = { __typename?: 'Mutation', editCoffeeShop?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type SeeCoffeeShopsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeCoffeeShopsQuery = { __typename?: 'Query', seeCoffeeShops?: Array<{ __typename?: 'CoffeeShop', id: number, name: string, latitude: string, longitude: string, photos?: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null> | null, user: { __typename?: 'User', username: string, avatarUrl?: string | null }, categories?: Array<{ __typename?: 'Category', id: number, name: string } | null> | null } | null> | null };


export const CreateAccountDocument = gql`
    mutation createAccount($username: String!, $email: String!, $name: String!, $password: String!) {
  createAccount(
    username: $username
    email: $email
    name: $name
    password: $password
  ) {
    ok
    error
    token
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    error
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateCoffeeShopDocument = gql`
    mutation createCoffeeShop($name: String!, $latitude: String!, $longitude: String!, $photos: [Upload]!, $categories: [String]!) {
  createCoffeeShop(
    name: $name
    latitude: $latitude
    longitude: $longitude
    photos: $photos
    categories: $categories
  ) {
    ok
    error
  }
}
    `;
export type CreateCoffeeShopMutationFn = Apollo.MutationFunction<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>;

/**
 * __useCreateCoffeeShopMutation__
 *
 * To run a mutation, you first call `useCreateCoffeeShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCoffeeShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCoffeeShopMutation, { data, loading, error }] = useCreateCoffeeShopMutation({
 *   variables: {
 *      name: // value for 'name'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      photos: // value for 'photos'
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useCreateCoffeeShopMutation(baseOptions?: Apollo.MutationHookOptions<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>(CreateCoffeeShopDocument, options);
      }
export type CreateCoffeeShopMutationHookResult = ReturnType<typeof useCreateCoffeeShopMutation>;
export type CreateCoffeeShopMutationResult = Apollo.MutationResult<CreateCoffeeShopMutation>;
export type CreateCoffeeShopMutationOptions = Apollo.BaseMutationOptions<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>;
export const EditCoffeeShopDocument = gql`
    mutation editCoffeeShop($editCoffeeShopId: Int!, $name: String, $latitude: String, $longitude: String, $newPhotos: [Upload], $photoIdsToDelete: [Int], $categories: [String], $deleteShop: Boolean) {
  editCoffeeShop(
    id: $editCoffeeShopId
    name: $name
    latitude: $latitude
    longitude: $longitude
    newPhotos: $newPhotos
    photoIdsToDelete: $photoIdsToDelete
    categories: $categories
    deleteShop: $deleteShop
  ) {
    ok
    error
  }
}
    `;
export type EditCoffeeShopMutationFn = Apollo.MutationFunction<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>;

/**
 * __useEditCoffeeShopMutation__
 *
 * To run a mutation, you first call `useEditCoffeeShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCoffeeShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCoffeeShopMutation, { data, loading, error }] = useEditCoffeeShopMutation({
 *   variables: {
 *      editCoffeeShopId: // value for 'editCoffeeShopId'
 *      name: // value for 'name'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      newPhotos: // value for 'newPhotos'
 *      photoIdsToDelete: // value for 'photoIdsToDelete'
 *      categories: // value for 'categories'
 *      deleteShop: // value for 'deleteShop'
 *   },
 * });
 */
export function useEditCoffeeShopMutation(baseOptions?: Apollo.MutationHookOptions<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>(EditCoffeeShopDocument, options);
      }
export type EditCoffeeShopMutationHookResult = ReturnType<typeof useEditCoffeeShopMutation>;
export type EditCoffeeShopMutationResult = Apollo.MutationResult<EditCoffeeShopMutation>;
export type EditCoffeeShopMutationOptions = Apollo.BaseMutationOptions<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>;
export const SeeCoffeeShopsDocument = gql`
    query seeCoffeeShops {
  seeCoffeeShops {
    id
    name
    latitude
    longitude
    photos {
      id
      url
    }
    user {
      username
      avatarUrl
    }
    categories {
      id
      name
    }
  }
}
    `;

/**
 * __useSeeCoffeeShopsQuery__
 *
 * To run a query within a React component, call `useSeeCoffeeShopsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCoffeeShopsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCoffeeShopsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeCoffeeShopsQuery(baseOptions?: Apollo.QueryHookOptions<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>(SeeCoffeeShopsDocument, options);
      }
export function useSeeCoffeeShopsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>(SeeCoffeeShopsDocument, options);
        }
export type SeeCoffeeShopsQueryHookResult = ReturnType<typeof useSeeCoffeeShopsQuery>;
export type SeeCoffeeShopsLazyQueryHookResult = ReturnType<typeof useSeeCoffeeShopsLazyQuery>;
export type SeeCoffeeShopsQueryResult = Apollo.QueryResult<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>;