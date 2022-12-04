import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { API } from "../config/api"
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "react-query";

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

  ImgProduct: {
    position: "relative",
    width: "350px",
  },

  // Image Product 1
  ImgLogo: {
    position: "absolute",
    width: "130px",
    height: "auto",
    top: "35%",
    left: "77%",
  },
}

function FormUpdateProduct() {
  const { id } = useParams()

  let navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: 0,
    qty: 0,
  });

  let { data: products } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data
  })

  useEffect(() => {
    if (products) {
      setPreview(products.image)
      setForm({
        ...form,
        title: products.title,
        price: products.price,
        qty: products.qty,
      })
      setProduct(products)
    }
  }, [products])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
      // setPhotoProduct(<p className="txt-black">{url}</p>)
    }
  };


  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form.image[0], form.image[0]?.title);
      }
      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      // Insert product data
      const response = await API.patch("/product/" + product.id, formData, config);
      console.log("response update =>", response)
      navigate("/products")
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container className="my-5">
      <Card className="mt-5" style={{ border: "white" }}>
        <Row>
          <Col sm={8}>
            <Card.Body className="m-auto" style={{ width: "80%" }}>
              <Card.Title className="mb-5" style={style.textTitle}>
                Update Product
              </Card.Title>
              <Form
                onSubmit={(e) => handleSubmit.mutate(e)}
                className="m-auto mt-3 d-grid gap-2 w-100"
              >
                <Form.Group className="mb-3 " controlId="title">
                  <Form.Control
                    onChange={handleChange}
                    name="title"
                    style={{
                      border: "2px solid #BD0707",
                      backgroundColor: "#E0C8C840",
                    }}
                    type="text"
                    placeholder="Name Product"
                    value={form.title}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Control
                    onChange={handleChange}
                    name="price"
                    style={{ border: "2px solid #BD0707" }}
                    type="text"
                    placeholder="Price"
                    value={form.price}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Control
                    onChange={handleChange}
                    name="qty"
                    style={{ border: "2px solid #BD0707" }}
                    type="number"
                    placeholder="qty"
                    value={form.qty}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Control
                    onChange={handleChange}
                    name="image"
                    style={{ border: "2px solid #BD0707" }}
                    type="file"
                    placeholder="Photo Product"
                  />
                </Form.Group>
                <Button
                  variant="outline-light"
                  style={style.bgColor}
                  type="submit"
                >
                  Update Product
                </Button>
              </Form>
            </Card.Body>
          </Col>
          {
            preview && (
              <Card.Img
                variant="top"
                src={preview}
                style={style.ImgProduct}
              />
            )
          }
        </Row>
      </Card>
    </Container>
  )
}

export default FormUpdateProduct