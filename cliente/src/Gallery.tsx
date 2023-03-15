import React from 'react'
import Gamelist from './Gamelist';

interface FormInPut {
  name: string;
  
}

export const Gallery = (props:FormInPut ) => {
const gameName = props.name
  return (
    <div>
      <h1> {gameName}</h1>


    <Gamelist />

    </div>
  )
}

export default Gallery;
