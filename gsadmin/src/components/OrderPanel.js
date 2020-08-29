import React from 'react';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderPendingOrder({ order }) {
  const dishes = order.dishes.map((dish) => {
    return (
      <tr>
        <td>{dish.dish_name}</td>
        <td>{dish.quantity}</td>
        <td>{dish.quantity * dish.price / 100}</td>
      </tr>
    );
  })
  return (
    <Card>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {dishes}
            <tr>
              <td> </td>
              <th>Total Price</th>
              <th>{order.total_price}</th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
function RenderCompleteOrder({ order }) {
  const dishes = order.dishes.map((dish) => {
    return (
      <tr>
        <td>{dish.dish_name}</td>
        <td>{dish.quantity}</td>
        <td>{dish.quantity * dish.price / 100}</td>
      </tr>
    );
  })
  return (
    <Card>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {dishes}
            <tr>
              <td> </td>
              <th>Total Price</th>
              <th>{order.total_price / 100}</th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
function OrderPanel(props) {

  if(props.orders.isLoading)
  {
    return <div>
      <Loading />
    </div>
  }
  else if(props.orders.orders != null)
  {
    const pendingOrders = props.orders.orders.map((order) => {
      if (order.status == 0) {
        return (
          <div className="col-12">
            <RenderPendingOrder order={order} />
          </div>
        );
      }
      else return (<div>
        No pending
      </div>)
    });
    const completedOrders = props.orders.orders.map((order) => {
      if (order.status == 2) {
        return (
          <div className="col-12">
            <h3>Completed Orders</h3>
            <RenderCompleteOrder order={order} />
          </div>
        );
      }
      else return (<div>
        No Order Yet
      </div>)
    });
    return (
      <div className="container">
        <div className="row mt-2">
          {pendingOrders}
        </div>
        <div className="row mt-2">
          {completedOrders}
        </div>
      </div>
    );
  }   
  else return (
    <div>No Order Yet</div>
  );
}


export default OrderPanel;