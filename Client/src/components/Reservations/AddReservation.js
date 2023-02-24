import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

function AddReservation() {
    let navigate = useNavigate();
    const [data, setProperty] = useState({ startDate: '', endDate: '' })
    const { id } = useParams();
    const [properties, setProperties] = useState([]);

    const updateValue = (e) => {
        setProperty({ ...data, [e.target.id]: e.target.value });
    }
    var today = new Date();
    console.log(data.startDate)
    const submitData = async (e) => {
        e.preventDefault()
        const url = "http://localhost:3000/properties/" + id;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setProperties(data))
            .catch(err => console.error(err));

        const localstorage_user = JSON.parse(localStorage.getItem('user'))
        console.log(localstorage_user)

        const getDatesInRange = (values) => {
            const startdate = new Date(values.startDate);
            const enddate = new Date(values.endDate);
            let list = [];
            while (startdate <= enddate) {
                list.push(((new Date(startdate)).getFullYear() + '-' + (new Date(startdate)).getMonth() + '-' + (new Date(startdate)).getDate()).toString())
                startdate.setDate(startdate.getDate() + 1)
            }
            return list;
        }

        fetch("http://localhost:3000/properties/" + properties._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(properties)
        });

        const dataReservation = {
            PropertyId: id,
            PropertyTitle: properties.title,
            StartDate: data.startDate,
            EndDate: data.endDate,
            BookingDate: today,
            PricePerNight: properties.price,
            UserId: localstorage_user._id
        }

        fetch("http://localhost:3000/reservations/" + localstorage_user._id + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataReservation)
        });
        window.alert("Reservation added successfully");
        navigate('/');


    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="card" style={{ marginTop: '15px', marginBottom: '15px' }}>
                    <div className="card-body">
                        <form>
                            <h5>Add Reservation</h5>
                            <div class="form-inline">
                                <label for="startDate">Check-in Date:</label>
                                <input type="date" className="form-control" id="startDate" aria-describedby="startDate" onChange={updateValue} min="2022-01-01" max="2022-12-31" style={{ marginTop: '5px', marginBottom: '5px' }} />
                            </div>
                            <div class="form-inline">
                                <label for="endDate">Check-out Date:</label>
                                <input type="date" className="form-control" id="endDate" aria-describedby="endDate" onChange={updateValue} min="2022-01-01" max="2022-12-31" style={{ marginTop: '5px', marginBottom: '5px' }} />
                            </div>
                            <button type="button" id="submit" className="btn btn-primary" style={{ marginTop: '15px', marginBottom: '15px' }} onClick={submitData}>Submit</button>
                            <Link to={"/"}><button className="btn btn-primary" style={{ marginLeft: '10px', marginTop: '15px', marginBottom: '15px' }}>Return Home</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReservation;