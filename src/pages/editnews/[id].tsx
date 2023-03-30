import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import AdminLayout from '~/components/AdminLayout';
import Layout from '~/components/Layout';
import Loader from '~/components/Loader';
import Button from '~/components/ui/Button';
import { api } from '~/utils/api';





const EditNews: NextPage = ({}) => {
  const router = useRouter()
  const postRoute = api.useContext().post


  const {data} = api.post.getSingleEdit.useQuery({
      id: router.query.id as string
  })

  const deleteNews = api.post.deleteNews.useMutation({
    onSuccess: () => {
      toast.success('News Deleted')
      void postRoute.getAllNews.invalidate()
      void router.push('/admin/newsList')
    }
  })

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loader />
  }
  
  if (status === "unauthenticated" || session?.user.role === 'USER') {
    return <p>Access Denied</p>
  }
return (
<div>
<Layout>
<AdminLayout>

<div className="flex w-full  justify-between items-center gap-10 pt-12">

<div className=' dark:bg-darkCard bg-lightBg flex justify-start items-center flex-col p-4 w-[500px] space-y-2 rounded-md shadow-lg py-6 px-6'>
  <h2 className='font-bold text-xl py-4'>News Info</h2>
  <div className='flex justify-start items-start flex-col space-y-2 '>
  <h2 className='text-lg'>TITLE: {data?.title}</h2>
  <h2 className='text-lg'>DESCRIPTION: {data?.description}</h2>
  </div>
</div>
<div className=' dark:bg-darkCard bg-lightBg flex justify-start items-center flex-col p-4  space-y-2 rounded-md shadow-lg py-8 px-6 '>


  <Button clickEvent={() => {
    deleteNews.mutate({
      id: router.query.id as string
    })
  }} size='cta' variant='cta'>Delete</Button>

</div>
</div>

</AdminLayout>
</Layout>
</div>
)
}

export default EditNews