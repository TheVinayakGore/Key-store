import React from 'react'
import git from "/icons/git.svg"

const Navbar = () => {
  return (
    <>
        <nav className='flex items-center justify-between fixed top-0 px-20 text-white bg-[#8f5fff] z-50 h-12 w-full'>
            <div className="flex space-x-4 text-2xl font-bold">
                <a href="/">{"<Key."}<span className='text-teal-400'>{"Store"}</span>{"/>"}</a>
            </div>
            <a href="https://github.com/VinTechG2628" target="_blank" className='border-2 border-[#4010af] bg-teal-50 hover:border-green-500 rounded-full p-1 w-8'><img src={git} alt="github" className='w-6' /></a>
        </nav>
    </>
  )
}

export default Navbar
