import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center justify-between p-5 gap-4'>
          <a href="/"><h1 className='text-2xl'>Free<span className='text-blue-400'>Scribe</span></h1></a>
          <a href='/' className='specialBtn flex items-center gap-2 px-3 py-2 rounded-lg text-blue-400'>
            <p className='text-lg'>New</p>
            <i className="fa-solid fa-plus"></i> 
          </a>
        </header>
  )
}

export default Header