import gql from "graphql-tag";

const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        username
      }
      commentCount
      likes {
        username
      }
      likeCount
    }
  }
`;

const GET_SINGLE_POST_MUTATION = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      likes {
        username
      }
      likeCount
      comments {
        id
        username
        body
      }
      commentCount
    }
  }
`;

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      commentCount
      likeCount
      createdAt
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export {
  GET_POSTS_QUERY as GET_POSTS,
  GET_SINGLE_POST_MUTATION as GET_POST,
  REGISTER_USER_MUTATION as REGISTER_USER,
  LOGIN_USER_MUTATION as LOGIN_USER,
  CREATE_POST_MUTATION as CREATE_POST,
  LIKE_POST_MUTATION as LIKE_POST,
  DELETE_POST_MUTATION as DELETE_POST,
  DELETE_COMMENT_MUTATION as DELETE_COMMENT,
  CREATE_COMMENT_MUTATION as CREATE_COMMENT,
};
