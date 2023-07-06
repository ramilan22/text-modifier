import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { stringify } from 'querystring';

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with the appropriate origin or set it to '*' to allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  
  // Handle preflight request
  
  if (req.method === 'POST'){

    
    

    const directoryPaths = req.body;
    console.log(directoryPaths)
    // Replace with the actual directory path
    const directoryPath=directoryPaths.inputValue
    
    
    
    
    try{
      const files = fs.readdirSync(directoryPath);
      
      files.forEach((file) => {
        const oldFilePath = path.join(directoryPath, file);
        const newFileName = file.replace(/\s+/g, '-');
        const newFilePath = path.join(directoryPath, newFileName);
        
        fs.renameSync(oldFilePath, newFilePath);
      });
      
      console.log('File names changed successfully!');
      res.status(200).json({files})
    } catch (error) {
      console.error('Error changing file names:', error);
    }
  }
  }
  