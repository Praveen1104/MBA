import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { getmovie } from "../../api/movie";
import { getAlltheatres } from "../../api/theatre";
import Navbar from "../../components/navbar/navbar";
import {Link} from 'react-router-dom'
const Movietheatres=()=>{

    const {movieId:selectedmovie}=useParams();
    const [moviedetail,setmoviedetail]=useState({});
    const [theatredetails,settheatredetails]=useState();
    const [pageloaded,setpageloaded]=useState(false);

    useEffect(()=>{
        const init=async()=>{
            const moviedetail=await getmovie(selectedmovie);
            setmoviedetail(moviedetail.data);
            const theatredetail=await getAlltheatres();
            const eligibletheatre=theatredetail.data.filter(theatre=>theatre.movies.includes(selectedmovie))
            setpageloaded(true);

        }
        init();
    },[])

    return (
        <div>
            <Navbar />
            <div className="bg-light">
                <div className="bg-dark">
                    <h2 className="fw-bolder text-light">{moviedetail.name}</h2>
                    <span className="badge rounded-pill text-bg-danger m-1">{moviedetail.description}</span>
                    <span className="badge rounded-pill text-bg-secondary m-1">{moviedetail.language}</span>
                    <span className="badge rounded-pill text-bg-secondary m-1">{moviedetail.releaseStatus}</span>
                    <hr className="bg-light" />

                    <h6 className="text-muted">Director: {moviedetail.director}</h6>
                    <h6 className="text-muted">Release Date: {moviedetail.releaseDate}</h6>
                </div>
                <div className="">
                <h2 className="fw-bolder text-dark text-center">SELECT THEATRE</h2>
                {
                    pageloaded &&  theatredetails.map(
                        theatre=> <li key={theatre._id} className="list-group-item">
                        <Link key={theatre._id} to={`/movie/${selectedmovie}/${theatre._id}`}>
                            <div className="row p-2 text-decoration-none text-dark fw-bold">
                            <div className="col">
                                    {theatre.name}
                            </div>
                            <div className="col">
                                <div className="p-2 text-success fw-bold">
                                   <li className="b- bi-phone-fill text-success">
                                    m-Ticket
                                   </li>
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-2 text-danger fw-bold">
                                    <li className="bi bi-cup-straw text-center">
                                        Food and Beverages
                                    </li>
                                </div>
                            </div>
                            </div>
                        </Link>
                        </li>
                    )
                }

                </div>
            </div>
        </div>
    )
}

export default Movietheatres