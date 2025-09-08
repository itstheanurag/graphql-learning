import { UserService } from "./user.service";

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserService.findAll();
    },
    user: async (_: unknown, { id }: { id: number }) => {
      return await UserService.findById(id);
    },
  },

  Mutation: {
    createUser: async (_: unknown, { input }: any) => {
      return await UserService.createUser(input);
    },

    updateUser: async (_: unknown, { input }: any) => {
      return await UserService.updateUser(input);
    },

    deleteUser: async (_: unknown, { id }: { id: number }) => {
      return await UserService.deleteUser(id);
    },
  },
};
