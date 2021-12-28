import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux' 
import './App.css';
import Dashboard from './components/Dashboard';
import Register from './components/Register'
import Login from './components/Login'



function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard/>} />
            
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
