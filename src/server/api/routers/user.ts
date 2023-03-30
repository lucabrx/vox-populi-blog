import { z } from "zod";
import { createTRPCRouter, adminProcedure, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    getAll: adminProcedure.query(async({ctx: {prisma}}) => {
        const users = await prisma.user.findMany({
            orderBy: {
                name : 'asc'
            },
           
        })
        return users
    }),
   getSingle: adminProcedure.input(
    z.object({
        id: z.string()
    })
   ).query(async({ctx :{prisma}, input: {id}}) => {
    const user = await prisma.user.findFirst({
        where: {
            id 
        }
    })
    return user 
   }),
   addRole: adminProcedure.input(
    z.object({
        userId: z.string(),
        role: z.enum(['ADMIN', 'USER'])
    })
   ).mutation(
    async ({ctx, input}) => {
    const {userId,role} = input
      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          role: role,
        },
    })
   }),
   deleteUser: adminProcedure.input(
    z.object({
        id: z.string()
    })
   ).mutation(async({ctx,input}) => {
    const deleteUser = await ctx.prisma.user.delete({
        where: {
            id: input.id
        }
    })
    return deleteUser
   }),
   submitComment: protectedProcedure.input(
    z.object({
        text: z.string().min(5),
        postId: z.string()
    })
   ).mutation( async ({ctx, input}) => {
    await ctx.prisma.comment.create({
        data: {
            text: input.text,
            user: {
                connect: {
                    id: ctx.session.user.id 
                }
            },
            post: {
            connect: {
                id: input.postId
            }  
            }
        }
    })
   }),
   getComments: publicProcedure.input(
    z.object({
        postId: z.string()
    })
   ).query( async ({ctx,input}) => {
    const comments = await ctx.prisma.comment.findMany({
        where: {
            postId: input.postId
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            text: true,
            user: {
                select: {
                    name: true,
                    id: true,
                    Comment: {
                        select: {
                            id: true 
                        }
                    }
                }
            }
        }
    })

    return comments
   }),
   deleteCommentUser: protectedProcedure.input(
    z.object({
        commentId: z.string(),
    })
   ).mutation(async({ctx,input}) => {
        await ctx.prisma.comment.delete({
            where: {
                id: input.commentId
            }
        })
   })

})