import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getPriceAfterDiscount, setLocStorageItem } from "../Helpers/Helper";
import { useNavigate } from "react-router-dom";
const CardProduts = ({ data }) => {
    console.log(data);
    const navigation = useNavigate();
    return (
        <Fragment>
            {data.length > 0
                ? data.map((item) => {
                      return (
                          <div className="card card-side bg-base-100 shadow-xl" key={item.id}>
                              <figure className="w-52 h-52 text-centers">
                                  <img
                                      src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                      alt="Shoes"
                                      className="rounded-xl object-cover"
                                  />
                              </figure>
                              <div className="card-body">
                                  <h2 className="card-title">{item.product_name}</h2>
                                  <div className="detailProduct mb-3">
                                      {item.discount && (
                                          <>
                                              <p className="text-base line-through">
                                                  Rp.{item.price}
                                              </p>
                                              <p className="text-base">
                                                  Rp.
                                                  {getPriceAfterDiscount(item.price, item.discount)}
                                              </p>
                                          </>
                                      )}

                                      <p className="text-base">Dimension : {item.dimension}</p>
                                      <p className="text-base">Price Unit : {item.unit}</p>
                                  </div>
                                  <div className="card-actions justify-end">
                                      <button
                                          className="btn btn-primary btn-sm"
                                          onClick={() => {
                                              navigation(`/checkout/${item.product_code}`);
                                          }}>
                                          Buy Now
                                      </button>
                                  </div>
                              </div>
                          </div>
                      );
                  })
                : null}
        </Fragment>
    );
};

export default CardProduts;
