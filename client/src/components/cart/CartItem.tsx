import React from "react";

//Components
import { CartItemType } from "../../App";
import Button from "@material-ui/core/Button";

//Styles
import { Wrapper } from "./CartItems.styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="informations">
          <p>Price: ${item.price}</p>
          <p>Total: ${item.price.toFixed(2)}</p>
        </div>

        {/* <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div> */}
      </div>
      <img src={item.image} alt={item.title}></img>
    </Wrapper>
  );
};

export default CartItem;
