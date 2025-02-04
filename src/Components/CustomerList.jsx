import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import { Button, Alert, Container, ListGroup } from "react-bootstrap";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    
    useEffect(() => {
        fetchCustomers();
    }, []);

   
    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/customers");
            setCustomers(response.data);
            console.log("Fetched customers:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching customers. Please try again later.");
        }
    };

    
    const selectCustomer = (id) => {
        navigate(`/customers/${id}`); 
    };

    
    const deleteCustomer = async (customerId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${customerId}`);
            setCustomers(customers.filter(customer => customer.id !== customerId)); 
        } catch (error) {
            console.error("Error deleting customer:", error);
            setError("Error deleting customer. Please try again.");
        }
    };

    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            <h3 className="mt-3 mb-3 text-center">Customers</h3>
            <ListGroup>
                {customers.map(customer => (
                    <ListGroup.Item 
                        key={customer.id} 
                        className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
                    >
                        <p>{customer.id}</p>
                        <span 
                            className="text-primary cursor-pointer" 
                            onClick={() => selectCustomer(customer.id)} 
                            style={{ cursor: "pointer" }}
                        >
                            {customer.name}
                        </span>
                        <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => deleteCustomer(customer.id)}
                        >
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default CustomerList;

