import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import CategoryLayout from '~/components/CategoryLayout';
import { GlobalContext } from '~/context/GlobalContextProvider';
import { api } from '~/utils/api';
import { Image as LucidImage } from 'lucide-react';
import Image from 'next/image';
import UnsplashModalNews from '~/components/UnsplashModalNews';




const BlogPage: NextPage = ({}) => {
  const { data: session } = useSession()
  const {unsplash,setUnsplash} = useContext(GlobalContext)

    const router = useRouter()
    
    const news = api.post.getSingleNews.useQuery({
        slug: router.query.slug as string
    })

    const postId = String(news.data?.id)

  return (
<CategoryLayout>
{unsplash && <UnsplashModalNews postId={postId} />}

<div className='flex flex-col items-center justify-center px-[24px] space-y-3 pt-3 max-w-[740px]'>
<h2 className='w-full items-left text-3xl dark:text-lightBg/90 text-darkBg/90 px-2'>{news.data?.title}</h2>    
{news.data?.images ?
<div className='w-full md:w-[700px] h-[300px] relative px-[24px]'>
{ 
  session?.user.role === 'ADMIN' ?  <div onClick={() => setUnsplash(true)} className='absolute top-2 left-2 bg-black/30 p-2 text-white rounded-lg dark:hover:bg-darkBg hover:bg-darkCard cursor-pointer transition-all duration-300 z-10'>
    <LucidImage size='24px'  />
    </div> : null
    }
<Image 
src={news.data?.images}
alt={news.data?.title}
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
<p className='w-full items-left text-lg md:text-base dark:text-lightBg/80 text-darkBg/80 px-2 pb-2 pt-2'>{news.data?.description}</p> 
<p className='w-full items-left text-lg md:text-base dark:text-lightBg/80 text-darkBg/80 px-2'>{news.data?.text}</p> 
</div>  
</CategoryLayout>
)
}

export default BlogPage