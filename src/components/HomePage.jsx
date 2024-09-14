import React from 'react'
import { useState , useEffect , useRef } from 'react';

const HomePage = (props) => {
    const {setAudioStream , setFile} = props;

    const [recordingStatus , setRecordingStatus] = useState('inactive');
    const [audioChunks , setAudioChunks] = useState([]);
    const [duration , setDuration] = useState(0);

    const mediaRecorder = useRef(null);

    const mimeType = 'audio/webp';

    async function startRecording(){
      let tempStream;
       console.log('Start recording');

       //getting access to the user's microphone
       try{
        const streamData = await navigator.mediaDevices.getUserMedia({ //this is a web API that asks user for permission of their media devices and it returns a promise which resolves with a mediaStream object if access is granted
            audio:true,
            video:false
        })
        tempStream = streamData; // save in tempStream becauese we have declared streamData with const which means its value can be changed , so we put the audio  that we are getting into tempStream 
       }
       catch(err){
        console.log(err.message);
        return;
       }
       //recording the media chunks
       setRecordingStatus('recording');

       //create new MediaRecorder instance using the stream
       const media =new MediaRecorder(tempStream , {type: mimeType});
       mediaRecorder.current = media;

       mediaRecorder.current.start();
       let localAudioChunks = [];
       //An event listener that triggers every time audio data is available during the recording process.
       mediaRecorder.current.ondataavailable = (event)=>{
        if(typeof event.data === 'undefined'){return}
        if(event.data.size === 0){return}
        localAudioChunks.push(event.data);
       }
       setAudioChunks(localAudioChunks); // we have the audio file
    }

    //stopping the recording
    async function stopRecording(){
        
        setRecordingStatus('inactive');
        console.log('stop Recording');
        
        //Stops the recording, combines the audio chunks into a Blob object, stores it, and resets the recording state for future use.
        mediaRecorder.current.stop(); //stopping the recording
        mediaRecorder.current.onstop = ()=>{
            const audioBlob = new Blob(audioChunks , {type:mimeType}); //The Blob constructor takes an array of data and creates a Blob object.
            //A Blob (Binary Large Object) is a file-like object that contains raw data, which in this case is the recorded audio.
            //This Blob can be used to play back the recording, save it to a file, or upload it to a server.
            setAudioStream(audioBlob);//This stores the audioBlob (the recorded audio) in state using the setAudioStream function.
            //The audioBlob can later be used to play back the audio or manipulate it in other ways.
            setAudioChunks([]);
            setDuration(0);
        }
    }

    //this useEffect is for our recording status so that people know fo rhow much duration they are being recorded for
    useEffect(()=>{
      if(recordingStatus === 'inactive'){return}

      //changing duration after every 1000ms i.e. 1second so that users have count of their time
      const interval = setInterval(()=>{
        setDuration(curr => curr+1)
      } , 1000)
      //initially the value given to duration is zero but with this hook we are updating the value of duration every second.

      return ()=> clearInterval(interval);
    });

    const inputHandler = (e)=>{
        const tempFile = e.target.files[0]; //getting the files from the input
        setFile(tempFile); //set the value of the files and sending back to the app.jsx folder
    }

    


  return (
    <main className='text-center p-4 flex-1 gap-3 sm:gap-4 md:gap-5 flex flex-col justify-center pb-20'>
      
       <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free<span className='text-blue-400 bold font-semibold'>Scribe</span></h1>
       <h3 className='text-2xl'>Record <span className='text-blue-400'>&rarr;</span>
         Transcribe
       <span className='text-blue-400'>&rarr;</span>
         Translate
       </h3>
       <button onClick={recordingStatus === 'recording' ? stopRecording :  startRecording} className='specialBtn px-4 py-2 rounded-xl flex text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
        <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'record' : 'stop Recording'}</p>
        <div className='flex items-center gap-2'>
            {duration !== 0 && (
                <p className='text-sm'>{duration}s</p>
            )}
            <i className={(recordingStatus === 'recording' ? "fa-solid duration-200 fa-microphone text-rose-400" : "fa-solid duration-200 fa-microphone ")}></i>
        </div>
       </button>
       <p className='text-base'>Or <label htmlFor="input" className='text-blue-400 hover:text-blue-600 duration-200 relative' id="input">Upload 
        <input onChange={inputHandler} type="file" className='opacity-0 absolute inset-0 cursor-pointer' accept='.mp3 , .wave , .waptt' /></label>
        &ensp;a mp3 file</p>
       <p className='italic text-slate-500'>Free now free forever!</p>
        </main>
  )
}

export default HomePage