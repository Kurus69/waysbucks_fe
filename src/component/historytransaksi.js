import React from "react";
import { Alert, Card, CardGroup, CardImg, Col, Row, Stack } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

import Image1 from "../assets/image/produk1.png";
import Logo from "../assets/image/logo.png"
import { useQuery } from "react-query";
import { API } from "../config/api";
import NotHistory from "./error/nothistory";

export default function History() {
    let { data: TransUser } = useQuery("HistoryChache", async () => {
        const response = await API.get('/history')
        return response.data.data
    })
    console.log("History", TransUser)
    return (
        <>
            <Card className="border-0 p-2" style={{}}>
                <CardGroup>
                    {/* {
                        !!TransUser ?
                            <>
                                <CardHeader className="bg-white border-0">
                                    <Card.Title>
                                        <h3 style={{ color: '#BD0707', fontWeight: 'normal', lineHeight: '1.7' }}><b className="display-5 fw-n">Ups Sorry!</b><br />
                                            <p>
                                                You haven't made a transaction
                                            </p>
                                        </h3>
                                    </Card.Title>
                                </CardHeader>
                                <NotHistory />
                            </>
                            : */}
                    <Stack>
                        <CardHeader className="bg-white border-0">
                            <Card.Title>
                                <h3 style={{ color: '#BD0707', fontWeight: 'bold' }}>My Transaction</h3>
                            </Card.Title>
                        </CardHeader>
                        {
                            TransUser?.map(element => (
                                <>
                                    <Card.Body style={{ background: '#F6DADA', borderRadius: '5px', marginBottom: '20px' }}>
                                        <Row>
                                            <Col sm={9} gap={3} >
                                                {
                                                    element.order?.map(order => (
                                                        <>
                                                            <Card style={{ background: '#F6DADA', border: '0' }}>
                                                                <Stack direction="horizontal">
                                                                    <CardImg variant="left" src={order.product.image} style={{ width: '100px' }} />
                                                                    <Card.Body>
                                                                        <Card.Title style={{ fontSize: '14pt', fontWeight: 'Bold', color: '#BD0707' }}>{order.product.title}</Card.Title>
                                                                        <Card.Subtitle style={{ fontSize: '10pt', color: '#BD0707' }}><b>Saturday</b>, 5 March 2020</Card.Subtitle>
                                                                        <Card.Text style={{ fontSize: '9pt', color: '#BD0707', margin: '0px', marginTop: '20px' }}><b style={{ color: '#974A4A' }}>Toping</b>:
                                                                            {
                                                                                order.toping?.map(topping => (
                                                                                    <>
                                                                                        {
                                                                                            topping.title
                                                                                        },
                                                                                    </>
                                                                                ))
                                                                            }
                                                                        </Card.Text>
                                                                        <Card.Subtitle style={{ color: '#974A4A', fontSize: '11pt', margin: '0px', lineHeight: '2' }}>Price : Rp.{order.subtotal}</Card.Subtitle>
                                                                    </Card.Body>
                                                                </Stack>
                                                            </Card>
                                                        </>
                                                    ))
                                                }
                                            </Col>
                                            <Col sm={3}>
                                                <Stack>
                                                    <Card style={{ background: 'none', border: 0 }}>
                                                        <CardHeader className="d-flex justify-content-center" style={{ background: 'none', border: '0' }}>
                                                            <CardImg src={Logo} style={{ width: '90%' }} />
                                                        </CardHeader>
                                                        <Card.Body style={{ padding: 0, marginTop: '20px' }}>
                                                            <CardImg src="https://www.pngmart.com/files/22/QR-Code-Transparent-Isolated-Background.png" />
                                                            {
                                                                element.status === "Payment" ?
                                                                    <Alert key="warning" variant="warning" style={{ fontSize: '8pt', marginTop: '15px', textAlign: 'center', padding: 5 }}>Waiting</Alert>
                                                                    : element.status === "Success" ?
                                                                        <Alert key="success" variant="success" style={{ fontSize: '8pt', marginTop: '15px', textAlign: 'center', padding: 5 }}>Success</Alert>
                                                                        : element.status === "Cancel" ?
                                                                            <Alert key="danger" variant="danger" style={{ background: '#B71C1C', color: '#fff', fontSize: '8pt', marginTop: '15px', textAlign: 'center', padding: 5 }}>Cancel</Alert>
                                                                            : null
                                                            }
                                                            <Card.Title style={{ fontSize: '9pt', textAlign: 'center', fontWeight: '900', color: '#974A4A' }}>Total : {element.total}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Stack>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </>
                            ))
                        }
                    </Stack>
                    {/* } */}
                </CardGroup>
            </Card>
        </>
    )
}