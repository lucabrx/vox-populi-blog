import { Edit } from 'lucide-react';
import Link from 'next/link';
import { type NextPage } from 'next';
import AdminLayout from '~/components/AdminLayout';
import Layout from '~/components/Layout';
import Button from '~/components/ui/Button';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import Loader from '~/components/Loader';


const NewsList: NextPage = ({}) => {
  const { data: session, status } = useSession()

  const {data} = api.post.getAllNews.useQuery()

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
              <th scope="col" className="px-6 py-4">Edit News</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((news) => (
              <tr key={news.id} className="border-b dark:border-neutral-500 ">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{news.title}</td>
              <td className="whitespace-nowrap px-6 py-4 ">{news.title}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link href={`/editnews/${news.id}`}>
                  <Button variant='cta'>
                    <Edit/>
                    </Button>
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

export default NewsList