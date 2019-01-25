import React, { Component } from "react";

import ItemList from "../ItemList";
import ItemDetails from "../ItemDetails";
import ErrorBoundry from "../ErrorBoundry";
import Row from "../Row";

import "./PeoplePage.css";

export default class PeoplePage extends Component {
  state = {
    selectedPerson: null
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
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.props.getData}
      >
        {i => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={personDetails} />;
  }
}
