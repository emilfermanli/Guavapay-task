import React,{useState,useRef,useEffect} from 'react'
import Collapsible from 'react-collapsible';
import {ReactComponent as DetailCardIcon} from "../assets/images/detail-card.svg"
import {ReactComponent as Contact} from "../assets/images/contactless.svg"
import {ReactComponent as Question} from "../assets/images/question.svg"
import {ReactComponent as Search} from "../assets/images/search.svg"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import ItemHeader from "./ItemHeader"
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    const inpRef = useRef()
    const [filteredTr,setFilteredTr] = useState([])
    const [defaultData,setDefaultData] = useState([])
    const [selectedUser,setSelectedUser] = useState([])
    const cards = useSelector(state => state.usersReducer)
    const [pagination,setPagination] = useState([0,10])
    const [cardOwner,setCardOwner] = useState({
        fullName: "",
        cards: [],
        cardAccount: [],
        currency:[],
        status: []
    })
    

    useEffect(() => {
        
        cards.map(index => {
            index.cards.map(item => {
                 setDefaultData(state => [...state,...item.transaction])
                
            })
            
        }) 
        return () => {
            setDefaultData([])
        }
        
    }, [])

    const handleError = () => toast.error("Köçürmə mövcud deyil!");

    const handleChange = (e) => {
        let name= e.target.name
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
                     })
                     
                 }
             } 
            

        })
        
        


    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        
        let x = []

       
      
        cards[0].cards.map(index => {
         index.transaction.map(item => {
             
              
               
           
                if (selectedUser.currency == item.currency &&
                    parseInt(selectedUser.amount) >= parseInt(item.amount)
                    && selectedUser.from < selectedUser.to &&
                    selectedUser.to >= item.transactionDate && 
                    selectedUser.from <= item.transactionDate && 
                    index.cardID == item.cardID  &&
                    index.maskedCardNumber == item.maskedCardNumber  &&
                    index.cardAccount == inpRef.current.value
                    ) {
          
                    x.push({...item,maskedCardNumber:index.maskedCardNumber })
                    console.log(index)
                   
                } 
                
            })
           
        })
        
         console.log(x)
        
        if (x.length > 0) {
            setFilteredTr(x)
            setPagination([0,10])
            setDefaultData([])
        } else {
            setFilteredTr([])
            handleError()
        }   
        

     
    } 

    const handlePlus = () => {
        
       
        
        if (filteredTr.length > pagination[1] || defaultData.length > pagination[1]) {
           
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
        <div id="home">
            <div className="filter-box">
                <form className="transaction-page" onSubmit={(e) => handleSubmit(e)}>
                <label className="home-input-style">
                 User
                <select defaultValue="empty" onChange={(e) => handleChange(e)} name="fullName" className="input-style">
                    <option   disabled value="empty">
                        Users
                    </option>
                    {
                        cards.map((index,key) => (
                            <option value={index.fullName} key={key}>
                                {index.fullName}
                               
                            </option>
                        ))
                    }
                </select>
                </label>
                <label className="home-input-style">
                     Card
                    <select ref={inpRef} defaultValue="empty" onChange={(e) => handleChange(e)} name="cardAccount" className="input-style">
                        <option disabled value="empty">
                            Cards
                        </option>
                        {
                        cardOwner.cards.map((index,key) => (
                        <option key={key} value={`${index}`}>
                            {index}
                          
                        </option>
                    ))}
                    </select>
                </label>
                <label className="home-input-style">
                     Currency
                        <select defaultValue="empty"  onChange={(e) => handleChange(e)} name="currency" className="input-style">
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
                <label className="home-input-style" >
                     Amount
                <input placeholder="amount" onChange={(e) => handleChange(e)} type="number"  name="amount" className="input-style" />
                    
                
                </label>
                <label onChange={(e) => handleChange(e)} name="from" className="home-input-style">
                    From
                     <input type="date" name="from" className="input-style" />
                </label>
               <label onChange={(e) => handleChange(e)} name="to" className="home-input-style">  
                    To
                    <input type="date" name="to" className="input-style" />
                </label>
                <label className="home-input-style btn-box">  
                    <span style={{color:"white"}}>submit</span>
                    <button className="btn src-btn">
                        <Search />
                    </button>
                </label>
                   
                </form>
            </div>
            
                {
                  filteredTr.length > 0 ?  filteredTr.slice(pagination[0],pagination[1]).map((index,key) => (
                        <div key={key} className="transactions-item">
                      <Collapsible  trigger={<ItemHeader itemDetail={index} />}>
                        <div className="item-body">
                          
                            <div className="item-details-header">
                                <span>Details</span>
                            </div>
                            <div className="card-details">
                                <div className="detail-side">
                                <h5>Transaction details</h5>
                                <ul>
                                    <li>
                                        <span>When</span>
                                        <span>{index.transactionDate}</span>
                                    </li>
                                    <li>
                                        <span>Where</span>
                                        <span>{index.merchantInfo}</span>
                                    </li>
                                    <li>
                                        <span>Which card</span>
                                        <Link to={`/home/cards/${index.cardID}`}>
                                            <span className="crd-icon"><DetailCardIcon className="detail-card" />- {index.maskedCardNumber.substr(index.maskedCardNumber.length - 4)}</span>
                                        </Link>
                                        
                                    </li>
                                    <li>
                                        <span>Authorised via</span>
                                        <span className="crd-icon"><Contact /> Contactles</span>
                                    </li>
                                    <li>Transaction no {index.transactionID}</li>
                                </ul>
                                </div>
                                <div className="note-side">
                                    <h4><Question /> Note</h4>
                                    <textarea placeholder="Add a few notes to help you later">
    
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </Collapsible>
                    </div>
                    )) : defaultData.slice(pagination[0],pagination[1]).map((index,key) => (
                        <div key={key} className="transactions-item">
                      <Collapsible  trigger={<ItemHeader itemDetail={index} />}>
                        <div className="item-body">
                          
                            <div className="item-details-header">
                                <span>Details</span>
                            </div>
                            <div className="card-details">
                                <div className="detail-side">
                                <h5>Transaction details</h5>
                                <ul>
                                    <li>
                                        <span>When</span>
                                        <span>{index.transactionDate}</span>
                                    </li>
                                    <li>
                                        <span>Where</span>
                                        <span>{index.merchantInfo}</span>
                                    </li>
                                    <li>
                                        <span>Which card</span>
                                        <Link to={`/home/cards/${index.cardID}`}>
                                            <span className="crd-icon"><DetailCardIcon className="detail-card" />- {index.maskedCardNumber.substr(index.maskedCardNumber.length - 4)}</span>
                                        </Link>
                                        
                                    </li>
                                    <li>
                                        <span>Authorised via</span>
                                        <span className="crd-icon"><Contact /> Contactles</span>
                                    </li>
                                    <li>Transaction no {index.transactionID}</li>
                                </ul>
                                </div>
                                <div className="note-side">
                                    <h4><Question /> Note</h4>
                                    <textarea placeholder="Add a few notes to help you later">
    
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </Collapsible>
                    </div>
                    ))
                }
               <div className="pagination">
                    
                    <button onClick={() => handleMinus()} >Prev</button>
                    <button onClick={() => handlePlus()}>Next</button>
               </div> 
                
               
               <ToastContainer
            position="bottom-right"
            autoClose={2500}
            />
            
        </div>
    )
}



export default Home
