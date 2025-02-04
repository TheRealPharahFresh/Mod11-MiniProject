import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';

const ProductDetails = () => {
    const { productId } = useParams(); 
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductDetails(productId); 
    }, [productId]);

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Error fetching product details. Please try again.');
            setLoading(false);
        }
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
                    <h3 className="mb-3">{product?.name}</h3>
                    <p><strong>Description:</strong> {product?.description}</p>
                    <p><strong>Price:</strong> ${product?.price}</p>
                    <p><strong>Stock:</strong> {product?.stock}</p>
                    <Button variant="primary" onClick={() => navigate(`/edit-product/${product.id}`)} className="mt-3">
                        Edit Product
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetails;

