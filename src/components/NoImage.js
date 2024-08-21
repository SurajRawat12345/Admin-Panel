import React from 'react';
import { VscGraph } from "react-icons/vsc";

const NoImage = () => {
  return (
    <div className='text-center mt-5'>
      <div> <VscGraph/> </div>
      <div> No Graph data available </div>
    </div>
  )
}

export default NoImage;
