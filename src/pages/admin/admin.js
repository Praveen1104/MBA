import { CWidgetStatsC } from "@coreui/react";
import { useState, useEffect } from "react";
//import {CIcon,cilChartPie} from '@coreui/icons-react'
import MaterialTable from "@material-table/core";
//import { Button } from "bootstrap";
//import  Delete from "@material-ui/icons";
//import {Edit} from '@material-ui/icons';
//import {Delete} from '@material-ui/icons//';
import Navbar from "../../components/navbar/navbar";
import { getAllmovies, removemovie } from "../../api/movie";
import { getAlltheatres, gettheatrebyid } from "../../api/theatre";
import { getAllusers } from "../../api/user";
import { Button, Modal } from "react-bootstrap";

const Admin = () => {
  const [counterinfo, setcounterinfo] = useState({});
  const [theatredata, settheatredata] = useState([]);
  const [moviesdata, setmoviesdata] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [showtheatretable, setshowtheatretable] = useState(true);
  const [showmovietable, setshowmovietable] = useState(false);
  const [showusertable, setshowusertable] = useState(false);
  const [uptmodal,setuptmodal]=useState(false);
  const [tempt,settempt]=useState({});

  const fetctheatredata = async () => {
    const theaters = await getAlltheatres();
    console.log(theaters.data);
    const tdata = theaters.data;
    settheatredata(tdata);
    console.log(tdata);
    counterinfo.theatre = tdata.length;
  };
  const fetchmoviedata = async () => {
    const datafromapi = await getAllmovies();
    const mdata = datafromapi.data;
    console.log(datafromapi);
    setmoviesdata(mdata);
    counterinfo.movies = mdata.length;
  };
  const fetchuserdata = async () => {
    const datafromapi = await getAllusers();
    const udata = datafromapi.data;
    setuserdata(udata);
    console.log(udata);
    counterinfo.users = udata.length;
  };
  useEffect(() => {
    fetctheatredata();
    fetchmoviedata();
    fetchuserdata();
  }, []);

  const showmovie = () => {
    setshowmovietable(true);
    setshowtheatretable(false);
    setshowusertable(false);
  };
  const showuser = () => {
    setshowusertable(true);
    setshowmovietable(false);
    setshowtheatretable(false);
  };
  const showtheatre = () => {
    setshowtheatretable(true);
    setshowmovietable(false);
    setshowusertable(false);
  };

  const deletemovie = async (mov) => {
    console.log(mov);
    await removemovie(mov);
    fetchmoviedata();
  };
  const edittheatre=async(rowData)=>{
      setuptmodal(true);
      console.log(rowData);
      const tid=rowData._id;
      const thdetails=await gettheatrebyid(tid);
      setuptmodal(true);
      settempt(thdetails.data);


  }

  const updateth=(e)=>{
     if(e.target.name === "name"){
      tempt.name=e.target.value
     }
     else if(e.target.name === "description"){
      tempt.description=e.target.value
     }
     else if(e.target.name === "pinCode"){
      tempt.pinCode=e.target.value
     }
     settempt({...tempt});
  }
  return (
    <div>
      <Navbar />
      <div>
        <h2 className="text-center">Welcome {localStorage.getItem("name")}</h2>
      </div>
      <div>
        <p className="text-center text-secondary">
          Take a quick look at your stats below
        </p>

        <div className="row p-5">
          <div className="col-4">
            <CWidgetStatsC
              className="mb-3 text-white"
              icon={<i className="bi bi-card-list text-danger"></i>}
              color={"dark"}
              progress={{ color: "success", value: 75 }}
              text="Number of Theatres"
              title="Theatres"
              value={counterinfo.theatre}
              onClick={() => showtheatre()}
            />
          </div>
          <div className="col-4">
            <CWidgetStatsC
              className="mb-3 text-white"
              icon={<i className="bi bi-card-list text-danger"></i>}
              color={"dark"}
              progress={{ color: "success", value: 75 }}
              text="Number of Movies"
              title="Movies"
              value={counterinfo.movies}
              onClick={() => showmovie()}
            />
          </div>
          <div className="col-4">
            <CWidgetStatsC
              className="mb-3 text-white"
              icon={<i className="bi bi-card-list text-danger"></i>}
              color={"dark"}
              progress={{ color: "success", value: 75 }}
              text="Number of Users"
              title="Users"
              value={counterinfo.users}
              onClick={() => showuser()}
            />
          </div>
        </div>
        <div>
          {showtheatretable && (
            <>
              <MaterialTable
                title="THEATRES"
                columns={[
                  { title: "Theater Name", field: "name" },
                  { title: "City", field: "city" },
                  { title: "Description", field: "description" },
                  { title: "Pin Code", field: "pinCode" },
                ]}
                data={theatredata}
                actions={[
                  {
                    title: "delete",
                    field: "DELETE",
                    //icon: Delete,
                    tooltip: "Delete Theatre",
                    onClick: (event, rowData) => deletemovie(rowData),
                  },
                  {
                    //icon: Edit,
                    tooltip: "Edit Theatre",
                    onClick: (event, rowData) => edittheatre(rowData)
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </>
          )}
          <Modal show={uptmodal}
          centered
          onHide={()=>setuptmodal(false)}
          size="lg md"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Theatre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div>
                  <div className="input-group mb-3">
                    <span><i className="b bi-pencil"></i> </span>
                    <input type="text" name="name" value={tempt.name} placeholder="Theatre Name" onChange={updateth}/>
                  </div>

                  <div className="input-group my-2">
                    <span><i className="b bi-pencil"></i> </span>
                    <input type="text" name="description" value={tempt.description} placeholder="Theatre Description" onChange={updateth} />
                  </div>

                  <div className="input-group mb-3">
                    <span><i className="b bi-pencil"></i> </span>
                    <input type="text" name="pinCode" value={tempt.pinCode} placeholder="Theatre pinCode" onChange={updateth} />
                  </div>
                  <Button variant="dark">Save Details</Button>
                </div>

              </form>
            </Modal.Body>
          </Modal>
          {showmovietable && (
            <>
              <MaterialTable
                title="MOVIES"
                columns={[
                  { title: "Movie Name", field: "name" },
                  { title: "Director", field: "director" },
                  { title: "Release Date", field: "releaseDate" },
                  { title: "Release Status", field: "releaseStatus" },
                ]}
                data={moviesdata}
                actions={[
                  {
                    title: "delete",
                    field: "DELETE",
                    //icon: Delete,
                    tooltip: "Delete Movie",
                    // onClick: (event, rowData) => deleteMovie(rowData)
                  },
                  {
                    //icon: Edit,
                    tooltip: "Edit Movie",
                    onClick: (event, rowData) => {
                      // Do save operation
                    },
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </>
          )}
          {showusertable && (
            <>
              <MaterialTable
                title="USERS"
                columns={[
                  { title: "USER ID", field: "userId" },
                  { title: "Name", field: "name" },
                  { title: "Email", field: "email" },
                  { title: "Role", field: "userType" },
                ]}
                data={userdata}
                actions={[
                  {
                    title: "delete",
                    field: "DELETE",
                    //icon: Delete,
                    tooltip: "Delete Movie",
                    onClick: (event, rowData) => deletemovie(rowData),
                  },
                  {
                    //icon: Edit,
                    tooltip: "Edit Movie",
                    onClick: (event, rowData) => {
                      // Do save operation
                    },
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
