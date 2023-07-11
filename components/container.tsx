import React from 'react'

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='max-w-[85rem]  mx-auto px-4 md:px-6 lg:px-8 py-10'>
        {children}
    </div>
  )
}

export default Container