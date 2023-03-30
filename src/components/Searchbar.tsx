import { type NextPage } from 'next';
import { cva, type VariantProps} from 'class-variance-authority'
import { Search } from 'lucide-react';
import Button from './ui/Button'
const sizeVars = cva(
    'flex items-between justify-center  rounded-md cursor-pointer dark:bg-gray-800 bg-gray-300/50 pl-2 shadow-md', 
    {
        variants: {
        size: {
            lg:'w-[300px]'
        },
        device: {
          md: 'flex md:hidden',
          lg: 'hidden lg:flex'
        }
        },
        defaultVariants: {
         
        }
    }
)


const Searchbar: NextPage<VariantProps<typeof sizeVars>> = ({size,device}) => {
  return( <div className={sizeVars({device,size})}>
    <input placeholder='Search...' className='bg-transparent outline-none ml-2 placeholder:text-sm dark:text-lightBg w-full p-2' />
    <Button variant='cta' size='search'><Search className='p-1' /></Button>
  </div> )
}

export default Searchbar