import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import Login from './pages/login/Login'; // ✅ Login page (keyin yaratamiz)
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <main>
        {/* <Sidebar/> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
