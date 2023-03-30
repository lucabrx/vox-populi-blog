import { Edit } from 'lucide-react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminLayout from '~/components/AdminLayout';
import Layout from '~/components/Layout';
import Loader from '~/components/Loader';
import Button from '~/components/ui/Button';
import { api } from '~/utils/api';



const BlogsList: NextPage = ({}) => {

  const {data} = api.post.getAllBlogs.useQuery()
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
            <th scope="col" className="px-6 py-4">Title</th>
              <th scope="col" className="px-6 py-4">Description</th>
              <th scope="col" className="px-6 py-4">Category</th>
              <th scope="col" className="px-6 py-4">Edit Blog</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((blog) => (
              <tr key={blog.id} className="border-b dark:border-neutral-500 ">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{blog.title}</td>
              <td className="whitespace-nowrap px-6 py-4 w-1/2 truncate">{blog.description}</td>
              <td className="whitespace-nowrap px-6 py-4">{blog.category}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link href={`/editblog/${blog.id}`}>
                  <Button variant='cta'><Edit/></Button>
                  </Link>
                  </td> 
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

export default BlogsList