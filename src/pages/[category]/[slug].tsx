import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import CategoryLayout from '~/components/CategoryLayout';
import CommentSection from '~/components/CommentSection';
import { api } from '~/utils/api';
import { Image as LucidImage } from 'lucide-react';
import Image from 'next/image';
import UnsplashModal from '~/components/UnsplashModal';
import { useContext } from 'react';
import { GlobalContext } from '~/context/GlobalContextProvider';
import { useSession } from 'next-auth/react';


const BlogPage: NextPage = ({}) => {
  const { data: session } = useSession()

    const router = useRouter()
    const {unsplash,setUnsplash} = useContext(GlobalContext)
    
    const blog = api.post.getSingleBlog.useQuery({
        slug: router.query.slug as string
    })
    const postId = String(blog.data?.id)
  return (
<CategoryLayout>



{unsplash && <UnsplashModal postId={postId} />}

<div className='flex flex-col items-center justify-center px-[24px] space-y-2 pt-3 max-w-[740px]'>

<h2 className='w-full items-left text-3xl dark:text-lightBg/90 text-darkBg/90 px-2'>{blog.data?.title}</h2>  
{/*image*/}  
{ blog.data?.images ?
<div className='w-full md:w-[700px] h-[300px] relative px-[24px]'>
{session?.user.role === 'ADMIN' &&
<div onClick={() => setUnsplash(true)} className='absolute top-2 left-2 bg-black/30 p-2 text-white rounded-lg dark:hover:bg-darkBg hover:bg-darkCard cursor-pointer transition-all duration-300 z-10'>
    <LucidImage size='24px'  />
    </div>
}
<Image 
src={blog.data?.images}
alt={blog.data?.title}
fill
className='rounded-lg'
/> 
</div> :
  <div className='w-auto min-w-[350px] max-w-[700px] h-[350px] bg-gray-300 rounded-lg relative'>

  { 
  session?.user.role === 'ADMIN' &&  <div onClick={() => setUnsplash(true)} className='absolute top-2 left-2 bg-black/30 p-2 text-white rounded-lg dark:hover:bg-darkBg hover:bg-darkCard cursor-pointer transition-all duration-300'>
    <LucidImage size='24px'  />
    </div> 
    }
  </div> 
}


<p className='w-full items-left text-lg md:text-base dark:text-lightBg/80 text-darkBg/80 px-2 pb-2 pt-2'>{blog.data?.description}</p> 
<p className='w-full items-left text-lg md:text-base dark:text-lightBg/80 text-darkBg/80 px-2'>{blog.data?.text}</p> 


<CommentSection postId={postId} />
</div>  

</CategoryLayout>
)
}

export default BlogPage