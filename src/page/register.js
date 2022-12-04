import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../config/api';

export default function Register({ show, showLogin, showRegister }) {
  const handleClose = () => showRegister(false)
  const changeModal = () => {
    handleClose()
    showLogin(true)
  }

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: "user"
  });

  const { username, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegis = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const requestBody = JSON.stringify(form);
      const response = await API.post("/register", requestBody, config)

      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success Registered
          </Alert>
        );
        setMessage(alert);
        setForm({
          username: '',
          email: '',
          password: '',
          role: 'user'
        });
      } else {
        const alert = (
          <Alert variant="warning" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }


    } catch (error) {
      const alert = (
        <Alert variant='danger' className='py-1'>Email is Already!</Alert>
      );
      setMessage(alert);
      console.log(error)
    }
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      centered
    >
      <Modal.Body>
        <Modal.Title className="mb-3">Register</Modal.Title>
        {message && message}
        <Form onSubmit={(e) => handleRegis.mutate(e)}>
          <Form.Control
            type="email"
            placeholder="Email"
            className="mb-3"
            name='email'

            onChange={handleChange}
            value={email}
          />

          <Form.Control
            type="password"
            placeholder="Password"
            className="mb-3"
            name='password'

            onChange={handleChange}
            value={password}
          />

          <Form.Control
            type="text"
            placeholder="Username"
            className="mb-3"
            name="username"

            onChange={handleChange}
            value={username}
          />

          <div className="d-grid mb-2">
            <Button type='submit' variant='danger'>
              Register
            </Button>
          </div>

          <Form.Label>Already have an account ? Click <b variant="link" onClick={changeModal} style={{ cursor: 'pointer' }}>Here</b></Form.Label>

        </Form>
      </Modal.Body>
    </Modal>
  );
}