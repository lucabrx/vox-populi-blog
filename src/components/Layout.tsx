import { type NextPage } from 'next'
import Footer from './Footer'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: NextPage<LayoutProps> = ({children}) => {
  return <div className='min-h-[100vh] dark:bg-darkBg bg-lightBg flex flex-col justify-between'>
    <Navbar />
   <main className='mb-auto'>{children}</main> 
    <Footer />
    </div>
}

export default Layout
