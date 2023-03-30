import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { api } from '~/utils/api';
import Button from './ui/Button';

interface CommentSectionProps {
  postId: string;
}



const commentSchema = z.object({
  text: z.string().min(5)
})

interface commentType {
  text: string; 
}

const CommentSection: NextPage<CommentSectionProps> = ({postId}) => {
  const {data: session} = useSession()
  const {register,reset, handleSubmit, formState: {errors}} = useForm<commentType>({
    resolver: zodResolver(commentSchema)
  })
  const userRoute = api.useContext().user

  const submitComment = api.user.submitComment.useMutation({
    onSuccess: () => {
      toast.success('Comment added Successfully')
      reset()
      void userRoute.getComments.invalidate()
    }
  })

  const getComments = api.user.getComments.useQuery({
    postId 
  })
  const deleteCommentUser = api.user.deleteCommentUser.useMutation({
    onSuccess: () => {
      toast.success('Comment successfully deleted')
      void userRoute.getComments.invalidate()
    }
  })
  return (
    
<div className='pt-3 flex flex-col justify-start items-center w-full pb-2'>
    <h2 className='self-end w-full text-xl px-[32px]'>Comments:</h2>
   {session && <form onSubmit={handleSubmit((data) => submitComment.mutate({
      postId,
      text: data.text
    }))}  
    className='w-full flex flex-col pb-4'>
    <div className='px-[24px] w-full pt-2'>
    <textarea rows={3} className=' w-full  p-2 px-4 rounded-lg outline-none focus:border-2  focus:dark:border-gray-400 dark:bg-lightBg/90 dark:placeholder:text-gray-700 placeholder:text-sm dark:text-darkBg bg-gray-100 placeholder:text-gray-900 border-2 border-gray-600 overflow-x-scroll resize-none' placeholder='Comment...' {...register('text')}  />
    { errors.text && <p className='text-sm  text-red-500 text-left self-start transition-all duration-300'>
            Please provide more then 5 characters
            </p>}
    </div>
    <div className='flex justify-end w-full px-[28px] pt-2'><Button size='cta' variant='cta'>Submit</Button></div>
    </form>}

    <div className='flex justify-center items-center flex-col w-full'>

       
        {
          getComments.isSuccess && 
          getComments?.data.map((comment) => (
            <div key={comment.id} className=' p-3 pt-9  relative border-t border-gray-400  mt-2 w-full'>
          {comment.user && comment.user?.id === session?.user.id  ?
        <div className='absolute top-3 right-2 z-10' onClick={() => {deleteCommentUser.mutate({
          commentId: comment.id
        })}}><Button><Trash2 /></Button>
        </div> : null
        }
        <span className='absolute top-2 left-3 font-bold dark:text-lightBg/90 text-darkBg/90'>{comment.user.name}</span>
        <p className='dark:text-lightBg/90 text-darkBg/90'>
        {comment.text}
        </p>
        </div>
          ))
          }

        
        
    </div>
</div>
)
}

export default CommentSection