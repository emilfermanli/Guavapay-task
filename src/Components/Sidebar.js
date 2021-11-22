import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../assets/images/logo.svg"
import {ReactComponent as Cross} from "../assets/images/cross.svg"

function Sidebar(props) {


    const handleMenu = () => {
        props.setopenMobileMenu(false)
    }

    return (
        <div id="sidebar-box">
            <div className="logo-side">
                <span></span>
                <img src={Logo} alt="logo" />
                <Cross className="mobile-menu-cross" fill="white" onClick={() => handleMenu()} />
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/home/cards">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/home/transactions">
                        Transactions
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
