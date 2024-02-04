import { Fragment } from "react";

const Container = ({ children, center }) => {
    return (
        <Fragment>
            <div
                className={`container flex m-auto w-screen ${
                    center ? "justify-center items-center" : ""
                }`}>
                {children}
            </div>
        </Fragment>
    );
};

export default Container;
