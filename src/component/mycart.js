import { Alert, Button, Card, CardGroup, CardImg, Col, Container, Form, FormControl, NavLink, Row, Stack } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'

import CardHeader from "react-bootstrap/esm/CardHeader";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import NotOrder from "./error/notorder";

export default function Mycart() {
    const [state] = useContext(UserContext);

    let { data: mycart, refetch } = useQuery("myCartUser", async () => {
        if (state.isLogin) {
            const response = await API.get('/myOrder')
            return response.data.data
        }
        // console.log("ID Transaction => ", mycart.transaction_id)
    })

    let TotalPrice = 0
    let Qty = 0
    let IDTrans = 0

    if (state.isLogin === true) {
        mycart?.map((element) => (
            TotalPrice += element.subtotal,
            Qty += element.qty,
            IDTrans = element.transaction_id
        ))
    }

    const HandleDel = useMutation(async (id) => {
        try {
            const respone = await API.delete('/cart/' + id)
            refetch()
            console.log(respone)
        } catch (error) {
            console.log(error)
        }
    })

    //Payment 
    const [form, setForm] = useState({
        name: '',
        address: '',
    });

    const { name, address } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    let navigate = useNavigate()
    const HandlePay = useMutation(async (id) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const requestBody = JSON.stringify(form);
            const response = await API.patch('/transaction/' + id, requestBody, config)

            console.log("respon Payment :", response)
            const token = response.data.data.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result);
                    refetch()

                    navigate("/profile");
                },
                onPending: function (result) {
                    console.log(result);
                    refetch()
                    navigate("/profile");
                },
                onError: function (result) {
                    refetch()
                    console.log(result);
                },
                onClose: function () {
                    alert("you closed the popup without finishing the payment");
                },
            });
            console.log("Transaksi", response)

        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = "SB-Mid-client-rIrlvZvI6nm57Qa1";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <>
            <Container>
                {
                    IDTrans === 0 ?
                        <NotOrder />
                        :
                        <Card className="border-0">
                            <CardGroup>
                                <Card.Body style={{ color: '#BD0707' }}>
                                    <Row >
                                        <Card.Title className="mb-4">My Cart</Card.Title>
                                        <Col sm={7}>
                                            <Card className="border-0">
                                                <CardHeader className="bg-white" style={{ borderColor: '#974A4A' }}>
                                                    <Card.Subtitle style={{ fontWeight: '400' }}>Review Your Order</Card.Subtitle>
                                                </CardHeader>
                                                <Card.Body>
                                                    <Stack gap={2}>
                                                        {
                                                            mycart?.map(element =>
                                                            (
                                                                <Card className="border-0" key={element.transaction_id}>
                                                                    <Stack direction="horizontal">
                                                                        <CardImg src={element.product.image} className="thumbnail" style={{ width: '70px', height: '70px' }} />
                                                                        <Card.Body>
                                                                            <Card.Title style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '12pt' }}>{element.product.title}</Card.Title>
                                                                            <Card.Subtitle style={{ fontWeight: '400', fontSize: '10pt' }}><b style={{ color: '#974A4A' }}>Toping: </b>
                                                                                {
                                                                                    element.toping.map(topings => (
                                                                                        <>
                                                                                            {topings.title}-
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </Card.Subtitle>
                                                                        </Card.Body>
                                                                        <Card.Footer className="bg-white text-end" style={{ border: 'none' }}>
                                                                            <p>Rp.{element.subtotal}</p>
                                                                            <NavLink
                                                                                onClick={() => HandleDel.mutate(element.id)}
                                                                            ><FontAwesomeIcon icon={faTrash} /></NavLink>
                                                                        </Card.Footer>
                                                                    </Stack>
                                                                </Card>
                                                            ))
                                                        }
                                                    </Stack>
                                                </Card.Body>
                                                <Card.Footer className="bg-white" style={{ borderColor: '#974A4A', paddingLeft: '0' }}>
                                                    <Stack direction="horizontal" gap={5}>
                                                        <Card className="border-0 col-7">
                                                            <CardHeader className="bg-white" style={{ borderColor: '#974A4A' }}>
                                                                <Col>  </Col>
                                                            </CardHeader>
                                                            <Card.Body>
                                                                <Stack gap={4}>
                                                                    <Row>
                                                                        <Col>
                                                                            <Card.Subtitle style={{ fontWeight: '400', fontSize: '12pt' }}>Subtotal</Card.Subtitle>
                                                                        </Col>
                                                                        <Col className="text-end">
                                                                            <Card.Subtitle style={{ fontWeight: '400', fontSize: '12pt' }}>Rp.{TotalPrice} </Card.Subtitle>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col>
                                                                            <Card.Subtitle style={{ fontWeight: '400', fontSize: '12pt' }}>Qty</Card.Subtitle>
                                                                        </Col>
                                                                        <Col className="text-end">
                                                                            <Card.Subtitle style={{ fontWeight: '400', fontSize: '12pt' }}>
                                                                                {Qty}
                                                                            </Card.Subtitle>
                                                                        </Col>
                                                                    </Row>
                                                                </Stack>
                                                            </Card.Body>
                                                            <Card.Footer className="bg-white" style={{ borderColor: '#974A4A' }}>
                                                                <Row>
                                                                    <Col>
                                                                        <Card.Title>Total</Card.Title>
                                                                    </Col>
                                                                    <Col className="text-end">
                                                                        <Card.Title>Rp.{TotalPrice} </Card.Title>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Footer>
                                                        </Card>
                                                        <Card className="border-0 col-4 d-flex justify-content-center">
                                                            <Alert variant="secondary" className="text-center text-danger" style={{ border: '1px solid #BD0707', background: '#E0C8C840', lineHeight: '2.5' }}>
                                                                <FontAwesomeIcon style={{ fontSize: '45pt' }} icon={faFileInvoiceDollar} />
                                                                <Card.Text style={{ fontSize: '10pt', color: '#68323280' }}> Attache of Transaction</Card.Text>
                                                            </Alert>
                                                        </Card>
                                                    </Stack>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                        <Col sm={4} className="ms-5">
                                            <Card className="border-0">
                                                <Card.Body>
                                                    <Form onSubmit={() => HandlePay.mutate(IDTrans)}>
                                                        <Stack gap={3}>
                                                            <FormControl type="text" name="name" onChange={handleChange} value={name} placeholder="Name" style={{ border: '1px solid #BD0707', background: '#E0C8C840', lineHeight: '2.5' }} />
                                                            <FormControl as="textarea" name="address" onChange={handleChange} value={address} placeholder="Address" style={{ border: '1px solid #BD0707', background: '#E0C8C840', lineHeight: '2.5', minHeight: '200px' }} />
                                                            <Button
                                                                onClick={() => HandlePay.mutate(IDTrans)}
                                                                className="btn btn-danger">Pay</Button>
                                                        </Stack>
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </CardGroup>
                        </Card>
                }
            </Container>
        </>
    )
}