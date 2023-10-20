import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Parts() {
    const [parts,setParts] = useState([])
    const [partImages, setPartImages] = useState([]);
    
    
    useEffect(() => {
        axios.get('http://localhost:3001')
          .then(result => {
            const partsData = result.data;
            const imageUrls = partsData.map(part => part.image_url);
            setParts(partsData);
            setPartImages(imageUrls);
          })
          .catch(err => console.log(err))
      }, []);
      
    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => setParts(result.data))
        .catch(err => console.log(err))
    })

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteParts/' + id)
        .then(res => {console.log(res)
        window.location.reload()
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <Link to="/create" className='btn btn-success'>Add Parts</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Image of Part</th>
                        <th>Name of Part</th>
                        <th>CarName</th>
                        <th>Model</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        parts.map((part,index) =>{
                            return <tr key= {part._id}>
                                <td>
                                    <img
                                         src={partImages[index]}
                                         alt={part.name_of_part}
                                         style={{ maxWidth: '100px' }}/>
                                </td>
                                <td>{part.name_of_part}</td>
                                <td>{part.carname}</td>
                                <td>{part.model}</td>
                                <td>{part.year}</td>
                                <td>
                                <Link to={`/update/${part._id}`} className='btn btn-success'>Edit</Link>
                                    <button className='btn btn-danger'
                                    onClick={(e) => handleDelete(part._id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Parts