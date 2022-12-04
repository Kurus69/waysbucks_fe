import { Col, Container, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from 'react-query';

export default function List() {
    const navigate = useNavigate()
    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });
    return (
        <>
            <Container className="mt-3 mb-5 w-100">
                <p style={{ fontWeight: 'bold', fontSize: '25pt', color: '#BD0707', margin: '30px 0px' }}>Let’s Order</p>
                <Stack gap={2}>
                    <Row xs={2} >
                        {
                            products?.map((element) => (
                                <>
                                    <Col sm={3}>
                                        <Card
                                            style={{ backgroundColor: '#F6DADA', border: '0px', cursor: 'pointer', marginBottom: '20px' }}
                                            key={element.id}
                                            id={element.id}
                                            onClick={() => { navigate(`/product/${element.id}`) }}
                                        >
                                            <Card.Img variant="top" src={element.image} />
                                            <Card.Body>
                                                <Card.Title style={{ color: '#BD0707', fontWeight: 'bold' }}>{element.title}</Card.Title>
                                                <Card.Text style={{ color: '#974A4A', }}>
                                                    {element.price}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            ))
                        }

                    </Row>
                </Stack>
            </Container>
        </>
    )
}