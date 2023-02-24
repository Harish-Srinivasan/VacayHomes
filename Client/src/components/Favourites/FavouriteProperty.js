import React from 'react';

const FavouriteProperty = (props) => {
    console.log(props.favourites);
    const stringify = props.favourites.map((property, id) => (
        <div key={id} className="col-lg-6 col-md-5 col-s-12 col-xs-12 main-section mt-5 ">
            <div onClick={() => props.removeFavouriteProperty(property)}>
                <svg width='1em' height='1em' viewBox='0 0 16 16' className='bi bi-x-square' fill='black' xmlns='http://www.w3.org/2000/svg' >
                    <path
                        fillRule='evenodd'
                        d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                    <path
                        fillRule='evenodd'
                        d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
                    />
                </svg>
            </div>
            <div className="card shadow-sm mx-auto" style={{ width: '90%' }}>
                <a href="#">
                    <img src={property.photo} className="card-img-top" alt="..." />
                </a>
                <div className="card-body">
                    <span className="float-end text-muted"> {property.ratings}/5 </span>
                    <p className="card-text">{property.city}</p>
                    <p className="card-text"> {property.title}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <b>${property.price} night</b>
                    </div>
                </div>
            </div>
        </div>
    ));
    console.log(stringify);
    return (
        <div>
            <nav className="navbar navbar-light bg-light ">
                <span className="navbar-brand mb-0 h1 mx-auto">Favourites</span>
            </nav>
            <div className='row'>
                {stringify}
            </div>

        </div>
    );
};
export default FavouriteProperty;