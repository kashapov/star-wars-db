import React, { Component } from "react";

import SwapiSevice from "../../services/swapi-service";
import Spinner from "../Spinner";

import "./PersonDetails.css";

export default class PersonDetails extends Component {
  swapiServise = new SwapiSevice();

  state = {
    person: null,
    loading: true
  };

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState(() => {
        return {
          loading: true
        };
      });
      this.updatePerson();
    }
  }

  componentDidMount() {
    this.updatePerson();
    //this.setState({ loading: true });
  }

  onPersonLoaded = person => {
    this.setState({
      person,
      loading: false
    });
  };

  updatePerson() {
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapiServise.getPerson(personId).then(this.onPersonLoaded);

    //this.setState({ loading: false });
  }

  render() {
    const { person, loading } = this.state;
    const { personId } = this.props;

    const spinner = loading && personId ? <Spinner /> : null;
    let content = !loading ? <PersonView person={person} /> : null;

    if (!personId) {
      content = <span>Select a person from a list</span>;
    }

    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <React.Fragment>
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
