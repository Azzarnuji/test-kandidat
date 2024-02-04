import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "cookies-next";
import axios from "axios";
const LoginPage = () => {
    const [getUserInformation, setUserInformation] = useState({});
    const navigation = useNavigate();
    const handleChange = (name, value) => {
        setUserInformation((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios({
                method: "post",
                url: "http://localhost:8000/api/auth/login",
                data: getUserInformation
            });
            console.log(data);
            if (data.httpCode == 200) {
                setCookie("profile", data.data);
                navigation("/product-list");
            }
        } catch (error) {
            console.log(error);
        }
        // navigation("/product-list");
    };
    return (
        <Fragment>
            <div className="container m-auto h-screen w-screen flex justify-center align-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl">
                    {/* <figure className="px-10 pt-10">
                        <img
                            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                            className="rounded-xl"
                        />
                    </figure> */}
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Login Page</h2>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="input input-bordered w-full max-w-xs"
                                name="username"
                                onKeyUp={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="*******"
                                className="input input-bordered w-full max-w-xs"
                                name="password"
                                onKeyUp={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </label>
                        <div className="card-actions">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginPage;
