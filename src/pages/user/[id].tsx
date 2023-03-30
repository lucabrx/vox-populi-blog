import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import AdminLayout from '~/components/AdminLayout';
import Layout from '~/components/Layout';
import Loader from '~/components/Loader';
import Button from '~/components/ui/Button';
import { api } from '~/utils/api';



const EditUser: NextPage = ({}) => {

    const { data: session, status } = useSession()

    const router = useRouter() 
    const userRoute = api.useContext().user
    
    
    const user = api.user.getSingle.useQuery({
        id : router.query.id as string
    })
    
    const changeRole = api.user.addRole.useMutation({
        onSuccess: () => {
            toast.success('Successfully Change role')
            void userRoute.getSingle.invalidate()
            void userRoute.getAll.invalidate()
        }
    })

    const deleteUser = api.user.deleteUser.useMutation({
        onSuccess: () => {
            toast.success('Successfully Deleted user')
            void userRoute.getAll.invalidate()
            void router.push('/admin')
    }})

  

    if (status === "loading") {
      return <Loader />
    }
    
    if (status === "unauthenticated" || session?.user.role === 'USER') {
      return <p>Access Denied</p>
    }
  return (
<Layout>
<AdminLayout>

<div className="flex w-full  justify-between items-center gap-10 pt-12">

<div className=' dark:bg-darkCard bg-lightBg flex justify-start items-center flex-col p-4 w-[500px] space-y-2 rounded-md shadow-lg py-6 px-6'>
    <h2 className='font-bold text-xl py-4'>User Info</h2>
    <div className='flex justify-start items-start flex-col space-y-2 '>
    <h2 className='text-lg'>EMAIL: {user.data?.email}</h2>
    <h2 className='text-lg'>NAME: {user.data?.name}</h2>
    <h2 className='text-lg'>ROLE: {user.data?.role}</h2>
    </div>
</div>
<div className=' dark:bg-darkCard bg-lightBg flex justify-start items-center flex-col p-4  space-y-2 rounded-md shadow-lg py-8 px-6 '>
   {
       user.data?.role === 'USER' ?  <Button clickEvent={() => {
           changeRole.mutate({
               role : 'ADMIN',
               userId : router.query.id as string 
            })
        }} size='cta' variant='cta'>Set as Admin</Button>
        
        :
        
        <Button clickEvent={() => {
            changeRole.mutate({
                role : 'USER',
                userId : router.query.id as string 
            })
    }} size='cta' variant='cta'>Remove Admin</Button>
}

    <Button size='cta' variant='cta' clickEvent={() => {
        deleteUser.mutate({
            id: router.query.id as string 
        })
    }}>Ban</Button>

</div>
</div>

</AdminLayout>
</Layout>
)
}

export default EditUser