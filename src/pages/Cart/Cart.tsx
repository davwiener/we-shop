import React from "react"
import CartAuction from "./components/CartAuction/CartAuction"
import PlusMinusButttons from "./../../components/CommonComponents/PlusMinusButtons/PlusMinusButtons"
import "./Cart.scss"
import Button from "@material-ui/core/Button"
import { BuyingAuction } from "../../redux/types/cart"
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../redux/actions/cart"
import { WeShopState } from "../../redux/store"

const Cart = () => {
    const dispatch = useDispatch();
    const checkout = () => {
        console.log('checkout');
    }
    const auctions = useSelector((state: WeShopState) => {
        return Object.keys(state.cart.buyingAuctions).map((key: string) => state.cart.buyingAuctions[key]);
    });
    return (
        <div>
            <div className="cart-text">
                In each acution chose your willing start price for the product.<br />
                Note that registring to the highest price will register you to all prices.<br />
                meening as more people buy this product you will pay lesse!<br />
            </div>
            <div className="cart">
                <div className="cart-acutions">
                    {
                        auctions.map((auction: BuyingAuction) => {
                            return (
                                <div className="buying-auction">
                                    <CartAuction auction={auction} setPrice={((idx: number) => dispatch(cartActions.changePriceLevel(idx, auction.auctionId)))} />
                                    <div> {`Qty: ${auction.quantity}`} </div>
                                    <PlusMinusButttons increase={() => dispatch(cartActions.updteQuantity(true, auction.auctionId))}
                                        decrease={() => {
                                            if (auction.quantity === 1) {
                                                dispatch(cartActions.removeAuctionFromCart(auction.auctionId))
                                            } else {
                                                dispatch(cartActions.updteQuantity(false, auction.auctionId))
                                            }
                                        }
                                        } />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="payment-container">
                    <div className="items-container">
                        <div>Total Items</div>
                        <div>{auctions.reduce((total, auction) => total + auction.quantity, 0)}</div>
                    </div>
                    <div className="price-container">
                        <div>Total Payment</div>
                        <div>{auctions.reduce((total, auction) => total + auction.selectedPrice * auction.quantity, 0).toFixed(2)}</div>
                    </div>
                    <Button onClick={checkout} color="primary" variant="contained">
                        Checkout
                                     </Button>
                </div>
            </div>
        </div >)
}
export default Cart;