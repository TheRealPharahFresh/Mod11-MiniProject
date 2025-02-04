import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

const PlaceOrderForm = () => {
  const [order, setOrder] = useState({
    customer_id: "",
    order_date: "",
    products: [{ product_id: "", quantity: "" }] // Initializing an empty product object in an array
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, index, property] = name.split("-");
    if (field === "products") {
      const updatedProducts = [...order.products];
      updatedProducts[index][property] = value;
      setOrder({
        ...order,
        products: updatedProducts
      });
    } else {
      setOrder({
        ...order,
        [name]: value
      });
    }
  };


  const addProduct = () => {
    setOrder({
      ...order,
      products: [...order.products, { product_id: "", quantity: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:5000/orders', order);
        console.log('Order placed successfully:', response.data);
    }catch (error) {
        console.error('Error placing order:', error);
    }


  }
    

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="customer_id">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control
          type="text"
          name="customer_id"
          value={order.customer_id}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="order_date">
        <Form.Label>Order Date</Form.Label>
        <Form.Control
          type="date"
          name="order_date"
          value={order.order_date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {order.products.map((product, index) => (
        <div key={index}>
          <Form.Group controlId={`products-${index}-product_id`}>
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              name={`products-${index}-product_id`}
              value={product.product_id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId={`products-${index}-quantity`}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name={`products-${index}-quantity`}
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>
      ))}

      <Button type="button" onClick={addProduct}>
        Add Product
      </Button>

      <Button type="submit">Place Order</Button>
    </Form>
  );
};

export default PlaceOrderForm;


