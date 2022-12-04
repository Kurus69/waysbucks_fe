import React from "react";
import NotOrder from "../component/error/notorder";
import Mycart from "../component/mycart";

// component
import Header from "../component/navbar";

export default function Cart() {
    return (
        <div>
            <Header />
            <Mycart />

        </div>
    )
}