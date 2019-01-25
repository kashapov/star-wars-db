import React, { Component } from "react";

import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";
import ErrorIndicator from "../ErrorIndicator";
import Row from "../Row";

import "./PeoplePage.css";



export default class PeoplePage extends Component {
  state = {
    selectedPerson: null,
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  onPersonSelected = selectedPerson => {
    this.setState({ selectedPerson });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.props.getData}
        renderItem={({ name, gender, birthYear }) =>
          `${name} (${gender}, ${birthYear})`
        }
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return <Row left={itemList} right={personDetails} />;
  }
}
