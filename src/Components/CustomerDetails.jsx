import { Component } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        console.log("CustomerDetails - Received customerId:", this.props.customerId); 
        this.fetchCustomerDetails(this.props.customerId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerId !== this.props.customerId) {
            console.log("CustomerDetails - New customerId detected:", this.props.customerId);
            this.setState({ loading: true }, () => {
                this.fetchCustomerDetails(this.props.customerId);
            });
        }
    }

    fetchCustomerDetails = (customerId) => {
        const numericId = Number(customerId);
        console.log("Fetching details for customer ID:", numericId, " (Type:", typeof numericId, ")");
    
        if (isNaN(numericId) || numericId <= 0) {
            this.setState({ error: 'Invalid customer ID.', loading: false });
            return;
        }
    
        axios.get(`http://127.0.0.1:5000/customers/${numericId}`)
            .then(response => {
                console.log("Customer details fetched:", response.data);
                this.setState({ customer: response.data, loading: false });
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
                this.setState({ error: 'Error fetching customer details. Please try again.', loading: false });
            });
    }
    
    
    render() {
        const { customer, loading, error } = this.state;

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
                        <h3 className="mb-3">{customer.name}</h3>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
                        <p><strong>Address:</strong> {customer.address || "N/A"}</p>
                        <Link to='/customers'>
                            <Button variant='primary' className='mt-3'>Back To Customers</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}


export default CustomerDetails;


