import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container, Table, Image, Row, Col, Button, Stack } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
export default function Topingadmin() {
    let { data: topings, refetch } = useQuery('topingsAdmin', async () => {
        const response = await API.get('/topings');
        return response.data.data;
    });

    const HandleDel = useMutation(async (id) => {
        try {
            const response = await API.delete('/toping/' + id)
            refetch()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    })

    const HandleUpdate = useMutation(async (id) => {
        try {
            const response = await API.patch('/update/' + id)
            refetch()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2>Toping</h2>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button href="/topping" className="btn-dark"><FontAwesomeIcon icon={faPlus} /> Add Toping</Button>
                    </Col>
                </Row>
                <Table responsive striped bordered hover className="my-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name Toping</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topings?.map((element, number) => {
                                number += 1
                                return (
                                    <>
                                        <tr>
                                            <td>{number}</td>
                                            <td className="col-3">
                                                <Image className="img-fuild w-25" src={element.image} />
                                            </td>
                                            <td>{element.title}</td>
                                            <td>
                                                1000
                                            </td>
                                            <td>
                                                {
                                                    element.status ?
                                                        <label className="text-success fw-bold">Ready</label>
                                                        :
                                                        <label className="text-danger fw-bold">Unready</label>
                                                }
                                            </td>
                                            <td className=" justify-content-end" >
                                                {
                                                    element.status ?
                                                        <Button className="btn-dark text-danger fw-bold" onClick={() => HandleUpdate.mutate(element.id)}>Unready</Button>
                                                        :
                                                        <Button className="btn-success" onClick={() => HandleUpdate.mutate(element.id)}>Ready</Button>
                                                }
                                                <Button className="btn-danger ms-3" onClick={() => HandleDel.mutate(element.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}