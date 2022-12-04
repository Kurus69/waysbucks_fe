import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Col, Container, Form, FormControl, Row, Stack } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

export default function Productadmin() {
    let { data: products, refetch } = useQuery('productsAdmin', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    const HandleDel = useMutation(async (id) => {
        try {
            const response = await API.delete('/product/' + id)
            refetch()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <Container className="mt-3">
            <Card style={{ marginBottom: "20px" }} className="bg-dark text-white">
                <CardHeader>
                    <Row>
                        <Col className="sm-6">
                            <Card.Title>Product Waysbucks</Card.Title>
                        </Col>
                        <Col>
                            <Form>
                                <FormControl type="search" name="search" placeholder="Find product name..." />
                            </Form>
                        </Col>
                        <Col className="sm-6 justify-content-end d-flex">
                            <Button href="/product" className="btn-success text-white"><FontAwesomeIcon icon={faPlus} /> Add Product</Button>
                        </Col>
                    </Row>
                </CardHeader>
            </Card>
            <Row xs={2} >
                {
                    products?.map((element) => (
                        <>
                            <Col sm={3}>
                                <Card
                                    className="bg-light"
                                    style={{ border: '0px', cursor: 'pointer', marginBottom: '20px' }}>
                                    <Card.Img variant="top" src={element.image} style={{ height: "250px" }} />
                                    <Card.Body>
                                        <Card.Title style={{ color: '#BD0707', fontWeight: 'bold', fontSize: "12pt" }}>{element.title}</Card.Title>
                                        <Card.Text style={{ color: '#974A4A', fontSize: "10pt" }}>
                                            Rp.{element.price}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Stack gap={1} direction="horizontal" className="d-flex justify-content-end">
                                            <Button href={"/product/" + element.id} className="btn btn-secondary fw-bold">Edit </Button>
                                            <Button className="btn btn-danger fw-bold" onClick={() => HandleDel.mutate(element.id)} >Delete </Button>
                                        </Stack>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </>
                    ))
                }

            </Row>
        </Container>
    )

}