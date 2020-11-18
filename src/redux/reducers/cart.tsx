import { AnyAction } from "redux";
import { BuyingAuction, CartState } from "../types/cart";
import * as actionTypes from "../action-types";

export const INITIAL_CART_STATE: CartState = {
    buyingAuctions: {}
}

export function cartReducer(
    state: CartState = INITIAL_CART_STATE,
    action: AnyAction
) {
    switch (action.type) {
        case actionTypes.ADD_AUCTION_TO_CART: {
            const newCartAuctions: Record<string, BuyingAuction> = { ...state.buyingAuctions };
            newCartAuctions[action.payload.auctionId] = action.payload
            return {
                ...state,
                buyingAuctions: newCartAuctions
            }
        }
        case actionTypes.REMOVE_AUCTION_FROM_CART: {
            // const newCartAuctions = {...state.buyingAuctions
            // delete newCartAuctions[action.payload.auctionId]
            // return {
            //     state: newCartAuctions
            // }
            return state
        }
        case actionTypes.CHANGE_PRICE_LEVEL: {
            const newAuction = { ...state.buyingAuctions[action.payload.auctionId] }
            newAuction.selectedPrice = newAuction.priceLevels[action.payload.priceLevelIdx].price
            const newBuyingAuctions = { ...state.buyingAuctions }
            newBuyingAuctions[action.payload.auctionId] = newAuction
            return {
                ...state,
                buyingAuctions: newBuyingAuctions
            }
        }
        case actionTypes.UPDATE_QUANTITY: {
            debugger;
            const newAuction = { ...state.buyingAuctions[action.payload.auctionId] }
            newAuction.quantity = newAuction.quantity + (action.payload.increase ? 1 : -1)
            newAuction.quantity = Math.max(1, newAuction.quantity)
            const newBuyingAuctions = { ...state.buyingAuctions }
            newBuyingAuctions[action.payload.auctionId] = newAuction
            return {
                ...state,
                buyingAuctions: newBuyingAuctions
            }
        }
        default: return state;
    }
}