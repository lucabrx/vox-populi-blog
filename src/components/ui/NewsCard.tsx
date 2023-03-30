import { type NextPage } from 'next';
import Link from 'next/link';
import Badge from './Badge';

interface NewsCardProps {
  title: string;
  path: string;
}

const NewsCard: NextPage<NewsCardProps> = ({title,path}) => {
  return (
    <Link href={path} className="p-3 dark:bg-lightBlueGradiant/10 bg-white shadow-lg rounded-lg relative h-[100px] w-[265px] justify-center items-center cursor-pointer">
    <h2 className="w-[80%] h-full  flex justify-center items-center">{title}</h2>
   <Badge type='news'>news</Badge>
</Link>
)
}

export default NewsCard