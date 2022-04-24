import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [ordersTotal, setOrdersTotal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    try {
      const { data } = await axios.get("/checkout/orders");
      setOrders(data.allOrders);
      setOrdersTotal(data.subTotal);
      setLoading(false);
    } catch (error) {}
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <Card className="my-3 rounded" key={index}>
            <Card.Header as="h5">{`Order ${index + 1}`}</Card.Header>
            {order.map((item, index) => (
              <Card.Body key={index}>
                <Card.Title>{item.productName}</Card.Title>
                <Card.Text>{`Quantity: ${item.quantity}`}</Card.Text>
                <Card.Text>{`Price: ${item.price}$`}</Card.Text>
              </Card.Body>
            ))}
            <Card.Footer
              className="text-muted"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <b>{`Shipping Address: ${order[0].address}`}</b>
              <b>{`Total: ${ordersTotal[index]}$`}</b>
            </Card.Footer>
          </Card>
        ))
      ) : (
        <div>Empty Orders</div>
      )}
    </>
  );
};

export default OrdersPage;
