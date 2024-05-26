import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Group from './components/Group'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App=()=><BrowserRouter>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/group' element={<Group/>}/>  
</Routes>
</BrowserRouter>

export default App