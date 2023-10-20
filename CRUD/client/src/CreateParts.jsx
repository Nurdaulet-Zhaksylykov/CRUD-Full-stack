import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function CreateParts() {
    const [name_of_part, setName_of_part] = useState()
    const [carname, setCarname] = useState()
    const [model, setModel] = useState()
    const [year, setYear] = useState()
    const navigate = useNavigate()
    const [image, setImage] = useState(null);


    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createParts",{name_of_part,carname,model,year,image})
        .then(result => {
            console.log(result)
            navigate('/')    
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={Submit}>
                <h2>Add Parts</h2>
                <div className='mb-2'>
                    <label htmlFor="">Image</label>
                         <input
                            type="file"
                            className="form-control-file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Name of part</label>
                    <input type="text" className="form-control" placeholder=''
                    onChange={(e) => setName_of_part(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">CarName</label>
                    <input type="text" className="form-control" placeholder=''
                      onChange={(e) => setCarname(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Model</label>
                    <input type="text" className="form-control" placeholder=''
                      onChange={(e) => setModel(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Year</label>
                    <input type="text" className="form-control" placeholder=''
                      onChange={(e) => setYear(e.target.value)}/>
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateParts