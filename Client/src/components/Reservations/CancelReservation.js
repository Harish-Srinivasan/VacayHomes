import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CancelReservation(props) {

    const reservation = props.reservation;
    const todayDate =  new Date();
    var bookedDate = new Date(reservation[1]);

    const validCancel = (reservation) => {
        var difference = bookedDate-todayDate;
        if(difference/3600000 < 48)
            return true;
        else 
            return false;
    }
    
    const deleteReservation = () => {
        const localstorage_user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:3000/reservations/' + localstorage_user._id + "/" + reservation[6],{
                method:'DELETE'
            })
            .then(response => response.json())
            .then(window.alert("Reservation deleted successfully"))
            .catch(e => {
                console.log("e",e)
        })
    }
    return (
        <div>
            <button type='button' style={{float: 'right'}} onClick={deleteReservation} disabled={validCancel(reservation)}>
                Cancel
            </button>
        </div>
    );
}

export default CancelReservation;