import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { stringify } from 'querystring';

export default function handler(req:NextApiRequest, res:NextApiResponse) {
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
