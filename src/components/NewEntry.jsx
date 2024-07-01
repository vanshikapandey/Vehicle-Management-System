import React, { useState } from 'react'
import {db} from "../firebase"
import EntryImage from "../assets/EntryImage.jpg"
import { useNavigate } from "react-router-dom";
import validator from 'validator';

import {
    addDoc,
    collection,
    
  } from "firebase/firestore";

const New = ({inputs}) =>{
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleAdd = async(e)=>{
        e.preventDefault();
        const docRef = await addDoc(collection(db, "users"), {
           ...data,
      
          });
          console.log("Document written with ID: ", docRef.id);
          alert("New Entry has been done successfully")
          navigate(-1);
        
    }

    const handleInput = async(e)=>{
        setError(false)
        const id = e.target.id;
        const value = e.target.value;
        const targetType = e.target.type;

       if(id === 'mobileno'){
        if(!validator.isMobilePhone(value)){
            setError(true);
            return;
        }
       }
        setData({...data, [id]:value});
       
    }
    return (
        <div className='blue-bg'>
            <h1>Input details of the new user</h1>
        <div className='newEntry'>
           
            <div className='col-md-5'>
              <form onSubmit={handleAdd}>
                        {inputs.map((inp)=>(
                            <div className='form-input'>
                            <label>{inp.label}</label>
                            <br/>
                            <input id={inp.id}
                            type={inp.type}
                            placeholder={inp.placeholder}
                            onChange={handleInput}
                            required/>
                            </div>
                        ))}
                        {error ? <div><span>Enter valid mobile number</span><button type="submit" disable>Add</button></div> : <div><button type="submit">Add</button></div>}
                       
                    </form>
                    </div>
                    <img className='col-md-5' src={EntryImage} alt=""/>
        </div>
        </div>
    );
}

export default New;