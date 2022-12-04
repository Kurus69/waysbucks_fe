import React from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack, Container, Button, Table, Badge } from "react-bootstrap";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
export default function TableAdmin() {
    const [state] = useContext(UserContext);

    let { data: transall, refetch } = useQuery("TransTable", async () => {
        if (state.user.role === "admin") {
            const response = await API.get('/transactions')
            return response.data.data
        }
    })

    let income = 0

    const HandleCancel = useMutation(async (id) => {
        console.log("Cancel ID =>", id)
        try {
            const response = await API.patch("/canceltrans/" + id)
            refetch()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    })

    const HandleAccept = useMutation(async (id) => {
        console.log("Accept ID =>", id)
        try {
            const response = await API.patch("/accepttrans/" + id)
            refetch()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <>
            <Container>
                <h2>Transaction</h2>
                <Table responsive striped bordered hover className="my-3 table-dark">
                    <thead>
                        <tr className="table-danger">
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Icome</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transall === 0 ?
                                <tr>
                                    <td colSpan={6}>Not Transaction</td>
                                </tr>
                                :
                                transall?.map((element, number) => {
                                    number += 1
                                    if (element.status === "Success") {
                                        income += element.total
                                    }
                                    return (
                                        <>
                                            <tr>
                                                <td>{number}</td>
                                                <td>{element.name}</td>
                                                <td>{element.address}</td>
                                                <td>
                                                    Rp.{element.total}
                                                </td>
                                                <td>
                                                    {
                                                        element.status === "Payment" ?
                                                            <label className="text-warning">Waiting Approve</label>
                                                            : element.status === "Success" ?
                                                                <label className="text-success">Success</label>
                                                                : element.status === "Cancel" ?
                                                                    <label className="text-danger">Cancel</label>
                                                                    : null
                                                    }
                                                </td>
                                                <th>
                                                    {
                                                        element.status === "Payment" ?
                                                            <Stack direction="horizontal" gap={3}>
                                                                <Button variant="danger" onClick={() => HandleCancel.mutate(element.id)}>Cancel</Button>
                                                                <Button variant="success" onClick={() => HandleAccept.mutate(element.id)}>Accept</Button>
                                                            </Stack>
                                                            : element.status === "Success" ?
                                                                <Badge className="rounded-circle bg-success" style={{ width: "25px" }}>
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </Badge>
                                                                : element.status === "Cancel" ?
                                                                    <Badge className="rounded-circle bg-danger" style={{ width: "25px" }}>
                                                                        <FontAwesomeIcon icon={faXmark} />
                                                                    </Badge>
                                                                    : null
                                                    }
                                                </th>
                                            </tr>
                                        </>
                                    )
                                })
                        }
                        <tr className="table-success" >
                            <th colSpan={6}>Icome : Rp. {income}</th>
                        </tr>
                    </tbody>

                </Table>
            </Container>
        </>
    )
}