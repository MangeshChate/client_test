import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import axios from 'axios';
function Display({ contract, account }) {

  const [data, setData] = useState([]);
  const [displayText, setDisplayText] = useState(null)
  const [otherAddress, setOtherAddress] = useState(null);


  const getData = async () => {
    try {

    let dataArray
      if(otherAddress){
       dataArray = await contract.display(otherAddress);
      }else{
       dataArray = await contract.display(address);
      }

      if (dataArray.length == 0) {
        setDisplayText("No uploaded files found !");

      } else {

        setData(dataArray)
      }

    } catch (error) {
      alert(error);
    }

  }


  useEffect(() => {

    try {
      
      const fetchData = async () => {
  
        const dataArray = await contract.display(account);
  
        if (dataArray.length === 0) {
          setDisplayText("No uploaded files found!");
        } else {
          setData(dataArray);
        }
  
      }
  
      fetchData(); // Call the function to fetch data when the component mounts
    } catch (error) {
      alert("Metamask is not Detected");
    }
  }, [contract, account]);


  return (
    <div >
      <div className='container  mt-5   p-2 p-lg-5 d-flex flex-column '>

      {account ? (
        <>
        <div className="row row-cols-2 mb-4 d-flex justify-content-center  align-items-center p-2">
          <span className=' col-lg-6 col-md-6 col-sm-12 col-12'>
            <input type="text" name="" id="" placeholder={" Enter Address "} onChange={(e) => setOtherAddress(e.target.value)} className='form-control  font-monospace rounded-5 bg-light bg-opacity-75 fw-bold '/>
          </span>
          <span className='col-lg-6 col-md-6 col-sm-12 col-12 pt-3 pt-lg-0  pt-sm-0 pt-md-0 '>

            <button className="btn lg:w-[25%] input-glow text-light w-full white-glassmorphism fw-bold rounded-5 " onClick={getData}>Get Data</button>
          </span>
        </div>

        {displayText ? (


          <h1 className='fs-3 font-mono fw-bold text-light mt-4'>{displayText}</h1>
        ) : (

          <h1 className='fs-3 font-mono fw-bold p-3 p-lg-0 text-light mt-4'>Uploded Files
          </h1>
        )}
        <div className="container mt-5">
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 ">
            {/* Card 1 */}
            {
          [...data].reverse().map((item) => (
            <div className='col mb-4' key={item}>
              <div className="card blue-glassmorphism">
                <a href={item} className="card-body white-glassmorphism">
                  <img src={item} alt="" className='card-glow object-cover object-center' style={{ width: "100%", height: "356px" }} />
                </a>
              </div>
            </div>
          ))
          
          
            }




            {/* Repeat this structure for additional cards */}
          </div>
        </div>

        </>
      ):(
        <>
          <div></div>
        </>
      )}  
        
      </div>
    </div>
  )
}

export default Display
