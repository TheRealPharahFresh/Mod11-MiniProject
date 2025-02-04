import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Products</h3>
                    {products.length === 0 ? (
                        <p>No products available.</p>
                    ) : (
                        <ListGroup>
                            {products.map((product) => (
                                <ListGroup.Item
                                    key={product.id}
                                    className="d-flex justify-content-between align-items-center shadow-sm mb-3 bg-white rounded"
                                >
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`/products/${product.id}`)} 
                                    >
                                        {product.name} (ID: {product.id})
                                    </div>
                                    <div>
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/edit-product/${product.id}`)}
                                            className="me-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteProduct(product.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;


