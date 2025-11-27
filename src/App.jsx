import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Users from './components/users/Users'

function App() {
//  const [data , setData] = useState(null)

  // useEffect(() => {
  //   fetch("https://68a86bc3bb882f2aa6de805f.mockapi.io/ap/v1/users")
  //   .then(res => res.json())
  //   .then(res => {
  //     setData(res)
      
  //   })
  //   .catch(err => console.log(err));
  // }, [])

  return (
    <>
   <Header/>
   <main>
   {/* <Sidebar/>  */}
   <div className="container">
    <Users/>
   </div>
   </main>
   
    </>
  )
}

export default App
