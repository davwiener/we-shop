import React from "react"
import { BuyingAuction, PriceLevel } from "../../redux/types/search-types"
import CartAuction from "./components/CartAuction/CartAuction"
import PlusMinusButttons from "./../../components/CommonComponents/PlusMinusButtons/PlusMinusButtons"
import "./Cart.scss"
import { Button } from "@material-ui/core"
const priceLevels1: PriceLevel[] = [{
    price: 100,
    subscribers: 20,
    wantedQuantity: 120
}, {
    price: 90,
    subscribers: 60,
    wantedQuantity: 220
}, {
    price: 80,
    subscribers: 90,
    wantedQuantity: 520
}]
const priceLevels2: PriceLevel[] = [{
    price: 100,
    subscribers: 20,
    wantedQuantity: 120
}, {
    price: 90,
    subscribers: 60,
    wantedQuantity: 220
}, {
    price: 80,
    subscribers: 90,
    wantedQuantity: 520
}]
const auctions: BuyingAuction[] = [{
    name: 'new auction1',
    image: '',
    priceLevels: priceLevels1,
    quantity: 1,
    selectedPrice: priceLevels1[0].price
},
{
    name: 'new auction2',
    image: '',
    priceLevels: priceLevels2,
    quantity: 1,
    selectedPrice: priceLevels2[0].price
}]

const Cart = () => {
    const checkout = () => {
        console.log('checkout');
    }
    return (
        <div>
            <div className="cart-text">
                In each acution chose your willing start price for the product.<br />
                Note that registring to the highest price will register you to all prices.<br />
                meening as more people buy this product you will pay lesse!<br />
            </div>
            <div className="cart-acutions">
                {
                    auctions.map((auction: BuyingAuction) => {
                        return (
                            <div className="buying-auction">
                                <CartAuction auction={auction} setPrice={((id: number) => auction.selectedPrice = auction.priceLevels[id].price)} />
                                <div> {`Qty: ${auction.quantity}`} </div>
                                <PlusMinusButttons increase={() => auction.quantity++} decrease={() => auction.quantity--} />
                                <div className="payment-container">
                                    <div className="items-container">
                                        <div>Total Items</div>
                                        <div>{auction.quantity}</div>
                                    </div>
                                    <div className="price-container">
                                        <div>Total Payment</div>
                                        <div>{auction.quantity * auction.selectedPrice}</div>
                                    </div>
                                    <Button onClick={checkout} color="primary">
                                        Checkout
                                     </Button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div >)
}
export default Cart;