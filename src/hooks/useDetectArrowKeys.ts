import { useEffect, useState } from 'react'

export const useDetectArrowKeys = () => {
  const [count, setCount] = useState('');
  const [val,setVal]=useState(1);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 40) {
        setVal((prev)=>prev+1);
        setCount(`down${val}`)
      } else if (event.keyCode === 38) {
        setVal((prev)=>prev-1);
        setCount(`up${val}`)
      }
    }

    // Add event listeners when the component mounts
    window.addEventListener('keydown', handleKeyDown)

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [count])

  return { count }
}
