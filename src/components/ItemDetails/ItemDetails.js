import React, { Component } from "react";

import SwapiSevice from "../../services/swapi-service";
import Spinner from "../Spinner";
import ErrorButton from "../ErrorButton";

import "./ItemDetails.css";

export default class ItemDetails extends Component {
  swapiServise = new SwapiSevice();

  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState(() => {
        return {
          loading: true
        };
      });
      this.updateItem();
    }
  }

  componentDidMount() {
    this.updateItem();
    //this.setState({ loading: true });
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId).then(item => {
      this.setState({
        item,
        image: getImageUrl(item),
        loading: false
      });
    });

    //this.setState({ loading: false });
  }

  render() {
    const { item, loading, image } = this.state;
    const { itemId } = this.props;

    const spinner = loading && itemId ? <Spinner /> : null;
    let content = !loading ? <ItemView item={item} image={image} /> : null;

    if (!itemId) {
      content = <span>Select a person from a list</span>;
    }

    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

const ItemView = ({ item, image }) => {
  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <React.Fragment>
      <img className="item-image" src={image} />

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
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};
