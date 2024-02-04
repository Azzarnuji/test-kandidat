import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
const Report = () => {
    const [getData, setData] = useState([]);
    const tableReport = useRef();
    useEffect(() => {
        const getReport = async () => {
            const { data } = await axios.get("http://localhost:8000/api/product/getReport");
            setData(data.data);
        };
        getReport();
    }, []);
    return (
        <Fragment>
            {console.log(getData)}
            <ReactToPrint
                trigger={() => {
                    return (
                        <div className="flex justify-end m-5">
                            <button className="btn btn-primary text-end">Print</button>
                        </div>
                    );
                }}
                content={() => tableReport.current}
            />
            <div className="overflow-x-auto" ref={tableReport}>
                <table className="table">
                    {/* head */}
                    <thead className=" text-black text-xl">
                        <tr>
                            <th>Transaction</th>
                            <th>User</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {getData.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <th>
                                        {item.document_code} - {item.document_number}
                                    </th>
                                    <th>{item.user}</th>
                                    <th>{item.total}</th>
                                    <th>{item.date}</th>
                                    <th>
                                        {item.transaction_detail.product.product_name} x{" "}
                                        {item.transaction_detail.quantity}
                                    </th>
                                </tr>
                            );
                        })}

                        {/* row 2 */}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default Report;
