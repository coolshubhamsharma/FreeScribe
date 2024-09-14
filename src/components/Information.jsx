import React, { useState } from 'react'
import Transcription from './Transcription';
import Translation from './Translation';

const Information = () => {

    const [tab , setTab] = useState('transcription');

  return (
    
    <main className='text-center whitespace-nowrap p-4 flex-1 gap-3 sm:gap-4 md:gap-5 flex flex-col justify-center pb-20'>
      <h1 className='text-center font-semibold text-5xl sm:text-6xl md:text-7xl'>Your<span className='text-blue-400 bold font-semibold'>&nbsp;Transcription</span></h1>

      <div className='grid grid-cols-2 items-center mx-auto bg-white border-2 shadow rounded-full overflow-hidden'>
        <button onClick={()=>setTab('transcription')} className={`px-4 py-1 duration-200 font-medium ${tab === 'transcription' ? 'bg-blue-400 text-white' : 'text-blue-400 hover:text-blue-600'}`}>Transcription</button>
        <button onClick={()=>setTab('translation')} className={`px-4 py-1 duration-200 font-medium ${tab === 'translation' ? 'bg-blue-400 text-white' : 'text-blue-400 hover:text-blue-600'}`}>Translation</button>
      </div>
      {tab === 'transcription' ? ( 
      <Transcription/>
       ) : (
       <Translation/>
       ) }
    </main>
  )
}

export default Information