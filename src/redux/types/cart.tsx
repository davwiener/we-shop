import { PriceLevel } from './../types/search-types'

export interface CartState {
    buyingAuctions: Record<string, BuyingAuction>
}
export interface BuyingAuction {
    priceLevels: PriceLevel[],
    name: string,
    image: string,
    quantity: number,
    selectedPrice: number,
    auctionId: string
}