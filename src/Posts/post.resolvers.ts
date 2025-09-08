import { PostService } from "./post.service";

export const postResolvers = {
  Query: {
    posts: async () => {
      return await PostService.findAll();
    },
    post: async (_: any, { id }: { id: number }) => {
      return await PostService.findById(id);
    },
  },

  Mutation: {
    createPost: async (_: any, { input }: { input: any }) => {
      return await PostService.createPost(input);
    },
    updatePost: async (_: any, { input }: { input: any }) => {
      return await PostService.updatePost(input);
    },
    deletePost: async (_: any, { id }: { id: number }) => {
      return await PostService.deletePost(id);
    },
  },
};
