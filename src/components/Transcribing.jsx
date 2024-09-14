import React from 'react'

const Transcribing = (props) => {
     
   const {downloading} = props;

  return (
    <div className='flex items-center flex-col justify-center gap-10 md:gap-14 py-24 p-4 '>
        <div className='flex flex-col gap-2 sm:gap-4 '>
          <h1 className='text-blue-400 text-6xl font-semibold'>Transcribing</h1>
          <p className='text-slate-400'>{!downloading ? 'warming up cylinders' : 'core cylinders engaged'}</p>
        </div>
        <div className='flex flex-col gap-2sm:gap-4 max-w-[400px] mx-auto w-full'>
            {[1,2,3].map(val=>{
                return (
                    <div key={val} className={`my-2 rounded-full h-2 sm:h-3 bg-slate-400 loading loading${val}`}></div>
                )
            })}
        </div>
    </div>
  )
}

export default Transcribing