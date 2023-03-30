import { type NextPage } from 'next';
import Link from 'next/link';
import Button from './ui/Button';
interface LinkContainerProps {
  icon: React.ReactNode;
  title: string;
  path: string;
}

const LgLinkContainer: NextPage<LinkContainerProps> = ({icon,title,path}) => {
  return ( 
  <Link href={path} className='flex justify-between items-center dark:hover:bg-gray-200/10 hover:bg-gray-400/50 transition-color duration-300 p-2 px-4 rounded-lg cursor-pointer'>
    <h2 className='text-lg font-[500]'>{title}</h2>
    <Button variant='container' size='sidebarContainer'>{icon}</Button>
  </Link>
   )
}

export default LgLinkContainer