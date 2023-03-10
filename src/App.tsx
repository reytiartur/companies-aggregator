import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './screens/MainScreen';

function App() {

  return (
    <div className="App min-h-screen">
      <Router>
        <Routes>
            {/* <Route exact path='/' element={<Navigation />}> */}
              <Route index element={<MainScreen />} /> 
              {/* <Route path='/signup' element={<SignUp />} /> */}

            {/* </Route> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
