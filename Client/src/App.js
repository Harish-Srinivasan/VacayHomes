import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import HostLogin from './components/Authentication/HostLogin';
import HostSignUp from './components/Authentication/HostSignUp';
import Properties from './components/HomePage';
import Reservations from './components/Reservations/Reservations';
import Welcome from './components/HostProperty/HostHome';
import Favourites from './components/Favourites/FavouriteProperty';
import UpdateProperty from './components/HostProperty/UpdateProperty';
import AddReservation from './components/Reservations/AddReservation'

// Using routes to easily manage the different pages of the application
// Routes is the container, route is for each individual route or path
function App(){
  return(
    <Routes>
      <Route path="/" element={<Properties/>}></Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<SignUp />}/>
      <Route path='/hostlogin' element={<HostLogin />} />
      <Route path='/hostregister' element={<HostSignUp />} />
      <Route path="/HostHome" element={<Welcome/>}></Route>
      <Route path='/updateProperty/:id' element={<UpdateProperty />} />
      <Route path='/addReservation/:id' element={<AddReservation />} />
      <Route path="/properties" element={<Properties/>}></Route>
      <Route path="/reservations" element={<Reservations/>}></Route>
      <Route path="/favourites" element={<Favourites/>}></Route>
    </Routes>
  );
}

export default App;