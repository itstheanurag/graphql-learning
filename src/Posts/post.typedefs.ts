import { gql } from "apollo-server-express";

export const postTypeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    authorId: Int!
    createdAt: String!
    updatedAt: String!
    author: User
  }

  input CreatePostInput {
    title: String!
    content: String
    published: Boolean
    authorId: Int!
  }

  input UpdatePostInput {
    id: Int!
    title: String
    content: String
    published: Boolean
  }

  type Query {
    posts: [Post!]!
    post(id: Int!): Post
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(input: UpdatePostInput!): Post!
    deletePost(id: Int!): Post!
  }
`;
