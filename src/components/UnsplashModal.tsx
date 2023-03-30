import { type NextPage } from 'next';
import { useRef,  useContext, useEffect, useState } from 'react';
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { api } from '~/utils/api';
import Button from './ui/Button';
import { toast } from 'react-hot-toast';
import { Loader2, X } from 'lucide-react';
import { GlobalContext } from '~/context/GlobalContextProvider';
import { useClickOutside } from '~/hooks/useClickOutside';
import useDebounce from '~/hooks/useDebounce';
import Image from 'next/image';



interface IUnProps{
  postId: string;
}

const UnsplashModal: NextPage<IUnProps>= (({postId}) => {
    const {  setUnsplash, unsplash } = useContext(GlobalContext)
    const modalRef = useRef(null)
    useClickOutside(modalRef, () => setUnsplash(false))

    const {register, watch, reset} = useForm<{searchQuery: string}>({
      resolver: zodResolver(
        z.object({
          searchQuery: z.string().min(5)
        })
      )
    })

    useEffect(() => {
      if(unsplash === true) {
        document.body.style.overflow = 'HIDDEN'
      }
      return () => {
        document.body.style.overflow = 'AUTO'
      }
    })

    const watchSearchQuery = watch('searchQuery')
    const debouncedSearchQuerty = useDebounce(watchSearchQuery, 3000)

    

    const fetchUnsplash = api.unsplash.getImages.useQuery({
      searchQuery :debouncedSearchQuerty
    }, {
      enabled: Boolean(debouncedSearchQuerty)
    })

    const [selectedImage,setSelectedImage] = useState<string>('')
    const validateImage = api.useContext()
    const updateImage = api.post.updatePostImage.useMutation({
      onSuccess: () => {
        setUnsplash(false)
        reset()
        toast.success('New Image added')
        void validateImage.invalidate()
      }
    })

  return (
<div  className='absolute inset-0 bg-black/50 dark:bg-white/20 h-full w-full flex justify-center items-center px-4 z-50'>

    <div ref={modalRef} className='aspect-square  w-full max-w-[600px] max-h-[900px]  dark:bg-darkBg bg-lightBg rounded-md shadow-md flex justify-start items-center flex-col p-4 relative' >
        <div className='absolute top-4 right-4 cursor-pointer'><Button><X onClick={() => setUnsplash(false)} size='32px' /></Button></div>
        <h2 className='font-[500] text-2xl pt-2'>Find a Picture</h2>

        <div className='flex justify-center items-center flex-col space-y-3 w-full py-4 px-6  '>
            <div className='w-full space-y-1'>
              <input type='text' {...register('searchQuery')} placeholder='Search a Image' className='w-full rounded-md p-2 px-4 outline-none focus:border-2   dark:bg-lightBg/90 dark:placeholder:text-gray-700 placeholder:text-sm dark:text-darkBg bg-gray-100 placeholder:text-gray-900 border-2 border-gray-600'/>
            </div>     
            <div className='grid grid-cols-3  place-items-center w-full h-96 overflow-y-scroll gap-2 '>
            {
              debouncedSearchQuerty &&  fetchUnsplash.isLoading && <div className='w-full h-56 flex justify-center items-center'>
                  <Loader2 className='animate-spin' /></div>
              }
              {
                fetchUnsplash.isSuccess && fetchUnsplash.data?.results.map((imageData) => (
                  <div key={imageData.id} className='aspect-video relative w-40 h-full hover:bg-darkBg/40'
                  onClick={() => setSelectedImage(imageData.urls.full)}
                  >
                    <Image 
                    alt={imageData.alt_description ?? ''}
                    src={imageData.urls.thumb}
                    fill 
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    />
                  </div>
                ))
              }
              <div className='flex  w-full h-full '>
                {selectedImage && <div>

                <Button clickEvent={() => {
                  updateImage.mutate({
                    imageUrl: selectedImage,
                    postId
                  })
                }} variant='cta' size='cta'>Set Image</Button>
                </div>}
              </div>
            </div>
          </div>

      

    </div>
</div>
)
})

export default UnsplashModal