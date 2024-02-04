import { Fragment, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Container from "../Components/Container";
import { useParams } from "react-router-dom";
import CardCheckout from "../Components/CardCheckout";
import axios from "axios";
import { getLocStorageItem } from "../Helpers/Helper";
const Checkout = () => {
    const { productId } = useParams();
    const [getProduct, setProduct] = useState({});
    useEffect(() => {
        const getProductByID = async (productCode) => {
            const { data } = await axios.get(
                `http://localhost:8000/api/product/getProductById/${productCode}`
            );
            setProduct(data.data);
        };
        getProductByID(productId);
    }, [productId]);
    return (
        <Fragment>
            <Navbar />
            <button className="btn btn-sm btn-primary mx-5" onClick={() => window.history.back()}>
                Back
            </button>
            <h1 className="text-3xl text-center">Checkout Page</h1>
            <Container center={true}>
                <CardCheckout data={getProduct} loopingData={false} />
            </Container>
        </Fragment>
    );
};

export default Checkout;
