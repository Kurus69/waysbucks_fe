import React from "react";
import { Card, Container, Image, Stack } from "react-bootstrap";
import image1 from "../../assets/image/notorder.png"

export default function NotOrder() {
    return (
        <div>
            <Container className="d-flex justify-content-center mt-5">
                <Stack>
                    <h2 className="display-2 text-danger fw-bold">OOPS !!!</h2>
                    <p className="display-6 text-danger fw-normal">You don't own a Order Items</p>
                </Stack>
                <Image className="fuild w-50 " src={image1} />
            </Container>
        </div>
    )
}