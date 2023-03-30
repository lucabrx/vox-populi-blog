import { type NextPage } from 'next';
import Link from 'next/link';
import { type MouseEventHandler } from 'react';
import Button from './ui/Button';
interface LinkContainerProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  clickEvent: MouseEventHandler;
}

const LinkContainer: NextPage<LinkContainerProps> = ({icon,title,path,clickEvent}) => {
  return ( 
  <Link href={path} onClick={clickEvent} className='flex justify-between items-center dark:hover:bg-gray-200/10 hover:bg-gray-400/50 transition-color duration-300 p-2 px-4 rounded-lg cursor-pointer'>
    <Button variant='container' size='sidebarContainer'>{icon}</Button>
    <h2 className='text-lg font-[500]'>{title}</h2>
  </Link>
   )
}

export default LinkContainer