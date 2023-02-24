import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CancelReservation from './CancelReservation'

function Reservations() {
    var pastdetails = [];
    var futuredetails = [];
    const [reservations, setReservations] = useState([]);
    const today =  new Date();

    useEffect (() => {
        const localstorage_user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:3000/reservations/' + localstorage_user._id, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log('Got the reservations');
            setReservations(data);
        })
        .catch((error) => {
            console.log(error.message);
        });
        console.log(reservations);
    }, []);

    reservations.forEach( (data) => {
        if(new Date(data.StartDate) < today){
            pastdetails.push([data.PropertyTitle, data.StartDate, data.EndDate, data.PricePerNight, data.CleaningFee, data.ServiceFee, data._id]);
        }
        else {
            futuredetails.push([data.PropertyTitle, data.StartDate, data.EndDate, data.PricePerNight, data.CleaningFee, data.ServiceFee, data._id]);
        }
    });

    return (
        <div>
            <div className="container-fluid text-center" style={{marginTop: '30px'}}>
                <div className="row">
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1 mx-auto">Past Reservations</span>
                </nav>
                    <div className="col-md-1 side-section">
                    </div>
                    <div className="col-md-10">
                        <div className="container-fluid" style={{marginTop: '30px'}}>
                        {pastdetails.map((reservation) => {
                            return(
                                <div class="card alert alert-dark" role="alert">
                                    <div class="container">
                                    <div className="heading-segment">{ reservation[0] }</div>
                                    <div className="dates">Start Date: <span className="makeBold">{ reservation[1] }</span></div>
                                    <div className="dates">End Date: <span className="makeBold">{ reservation[2] }</span></div>
                                    <hr></hr>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <nav className="navbar navbar-light bg-light">
                        <span className="navbar-brand mb-0 h1 mx-auto">Future Reservations</span>
                    </nav>
                    <div className="col-md-1 side-section">
                    </div>
                    <div className="col-md-10">
                        <div className="container-fluid" style={{marginTop: '30px'}}>
                        {futuredetails.map((reservation) => {
                            return(
                                <div class="card alert alert-info" role="alert">
                                    <div class="container">
                                    <CancelReservation reservation={reservation}/>
                                    <div className="heading-segment">{ reservation[0] }</div>
                                    <div className="dates">Start Date: <span className="makeBold">{ reservation[1] }</span></div>
                                    <div className="dates">End Date: <span className="makeBold">{ reservation[2] }</span></div>
                                    <hr></hr>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reservations;