import React, { useContext, useState } from "react";
import { Card, CardImg, Row, Col, Stack, Container, Button, Image, Badge } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

export default function ProdukDetail() {
    const { id } = useParams()
    const [state] = useContext(UserContext)
    //produk
    let { data: product } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
    });

    /// toping
    let { data: toppings } = useQuery('topingsCache', async () => {
        const response = await API.get('/topings');
        return response.data.data;
    });

    const [toping, setToping] = useState([0]) //ID TOPING
    const [topingharga, setTopingHarga] = useState([]) //HARGA TOPING

    function handleBadge(id, price) {
        let idNow = toping.filter(e => e === id)
        if (idNow[0] !== id) {
            setToping([...toping, id])
            setTopingHarga(Number(topingharga) + Number(price))
        }
        else {
            setToping(toping.filter(e => e !== id))
            setTopingHarga(Number(topingharga) - Number(price))
        }
    }
    let TotalHarga = product?.price + topingharga

    let navigate = useNavigate()

    const HandleAddCart = useMutation(async () => {
        try {
            const data = {
                qty: 1,
                subtotal: TotalHarga,
                product_id: product.id,
                toping_id: toping
            }
            const body = JSON.stringify(data)
            const respone = await API.post('/cart', body)
            console.log("respon Order :", respone)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <>
            <Container>
                <Card style={{ border: 0, marginTop: '30px' }}>
                    <Row>
                        <Col className="d-flex justify-content-end" sm={4}>
                            <Image src={product?.image} className="rounded" style={{ width: '300px', height: '400px' }} />
                        </Col>
                        <Col sm={7}>
                            <Stack className="">
                                <Card className="border-0">
                                    <CardHeader style={{ background: 'white', border: 0, }}>
                                        <Card.Title style={{ fontWeight: 'Bold', fontSize: '25pt', color: '#BD0707' }}>{product?.title}</Card.Title>
                                        <Card.Subtitle style={{ color: '#974A4A', fontWeight: '500', marginTop: '20px', fontSize: '14pt' }}>Rp. {product?.price}</Card.Subtitle>
                                    </CardHeader>
                                    <Card.Body className="mt-3">
                                        <Card.Title style={{ color: '#974A4A', fontWeight: 'bold', marginBottom: '20px' }}>Toping</Card.Title>
                                        <Row xs={2} md={4} lg={4}  >
                                            {
                                                toppings?.map((element) => {
                                                    if (!!element.status) {
                                                        return (
                                                            <Col style={{ paddingBottom: '10px' }}>
                                                                <Card className="border-0" style={{ cursor: 'pointer' }}
                                                                    onClick={() => handleBadge(element.id, element.price)}
                                                                >
                                                                    <CardImg src={element.image} className="img-tumbnail rounded-circle mx-auto d-block" style={{ width: '50px', height: '50px', marginBottom: '8px', position: 'relative' }} />
                                                                    <Card.Text style={{ fontSize: '8pt', color: '#BD0707', letterSpacing: '0.5px' }} className="mx-auto d-block">{element.title}</Card.Text>
                                                                    {
                                                                        toping.filter(e => e === element.id)[0] === element.id
                                                                            ? <Badge pill bg="success" className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px', fontSize: '10pt', position: 'absolute', right: 30, }}><FontAwesomeIcon icon={faCheck} /></Badge>
                                                                            : <Badge pill bg="white" className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px', fontSize: '10pt', position: 'absolute', right: 0, }}><FontAwesomeIcon icon={faCheck} /></Badge>
                                                                    }
                                                                </Card>
                                                            </Col>
                                                        )
                                                    }
                                                })
                                            }
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className="bg-white border-0">
                                        <Card.Title style={{ fontWeight: 'bold', color: '#974A4A', marginTop: '20px' }}>
                                            <Row>
                                                <Col className="text-start">Total</Col>
                                                <Col className="text-end">Rp.{TotalHarga}</Col>
                                            </Row>
                                        </Card.Title>
                                        <Card className="mt-5">
                                            {
                                                state.isLogin ? <Button className="btn btn-danger" style={{ background: '#BD0707' }} onClick={() => HandleAddCart.mutate()}>Add Cart</Button>
                                                    : <Button className="btn btn-secondary" disabled>Add Cart ( Login Please )</Button>
                                            }
                                        </Card>
                                    </Card.Footer>
                                </Card>
                            </Stack>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    )
}