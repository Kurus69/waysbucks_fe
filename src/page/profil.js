import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardProfil from "../component/card";
import History from "../component/historytransaksi";

// component
import Header from "../component/navbar";

export default function Profil() {
    return (
        <div>
            <Header />
            <Container >
                <Row>
                    <Col>
                        <CardProfil />
                    </Col>
                    <Col>
                        <History />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}