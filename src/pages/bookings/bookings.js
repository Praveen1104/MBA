import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getmovie } from '../../api/movie';
import { gettheatrebyid } from '../../api/theatre';
import Navbar from '../../components/navbar/navbar';
const Booking=()=>{

    const{movieId:selectedmovie}=useParams();
    const {theaterId:selectedtheaterid}=useParams();
    const [moviedetail,setmoviedetail]=useState({});
    const [theatredetail,settheatredetails]=useState({});

    useEffect(()=>{

        const init=async()=>{
            const moviedetail=await getmovie(selectedmovie);
            setmoviedetail(moviedetail);
            const theatredetail=await gettheatrebyid(selectedtheaterid);
            settheatredetails(theatredetail);
        }
        init()
    },[])
     return (
        <div>
        <Navbar />
            <div className='text-light background'>
                <h2 className='fw-bold text-light'>{moviedetail.name}</h2>
                <Showcase />
            </div>
        </div>
     ) 
}
function Showcase(){
    return (
        <ul className='Showcase'>
            <li>
                <span className='seat'><small>Available</small></span>
            </li>
            <li>
                <span className='seat seatselected'><small>Selected</small></span>
            </li>
            <li>
                <span className='seat seatoccupied'><small>Occupied</small></span>
            </li>
        </ul>
    )
}
export default Booking;