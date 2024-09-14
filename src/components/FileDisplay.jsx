import React from 'react'

const FileDisplay = (props) => {

    const {handleFormSubmission , handleAudioReset , file , audioStream} = props;


    return (
    <main className='text-center p-4 flex-1 gap-3 sm:gap-4 md:gap-5 flex flex-col justify-center pb-20 w-fit max-w-full mx-auto sm:w-96'>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your<span className='text-blue-400 bold font-semibold'>&ensp;File</span></h1>

        <div className='flex flex-col mb-4'>
            <h3 className='text-left font-semibold text-2xl my-4'>Name</h3>
            <p className='text-left' >{file ? file.name : 'Custom Audio'}</p>
        </div>
        <div className='flex items-center justify-between gap-4'>
            <button onClick={handleAudioReset} className='text-slate-400 hover:text-blue-600 duration-200'>Reset</button>
            <button onClick={handleFormSubmission} className='specialBtn p-2 rounded-lg text-blue-400 flex items-center gap-2'>
                Transcribe
                <i className="fa-solid fa-pen-nib"></i>
                </button>
        </div>

    </main>
  )
}

export default FileDisplay