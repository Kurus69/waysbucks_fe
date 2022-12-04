import React, { useState, useContext, useEffect } from 'react';
import { setAuthToken } from '../config/api';


import { Button, Container, Nav, Navbar, Dropdown, Image, Badge } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser, faGlassWater, faCookie, faHomeUser } from '@fortawesome/free-solid-svg-icons'

import Login from '../page/login';
import Register from '../page/register'

import Logo from "../assets/image/logo.png"
import IconCart from "../assets/icon/Cart.svg"

import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    //data User
    const [state, dispatch] = useContext(UserContext);

    let navigate = useNavigate()

    //for cek data Order User
    let { data: mycart } = useQuery("myCartUser", async () => {
        if (state.user.role === "user") {
            const response = await API.get('/myOrder')
            return response.data.data
        }
    })

    //counting value icon Cart
    let sizeCart = 0
    if (state.user.role === "user") {
        mycart?.map((element) => (
            sizeCart += element.qty
        ))
    }

    //set token local storage
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        if (state.isLogin === false) {
        }
    }, [state]);

    //LOGOUT
    function handleLogout() {
        dispatch({
            type: "LOGOUT",
        })
        navigate('/')
    }

    //Check and Set AUTH User
    const checkUser = async () => {
        try {
            const response = await API.get('/checkauth', {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            if (response.status === 404) {
                return dispatch({
                    type: 'AUTH_ERROR',
                });
            }
            let payload = response.data.data;
            payload.token = localStorage.token;
            dispatch({
                type: 'USER_SUCCESS',
                payload,
            });
        } catch (error) {
            // console.log(error);
        }
    }

    //Run 1x funct Check User
    useEffect(() => {
        checkUser();
    }, []);

    function StatusOff() {
        const [showLogin, setShowLogin] = useState(false)
        const [showRegister, setShowRegister] = useState(false)

        return (
            <div>
                <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                    {state.isLogin !== true ?
                        <>
                            <Nav.Link>
                                <Button variant="outline-danger" onClick={() => setShowLogin(true)}>
                                    Login
                                </Button>
                            </Nav.Link>
                            <Nav.Link>
                                <Button variant="danger" onClick={() => setShowRegister(true)}>
                                    Register
                                </Button>
                            </Nav.Link>
                        </>
                        : state.user.role === "user" ?
                            <>
                                <Nav.Link href='/transaction' style={{ position: 'relative' }}>
                                    {
                                        sizeCart !== 0
                                            ?
                                            <Badge pill bg="danger" className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px', fontSize: '10pt', position: 'absolute', right: 0, }}>{sizeCart} </Badge>
                                            : null
                                    }
                                    <Image src={IconCart} width='30px' />
                                </Nav.Link>
                                <Dropdown>
                                    <Dropdown.Toggle className="border-0 bg-white" id="dropdown-basic">
                                        <Image src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280-300x300.jpg" width='50' className="rounded-circle" style={{ border: '2px solid #BD0707' }} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/profile" style={{ fontWeight: '500' }} ><FontAwesomeIcon icon={faUser} style={{ marginRight: '15px', color: '#BD0707' }} />Profi</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout} style={{ fontWeight: '500' }}><FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '15px', color: '#BD0707' }} />Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                            :
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle className="border-0 bg-white" id="dropdown-basic">
                                        <Image src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280-300x300.jpg" width='50' className="rounded-circle" style={{ border: '2px solid #BD0707' }} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/" style={{ fontWeight: '500' }} ><FontAwesomeIcon icon={faHomeUser} style={{ marginRight: '15px', color: '#BD0707' }} />Beranda</Dropdown.Item>
                                        <Dropdown.Item href="/products" style={{ fontWeight: '500' }} ><FontAwesomeIcon icon={faGlassWater} style={{ marginRight: '15px', color: '#BD0707' }} />Product</Dropdown.Item>
                                        <Dropdown.Item href="/topings" style={{ fontWeight: '500' }} ><FontAwesomeIcon icon={faCookie} style={{ marginRight: '15px', color: '#BD0707' }} />Toping</Dropdown.Item>
                                        <Dropdown.Item href='/' onClick={handleLogout} style={{ fontWeight: '500' }}><FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '15px', color: '#BD0707' }} />Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                    }
                </Nav>
                <Login show={showLogin} showLogin={setShowLogin} showRegister={setShowRegister} />
                <Register show={showRegister} showLogin={setShowLogin} showRegister={setShowRegister} />
            </div >
        )
    }
    const [showStatus] = useState(false);
    return (
        <Navbar bg="white" style={{ display: 'flex', justifyContent: "center" }}>
            <Container>
                <Navbar.Brand href="/">
                    <Image src={Logo} width="80" height="80" className="d-inline-block align-top" />
                </Navbar.Brand>
                {showStatus ? null : <StatusOff />}
            </Container>
        </Navbar>
    )
}