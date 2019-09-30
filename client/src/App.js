import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import RatingContract from './contracts/Rating.json'
import getWeb3 from "./utils/getWeb3";
import Web3 from 'web3'


import "./App.css";
import "./ShowRestaurants"
import ShowRestaurants from "./ShowRestaurants";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, contract2: null,  restaurants : [] };

  constructor(props) {
      super(props)
      this.handleVoting=this.handleVoting.bind(this)
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)


      // Get the contract instance.

      const instance = null
      const networkId = await web3.eth.net.getId();

      // const deployedNetwork = RatingContract.networks[networkId];

      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      const deployedNetwork = RatingContract.networks[networkId];

      const restaurant_instance = new web3.eth.Contract(
        RatingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log(restaurant_instance)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, contract2: restaurant_instance}, this.getTotalVotes);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getTotalVotes = async () => {
    const { contract2 } = this.state

    let restaurants = []
    let bytes_restaurantList = await contract2.methods.getRestaurantList().call()
    console.log(bytes_restaurantList)

    for(let i = 0; i < bytes_restaurantList.length; i++) {
      let name = Web3.utils.hexToUtf8(bytes_restaurantList[i])
      let rating = await contract2.methods.totalVotesFor(bytes_restaurantList[i]).call();
      restaurants.push({name, rating})
    }

    this.setState({restaurants})
  }

  run = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] }).on('transactionHash', function(hash){
      console.log(hash);
    })
    console.log(contract)

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  handleVoting = async (_restaurant, i) => {
    try {
      const { accounts, contract2 } = this.state;
      let restaurants = this.state.restaurants
      restaurants[i] = _restaurant
      let bytes_restaurant = Web3.utils.utf8ToHex(restaurants[i].name)

      await contract2.methods.voteForRestaurant(bytes_restaurant).send({ from: accounts[0] })
      .on('transactionHash', function(hash){
          console.log(hash);
      })

      restaurants[i].rating = await contract2.methods.totalVotesFor(bytes_restaurant).call();

      console.log(restaurants)

      this.setState({ restaurants })
      
    } catch(e) {
      console.error(e)
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return 1 == 1 ? <ShowRestaurants restaurants={this.state.restaurants} vote={this.handleVoting.bind(this)} /> : (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
