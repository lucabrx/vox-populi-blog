import { useEffect, useState } from 'react'
import {Sun, Moon} from 'lucide-react'
import { useTheme } from 'next-themes'
import  Button  from './ui/Button'
import { type NextPage } from 'next'


const ThemeToggle: NextPage = () => {
    const { setTheme, resolvedTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return null
      }
  return (
    <Button>
    {
        resolvedTheme === 'light' ? <Sun onClick={() => setTheme('dark')} /> : <Moon onClick={() => setTheme('light')} />
    }
    </Button>
  )
}

export default ThemeToggle