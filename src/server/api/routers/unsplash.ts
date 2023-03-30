import { z } from "zod";
import {
    createTRPCRouter,
    adminProcedure
  } from "~/server/api/trpc";

  import {createApi} from 'unsplash-js'
import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";

   const unsplash = createApi({
        accessKey: env.ACCES_KEY_UNSPLASH
   })

  export const unsplashRoute = createTRPCRouter({
    getImages: adminProcedure.input(
        z.object({
            searchQuery: z.string().min(5)
        })
    ).query(async({input}) => {
        try{
            const imagesData = await unsplash.search.getPhotos({
                query: input.searchQuery,
                orientation: 'landscape',
            })
            return imagesData.response 
        } catch(e) {
            throw new TRPCError({code: 'INTERNAL_SERVER_ERROR', message: 'Unsplash network error'})
        }

        
    })
  })