import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { Link,  useParams } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams(); 
    
    const [order, setOrder] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        console.log("OrderDetails - Received order ID:", id);
        fetchOrderDetails(id);
    }, [id]);

    const fetchOrderDetails = (orderId) => {
        const numericId = Number(orderId);
        console.log("Fetching details for order ID:", numericId, " (Type:", typeof numericId, ")");
    
        if (isNaN(numericId) || numericId <= 0) {
            setError('Invalid order ID.');
            setLoading(false);
            return;
        }

        axios.get(`http://127.0.0.1:5000/orders/${numericId}`)
            .then(response => {
                console.log("Order details fetched:", response.data);
                setOrder(response.data); 
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
                setError('Error fetching order details. Please try again.');
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
                    <h3 className="mb-3">Order #{order?.id}</h3> 
                    <p><strong>Customer ID:</strong> {order?.customer_id}</p>
                    <p><strong>Status:</strong> {order?.status ?? "N/A"}</p>
                    <p><strong>Date:</strong> {new Date(order?.date).toLocaleDateString()}</p>
                    <ul>
                        {order?.products.map((product, index) => (
                            <li key={index}>
                                Product ID: {product.product_id}, Quantity: {product.quantity}
                            </li>
                        ))}
                    </ul>
                    <Link to="/orders">
                        <Button variant="primary" className="mt-3">Back To Orders</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderDetails;
