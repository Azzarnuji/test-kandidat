import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Auth/Login";
import ProducList from "./Product/ProductList";
import Checkout from "./Product/Checkout";
import { useEffect } from "react";
import Report from "./Report/Report";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/product-list" element={<ProducList />} />
                <Route path="/checkout/:productId" element={<Checkout />} />
                <Route path="/report" element={<Report />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
