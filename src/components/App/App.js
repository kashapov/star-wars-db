import React, { Component } from "react";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../ErrorButton";
import ErrorIndicator from "../ErrorIndicator";
import PeoplePage from "../PeoplePage";
import ErrorBoundry from "../ErrorBoundry";

import ItemList from "../ItemList";
import ItemDetails, { Record } from "../ItemDetails/ItemDetails";
import Row from "../Row";

import "./App.css";

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from "../sw-components";


export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getAllPeople,
      getAllPlanets
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <PersonDetails itemId={11} />

          <PlanetDetails itemId={5} />

          <StarshipDetails itemId={9} />

          <PersonList />

          <StarshipList />

          <PlanetList />
        </div>
      </ErrorBoundry>
    );
  }
}
