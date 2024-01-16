import React, { useState } from 'react';
import axios from "axios";
import { ethers } from 'ethers';
import { Cancel, CancelOutlined, CancelRounded, Delete, Remove } from "@mui/icons-material"
import {CircularProgress} from "@mui/material"
function Drop({ contract, account }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setFile(selectedFile);

    // Set the file name for display
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {

      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,

          headers: {
            pinata_api_key: '9c7b88953bed4a983af8',
            pinata_secret_api_key: `53203490d2e84a0bdd80876d540cf493372e714d7ebdeccfc34d1692274c3ad3`,
            'Content-Type': 'multipart/form-data',
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        await contract.add(account, ImgHash)
          .then(() => {
            
            setIsLoading(false);
            alert("Successfully Uploaded on a blockchain!");
          })
          .catch((error) => {
            // Handle errors if the transaction fails
            setIsLoading(false);
            console.error("Error uploading to blockchain:", error);
            alert("Transaction failed. Please check the console for details.");
          });
        
       
        // alert("Successfully Uploaded on a blockchain !");
        setFileName('');
        setFile(null);



      } catch (error) {
        alert("IPFS Problem Occour Please Try Again Later !");
        console.log(error);
      }

    }

  }

  
  const handleRemove = () =>{
    setFile(null);
    setFileName('');
    
  }


  return (
   
    <div className='h-[50vh] '>
      <div className='mt-5 h-100 d-flex  justify-content-center flex-column align-items-center container white-glassmorphism gap-4'>


      {account ? (
          <>
            <label
          htmlFor='drop'
          className='container  w-full h-3/4 lg:w-1/2 lg:h-3/4 border-3 d-flex justify-content-center align-items-center border-gray-500 border-dashed blue-glassmorphism d-flex flex-column hover:bg-transparent'
        >
          {file ? (
            <div className='d-flex overflow-hidden flex-column justify-content-center align-items-center'>

              <div  className='' style={{width: '200px', height: "200px"}}>

               

                <img
                  src={URL.createObjectURL(file)}
                  className='border-3 rounded-4  img-fluid  object-cover'
                  style={{ width: '200px', height: "200px", marginBottom: '20px' }}
                  alt=''
                />
                 
                  <CancelRounded onClick={handleRemove} className='fw-bold cursor-pointer  position-absolute  top-5 right-[20%] lg:top-[15%]  lg:right-[35%] text-danger bg-light fs-1   rounded-full' />
          
              </div>

              <span className='fw-bold text-light hidden lg:block '>{fileName}</span>
            </div>
          ) : (
            <>
              <img
                src='https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-File.png'
                
                alt=''
                className='w-[100px] lg:w-[200px]'
              />
              <span className='fw-bold text-light '>
                {fileName ? fileName : 'Drag & Drop Files Here'}
              </span>
            </>
          )}
          <input
            type='file'
            name=''
            className='d-none'
            id='drop'
            onChange={handleFileChange}
            disabled={!account}
          />
        </label>

        <div className='w-100 d-flex justify-content-center fw-bold'>
       
          <button
      className='btn text-light shadow fw-bold  rounded-5 w-50 border-0'
      style={{ backgroundColor: '#2952e3' }}
      onClick={handleSubmit}
      disabled={!file || isLoading} // Disable the button when loading
    >
      {isLoading ?  <CircularProgress className='text-light ' size={25}/> : 'Upload'}
    </button>
        </div>
          </>
      ):(
        <div>
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://www.royalsociety.io/images/misc/mm_twitch_no_matte.gif" className='img-fluid w-[200px] lg:w-[300px]' alt="" /> 
          <span className='fs-2   fw-bold text-light '>Connect Metamask</span>

          <span className='text-light '>To engage with blockchain .</span>
          </div>

          
          <a href="https://metamask.app.link/dapp/rabbitcloud.netlify.app/" className="d-lg-none d-block btn white-glassmorphism text-light  font-monospace mt-4">Click For Mobile</a>
        </div>
      )}



      
      </div>
    </div>
  );
}

export default Drop;
