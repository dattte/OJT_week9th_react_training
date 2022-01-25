const defaultCartState = {
  items: [],
  totalAmount: 0,
  coupon: 5,
};

const cartReducer = (state = defaultCartState, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "CHANGE": {
      let updatedItems;
      updatedItems = [...state.items];
      const parrentItem = updatedItems.find(
        (pi) => pi.id === action.topping.parrentKey
      );
      const toppingItem = parrentItem.topping.find(
        (ic) => ic.id === action.topping.id
      );
      toppingItem.amount = action.topping.amount;

      let icAmount = 0;
      let ipAmount = 0;
      updatedItems.map((ip) => {
        ip.topping.map((ic) => {
          return (icAmount += ic.price * ic.amount);
        });
        return (ipAmount += ip.price * ip.amount);
      });

      const updatedTotalAmount = ipAmount + icAmount;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "DELETE": {
      const updatedItems = state.items.filter((item) => item.id !== action.id);

      let icAmount = 0;
      let ipAmount = 0;
      updatedItems.map((ip) => {
        ip.topping.map((ic) => {
          icAmount += ic.price * ic.amount;
        });
        ipAmount += ip.price * ip.amount;
      });

      const updatedTotalAmount = ipAmount + icAmount;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "COUPON": {
      let updatedItems;
      let updatedTotalAmount;
      let updatedCoupon;
      updatedItems = [...state.items];
      updatedTotalAmount = state.totalAmount;
      updatedCoupon = action.coupon;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        coupon: updatedCoupon,
      };
    }

    case "CLEAR":
      return defaultCartState;

    case "CHECKOUT": {
      let updatedItems;
      let updatedCoupon;
      if (updatedCoupon !== "") {
        updatedCoupon = state.coupon;
      } else {
        updatedCoupon = 5;
      }
      updatedItems = [...state.items];

      const updatedTotalAmount =
        state.totalAmount - state.totalAmount * (updatedCoupon / 100);
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        coupon: updatedCoupon,
      };
    }

    default:
      return defaultCartState;
  }
};

export default cartReducer;
