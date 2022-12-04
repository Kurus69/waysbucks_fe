import React, { useContext } from "react";
import { Card, CardGroup, Col, Row, Stack, Button } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { UserContext } from "../context/userContext";

export default function CardProfil() {
    const [state] = useContext(UserContext)
    console.log("Profile User :", state)
    return (
        <>
            <Card className="border-0 p-2" style={{}}>
                <CardGroup>
                    <Stack>
                        <CardHeader className="bg-white border-0">
                            <Card.Title >
                                <h3 style={{ color: '#BD0707', fontWeight: 'bold' }}>My Profil</h3>
                            </Card.Title>
                        </CardHeader>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col sm={4} className="" >
                                    <Card.Img src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280-300x300.jpg" style={{ width: '150px', }} />
                                </Col>
                                <Col sm={8} >
                                    <Card.Text>
                                        <h6 style={{ color: '#613D2B' }}>Username</h6>
                                        <p>{state.user.username} #{state.user.role}</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <h6 style={{ color: '#613D2B' }}>Email</h6>
                                        <p>{state.user.email}</p>
                                    </Card.Text>

                                </Col>
                            </Row>
                        </Card.Body>
                    </Stack>
                </CardGroup>
                <Card.Footer>
                    <Card.Title>Biodata</Card.Title>
                    <hr />
                    <Card.Text> My Name : </Card.Text>
                    <Card.Text> Gender : </Card.Text>
                    <Card.Text> Bio : </Card.Text>
                    <Button className="btn btn-dark">Edit Profile</Button>
                </Card.Footer>
            </Card>
        </>
    )
}