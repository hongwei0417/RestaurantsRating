import React, { Component } from "react";
import { Button, Table } from 'react-bootstrap'
export class ShowRestaurants extends Component {
  handleChange = (restaurant, i) => {
    let _restaurant = restaurant;
    this.props.vote(_restaurant, i);
  };
  render() {
    let restaurantList = this.props.restaurants.map((restaurant, i) => (
      <tr key={i}>
        <td onClick={this.handleChange.bind(this, restaurant, i)}>
          {restaurant.name}
        </td>
        <td>{restaurant.rating}</td>
        <td>
          <Button onClick={this.handleChange.bind(this, restaurant, i)}>
            投票
          </Button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h3>美食餐廳投票系統</h3>
        <hr />
        <Table striped bordered  hover>
          <thead>
            <tr>
              <th>餐廳</th>
              <th>投票數</th>
              <th />
            </tr>
          </thead>
          <tbody>{restaurantList}</tbody>
        </Table>
      </div>
    );
  }
}
export default ShowRestaurants;
