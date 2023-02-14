import { useEffect, useState } from "react";
import { getAllmovies } from "../../api/movie";
import Slider from "../../components/slider/slider";
import { CSpinner } from "@coreui/react";
import { Link } from "react-router-dom";
import { HandThumbsUpFill } from "react-bootstrap-icons";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

const Landingpage = () => {
  const [movielist, setmovielist] = useState([]);
  const [isloading, setisloading] = useState();

  const initialise = async () => {
    const movies = await getAllmovies();
    setmovielist(movies.data);
    console.log(movies);
    setisloading(false);
  };
  useEffect(() => {
    initialise();
    console.log(movielist);
  }, []);

  const getLoader = () => {
    return (
      isloading && (
        <div className="d-flex my-5 justify-content-center align-items-center">
          <CSpinner variant="grow" />
        </div>
      )
    );
  };
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "85vh" }}>
        {getLoader()}
        {!isloading && (
          <>
            {
              //<Slider />
            }

            <div className="container my-4">
              <h5>Recomended Movies</h5>
              <div className="row">
                {movielist.map((movie) => {
                  return (
                    <div className="col-lg-3 col-xs-6 my-2">
                      <Link to={`/movie/${movie._id}/details`}>
                        <div
                          className="d-flex justify-content-center align-items-stretch"
                          style={{ height: "30rem" }}
                        >
                          <div
                            style={{ width: "20rem" }}
                            className="card bg-deark"
                          >
                            <img
                              style={{ height: "80%" }}
                              src={movie.posterUrl}
                              className="card-img-top"
                              alt="movie"
                            />
                            <div className="p-2">
                              <div className="d-flex justify-content-left align-items-center">
                                <HandThumbsUpFill className="text-success" />
                                <span className="text-success px-2">158k</span>
                              </div>
                              <p className="text-white fw-bolder px-2 fs-5">
                                {movie.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Landingpage;
