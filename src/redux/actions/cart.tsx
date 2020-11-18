import * as actionTypes from "../action-types";
import { BuyingAuction } from "../types/cart";
export const addAuctionToCart = (buyingAuction: BuyingAuction) => ({
    type: actionTypes.ADD_AUCTION_TO_CART,
    payload: buyingAuction,
});

export const removeAuctionFromCart = (auctionId: number) => ({
    type: actionTypes.REMOVE_AUCTION_FROM_CART,
    payload: auctionId
});
export const changePriceLevel = (priceLevelIdx: number, auctionId: string) => ({
    type: actionTypes.CHANGE_PRICE_LEVEL,
    payload: { priceLevelIdx, auctionId }
});
export const updteQuantity = (increase: boolean, auctionId: string) => ({
    type: actionTypes.UPDATE_QUANTITY,
    payload: { increase, auctionId }
});