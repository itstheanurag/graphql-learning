import prisma from "../db";
import { User } from "../generated/prisma/wasm";

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

interface UpdateUserInput {
  id: number;
  email?: string;
  name?: string;
  password?: string;
}

export class UserService {
  private constructor() {}

  private static db = prisma;

  static async findAll(): Promise<User[]> {
    return this.db.user.findMany();
  }

  static async findById(id: number): Promise<User | null> {
    return this.db.user.findUnique({ where: { id } });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email } });
  }

  static async createUser(input: CreateUserInput): Promise<User> {
    const existingUser = await this.findByEmail(input.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    return this.db.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
    });
  }

  static async updateUser(input: UpdateUserInput): Promise<User> {
    const existingUser = await this.findById(input.id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const data: Partial<User> = {
      email: input.email ?? existingUser.email,
      name: input.name ?? existingUser.name,
    };

    return this.db.user.update({
      where: { id: input.id },
      data,
    });
  }

  static async deleteUser(id: number): Promise<Boolean> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    await this.db.user.delete({ where: { id } });
    return true;
  }
}
