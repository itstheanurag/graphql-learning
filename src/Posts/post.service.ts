import prisma from "../db";
import { Post } from "../generated/prisma";

interface CreatePostInput {
  title: string;
  content?: string;
  published?: boolean;
  authorId: number;
}

interface UpdatePostInput {
  id: number;
  title?: string;
  content?: string;
  published?: boolean;
}

export class PostService {
  private constructor() {}
  private static db = prisma;

  static async findAll(): Promise<Post[]> {
    return this.db.post.findMany({
      include: {
        author: true, // this will include the associated User
      },
    });
  }

  static async findById(id: number): Promise<Post | null> {
    return this.db.post.findUnique({
      where: { id },
      include: {
        author: true, // include the User as well
      },
    });
  }

  static async createPost(input: CreatePostInput): Promise<Post> {
    return this.db.post.create({
      data: {
        title: input.title,
        content: input.content,
        published: input.published ?? false,
        authorId: input.authorId,
      },
    });
  }

  static async updatePost(input: UpdatePostInput): Promise<Post> {
    const existingPost = await this.findById(input.id);
    if (!existingPost) throw new Error("Post not found");

    const data: Partial<Post> = {
      title: input.title ?? existingPost.title,
      content: input.content ?? existingPost.content,
      published: input.published ?? existingPost.published,
    };

    return this.db.post.update({
      where: { id: input.id },
      data,
    });
  }

  static async deletePost(id: number): Promise<Post> {
    const existingPost = await this.findById(id);
    if (!existingPost) throw new Error("Post not found");

    return this.db.post.delete({ where: { id } });
  }
}
