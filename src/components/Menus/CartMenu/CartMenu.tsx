import React from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "../../../assets/icons";
import SideMenu from "../SideMenu";



const CartMenu = () => {
    return (
        <SideMenu icon={<CartIcon width={"20px"} />} side="right">
            <Link to="/cart">Cart</Link>
        </SideMenu>

    );
}
export default CartMenu
