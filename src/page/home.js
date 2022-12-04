import React, { useContext, useEffect } from 'react';
import { setAuthToken } from '../config/api';

// Component
import Navbar from '../component/navbar';
import Banner from '../component/banner'
import ListProduk from '../component/listproduk'
import { UserContext } from '../context/userContext';
import TableAdmin from '../component/tableadmin';

export default function Home() {
    const [state] = useContext(UserContext);
    useEffect(() => {
        // Redirect Auth
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        if (state.isLogin === false) {
        }
    }, [state]);
    return (
        <>
            {
                state.isLogin ?
                    <>
                        <Navbar />
                        {
                            state.user.role === "user" ?
                                <>
                                    <Banner />
                                    <ListProduk />
                                </>
                                :
                                <>
                                    <TableAdmin />
                                </>
                        }
                    </>
                    :
                    <>
                        <Navbar />
                        <Banner />
                        <ListProduk />
                    </>
            }
        </>
    )
}