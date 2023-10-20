import React ,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
function UpdateParts() {
   const {id} = useParams()
   const [name_of_part, setName_of_part] = useState()
   const [carname, setCarname] = useState()
   const [model, setModel] = useState()
   const [year, setYear] = useState()
   const navigate = useNavigate()

   useEffect(() => {
    axios.get('http://localhost:3001/getParts/' + id)
    .then(result => {console.log(result)
      setName_of_part(result.data.name_of_part)
      setCarname(result.data.carname)
      setModel(result.data.model)
      setYear(result.data.year)    
    })
    .catch(err => console.log(err))
},[])

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateParts/" + id,{name_of_part,carname,model,year})
        .then(result => {
            console.log(result)
            navigate('/')    
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
            <h2>Update Parts</h2>
            <div className='mb-2'>
                <label htmlFor="">Name of part</label>
                <input type="text" className="form-control" placeholder=''
                value={name_of_part}
                onChange={(e) => setName_of_part(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">CarName</label>
                <input type="text" className="form-control" placeholder=''
                  value={carname}
                  onChange={(e) => setCarname(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Model</label>
                <input type="text" className="form-control" placeholder=''
                  value={model}
                  onChange={(e) => setModel(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Year</label>
                <input type="text" className="form-control" placeholder=''
                value={year}
                onChange={(e) => setYear(e.target.value)}/>
            </div>
            <button className='btn btn-success'>Update</button>
        </form>
    </div>
</div>
  )
}

export default UpdateParts