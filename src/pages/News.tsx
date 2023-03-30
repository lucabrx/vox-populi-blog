import { type NextPage } from 'next';
import CategoryLayout from '~/components/CategoryLayout';
import NewsCard from '~/components/ui/NewsCard';
import { api } from '~/utils/api';



const News: NextPage = ({}) => {
    const {data} = api.post.newsListAll.useQuery()


  return (
<CategoryLayout>
    <div className='flex flex-wrap justify-center items-center gap-5 pt-8'>
    {
        data?.map(news => (
            <NewsCard key={news.id} path={`/${news.category}/${news.slug}`} title={news.title} />
        ))
    }
    
    </div>
</CategoryLayout>
)
}

export default News