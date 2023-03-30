import Layout from "~/components/Layout"
import Button from "~/components/ui/Button"
import { api } from "~/utils/api"

import Link from "next/link"
import { Edit,  } from "lucide-react"
import { useSession } from "next-auth/react"

import AdminLayout from "~/components/AdminLayout"
import Loader from "~/components/Loader"


const Admin = () => {
  const users = api.user.getAll.useQuery() 
  const { data: session, status } = useSession()

if (status === "loading") {
  return <Loader />
}

if (status === "unauthenticated" || session?.user.role === 'USER') {
  return <p>Access Denied</p>
}
 
  return (
    <Layout>
    <AdminLayout>
          
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 pt-4">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Role</th>

              <th scope="col" className="px-6 py-4">Edit User</th>

            </tr>
          </thead>
          <tbody>
          {users.data?.map((user) => (
              <tr key={user.id} className="border-b dark:border-neutral-500 ">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
              <td className="whitespace-nowrap px-6 py-4"><Link href={`/user/${user.id}`}><Button variant='cta'><Edit/></Button></Link></td> 
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
 
</div>
</AdminLayout>
</Layout>
  )
}

export default Admin