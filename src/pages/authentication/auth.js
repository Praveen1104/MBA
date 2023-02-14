import { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signin,signup } from "../../api/auth/auth";

const Auth = () => {
  const [showsignup, setshowsignup] = useState(false);
  const [userid, setuserid] = useState("");
  const [email, seteamail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [usertype, setusertype] = useState("");
  const [errormessage, seterrormessage] = useState("");
  const [message, setmessage] = useState("");

  const navigate = useNavigate();

  const redirecturl = () => {
   const ut= localStorage.getItem("userTypes")

   if(!ut){
    seterrormessage("something went wrong");
    return
   }
   if(ut=== "CUSTOMER"){
    navigate(-1)
   }
   else if(ut=== "CLIENT"){
    navigate("/client")
   }
   else{
    navigate("/admin")
   }

  };
  useEffect(() => {
    if (localStorage.getItem("accessToken"));
    redirecturl();
  }, []);

  const updatesignupdata = (e) => {
    const id = e.target.id;

    if (id === "username") {
      setusername(e.target.value);
    } else if (id === "userid") {
      setuserid(e.target.value);
    } else if (id === "email") {
      seteamail(e.target.value);
    } else if (id === "password") {
      setpassword(e.target.value);
    }
    seterrormessage("");
    setmessage("");
  };

  const clearstate = () => {
    setuserid("");
    setusername("");
    seteamail("");
    setpassword("");
    setusertype("CUSTOMER");
    seterrormessage("");
  };

  const handleselect = (e) => {
    setusertype(e);
  };

  const togglesignup = () => {
    setshowsignup(!showsignup);
    clearstate();
  };

  const validatedata = (data) => {
    if (data.userId.length < 5 || data.userId.length > 10) {
      seterrormessage("UserId should be 5 to 10 characters only ");
      return false;
    }
    if (data.userId.includes(" ")) {
      seterrormessage("UserId Should not contain space ");
      return false;
    }
    if (data.password.length < 5 || data.password.length > 10) {
      seterrormessage("password should be 5 to 10 characters only ");
      return false;
    }
    if (data.password.includes(" ")) {
      seterrormessage("password Should not contain space ");
      return false;
    }
    if (data.name.length < 5 || data.name.length > 10) {
      seterrormessage("name should be 5 to 10 characters only ");
      return false;
    }
    if (data.name.includes(" ")) {
      seterrormessage("name Should not contain space ");
      return false;
    }

    return true;
  };
  const signupfn = async (e) => {
    e.preventDefault();
    const data = {
      name: username,
      userId: userid,
      email,
      usertype,
      password,
    };

    if (!validatedata(data)) {
      return;
    }
    const response = await signup(data);

    if (response.status === 201) {
      setmessage("Success");
      clearstate();
    } else {
      seterrormessage(response.data.message);
    }
  };
  const loginfn = async (e) => {
    e.preventDefault();
    const data = {
      userId: userid,
      password: password,
    };
    // if (!validatedata(data)) {
    //   return;
    // }
    const response=await signin(data);

        if(response.status===200){
          setmessage("success");
        }

        const {name,userId,userTypes,userStatus,accessToken}=response.data;

        localStorage.setItem("name",name);
        localStorage.setItem("userId",userId);
        localStorage.setItem("userType",userTypes);
        localStorage.setItem("userStatus",userStatus);
        localStorage.setItem("accessToken",accessToken);
        
      
  };
  return (
    <div id="LoginPage">
      <div
        id="LoginPage"
        className=" bg-dark d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card m-5 p-5 bg-dark text-light shadow-lg d-flex align-item-center justify-content-center vh-100">
          <h3>{showsignup ? "Sign Up" : "Login"}</h3>
          <form onSubmit={showsignup ? signupfn : loginfn}>
            <div className="input-group">
              <input
                type="text"
                placeholder="User Id"
                id="userid"
                className="form-control m-1"
                value={userid}
                onChange={updatesignupdata}
                autoFocus
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="form-control m-1"
                value={password}
                onChange={updatesignupdata}
                autoFocus
                required
              />
            </div>

            {showsignup && (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="User Name"
                    id="username"
                    className="form-control m-1"
                    value={username}
                    onChange={updatesignupdata}
                    autoFocus
                    required
                  />
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="form-control m-1"
                    value={email}
                    onChange={updatesignupdata}
                    autoFocus
                    required
                  />
                </div>

                <div className="row m-1">
                  <div className="col">
                    <span className="mx-1 my-1">User Types</span>
                  </div>

                  <div className="col">
                    <DropdownButton
                      align="end"
                      title={usertype}
                      id="userType"
                      onSelect={handleselect}
                      variant="light"
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="CLIENT">CLIENT</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </>
            )}
            <div className="input-group">
              <input
                type="submit"
                className="form-control btn btn-danger"
                value={showsignup ? "Sign Up" : "Log In"}
              />
            </div>

            <div className="text-center pe" onClick={togglesignup}>
              {showsignup
                ? "Already have an Account ? Login"
                : "Don't have an account ? Sign Up"}
            </div>
            <div className="auth-error-msg text-success text-center">
              {message}
            </div>
            <div className="auth-error-msg text-danger text-center">
              {errormessage}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
