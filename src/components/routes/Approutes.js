import {Route, BrowserRouter as Router,Routes} from 'react-router-dom';
import Admin from '../../pages/admin/admin';
import Auth from '../../pages/authentication/auth';
import Booking from '../../pages/bookings/bookings';
import Landingpage from '../../pages/landingpage/landingpage';
import Moviedetails from '../../pages/moviedetail/moviedetail';
import Movietheatres from '../../pages/movietheatres/movietheatres';

const Approutes=()=>{
    return (
            <Router>
                <Routes>
                    <Route  exact path='/login' element={<Auth />} />
                    <Route exact path='/' element={<Landingpage />} />
                    <Route exact path='/admin' element={<Admin />}/>
                    <Route exact path='/movie/:movieId/details' element={<Moviedetails />} />
                    <Route exact path='/buytickets/:movieName/:movieId' element={<Movietheatres />} />
                    <Route exact path='/movie/:movieId/:theaterId' element={<Booking />} />
                    
                </Routes>
            </Router>

    )
}

export default Approutes;