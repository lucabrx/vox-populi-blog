import { type NextPage } from 'next';
import { useRef, useContext } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '~/utils/api';
import Button from './ui/Button';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import { GlobalContext } from '~/context/GlobalContextProvider';
import { useClickOutside } from '~/hooks/useClickOutside';

interface FormInputs {
    title: string;
    description: string;
    text: string;
    category: string;
}
export const writeFormSchema = z.object({
    title: z.string().min(10).max(80),
    description: z.string().min(40).max(150),
    text: z.string().min(200),
    category: z.string()
})



const NewsModal: NextPage = (({ }) => {
    const { setIsNews } = useContext(GlobalContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(writeFormSchema)
    })
    const modalRef = useRef(null)

    const postRoute = api.useContext().post

    const createPost = api.post.writeNews.useMutation({
        onSuccess: () => {
            toast.success('Congratulation on your new Blog')
            setIsNews(false)
            reset()
            void postRoute.getAll.invalidate()
            void postRoute.getNewest.invalidate()
        }
    })

    const onSubmit = (data: FormInputs) => {
        console.log(data)
        createPost.mutate(data)
    }

    useClickOutside(modalRef, () => setIsNews(false))

    return (
        <div className='absolute inset-0 bg-black/50 dark:bg-white/20 h-full w-full flex justify-center items-center px-4 z-50'>

            <div ref={modalRef} className='aspect-square  w-full max-w-[500px] max-h-[900px]  dark:bg-darkBg bg-lightBg rounded-md shadow-md flex justify-start items-center flex-col p-4 relative' >
                <div className='absolute top-4 right-4 cursor-pointer'><Button><X onClick={() => setIsNews(false)} size='32px' /></Button></div>
                <h2 className='font-[500] text-2xl pt-2'>Make a New News</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center flex-col space-y-3 w-full py-4 px-6 md:p '>

                    <div className='w-full space-y-1'>

                        {errors.title && <p className='text-sm  text-red-500 text-left self-start transition-all duration-300'>
                            Title is Required, 10-60 characters.
                        </p>}

                        <input id='title' placeholder='Title' {...register('title')} className={`w-full rounded-md p-2 px-4 outline-none focus:border-2   dark:bg-lightBg/90 dark:placeholder:text-gray-700 placeholder:text-sm dark:text-darkBg bg-gray-100 placeholder:text-gray-900 border-2 border-gray-600 ${errors.title ? 'border-1 border-red-500' : ''} `} />
                    </div>
                    <div className='w-full space-y-1'>
                        {errors.description && <p className='text-sm text-red-500 text-left self-start transition-all duration-300'>
                            Description is Required, 40-150 characters .
                        </p>}
                        <input id='description' placeholder='Description' {...register('description')} className={`w-full rounded-md p-2 px-4 outline-none focus:border-2   dark:bg-lightBg/90 dark:placeholder:text-gray-700 placeholder:text-sm dark:text-darkBg bg-gray-100 placeholder:text-gray-900 border-2 border-gray-600 ${errors.description ? 'border-1 border-red-500' : ''} `} />
                    </div>

                    <div className='w-full space-y-1'>
                        {errors.text && <p className='text-sm text-red-500 text-left self-start transition-all duration-300'>
                            Text is Required and minimal 300 characters.
                        </p>}
                        <textarea id='content' cols={10} rows={6} placeholder='Content of your Post...' className={`w-full rounded-md p-2 px-4 outline-none focus:border-2   dark:bg-lightBg/90 dark:placeholder:text-gray-700 placeholder:text-sm dark:text-darkBg bg-gray-100 placeholder:text-gray-900 border-2 border-gray-600 overflow-x-scroll resize-none ${errors.text ? 'border-1 border-red-500' : ''} `} {...register('text')} />
                    </div>
                    <div className='w-full'>
                        {errors.category && <p className='text-sm text-red-500 text-left self-start transition-all duration-300'>
                            Category is required
                        </p>}
                        <select className={`p-2 w-full rounded-lg px-4 ${errors.category ? 'border-1 border-red-500' : ''} `}
                            {...register('category')} >
                            <option value='News'>News</option>

                        </select>
                    </div>
                    <Button type='submit' variant='cta' size='full' >Publish</Button>
                </form>

            </div>
        </div>
    )
})

export default NewsModal