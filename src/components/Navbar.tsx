import { type NextPage } from 'next'
import Link from 'next/link'
import {  useEffect, useRef, useState } from 'react'
import { useClickOutside } from '~/hooks/useClickOutside'
import { signIn, signOut, useSession  } from 'next-auth/react'
import ThemeToggle from './ThemeToggle'
import SmSidebar from './SmSidebar'
import Button  from './ui/Button'
import {Menu} from 'lucide-react'


const Navbar: NextPage = () => {
  const { status } = useSession()
  const [openSidebar,setOpenSidebar] = useState<boolean>(false)

  const sidebarRef = useRef(null) 

  useClickOutside(sidebarRef, () => setOpenSidebar(false))

  useEffect(() => {
  if(openSidebar === true) {
    document.body.style.overflow='hidden'
  }
  return () => {
    document.body.style.overflow = "auto"
  }
  },[openSidebar])
 
  return (
    <>
  <div className=' w-full  flex justify-center border-b dark:border-slate-400/20 border-slate-700/30'>
    <div className='max-w-[1200px] flex justify-between items-center px-[16px] md:px-[24px] p-2 pt-3 w-full'>
      {/**TITLE */}
      <Link href='/' className=' text-[26px] md:text-[32px] font-[500] text-transparent bg-clip-text bg-gradient-to-br dark:from-darkBlueGradiant dark:to-darkPurpleGradinat from-lightPurpleGradiant to-lightBlueGradiant cursor-pointer tracking-wide md:font-[500] '>Vox Populi</Link>
{/** middle actions */}
{/** toggle/menu --- toggle/auth */}
<div className='flex justify-center items-center gap-4'>
  <ThemeToggle />

  

 {status === 'authenticated' ? 
  <>
 <Button clickEvent={() => signOut()} size='cta' variant='cta'>Logout</Button>
 </>
 :
  <Button clickEvent={() => signIn()} size='cta' variant='cta'>Sign in</Button>

}

  <button className='cursor-pointer lg:hidden'><Menu onClick={() => setOpenSidebar(true)} /></button>
  {
    openSidebar && <SmSidebar clickEvent={() => setOpenSidebar(false)} ref={sidebarRef}/>
  }
      </div>
    </div>

  </div>
   
   </>
  )
}

export default Navbar