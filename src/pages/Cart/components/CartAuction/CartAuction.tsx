import React from "react"
import { PriceLevel } from "../../../../redux/types/search-types";
import { Checkbox, FormControl, FormGroup, FormHelperText } from "@material-ui/core";
import LinearProgressWithLabel from "../../../../components/CommonComponents/LinearProgressWithLabel/LinearProgressWithLabel"
import "./CartAuction.scss"
import { BuyingAuction } from "../../../../redux/types/cart";
const CartAuction = (props: {
    auction: BuyingAuction;
    setPrice: any
}) => {
    console.log(props);
    // const [checkedPrices, setCheckedPrices] = useState(new Array(props.auction.priceLevels.length).fill(false));
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newChecked = new Array(props.auction.priceLevels.length).fill(false);
        newChecked[index] = event.target.checked;
        // setCheckedPrices({ ...newChecked });
        props.setPrice(index);
    };
    return (
        <div className="cart-auction-container">
            <div className="image">
                <img
                    alt={props.auction.name}
                    style={{ margin: "0 auto", maxHeight: "50px" }}
                    src={props.auction.image ? props.auction.image :
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTo0TZZH1d-sTz_-1lbhJSAGZy-VeBnhG1hwg&usqp=CAU"} />
            </div>
            <div className="product-name">
                {props.auction.name}
            </div>
            <div className="price-levels">
                <FormControl component="fieldset" className="price-levels-form">
                    <FormGroup>
                        {props.auction.priceLevels.map((priceLevel: PriceLevel, index: number) => {
                            return (
                                <div className="prcie-level">
                                    <div className="progress-bar-container">
                                        <div>
                                            <LinearProgressWithLabel className="progress-bar"
                                                value={priceLevel.subscribers / priceLevel.wantedQuantity * 100}
                                                start={priceLevel.subscribers}
                                                end={priceLevel.wantedQuantity} />
                                        </div>
                                    </div>
                                    <Checkbox checked={props.auction.priceLevels[index].price === props.auction.selectedPrice} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChange(event, index)
                                    }
                                    } name={priceLevel.price.toString()} />
                                    <span>{priceLevel.price}  </span>
                                </div>
                            )
                        })}
                    </FormGroup>
                    <FormHelperText>chosse wanted auction</FormHelperText>
                </FormControl>
            </div>
        </div>
    )
}
export default CartAuction;