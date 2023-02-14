import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getmovie } from "../../api/movie";
import Navbar from "../../components/navbar/navbar";
import ReactPlayer from "react-player";
import './md.css';
import { Spinner } from "react-bootstrap";
const Moviedetails = () => {
  const { movieId: selectedmovie } = useParams();
  console.log(selectedmovie);
  const [movie,setmovie]=useState(null);
  const [isrelease,setisrelease]=useState(null);

  const init = async () => {
    const response = await getmovie(selectedmovie);
    setmovie(response.data);
    setisrelease(response.data.releaseStatus == "RELEASED")
    console.log(response);
  };
  useEffect(() => {}, []);
  return(

  <div>
  <Navbar />
  {!movie && <Spinner className="center" />}

   {movie && <>    
   <div className="">
        <ReactPlayer url={movie.trailerUrl} controls={true} className="video" width="80%" height="90%" />
   </div>
   <div>
    <div className="row">
        <div className="col">
            <img src={movie.posterUrl} height={400} width={300} />
            <div className="col">
                    <h2 className="fw-bolder">About The Movie</h2>
                    <div>
                        <span className="badge rounded-pill text-bg-danger">{movie.description}</span>
                        <span className="badge rounded-pill text-bg-secondary">{movie.language}</span>
                        <span className="badge rounded-pill text-bg-secondary">{movie.releaseStatus}</span>
                    </div>
                    <hr/>
                    <h3>{movie.name}</h3>
                    <h6>{movie.director}</h6>
                    <h6>{movie.releaseDate}</h6>
                    <hr/>
                    <h5>cast</h5>
                    {movie.casts.map(name => <li className="list-group-item" >{name}</li>)}
                    <div className="text-center my-3">
                        <Link key={selectedmovie} className="text-decoration-none btn btn-danger text-center"
                        to={isrelease ? `/buytickets/${movie.name}/${selectedmovie}`:'#'}>
                        {isrelease ? "BOOK TICKET":"COMING SOON"}

                        </Link>
                    </div>
            </div>
        </div>
    </div>
   </div>
   </>
  }
  </div>
  );
};
export default Moviedetails;
