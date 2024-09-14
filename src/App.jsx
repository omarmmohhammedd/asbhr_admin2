import { BrowserRouter,Route,Routes,useNavigate } from 'react-router-dom';
import Login from './Login';
import Main from './Main';


// export const serverRoute = 'http://localhost:8080'
// export const serverRoute = 'https://api.sds-pnu.net'
// export const serverRoute = 'https://abshr-server.onrender.com'
export const serverRoute = "https://abshrserver2.up.railway.app"
export const token = localStorage.getItem('token')
function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route element={<Main/>} path='/'/>
            <Route element={<Login/>} path='/login'/>
          </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
