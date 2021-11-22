import React from 'react'
import {ReactComponent as Menu} from "../assets/images/menu.svg"
import {Link, useLocation} from "react-router-dom"

function Header(props) {

    const navigate = useLocation()

    let breadcrumbs = navigate.pathname.split(",")



   const handleMenu = () => {
    props.setopenMobileMenu(!props.openMobileMenu)
   }

    return (
        <div className="inside-header">
            {breadcrumbs.map((index,key) => 
                {
                    if (index.length > 0) {
                        console.log(index)
                        if (index == "/home/transactions") {
                            return (
                                <Link key={key} to={`${index}`}>Transactions</Link>
                            )    
                        } else if (index == "/home/cards"){
                            return (
                                <div><Link key={key} to="/home/cards">Cards</Link></div>
                            )
                        } else {
                            return <div><Link key={key} to="/home/cards">Cards</Link> / <Link key={key} to={`${index}`}>Details</Link></div>
                        }
                    }
                    
                }
            )}
            <div className="mobile-menu-icon">
                <Menu onClick={() => handleMenu()} />
            </div>
        </div>
    )
}

export default Header
