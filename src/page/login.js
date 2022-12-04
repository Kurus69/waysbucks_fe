import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { API } from '../config/api';
import { useMutation } from 'react-query';
import { UserContext } from '../context/userContext';

export default function Login({ show, showLogin, showRegister }) {

  const handleClose = () => showLogin(false)
  const changeModal = () => {
    handleClose()
    showRegister(true)
  }

  ///loginn
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()
      const response = await API.post('/login', form)
      const alert = (<Alert variant='success' className='py-1'>
        Success
      </Alert>)
      setMessage(alert)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      })
      handleClose();
      console.log("data berhasil ditambahkan", response.data.data)
    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        Wrong Email or Password !
      </Alert>)
      setMessage(alert)
      console.log(err)
    }
  })

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      centered
    >
      <Modal.Body>
        <Modal.Title className="mb-3">Login</Modal.Title>
        {message && message}
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Control
            type="email"
            placeholder="Email"
            className="mb-3"
            name='email'

            onChange={handleChange}
          />

          <Form.Control
            type="password"
            placeholder="Password"
            className="mb-3"
            name='password'

            onChange={handleChange}
          />

          <div className="d-grid mb-2">
            <Button type="submit" variant='danger'>
              Login
            </Button>
          </div>

          <Form.Label>Don't have an account ? Click <b variant="link" onClick={changeModal} style={{ cursor: 'pointer' }}>Here</b></Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  );
}