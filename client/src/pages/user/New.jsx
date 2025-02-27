import React, { useState } from 'react'

function Child(){

    const [inputval,setinputval]=useState('')

    const handlechange=(e)=>{
        e.preventDefault();
        setinputval(e);
    }
    return(
        <div>
            <input value={inputval} onChange={()=>handlechange(e)}></input>
        </div>
    )
}

function New() {

    const [item,setItem]=useState('Hello comp')
  return (


    <div>
      <Child/>
      
    </div>
  )
}



export default New
