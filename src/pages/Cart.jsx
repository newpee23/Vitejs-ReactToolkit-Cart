import React , { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { deleteCart , editItemCart } from "../store/slices/cartSlices";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const totalPrice = cart?.reduce((sumprice, item) => sumprice + item.qty * item.price, 0) ?? 0;
  const [quantity, setQuantity] = useState(cart?.map((v) => v.qty));
  const [price, setPrice] = useState(cart?.map((v) => v.price));
  const [idedit, setIdEdit] = useState("");
  const formattedTotalPrice = totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const setDataEdit = (id, i) => {
    const editedData = {
      id: id,
      qty: quantity[i],
      price: price[i],
    };
    setIdEdit(prevIdEdit => !prevIdEdit);
    // ไม่ต้องคืนค่า action object ในนี้ แต่สามารถเรียกใช้ updateItemInCart เพื่อ dispatch การกระทำได้
    dispatch(editItemCart(editedData));
  }

  const EditItem = (id) => {
    if (idedit === "") {
      setIdEdit(id);
    } else {
      setIdEdit("");
    }
  };


  if (cart.length == 0) {
    return (
      <div className="w-full">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 drop-shadow-xl">
          <li className="pb-3 sm:pb-8 sm:pt-8 sm:mr-10 sm:ml-10 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-xl font-medium text-red-700 truncate ">
                  No Item Product In Cart
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }else{
    return (
      <div className="w-full md:w-2/5 m-auto ">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 border-l border-r border-b">
          {cart?.map((v, i) => (
            <li
              className="pb-3 sm:pb-8 sm:pt-8 sm:mr-10 sm:ml-10 drop-shadow-xl"
              key={i}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-16 h-auto rounded-full"
                    src={v.img}
                    alt={v.title}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xl font-medium text-gray-900 truncate text-left px-5">
                    {v.title}
                  </p>
                  <p className={`text-md px-5 ${idedit && v.id === idedit ? 'hidden' : ''}`}>
                    <FaEdit
                      className="cursor-pointer hover:text-yellow-600"
                      onClick={() => EditItem(v.id)}
                    />
                  </p>
                </div>
                <div className="flex items-center text-lg font-semibold text-gray-900 w-14 justify-end">
                  <div>
                    <p>
                      {v.qty.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center text-lg font-semibold text-gray-900">
                  *
                </div>
                <div className="inline-flex items-center text-lg font-semibold text-gray-900 w-16">
                  {v.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className="inline-flex items-center text-lg font-semibold text-gray-900 w-16">
                  {(v.qty * v.price)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className="inline-flex items-center text-md font-semibold text-red-700 hover:text-red-900">
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => dispatch(deleteCart(v.id))}
                  />
                </div>
              </div>
              <div
                className={`flex items-center justify-between mt-3 ${
                  idedit !== "" && v.id === idedit ? "" : "hidden"
                }`}
              >
                <div className="inline-flex items-center font-semibold text-gray-900 ">
                <button onClick={() => setDataEdit(v.id,i)} type="button" className="mr-2 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                <button onClick={() => setIdEdit(!idedit)} type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Closed</button>
                </div>
                <div className="inline-flex items-center font-semibold text-gray-900 ">
                  <label htmlFor="qtyinput" className="mr-3 text-xl">
                    Quantity :{" "}
                  </label>

                  <input
                     onChange={(event) => {
                      const value = event.target.valueAsNumber; // ใช้ valueAsNumber เพื่อให้ค่าเป็น Number โดยอัตโนมัติ
                      if (!isNaN(value)) {
                        setQuantity((prevQty) => {
                          const updatedQty = [...prevQty];
                          updatedQty[i] = value;
                          return updatedQty;
                        });
                      }
                    }}
                    value={quantity[i]}
                    type="number"
                    step="1"
                    id="small-input"
                    className="mr-3 block w-40 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <label htmlFor="priceinput" className="mr-3 text-xl">
                    Price :{" "}
                  </label>

                  <input
                    onChange={(event) => {
                      const value = event.target.valueAsNumber; // ใช้ valueAsNumber เพื่อให้ค่าเป็น Number โดยอัตโนมัติ
                      if (!isNaN(value)) {
                        setPrice((prevPrice) => {
                          const updatedPrice = [...prevPrice];
                          updatedPrice[i] = value;
                          return updatedPrice;
                        });
                      }
                    }}
                    value={price[i]}
                    type="number"
                    step="1"
                    id="small-input"
                    className="block w-40 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </li>
          ))}
          <li className="pb-3 sm:pb-8 sm:pt-8 sm:mr-10 sm:ml-10">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-md font-medium text-gray-900 truncate ">
                  รวมจำนวนเงิน
                </p>
              </div>

              <div className="inline-flex items-center font-semibold text-gray-900 ">
                <span className="text-lg">
                  <b>${formattedTotalPrice} บาท</b>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Cart;
