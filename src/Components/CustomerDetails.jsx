import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";


const CustomerDetails = () => {
    const { customerId } = useParams(); 
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    
    useEffect(() => {
        console.log("CustomerDetails - Received customerId:", customerId);
        fetchCustomerDetails(customerId);
    }, [customerId]); 

    
    const fetchCustomerDetails = (customerId) => {
        const numericId = Number(customerId);
        console.log("Fetching details for customer ID:", numericId, " (Type:", typeof numericId, ")");
    
        if (isNaN(numericId) || numericId <= 0) { 
            setError('Invalid customer ID.');
            setLoading(false);
            return;
        }
    
        
        axios.get(`http://127.0.0.1:5000/customers/${numericId}`)
            .then(response => {
                console.log("Customer details fetched:", response.data);
                setCustomer(response.data); 
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
                setError('Error fetching customer details. Please try again.');
                setLoading(false);
            });
    };

    
    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-4" />;
    }


    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

  
    return (
        <Container>
            <Card className="shadow-sm mt-4">
                <Card.Body>
                    <h3 className="mb-3">{customer?.name}</h3> 
                    <p><strong>Email:</strong> {customer?.email}</p>
                    <p><strong>Phone:</strong> {customer?.phone ?? "N/A"}</p> 
                    <p><strong>Address:</strong> {customer?.address ?? "N/A"}</p>
                    <Link to="/customers">
                        <Button variant="primary" className="mt-3">Back To Customers</Button>
                    </Link>
                    <Button className="ms-3 mt-3" variant='primary' onClick={() => navigate(`/edit-customer/${customer.id}`)}>Edit Customer

                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CustomerDetails;



