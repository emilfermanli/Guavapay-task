import React,{useState} from "react"
import './App.scss';
import {Routes,Route} from "react-router-dom"
import Login from "./Components/Login"
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header"
import Home from "./Components/Home";
import Card from "./Components/Card"
import UserCard from "./Components/UserCard"
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [openMobileMenu,setopenMobileMenu] = useState(false)
  


  return (
    <div className="App">
     <div style={openMobileMenu ? {left:"0%"} : {left:"-100%"}} id="sidebar">
      <Sidebar setopenMobileMenu={setopenMobileMenu} />
     </div>
     <div id="sidebar-body">
       <div id="header">
          <Header openMobileMenu={openMobileMenu} setopenMobileMenu={setopenMobileMenu} />
       </div>
       <div className="route-wrapper">
        <Routes>
           <Route exact path="/" element={<Login />} />
           <Route  path="/home/transactions" element={<Home />} />
           <Route  path="/home/cards" element={<Card />} />
           <Route exact path="/home/cards/:id" element={<UserCard />} />
        </Routes>
       </div>
     </div>
    </div>
  );
}

export default App;
