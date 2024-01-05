import React, { Component } from "react";
import CardSection from "./components/CardSection";
import Header from "./components/Header";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data: {},
    };
  }

  curr = "solana";

  fetchData = async () => {
    let data = await fetch(
      "https://api.coingecko.com/api/v3/coins/" + this.state.Id
    );
    let jsonData = await data.json();

    this.setState({ Id: "Solana", Data: jsonData });
  };

  handleSubmit = async (event) => {
    console.log(event.target.value);
    await this.setState({ Id: event.target.value, Data: this.state.Data });
    this.fetchData();
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        {console.log(this.state.Data)}

        <Header handleSubmit={this.handleSubmit} />
        <CardSection
          coinName={this.state.Data.name}
          currentPrice={
            this.state.Data.market_data
              ? this.state.Data.market_data.current_price["usd"]
              : ""
          }
          mcap24={
            this.state.Data.market_data
              ? this.state.Data.market_data.market_cap_change_percentage_24h
              : ""
          }
          ath={
            this.state.Data.market_data
              ? this.state.Data.market_data.ath.usd
              : ""
          }
          atl={
            this.state.Data.market_data
              ? this.state.Data.market_data.ath.usd
              : ""
          }
          sentiment={this.state.Data.sentiment_votes_up_percentage}
          high24={
            this.state.Data.market_data
              ? this.state.Data.market_data.high_24h["usd"]
              : ""
          }
          low24={
            this.state.Data.market_data
              ? this.state.Data.market_data.low_24h["usd"]
              : ""
          }
        />
      </div>
    );
  }
}
