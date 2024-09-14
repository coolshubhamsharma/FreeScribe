import { useState , useRef , useEffect} from 'react'
import './App.css'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay';
import Information from './components/Information';
import Transcribing from './components/Transcribing';
import { MessageTypes } from './utils/presets';

function App() {
  const [file, setFile] = useState(null);//if we upload a file (use state is a hook used to rerender components once there values are set)
  const[audioStream , setAudioStream] = useState(null); //live recording
  const [output , setOutput] = useState(null);
  const [loading , setLoading] = useState(false);

  //ML
  const [finished , setFinished] = useState(false);
  const [downloading , setDownloading] = useState(false);
  //ML


  function handleAudioReset(){ //making the input empty and sendig this function to FileDisplay
    setFile(null);
    setAudioStream(null);
  }

   const worker = useRef(null);  //the worker will perform the transcription in the background in (whisper.worker.js)


   //ML
   useEffect(()=>{
    if(!worker.current){
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), { type: 'module' });
    }

    const onMessageReceived = async (e)=>{
      switch(e.data.type){
        case 'DOWNLOADING':
          setDownloading(true);
          console.log('DOWNLOADING');
          break;
        case 'LOADING':
          setLoading(true);
          console.log('LOADING');
          break;
        case 'RESULT':
          setOutput(e.data.results);
          console.log(e.data.results);
          break; 
        case 'INFERENCE_DONE':
          setFinished(true);
          console.log('done');
          break; 
      }
    }

    worker.current.addEventListener('message', onMessageReceived);

    return ()=> worker.current.removeEventListener('message' , onMessageReceived);
   })

   async function readAudioFrom(file){
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({sampleRate:sampling_rate});
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
   }

   async function handleFormSubmission(){
    if(!file && !audioStream){return}

    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = 'openai/whisper-tiny.en';

    worker.current.postMessage({
      type:MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
   }
   //ML

  const isAudioAvailable = file !== null && file !== undefined || audioStream !== null && audioStream !== undefined;
 //checking if we have a file or audio and when we get the we go to FileDislay page else we stay on homepage
  return (
    <div className='flex flex-col  w-screen w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header/>
        {output ? (
          <Information/>
        ):loading ? (
          <Transcribing/>
        ) : isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} file={file} audioStream={audioStream} />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream}/>
        )}
         {/*here we are sending setFile and setAudioStream to the homepage where we are taking input of audio and file so that we can we can send these back here in the app.jsx file and can use it here to do things*/}
      </section>
      
      <footer></footer>
    </div>
  )
}

export default App
