import { type NextPage } from 'next';
import { useContext } from "react"
import { GlobalContext } from "~/context/GlobalContextProvider"
import Button from "~/components/ui/Button"

import Link from "next/link"
import WriteModal from './WriteModal';
import NewsModal from './NewsModal';
import StoryModal from './StoryModal';

interface AdminLayoutProps {
    children: React.ReactNode
}
const AdminLayout: NextPage<AdminLayoutProps> = ({children}) => {
    const {setIsNews,isWriteModel,setIsWriteModel, isNews,isStory,setIsStory} = useContext(GlobalContext)
 
    return (
        <div className="flex flex-col justify-center mx-auto  w-full max-w-[1300px]">
        <div className="flex justify-between w-full md:flex-row flex-col md:gap-0 gap-3 items-center pt-6 px-[24px]">
            <div className="flex justify-center items-center gap-4">
                <Link href='/admin'><Button variant='cta' size='cta'>User List</Button></Link>
                <Link href='/admin/newsList'><Button variant='cta' size='cta'>News List</Button></Link>
                <Link href='/admin/blogsList'><Button variant='cta' size='cta'>Blog List</Button></Link>
            </div>

            <div className="flex justify-center items-center gap-4">
                <Button clickEvent={() => setIsNews(true)} variant='cta' size='cta'>Write new News</Button>
                <Button clickEvent={() => setIsWriteModel(true)} variant='cta' size='cta' >Write new blog</Button>
                <Button clickEvent={() => setIsStory(true)} variant='cta' size='cta' >Write new story</Button>
                {isNews && <NewsModal />}
                {isStory && <StoryModal />}
            {isWriteModel && <WriteModal  />}
            </div>
        </div>
        {children}
        </div>
    )
}

export default AdminLayout