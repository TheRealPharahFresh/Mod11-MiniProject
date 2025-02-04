import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  
  const fetchOrders = useCallback( async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },);


  const viewOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };


  const placeNewOrder = () => {
    navigate('/place-order');
  };

  useEffect(() => {
      fetchOrders();
  },  [fetchOrders]);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Orders</h3>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <ListGroup>
              {orders.map((order) => (
                <ListGroup.Item
                  key={order.id}
                  className="d-flex justify-content-between align-items-center shadow-sm mb-3 bg-white rounded"
                >
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => viewOrderDetails(order.id)}
                  >
                    Order ID: {order.id} (Date: {order.date})
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <Button variant="primary" onClick={placeNewOrder}>
            Place New Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderList;

