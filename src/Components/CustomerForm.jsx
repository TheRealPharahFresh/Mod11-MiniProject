import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Container, Modal } from "react-bootstrap";

const CustomerForm = () => {
    const { customerId } = useParams(); 
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}`)
                .then(response => {
                    const { name, email, phone } = response.data;
                    setName(name);
                    setEmail(email);
                    setPhone(phone);
                })
                .catch(error => console.error("Error fetching customer data:", error));
        }
    }, [customerId]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "phone") setPhone(value);
    };

    
    const validateForm = () => {
        let newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!phone.trim()) newErrors.phone = "Phone is required";
        return newErrors;
    };

  
    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            const customerData = { name: name.trim(), email: email.trim(), phone: phone.trim() };

            const apiUrl = customerId
                ? `http://127.0.0.1:5000/customers/${customerId}`
                : "http://127.0.0.1:5000/customers";
            const httpMethod = customerId ? axios.put : axios.post;

            httpMethod(apiUrl, customerData)
                .then(() => {
                    setShowSuccessModal(true);
                })
                .catch(error => {
                    console.error("Error submitting form:", error);
                    setIsLoading(false);
                });
        } else {
            setErrors(newErrors);
        }
    };

   
    const closeModal = () => {
        setShowSuccessModal(false);
        navigate("/customers");
    };

    return (
        <Container>
            {isLoading && <Alert variant="info">Submitting customer data...</Alert>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={name} onChange={handleChange} />
                    {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" value={email} onChange={handleChange} />
                    {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                </Form.Group>

                <Form.Group controlId="formGroupPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" name="phone" value={phone} onChange={handleChange} />
                    {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    {customerId ? "Update Customer" : "Add Customer"}
                </Button>
            </Form>

            
            <Modal show={showSuccessModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The customer has been successfully {customerId ? "updated" : "added"}.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CustomerForm;

