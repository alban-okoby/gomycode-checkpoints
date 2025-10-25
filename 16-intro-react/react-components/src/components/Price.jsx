import React from "react";
import product from "../../data/products";

function Price() {
  return <h4 className="text-success">{product.price}</h4>;
}

export default Price;
