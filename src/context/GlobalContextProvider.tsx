import { type NextPage } from 'next';
import {createContext, useState} from 'react'


export const GlobalContext = createContext<Context>(null as unknown as Context )


interface GlobalContextProviderProps {
  children: React.ReactNode;
}
interface Context {
    isWriteModel: boolean;
    setIsWriteModel: React.Dispatch<React.SetStateAction<boolean>>;
    isNews: boolean;
    setIsNews: React.Dispatch<React.SetStateAction<boolean>>;
    unsplash: boolean;
    setUnsplash: React.Dispatch<React.SetStateAction<boolean>>;
    isStory: boolean;
    setIsStory: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContextProvider: NextPage<GlobalContextProviderProps> = ({children}) => {
    const [isWriteModel, setIsWriteModel] = useState(false)
    const [isNews, setIsNews] = useState(false)
    const [isStory, setIsStory] = useState(false)

    const [unsplash, setUnsplash] = useState(false)



  return (
<GlobalContext.Provider value={{ isWriteModel, setIsWriteModel,isNews ,setIsNews,unsplash,setUnsplash, isStory, setIsStory }}>{children}</GlobalContext.Provider>
)
}

export default GlobalContextProvider