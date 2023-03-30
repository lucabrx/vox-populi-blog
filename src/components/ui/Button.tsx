import { type NextPage } from 'next'
import { cva, type VariantProps} from 'class-variance-authority'
import {  type MouseEventHandler } from 'react'

const buttonVariants = cva(
    'flex items-center justify-center  cursor-pointer', 
    {
        variants: {
            variant: {
            default: 'dark:hover:bg-gray-200/10 hover:bg-gray-400/50 transition-color duration-300',
            cta: 'transition-all duration-300 dark:bg-ctaButtonDark text-lightBg dark:hover:bg-ctaHoverDark bg-ctaButtonLight hover:bg-ctaHoverLight',
            container: 'bg-ctaButtonLight dark:bg-ctaButtonDark'

        },
        selected: { 
            select: 'bg-gray-200/10 bg-gray-400/50'
        },
        size: {
            default: 'p-1.5 rounded-md',
            cta: 'py-2 px-4 font-semibold rounded-md',
            search: 'rounded-r-md p-2',
            container: 'p-3 rounded-md',
            full : 'w-full py-2 px-4 font-semibold rounded-md',
            card: 'p-1.5 px-2.5 rounded-md',
            sidebarContainer: 'p-2 rounded-md'
        }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            
        }
    }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  clickEvent?: MouseEventHandler;
  type?:  'submit' | 'reset' 
}

const Button: NextPage<ButtonProps> = ({type,children,variant,selected,size,clickEvent}) => {
  return <button type={type}  onClick={clickEvent} className={buttonVariants({variant,size,selected})}>{children}</button>
}

export default Button