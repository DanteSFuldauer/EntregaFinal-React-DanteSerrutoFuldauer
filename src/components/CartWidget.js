const CartWidget = ({ cartCount }) => {
    return (
      <div className="cart-widget">
        <span>🛒</span>
        <span>{cartCount}</span>
      </div>
    );
  };
  
  export default CartWidget;
  