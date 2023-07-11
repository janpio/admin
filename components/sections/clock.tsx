'use client'
import { useState, useEffect } from 'react'
import Title from '../ui/title';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(new Date());
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);


  return (
    <div className='border bg-rose-400 text-white p-2 rounded-md flex flex-col items-center justify-center'>
        <Title variant="H2" text="Time" />
        <time>{time.toLocaleTimeString()}</time>
    </div>
  )
}

export default Clock