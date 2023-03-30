// @typescript-eslint/restrict-template-expressions
import { type NextPage } from 'next';
import Link from 'next/link';
import Badge from './Badge';
import Button from './Button';

interface MainCardProps {
  title: string;
  desc: string;
  category:   'Lifestyle' | 'Tech' | 'Sport' | 'Story';
  path: string;
  link: string;
}
const MainCard: NextPage<MainCardProps> = ({ title, desc, category, path, link }) => {

  return (
    <div className='w-[265px] h-[280px] rounded-lg dark:bg-lightBlueGradiant/10 bg-white shadow-lg p-2'>
      <div style={{ backgroundImage: `url(${link})` }} className='w-full h-full bg-center bg-cover bg-no-repeat rounded-lg ' >
        <div className='dark:bg-black/50 bg-black/20 w-full  h-full  rounded-lg relative p-2  '>
          <Badge type={category}>{category}</Badge>

          <div className='w-full  h-full flex justify-between items-center flex-col   '>
            <h2 className='w-[100%] pr-[30px] text-[24px] mt-2 text-lightBg dark:text-lightBg/90 select-none '>{title}</h2>
            <p className='w-full text-center   text-base text-lightBg/80 dark:text-lightBg/70 pt-6 cli select-none pb-20'>{desc}</p>
          </div>

          <Link href={path} className='absolute right-2 bottom-2  '><Button size='card' variant='cta'>Read More...</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default MainCard