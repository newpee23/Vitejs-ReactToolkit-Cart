import React from "react";
import { useDispatch , useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlices";
export default function Item({ product }) {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);

  const onClickAddcart = () => {
    if(user){
      dispatch(addToCart({...product, qty: 1}));
    }
  }
  return (
    <div className="product rounded-lg drop-shadow-2xl border border-gray-200">
      <img
        className="w-20 h-auto rounded-full mb-3 m-auto"
        src={product.img}
        alt={product.title}
      />

      <h4>{product.title}</h4>
      <p>{product.price}</p>
      <button onClick={() => onClickAddcart()}  className="px-4 py-3 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        Add To Cart
      </button>
    </div>
  );
}
