import { type NextPage } from 'next';


const Footer: NextPage = ({}) => {
  return (
<div className='flex flex-col justify-center items-center border-t dark:border-slate-400/20 border-slate-700/30 py-3'>
<p className='text-darkBg/80 dark:text-lightBg/70 text-sm'>Made by Luka Brkovic</p>
</div>
)
}

export default Footer