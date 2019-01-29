import React, { Component } from "react";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import SwapiService from "../../services/swapi-service";
import TestSwapiService from "../../services/test-swapi-service";
import ErrorButton from "../ErrorButton";
import ErrorIndicator from "../ErrorIndicator";
import PeoplePage from "../PeoplePage";
import ErrorBoundry from "../ErrorBoundry";

import ItemList from "../ItemList";
import ItemDetails, { Record } from "../ItemDetails/ItemDetails";
import Row from "../Row";
import { SwapiServiceProvider } from "../SwapiServiceContext";

import "./App.css";

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from "../SwComponents";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new TestSwapiService()
  };

  onServiceChange = () => {
    //console.log("Change Context Value");
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? TestSwapiService : SwapiService;

      console.log("switched to: ", Service.name);

      return {
        swapiService: new Service()
      };
    });
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
    } = this.state.swapiService;

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
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />

            <PersonDetails itemId={11} />

            <PlanetDetails itemId={5} />

            <StarshipDetails itemId={9} />

            <PersonList />

            <StarshipList />

            <PlanetList />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
