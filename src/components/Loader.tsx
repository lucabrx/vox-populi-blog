import { type NextPage } from 'next';



const Loader: NextPage = ({}) => {
  return (
<div className='absolute inset-0 w-screen h-screen bg-black/80 flex justify-center items-center z-[100]'>
<span className="loader"></span>
</div>
)
}

export default Loader