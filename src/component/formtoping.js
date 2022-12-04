import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
// import ModalPopUpToping from "../component/PopUpToping"
import { API } from "../config/api"

// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

const style = {
  textTitle: {
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "49px",

    color: "#BD0707",
  },

  textRed: {
    color: "#BD0707",
  },

  bgColor: {
    backgroundColor: "#BD0707",
  },

  textCenter: {
    textAlign: "center",
  },

  link: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "black",
  },

  ImgToping: {
    position: "relative",
    width: "350px",
  },
}

function AddToping() {

  let navigate = useNavigate()
  const [preview, setPreview] = useState(null)
  const [DataToping, setDataToping] = useState({
    title: "",
    price: 0,
    image: "",
  })

  const handleOnChange = (e) => {
    setDataToping({
      ...DataToping,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
      // setPhotoProduct(<p className="txt-black">{url}</p>)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      // Store data with FormData as object
      const formData = new FormData()
      formData.set("title", DataToping.title)
      formData.set("price", DataToping.price)
      formData.set("image", DataToping.image[0], DataToping.image[0].title)

      // Insert product data
      const response = await API.post("/toping", formData, config)
      console.log(response)

      navigate("/topings")
    } catch (error) {
      console.log(error)
    }
  })

  // const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Container className="my-5">
        <Card className="mt-5" style={{ border: "white" }}>
          <Row>
            <Col sm={8}>
              <Card.Body className="m-auto" style={{ width: "80%" }}>
                <Card.Title className="mb-5" style={style.textTitle}>
                  Toping
                </Card.Title>
                <Form
                  onSubmit={(e) => handleSubmit.mutate(e)}
                  id="addToping"
                  className="m-auto mt-3 d-grid gap-2 w-100"
                >
                  <Form.Group className="mb-3 " controlId="nameProduct">
                    <Form.Control
                      onChange={handleOnChange}
                      name="title"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="text"
                      placeholder="Name Toping"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Control
                      onChange={handleOnChange}
                      name="price"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="number"
                      placeholder="Price"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="photoToping">
                    <Form.Control
                      onChange={handleOnChange}
                      name="image"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="file"
                      placeholder="Photo Toping"
                    />
                  </Form.Group>
                  <Button
                    variant="outline-light"
                    style={style.bgColor}
                    type="submit"
                  // onClick={() => {
                  //   setModalShow(true)
                  // }}
                  >
                    Add Toping
                  </Button>
                </Form>
              </Card.Body>
            </Col>
            {preview && (
              <Card.Img
                variant="top"
                src={preview}
                alt={preview}
                style={style.ImgToping}
              />
            )}
          </Row>
        </Card>
      </Container>
      {/* <ModalPopUpToping show={modalShow} onHide={() => setModalShow(false)} /> */}
    </>
  )
}

export default AddToping


// import "bootstrap/dist/css/bootstrap.min.css"
// import React, { useState } from "react"
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
// import { useMutation } from "react-query"
// import { API } from "../config/api"


// const style = {
//   textTitle: {
//     fontWeight: "600",
//     fontSize: "32px",
//     lineHeight: "49px",

//     color: "#BD0707",
//   },

//   textRed: {
//     color: "#BD0707",
//   },

//   bgColor: {
//     backgroundColor: "#BD0707",
//   },

//   textCenter: {
//     textAlign: "center",
//   },

//   link: {
//     fontWeight: "bold",
//     textDecoration: "none",
//     color: "black",
//   },

//   ImgToping: {
//     position: "relative",
//     width: "350px",
//   },
// }

// function FormToping() {
//   // const topings = []
//   const [preview, setPreview] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png");
//   const [form, setForm] = useState({
//     nameToping: "",
//     price: 0,
//     image: "",
//   })
//   // const addDataToping = JSON.parse(localStorage.getItem("DATA_TOPING"))

//   const handleOnChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]:
//         e.target.type === "file" ? e.target.files : e.target.value,
//     });

//     // Create image url for preview
//     if (e.target.type === "file") {
//       let url = URL.createObjectURL(e.target.files[0]);
//       setPreview(url);
//     }
//   };


//   const handleSubmit = useMutation(async (e) => {
//     try {
//       e.preventDefault();

//       // Store data with FormData as object
//       const formData = new FormData();
//       formData.set("image", form?.image[0], form?.image[0]?.name);
//       formData.set("title", form.title);
//       formData.set("price", form.price);
//       formData.set("qty", form.qty);

//       // Insert product data
//       const response = await API.post("/product", formData);
//       console.log(response)
//       navigate("/products");
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   return (
//     <Container className="my-5">
//       <Card className="mt-5" style={{ border: "white" }}>
//         <Row>
//           <Col sm={8}>
//             <Card.Body className="m-auto" style={{ width: "80%" }}>
//               <Card.Title className="mb-5" style={style.textTitle}>
//                 Toping
//               </Card.Title>
//               <Form
//                 onSubmit={handleOnSubmit}
//                 className="m-auto mt-3 d-grid gap-2 w-100"
//               >
//                 <Form.Group className="mb-3 " controlId="nameProduct">
//                   <Form.Control
//                     onChange={handleOnChange}
//                     value={DataToping.nameToping}
//                     name="nameToping"
//                     style={{ border: "2px solid #BD0707" }}
//                     type="text"
//                     placeholder="Name Toping"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="price">
//                   <Form.Control
//                     onChange={handleOnChange}
//                     value={DataToping.price}
//                     name="price"
//                     style={{ border: "2px solid #BD0707" }}
//                     type="number"
//                     placeholder="Price"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="photoProduct">
//                   <Form.Control
//                     onChange={handleOnChange}
//                     value={DataToping.imgToping}
//                     name="imgToping"
//                     style={{ border: "2px solid #BD0707" }}
//                     type="file"
//                     placeholder="Photo Product"
//                   />
//                 </Form.Group>
//                 <Button
//                   variant="outline-light"
//                   style={style.bgColor}
//                   type="submit"
//                 >
//                   Add Toping
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Col>
//           <Card.Img
//             variant="top"
//             src={DataToping.imgToping}
//             style={style.ImgToping}
//           />
//         </Row>
//       </Card>
//     </Container>
//   )
// }

// export default FormToping