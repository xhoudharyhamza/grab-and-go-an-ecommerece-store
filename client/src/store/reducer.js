let reducer = (state, action) => {
  switch (action.type) {
    //case when data is loading
    case "DATA_LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };
    //case to set all the products in global state when products are loaded from database
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
      };
    //case to set range products
    case "SET_RANGE_PRODUCTS":
      return {
        ...state,
        rangeProducts: action.payload.products,
      };
    //case to set the details of single product when data is loaded from database
    case "SET_SINGLE_PRODUCTS":
      return {
        ...state,
        singleProduct: action.payload.product,
      };
    //case to set feature products in global state
    case "SET_TOP_RATED_PRODUCTS":
      return {
        ...state,
        topRatedProducts: action.payload.products,
      };
      //case to set new collections in state
      case "SET_NEW_COLLECTIONS_PRODUCTS":
      return {
        ...state,
        newCollections: action.payload.products,
      };
    //case to set similar products in global state
    case "SET_SIMILAR_PRODUCTS":
      return {
        ...state,
        similarProducts: action.payload.products,
      };
    //case to fetch all product categories from database
    case "SET_PRODUCTS_CATEGORIES":
      return {
        ...state,
        categories: action.payload.categories,
      };
    //case when user add product to his shopping cart
    case "ADD_PRODUCT_TO_CART":
      let existingProduct = state.cart.find((product) => {
        return product._id === action.payload.id;
      });
      if (existingProduct) {
        let cartProducts = state.cart.map((product) => {
          if (product._id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity++,
            };
          } else {
            return {
              ...product,
            };
          }
        });
        return {
          ...state,
          cart: [...cartProducts],
        };
      } else {
        let cartProduct = state.products.find((product) => {
          return product._id === action.payload.id;
        });
        return {
          ...state,
          cart: [
            {
              ...cartProduct,
              quantity: 1,
              size: cartProduct.sizes.length > 0 ? cartProduct.sizes[0] : "",
            },
            ...state.cart,
          ],
        };
      }
    // case to update cart product size
    case "UPDATE_CART_PRODUCT_SIZE":
      let userCart = state.cart.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            size: action.payload.size,
          };
        } else {
          return {
            ...product,
          };
        }
      });
      return {
        ...state,
        cart: userCart,
      };
    //case when user remove product from shopping cart
    case "REMOVE_PRODUCT_FROM_CART":
      let shoppingCart = state.cart.filter((product) => {
        return product._id !== action.payload.id;
      });
      return {
        ...state,
        cart: [...shoppingCart],
      };
    //increment cart product quantity
    case "INCREMENT_QUANTITY":
      let cartProducts = state.cart.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            quantity: product.quantity++,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        cart: [...cartProducts],
      };
    //decrement cart products quantity
    case "DECREMENT_QUANTITY":
      let cart = state.cart.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            quantity: product.quantity--,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        cart: [...cart],
      };
    //case to set error
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    //case to set user
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    //case set shipping details
    case "SET_SHIPPING_DETAILS":
      return {
        ...state,
        shippingAddress: action.payload.shippingDetails,
      };
    //case to set total amount
    case "SET_TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
      };
    //case to define aximum product price
    case "SET_MAXIMUM_PRODUCT_PRICE":
      return {
        ...state,
        maxProductPrice: action.payload.price,
      };

    // case to define minimum product price
    case "SET_MINIMUM_PRODUCT_PRICE":
      return {
        ...state,
        minProductPrice: action.payload.price,
      };

    //default case
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
