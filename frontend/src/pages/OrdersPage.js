import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [ordersTotal, setOrdersTotal] = useState([]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/orders", config);

      setOrders(data.allOrders);
      setOrdersTotal(data.subTotal);
      setLoading(false);
    } catch (error) {
      if (error.response.data.statusCode == 400) {
        setAlert(error.response.data.msg);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {alert && alert.includes("no orders") ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>{alert}</h1>
          <Link to="/">Start Shopping</Link>
        </div>
      ) : (
        orders.length > 0 &&
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
      )}
    </>
  );
};

export default OrdersPage;
