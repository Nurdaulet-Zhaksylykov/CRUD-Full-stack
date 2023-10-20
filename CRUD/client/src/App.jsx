import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Parts from './Parts'
import CreateParts from './CreateParts'
import UpdateParts from './UpdateParts'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Parts/>}></Route>
        <Route path='/create' element={<CreateParts/>}></Route>
        <Route path='/update/:id' element={<UpdateParts/>}></Route>

      </Routes>
      </BrowserRouter>    
    </div>
  )
}

export default App
