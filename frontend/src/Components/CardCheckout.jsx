import { Fragment, useEffect, useRef, useState } from "react";
import { getPriceAfterDiscount } from "../Helpers/Helper";
import { getCookie } from "cookies-next";
import axios from "axios";
import Swal from "sweetalert2";
const CardCheckout = ({ data, loopingData }) => {
    const subTotal = useRef();
    const [getCheckoutData, setCheckoutData] = useState(null);
    const handleChange = (e, price, productCode, unit, currency) => {
        setCheckoutData((prevState) => {
            if (!loopingData) {
                return {
                    ...prevState,
                    data_checkout: {
                        product_code: productCode,
                        quantity: e.target.value,
                        sub_total: price * e.target.value,
                        price: price,
                        unit: unit,
                        currency: currency
                    },
                    data_user: JSON.parse(getCookie("profile"))
                };
            } else {
                return [
                    // ...prevState,
                    {
                        product_code: productCode,
                        quantity: e.target.value,
                        sub_total: price * e.target.value,
                        price: price,
                        unit: unit,
                        currency: currency
                    }
                ];
            }
        });
        subTotal.current.textContent = price * e.target.value;
    };

    const processOrder = async () => {
        const finalDataCheckout =
            getCheckoutData != null
                ? getCheckoutData
                : {
                      data_checkout: {
                          product_code: data?.product_code,
                          quantity: 1,
                          sub_total: getPriceAfterDiscount(data?.price, data?.discount),
                          price: getPriceAfterDiscount(data?.price, data?.discount),
                          unit: data?.unit,
                          currency: data?.currency
                      },
                      data_user: JSON.parse(getCookie("profile"))
                  };
        const response = await axios.post(
            "http://localhost:8000/api/product/checkout",
            finalDataCheckout
        );
        if (response.data.httpCode === 201) {
            Swal.fire({
                icon: "success",
                text: "Thanks For Your Purchasing"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/product-list";
                }
            });
        }
        console.log(response);
    };

    useEffect(() => {
        console.log(getCheckoutData);
    }, [getCheckoutData]);
    return (
        <Fragment>
            <div className="card w-96 bg-base-100 shadow-xl flex">
                <figure className="px-10 pt-10">
                    <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                        className="rounded-xl"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{data?.product_name}</h2>
                    <div className="join mb-3">
                        <input
                            className="input input-bordered join-item w-24"
                            placeholder="PCS"
                            type="number"
                            min={1}
                            defaultValue={1}
                            onChange={(e) =>
                                handleChange(
                                    e,
                                    getPriceAfterDiscount(data?.price, data?.discount),
                                    data?.product_code,
                                    data?.unit,
                                    data?.currency
                                )
                            }
                        />
                        <button className="btn join-item rounded-r-full">PCS</button>
                    </div>
                    <p className="mb-3">
                        Sub Total : RP.
                        <span ref={subTotal}>
                            {`${getPriceAfterDiscount(data?.price, data?.discount)}`}
                        </span>
                    </p>
                    <div className="card-action items-center text-center">
                        <button className="btn btn-primary" onClick={() => processOrder()}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CardCheckout;
