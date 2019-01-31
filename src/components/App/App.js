import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import SwapiService from "../../services/swapi-service";
import TestSwapiService from "../../services/test-swapi-service";
import ErrorBoundry from "../ErrorBoundry";

import { SwapiServiceProvider } from "../SwapiServiceContext";

import { PeoplePage, PlanetPage, StarshipPage } from "../Pages";

import "./App.css";

export default class App extends Component {
  state = {
    swapiService: new SwapiService()
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

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetPage} />
              <Route path="/starships" component={StarshipPage} />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
