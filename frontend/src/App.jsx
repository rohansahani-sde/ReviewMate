import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import "prismjs/theme/prism-tomorrow.css"
import "prismjs/themes/prism-twilight.css"; // valid theme file
import "prismjs"; 
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";

import Markdown  from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/github-dark.css';


import Editor from 'react-simple-code-editor';



import Prism from "prismjs";
import { useEffect } from 'react'
import axios from 'axios';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  

  const [loading, setLoading] = useState(false);
  // get review
  async function getReview() {
    setLoading(true);
    const response = await axios.post('http://localhost:3000/ai/get-review', {code});
    setReview(response.data)
    setLoading(false);
    console.log(response.data);
  }

  const [review, setReview] = useState(``);
  
  const [code, setCode] = useState(`
    public class HelloWorld {
    public static void main(String[] args) {
    System.out.println("Hello, World!");
    }
    }
    `);

  useEffect(() => {
    Prism.highlightAll();
  },[]);

  return (
    <>
    
    <main className='flex w-full h-screen'>
    {/* left */}
      <div className='w-1/2 bg-black rounded-lg relative'>
      {/* code */}
      <div className="code h-full bg-[#2a2a46] overflow-auto">
  <Editor
  className='overflow-auto min-h-screen'
    value={code}
    onValueChange={code => setCode(code)}
    highlight={code => Prism.highlight(code, Prism.languages.java, 'java')}
    padding={10}
    style={{
      overflow:"y",
      fontSize: 14,
      fontFamily: '"Fira Code", "Fira Mono", monospace',
      whiteSpace: 'pre',
      tabSize: 2,
      backgroundColor: '#2a2a46',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      // height: '100%',
      width: '100%',
      lineHeight: 1.5,
      caretColor: 'white',
      outline: 'none',
    }}
  />
</div>


      <button 
      onClick={getReview}
      className=' absolute text-white text-xl bottom-6 right-8 p-1 rounded-lg font-medium bg-[#6D42BA]'>
        Review
      </button>
      </div>
      {/* right */}
      
      <div className='w-1/2 bg-[#212121] text-white rounded-lg p-1 overflow-y-scroll'>
        {loading ? (<>
        <h1 className='text-red-500'>Loading...</h1>
        </>) :
      <Markdown
      rehypePlugins= { [rehypeHighlight]}
      >
         {review}
      </Markdown>
         }

      </div>
    </main>
    </>
  )
}

export default App
