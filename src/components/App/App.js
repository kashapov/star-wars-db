import React, { Component } from "react";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../ErrorButton";
import ErrorIndicator from "../ErrorIndicator";
import PeoplePage from "../PeoplePage";

import ItemList from "../ItemList";
import ItemDetails from "../ItemDetails";
import Row from "../Row";

import "./App.css";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const { getPerson, getStarship , getPersonImage, getStarshipImage} = this.swapiService;

    const personDetails = <ItemDetails itemId={11} getData={getPerson}
    getImageUrl={getPersonImage} />;

    const starshipDetails = <ItemDetails itemId={5} getData={getStarship} getImageUrl={getStarshipImage} />;

    return (
      <div className="stardb-app">
        <Header />
        {/*{planet}

<div className="row mb2 button-row">
  <button
    className="toggle-planet btn btn-warning btn-lg"
    onClick={this.toggleRandomPlanet}
  >
    Toggle Random Planet
  </button>
  <ErrorButton />
</div>*/}

        {/*<PeoplePage
          getData={this.swapiService.getAllPeople}
          renderItem={item => item.name}
        />*/}

        <Row left={personDetails} right={starshipDetails} />

        {/*
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={item => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={item => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

*/}
      </div>
    );
  }
}
