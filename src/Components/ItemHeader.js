import {ReactComponent as CardIcon} from "../assets/images/card.svg"


const ItemHeader = (props) => {

    

    return(
        <div className="item-header">
            <div className="information-side">
                <div className="icon-box">
                    <CardIcon />
                </div>
                <div className="adress">
                    <h5 className="location"><span>At </span>{props.itemDetail.merchantInfo} {props.itemDetail.currency}</h5>
                    <h5>Pay</h5>
                </div>
            </div>
            <div className="amount">
                <h4>{props.itemDetail.amount} {props.itemDetail.currency}</h4>
            </div>
        </div>
    )
}


export default ItemHeader