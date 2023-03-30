import { type NextPage } from 'next';
import Link from 'next/link';
import Layout from './Layout';
import Button from './ui/Button';

interface CategoryLayoutProps {
  children: React.ReactNode;
}

const CategoryLayout: NextPage<CategoryLayoutProps> = ({children}) => {
  return (
<Layout>
<div className='flex justify-center  items-center w-full px-[24px] max-w-[1300px] mx-auto pt-2 flex-col'>
  <div className='hidden lg:flex gap-5 justify-center items-center p-4'>
<Link href='/News'><Button  size='cta' variant='cta'>News</Button></Link>
<Link href='/Sport'><Button  size='cta' variant='cta'>Sport</Button></Link>
<Link href='/Tech'><Button  size='cta' variant='cta'>Tech</Button></Link>
<Link href='/Lifestyle'><Button  size='cta' variant='cta'>Lifestyle</Button></Link>
<Link href='/Story'><Button  size='cta' variant='cta'>Stories</Button></Link>
</div>  
    
    {children}</div>
</Layout>
)
}

export default CategoryLayout