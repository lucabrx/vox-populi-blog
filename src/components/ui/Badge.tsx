import { type NextPage } from 'next';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariant = cva(
    'flex justify-center items-center p-1 px-1 absolute top-0 right-0 text-[10px] rounded-tr-md rounded-bl-md text-lightBg select-none w-[60px]',
    {
        variants: {
            type: {
                news: 'bg-darkBg/80',
                Tech: 'bg-ctaButtonDark/60',
                Sport: 'bg-green-500/50',
                Story: 'bg-yellow-500/70',
                Lifestyle: 'bg-darkBlueGradiant/60',
            }
        },
        defaultVariants: {
            type: 'news'
        }
    }
)
interface BadgeProps extends VariantProps<typeof badgeVariant> {
  children: React.ReactNode
}
const Badge: NextPage<BadgeProps> = ({children,type}) => {
  return (
<div className={badgeVariant({type})}>{children}</div>
)
}

Badge.displayName= 'Badge'
export default Badge