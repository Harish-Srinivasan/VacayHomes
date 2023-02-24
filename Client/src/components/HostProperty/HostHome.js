import React, { useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileBase64 from 'react-file-base64';
import HostPropertiesAll from './HostProperties';

function Welcome() {
    const [data, setProperty] = useState({
        title: '', description: '', city: '', state: '', country: '', photo: '', price: '',
        cleaningFee: '', serviceFee: '', amenities: '', bedrooms: '', bathrooms: '', guests: '', available: ''
    })

    const updateValue = (e) => {

        setProperty({ ...data, [e.target.id]: e.target.value });
    }

    const submitData = (e) => {
        e.preventDefault()
        const dataProperty = {
            title: data.title,
            description: data.description,
            city: data.city,
            state: data.state,
            country: data.country,
            photo: data.photo,
            price: data.price,
            cleaningFee: data.cleaningFee,
            serviceFee: data.serviceFee,
            amenities: data.amenities,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            guests: data.guests,
            available: true

        }
        fetch("http://localhost:3000/properties", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataProperty)
        })
            .then(response => response.json())
            .then(window.alert("Property added successfully"))
            .catch(e => {
                console.log("e", e)
            })

    }
    return (
        <div>
            <div id="root">
                <div className="container-fluid text-center" style={{ marginTop: '30px' }}>
                    <div className="row">
                        <div className="col-md-2 side-section">
                            <div>
                                <div className="d-flex justify-content-center">
                                    <div className="card" style={{ marginTop: '15px', marginBottom: '15px' }}>
                                        <div className="card-body">
                                            <form>
                                                <h5>Add Property</h5>
                                                <div class="form-inline">
                                                    <label for="title">Title:</label>
                                                    <input type="text" className="form-control" id="title" aria-describedby="title" onChange={updateValue} placeholder="Enter title" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>
                                                <div class="form-inline">
                                                    <label for="description">Description:</label>
                                                    <input type="text" className="form-control" id="description" aria-describedby="description" onChange={updateValue} placeholder="Enter description" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>
                                                <div class="form-inline">
                                                    <label for="city">City:</label>
                                                    <input type="text" className="form-control" id="city" aria-describedby="city" onChange={updateValue} placeholder="Enter city" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>
                                                <div class="form-inline">
                                                    <label for="state">State:</label>
                                                    <input type="text" className="form-control" id="state" aria-describedby="state" onChange={updateValue} placeholder="Enter state" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>
                                                <div class="form-inline">
                                                    <label for="country">Country:</label>
                                                    <input type="text" className="form-control" id="country" aria-describedby="country" onChange={updateValue} placeholder="Enter country" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>
                                                <div class="form-inline">
                                                    <label for="photo">Photo:</label>
                                                    <FileBase64 multiple={false} onDone={({ base64 }) => setProperty({ ...data, photo: base64 })} />
                                                </div>

                                                <div class="form-inline">
                                                    <label for="price">Price:</label>
                                                    <input type="text" className="form-control" id="price" aria-describedby="price" onChange={updateValue} placeholder="Enter price" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>

                                                <div class="form-inline">
                                                    <label for="cleaningFee">Cleaning Fee:</label>
                                                    <input type="text" className="form-control" id="cleaningFee" aria-describedby="cleaningFee" onChange={updateValue} placeholder="Enter cleaning fee" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>

                                                <div class="form-inline">
                                                    <label for="serviceFee">Service Fee:</label>
                                                    <input type="text" className="form-control" id="serviceFee" aria-describedby="serviceFee" onChange={updateValue} placeholder="Enter service fee" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>

                                                <div class="form-inline">
                                                    <label for="amenities">Amenities:</label>
                                                    <input type="text" className="form-control" id="amenities" aria-describedby="amenities" onChange={updateValue} placeholder="Enter amenities" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>

                                                <div class="form-inline">
                                                    <label for="bedrooms">Number of bedrooms:</label>
                                                    <input type="text" className="form-control" id="bedrooms" aria-describedby="bedrooms" onChange={updateValue} placeholder="Enter number of bedrooms" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>

                                                <div class="form-inline">
                                                    <label for="bathrooms">Number of bathrooms:</label>
                                                    <input type="text" className="form-control" id="bathrooms" aria-describedby="bathrooms" onChange={updateValue} placeholder="Enter number of bathrooms" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>

                                                <div class="form-inline">
                                                    <label for="guests">Number of guests:</label>
                                                    <input type="text" className="form-control" id="guests" aria-describedby="guests" onChange={updateValue} placeholder="Enter number of guests" style={{ marginTop: '5px', marginBottom: '5px' }} />
                                                </div>

                                                <button type="button" id="submit" className="btn btn-primary" style={{ marginTop: '15px', marginBottom: '15px' }} onClick={submitData}>Submit</button>
                                                <Link to={"/HostHome"}><button className="btn btn-primary" style={{ marginLeft: '10px', marginTop: '15px', marginBottom: '15px' }}>Return Home</button></Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="container-fluid" style={{ marginTop: '30px' }}>
                                <div className="main">
                                    <HostPropertiesAll />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcome;