
import {  forwardRef, type MouseEventHandler  } from 'react';
import {BatteryFull, Coffee, Cpu, Gavel, Home, Newspaper, Trophy, X} from 'lucide-react'
import LinkContainer from './LinkContainer';
import Button from './ui/Button';
import { useSession } from 'next-auth/react';

interface SidebarProps { 
  clickEvent: MouseEventHandler;
}

const SmSidebar = forwardRef<HTMLDivElement, SidebarProps>(({clickEvent}, ref) => {
  const {data: session} = useSession()

  return <div ref={ref} className='top-0 right-0 absolute dark:bg-darkBg bg-white border-l border-b border-slate-400/20 h-screen w-[260px] z-50 md:h-[650px] md:rounded-bl-xl'>

    <div  className='flex px-[16px] md:pt-[18px] md:mb-1 pt-2.5 gap-4 border-b dark:border-slate-400/20 border-slate-700/30 pb-[10px] '>
    <Button><X onClick={clickEvent}  className='cursor-pointer'/></Button>
    </div>

   
    <div className='px-[24px] pt-8 flex justify-center items-between flex-col w-full space-y-3'>
    {session?.user.role === 'ADMIN' && <LinkContainer clickEvent={clickEvent} title='Admin ' icon={<Gavel className='text-lightBg'/>}  path='/admin' />}
      <LinkContainer clickEvent={clickEvent} title='Home' icon={<Home className='text-lightBg'/>}  path='/' />
      <LinkContainer clickEvent={clickEvent} title='News' icon={<Newspaper className='text-lightBg'/>}  path='/News' />
      
      <LinkContainer clickEvent={clickEvent} title='Sport Blog' icon={<Trophy className='text-lightBg'/>}  path='/Sport' />
      <LinkContainer clickEvent={clickEvent} title='Tech Blog' icon={<Cpu className='text-lightBg'/>}  path='/Tech' />
      <LinkContainer clickEvent={clickEvent} title='Lifestyle Blog' icon={<BatteryFull className='text-lightBg'/>}  path='/Lifestyle' />
      <LinkContainer clickEvent={clickEvent} title='Stories ' icon={<Coffee className='text-lightBg'/>}  path='/Story' />
    
    </div>

   {session?.user.role !== 'ADMIN' && <div className='flex justify-center items-center pt-5'>
    <h2 className=' text-[40px]  text-center font-[500] text-transparent bg-clip-text bg-gradient-to-br dark:from-darkBlueGradiant dark:to-darkPurpleGradinat from-lightPurpleGradiant to-lightBlueGradiant cursor-pointer tracking-wide md:font-[500] '>Vox <br/> Populi</h2>
    </div>}
    </div>
 
})

SmSidebar.displayName = 'Sidebar'

export default SmSidebar