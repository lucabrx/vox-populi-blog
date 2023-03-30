import { type NextPage } from 'next';
import LgLinkContainer from './LgLinkContainer';
import {BatteryFull, Coffee, Cpu, Newspaper, Trophy,Gavel} from 'lucide-react'
import { useSession } from 'next-auth/react';


const LgSidebar: NextPage = ({}) => {
  const {data: session} = useSession()

  return (
<div className='hidden lg:flex  w-full pt-12 '>
    <div className='flex flex-col justify-start w-full space-y-3 '>
    {session?.user.role === 'ADMIN' && <LgLinkContainer path='/admin' title='Admin ' icon={<Gavel className='text-lightBg'/>}   />}
      <LgLinkContainer title='News' icon={<Newspaper className='text-lightBg'/>}  path='/News' />
      <LgLinkContainer title='Sport Blog' icon={<Trophy className='text-lightBg'/>}  path='/Sport' />
      <LgLinkContainer title='Tech Blog' icon={<Cpu className='text-lightBg'/>}  path='/Tech' />
      <LgLinkContainer title='Lifestyle Blog' icon={<BatteryFull className='text-lightBg'/>}  path='/Lifestyle' />
      <LgLinkContainer title='Stories ' icon={<Coffee className='text-lightBg'/>}  path='/Story' />
    </div>
</div>
)
}

export default LgSidebar