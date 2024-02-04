import { Fragment, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import CardProduts from "../Components/CardProducts";
import axios from "axios";
import { getLocStorageItem } from "../Helpers/Helper";
const ProducList = () => {
    const [getData, setData] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get("http://localhost:8000/api/product/getProducts");
            setData(data.data);
        };
        getProducts();
    }, []);
    return (
        <Fragment>
            <Navbar />
            <div className="container flex m-auto w-screen">
                <br />
                <div className="flex flex-row gap-4">
                    <CardProduts data={getData} />
                </div>
            </div>
        </Fragment>
    );
};

export default ProducList;
