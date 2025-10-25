import React from "react";
import product from "../../data/products";

// Price component
function Price() {
  return <h4 className="text-success">{product.price}</h4>;
}

export default Price;
