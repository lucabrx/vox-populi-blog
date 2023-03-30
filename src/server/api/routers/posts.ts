import { z } from "zod";
import slugify from 'slugify'
import { writeFormSchema } from "~/components/WriteModal";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure
} from "~/server/api/trpc";
import { writeStorySchema } from "~/components/StoryModal";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async({ ctx: {prisma} }) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    name: true,
                    image: true 
                }
            }
        }
    })
    return posts
  }),
  getSingle: publicProcedure.input( 
    z.object({
        slug: z.string()
    })
  ).query(async({ctx: {prisma}, input: {slug}}) => {
    const post = await prisma.post.findFirst({
        where: {
            slug 
        }
    })
    return post
  }),
  getSingleNews: publicProcedure.input(
    z.object({
      slug: z.string()
    }),
  ).query(async({ctx,input}) =>{
    return await ctx.prisma.news.findFirst({
      where:{
        slug: input.slug
      }
    })
  }),
  getSingleEdit: publicProcedure.input(
    z.object({
      id: z.string()
    }),
  ).query(async({ctx,input}) =>{
    return await ctx.prisma.news.findFirst({
      where:{
        id: input.id
      }
    })
  }),
  writePost: adminProcedure.input(
    writeFormSchema
  ).mutation(
    async ({ctx:{prisma,session}, input: {description,text,title, category }}) => {
        await prisma.post.create({
            data: {
                title,
                description,
                text,
                category,
                slug: slugify(title),
                author: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
        })
    }
  ),
  writeStory: adminProcedure.input(
    writeStorySchema
  ).mutation(
    async ({ctx:{prisma,session}, input: {description,text,title, category,story }}) => {
        await prisma.post.create({
            data: {
                story,
                title,
                description,
                text,
                category,
                slug: slugify(title),
                author: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
        })
    }
  ),
  getNewest: publicProcedure.query( async ({ ctx: {prisma} }) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 3,
        include: {
            author: {
                select: {
                    name: true,
                    image: true 
                }
            }
        }
      }) 
      return posts
    }),
    getLatestNews: publicProcedure.query(async ({ctx}) => {
        const posts = await ctx.prisma.news.findMany({
            where: {
                category: 'News'
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        })
        return posts
    }),
    writeNews: adminProcedure.input(
        writeFormSchema
      ).mutation(
        async ({ctx:{prisma,session}, input: {description,text,title }}) => {
            await prisma.news.create({
                data: {
                    title,
                    description,
                    text,
                    category : 'News',
                    slug: slugify(title),
                    author: {
                        connect: {
                            id: session.user.id
                        }
                    }
                }
            })
        }
      ),
      getAllBlogs: adminProcedure.query(async ({ctx}) => {
        return await ctx.prisma.post.findMany()
      }),
      getSingleBlog: publicProcedure.input(
        z.object({
            slug: z.string()
        })
      ).query(async({ctx,input}) => {
        const blog = await ctx.prisma.post.findUnique({
            where: {
                slug : input.slug
            }
        })
        return blog
      }),
      getSingleBlogEdit: adminProcedure.input(
        z.object({
            id: z.string()
        })
      ).query(async({ctx,input}) => {
        const blog = await ctx.prisma.post.findUnique({
            where: {
                id : input.id,
            }
        })
        return blog
      }),
      getAllNews : adminProcedure.query(async({ctx}) => {
        return await ctx.prisma.news.findMany()
      }),
      deleteBlog: adminProcedure.input(
        z.object({
            id: z.string()
        })
      ).mutation(async ({ctx,input}) => {
        const removeBlog = await ctx.prisma.post.delete({
            where: {
                id: input.id,
            }   
        })
        return removeBlog
      }),
      deleteNews: adminProcedure.input(
        z.object({
            id: z.string()
        })
      ).mutation(async ({ctx,input}) => {
        const removeNews = await ctx.prisma.news.delete({
            where: {
                id: input.id
            }
        })
        return removeNews
      }),
      categoryList : publicProcedure.input(
        z.object({
          category: z.string()
        })
      ).query(async ({ctx, input}) => {
        return await ctx.prisma.post.findMany({
          where: {
            category: input.category
          }
        })
      }),
      newsListAll: publicProcedure.query(async ({ctx}) => {
        return await ctx.prisma.news.findMany()
      }),
      updatePostImage: adminProcedure.input(
        z.object({
          imageUrl: z.string().url(),
          postId: z.string()
        })
      ).mutation(async({ctx,input}) => {
        await ctx.prisma.post.update({
          where: {
            id: input.postId
          },
          data: {
            images : input.imageUrl
          }
        })
      }), updateNewsImage: adminProcedure.input(
        z.object({
          imageUrl: z.string().url(),
          postId: z.string()
        })
      ).mutation(async({ctx,input}) => {
        await ctx.prisma.news.update({
          where: {
            id: input.postId
          },
          data: {
            images : input.imageUrl
          }
        })
      }),
      getStories: publicProcedure.query(async({ctx}) => {
        return await ctx.prisma.post.findMany({
          where: {
            category: 'Story'
          }
        })
      })
});