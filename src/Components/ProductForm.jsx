import { useEffect, useState } from "react";
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderForm = () => {
  const [order, setOrder] = useState({ customer_id: "", status: "Pending", products: [] });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:5000/orders/${id}`)
        .then((response) => {
          setOrder(response.data);
        })
        .catch((error) => setErrorMessage(error.message));
    }
  }, [id]);

  const validateForm = () => {
    let errors = {};
    if (!order.customer_id) errors.customer_id = "Customer is required";
    if (!order.status) errors.status = "Order status is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:5000/orders/${id}`, order);
      } else {
        await axios.post("http://127.0.0.1:5000/orders", order);
      }
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setOrder({ customer_id: "", status: "Pending", products: [] });
    setSubmitting(false);
    navigate("/orders");
  };

  if (isSubmitting) return <p>Submitting order data....</p>;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>{id ? "Edit" : "Add"} Product</h3>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form.Group controlId="customerId">
          <Form.Label>Customer ID:</Form.Label>
          <Form.Control
            type="text"
            name="customer_id"
            value={order.customer_id}
            onChange={handleChange}
            isInvalid={!!errors.customer_id}
          />
          <Form.Control.Feedback type="invalid">
            {errors.customer_id}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="orderStatus">
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={order.status}
            onChange={handleChange}
            isInvalid={!!errors.status}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.status}
          </Form.Control.Feedback>
        </Form.Group>

        

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : "Submit"}
        </Button>
      </Form>

      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Order has been successfully {id ? "updated" : "added"}!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderForm;

