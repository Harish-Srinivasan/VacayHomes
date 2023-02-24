import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertiesRow = (props) => {

  const properties = props.properties;
  const name = properties.title
  const [showResults, setShowResults] = React.useState(false)
  return (
    <div className="col-lg-6 col-md-5 col-s-12 col-xs-12 main-section mt-5 ">
      <div className="card shadow-sm mx-auto" style={{ width: '90%' }}>
        <a onClick={() => setShowResults(showResults => !showResults)}>
          <img src={properties.photo} className="card-img-top" alt="..." />
        </a>
        <div className="card-body">
          <span className="float-end text-muted"> {properties.ratings}/5 </span>
          <p className="card-text">{properties.city}</p>
          <p className="card-text"> {name}</p>
          <div className="d-flex justify-content-between align-items-center" >
            <div className="btn-group">
              <button className="button" class="btn btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </button>
            </div>
            <b>${properties.price} night</b>
          </div>
          {showResults ? <DetailsRow properties={properties} /> : null}
        </div>
      </div>
    </div>
  );
}
const DetailsRow = (props) => {
  const deleteProperty = () => {
    fetch("http://localhost:3000/properties/" + properties._id, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(window.alert("Property deleted successfully"))
      .catch(e => {
        console.log("e", e)
      })
  }
  const properties = props.properties;
  return (
    <div>
      <hr></hr>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{properties.description}</li>
        <li className="list-group-item">Amenities: {properties.amenities}</li>
        <li className="list-group-item">Bedrooms: {properties.bedrooms}</li>
        <li className="list-group-item">Guests: {properties.guests}</li>
        <li className="list-group-item">Cleaning fee: ${properties.cleaningFee}</li>
        <li className="list-group-item">Service fee: ${properties.serviceFee}</li>
      </ul>
      <Link to={`/updateProperty/${properties._id}`}>
        <button type="button" class="btn btn-primary">Update</button>
      </Link>
      <button type="button" onClick={deleteProperty} style={{ marginLeft: '10px' }} class="btn btn-primary">Delete</button>
    </div>
  );
}

const PropertiesTable = (props) => {

  const filterText = props.filterText;
  const isAvailable = props.isAvailable;
  const rows = [];

  props.properties.forEach((product) => {
    if (product.title.indexOf(filterText) === -1) {
      if (product.location.indexOf(filterText) === -1) {
        return;
      }
    }
    if (isAvailable && !product.available) {
      return;
    }

    rows.push(
      <PropertiesRow
        properties={product}
        key={product.title}
      />
    );
  });

  return (
    <div className="row">
      {rows}
    </div>
  );
}
const SearchBar = (props) => {

  return (
    <div className="input-group mb-3">
      <input type="text"
        placeholder="Search properties"
        value={props.filterText}
        onChange={(e) => { props.onFilterTextChange(e.target.value) }}
        className="form-control"
        aria-label="Text input with checkbox" />
      <div className="input-group-text">
        <input className="form-check-input mt-0"
          checked={props.isAvailable}
          onChange={(e) => { props.onInStockChange(e.target.checked) }}
          type="checkbox"
          value=""
          aria-label="Checkbox for following text input"
          style={{ marginRight: '10px' }} />
        <label> Show Available Only </label>
      </div>
    </div>
  );
}
export const PropertiesList = (props) => {
  const [filterText, setFilterText] = useState('');
  const [isAvailable, setisAvailable] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        isAvailable={isAvailable}
        onFilterTextChange={setFilterText}
        onInStockChange={setisAvailable}
      />
      <PropertiesTable
        properties={props.properties}
        filterText={filterText}
        isAvailable={isAvailable}
      />
    </div>
  );
}
function PropertiesAll() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const url = "http://localhost:3000/properties/";
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <PropertiesList properties={properties} />
  );
}
export default PropertiesAll;