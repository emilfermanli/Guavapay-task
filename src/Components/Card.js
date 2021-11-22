import React,{useState,useRef,useEffect} from 'react'
import {Link} from "react-router-dom"
import {ReactComponent as RealCard} from "../assets/images/realCard.svg"
import {ReactComponent as Eye} from "../assets/images/eye.svg"
import {useSelector} from "react-redux"
import {ReactComponent as Search} from "../assets/images/search.svg"
import { ToastContainer, toast } from 'react-toastify';


const ItemHeader = (props) => {

    let cardLastFourChar = props.cards.maskedCardNumber.substr(props.cards.maskedCardNumber.length - 4)

    return(
        <div className="item-header card-item-header">
            <Eye className="eye-icon" />
            <div className="information-side">
                <div>
                    <RealCard className="card-header" />
                </div>
                <div className="adress">
                    <h5 className="location">Card ending - {cardLastFourChar}</h5>
                    <h5>{props.cards.cardAccount}</h5>
                </div>
            </div>
         
        </div>
    )
}

function Card() {
    const [filteredCards,setFilteredCards] = useState([])
    const [defaultData,setDefaultData] = useState([])
    const selectInp = useRef()
    const [pagination,setPagination] = useState([0,10])
    const [selectedUser,setSelectedUser] = useState([])
    const [cardOwner,setCardOwner] = useState({
        fullName: "",
        cards: [],
        cardAccount: [],
        currency:[],
        status: []
    })

    const cards = useSelector(state => state.usersReducer)

   
    const handleError = () => toast.error("Kart mövcud deyil!");
    

    const handleSelect = (e) => {
        let name = e.target.name
        let val = e.target.value

        setSelectedUser({
            ...selectedUser,
            [name]:val
        })
        
        let accNames = new Set()
        
            cards.forEach((index,key) => {
                
                if (name === "fullName" && index.fullName === val) {
                    for (const key in index.cards) {
                       
                       
                        accNames.add(index.cards[key].cardAccount)
                      
                    }

                    
                    setCardOwner({
                        fullName: index.fullName,
                        cards: [...accNames],
                        cardAccount: [],
                        currency:[],
                        status: []
                    })
                    
                  
                } else if (name === "cardAccount" && index.cards[key].cardAccount === val){
                   let x = index.cards.filter(item => item.cardAccount === val)
                   if (x.length !== 0) {
                        setCardOwner({
                            ...cardOwner,
                            fullName: index.fullName,
                            cardAccount: [x[0].cardAccount],
                            currency: [x[0].currency],
                            status: [x[0].status]
                        })
                        
                    }
                } 
            })
            
            
    }  
    

 
   
      
  
    useEffect(() => {
        cards.forEach(index => {
            setDefaultData((state) => [...state,...index.cards])
        })
    }, [cards])

   

    const handleSubmit = (e) => {
        e.preventDefault()
        let x = []
        cards.forEach((index) => {
            x.push(...index.cards)
        })

        
  
        
         let y = x.filter(index => {
             if(
                 index.cardAccount == selectInp.current.value &&
                 cardOwner.fullName == selectedUser.fullName &&
                 index.currency == selectedUser.currency &&
                 index.status == selectedUser.status) {
                    return x
                 }
         })


       
         if (y.length > 0) {
             setFilteredCards(y)
             setDefaultData([])
         } else {
             setFilteredCards([])
             handleError()
         }   
    }



    const handlePlus = () => {
        
        
        if (filteredCards.length  > pagination[1] || defaultData.length > pagination[1]) {
           
            let y = pagination[1] + 10
            let x = pagination[0] + 10

            setPagination([x,y]) 
        }
    }

    const handleMinus = () => {

        if (pagination[0] !== 0) {
           
            let y = pagination[1] - 10
            let x = pagination[0] - 10

            setPagination([x,y]) 
        }

    }

    


    return (
        <div>
         
           <div >
               <form className="filter-box" onSubmit={(e) => handleSubmit(e)}>
                
               
                <label className="filter-inp">
                    Select user
                <select 
                defaultValue="empty"
                className="input-style"
                name="fullName"
                onChange={(e) => handleSelect(e)}
                >
                <option  disabled value="empty">
                    Users
                </option>
                    {cards.map((index,key) => (
                        <option key={key} value={index.fullName}>
                            {index.fullName}
                        </option>
                    ))}
                </select>
                </label>
                <label className="filter-inp">
                    Card account
                <select 
                ref={selectInp} 
                name="cardAccount"
                defaultValue="empty" 
                onChange={(e) => handleSelect(e)}
                className="input-style">
                        <option disabled value="empty">
                            Cards
                        </option>
                    {cardOwner.cards.map((index,key) => (
                        <option key={key} value={index.cardAccount}>
                            {index}
                        </option>
                    ))}
                </select>
                </label>
               
                <label className="filter-inp">
                    Select currency
                        <select defaultValue="empty"  onChange={(e) => handleSelect(e)} name="currency" className="input-style">
                           <option  disabled value="empty">
                                Currency
                           </option>
                            <option value="AZN">
                                AZN
                            </option>
                            <option value="USD">
                                USD
                            </option>
                        </select>
                </label>
                <label className="filter-inp">
                    Select status
                <select defaultValue="empty" onChange={(e) => handleSelect(e)} name="status" className="input-style">
                    <option  disabled value="empty">
                        Status
                    </option>
                    <option value="Active">
                        Active
                    </option>
                    <option value="Blocked">
                        Blocked
                    </option>
                </select>
                </label>
                        
                <label className="home-input-style btn-box">  
                    <span style={{color:"white"}}>submit</span>
                    <button className="btn src-btn">
                        <Search />
                    </button>
                </label>
                </form>
                
            </div>
            <div id="Cards">
                
                        {
                          filteredCards.length > 0 ? filteredCards.slice(pagination[0],pagination[1]).map((index,key) => (
                            <div key={key} className="cards"> 
                                <Link  to={`/home/cards/${index.cardID}`}>
                                    <ItemHeader cards={index} />
                                </Link>
                            </div>
                          )) : defaultData.slice(pagination[0],pagination[1]).map((index,key) => (
                            <div key={key} className="cards"> 
                                <Link  to={`/home/cards/${index.cardID}`}>
                                    <ItemHeader cards={index} />
                                </Link>
                            </div>
                          ))
                        }
                         <div className="pagination">
                   
                            <button onClick={() => handleMinus()}>Prev</button>
                            <button onClick={() => handlePlus()}>Next</button>
                        </div>
               
            </div>
            
            <ToastContainer
            position="bottom-right"
            autoClose={2500}
            />
        </div>
    )
}

export default Card
