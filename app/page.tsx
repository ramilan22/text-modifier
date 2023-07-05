"use client"
import Image from 'next/image'


import { useEffect, useState } from 'react';

export default function Home() {

  
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState([]);
  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  }

  
  
  const handleFormSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {inputValue} ), // Pass the input value in the request body
      });

      if (response.ok) {
        // Handle success
        console.log('Request successful');
      } else {
        // Handle error
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch('/api/files',{
        'method': 'GET',
      })
      const data = await response.json();
      console.log(data);
      setFiles(data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect( () => {
   
    
  }, []);
  return (
    <div>
      <h1>Files</h1>
      <h1>Enter full Path of the folder</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" className='outline-yellow-500' autoFocus value={inputValue} onChange={handleInputChange} />
        <button type="submit" className='bg-yellow-500 rounded-lg px-6'>Submit</button>
      </form>
      <ul>
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
  
};

