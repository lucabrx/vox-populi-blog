import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import CategoryLayout from '~/components/CategoryLayout';
import MainCard from '~/components/ui/MainCard';
import { api } from '~/utils/api';



const Index: NextPage = ({}) => {
  const route = useRouter()

  
  const categoryList = api.post.categoryList.useQuery({
    category: route.query.category as string 
  })
  return (
<CategoryLayout>
<div className='flex flex-wrap justify-center items-center gap-5 pt-8'>
    {
      categoryList.data?.map((item) => (
        //@ts-ignore
        <MainCard link={item.images} key={item.id} category={item.category} desc={item.description} title={item.title} path={`/${item.category}/${item.slug}`} />
      ))
    }
    
    </div>
  
</CategoryLayout>
)
}

export default Index