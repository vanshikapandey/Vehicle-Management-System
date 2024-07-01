import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"
import { collection, getCountFromServer, getDocs} from 'firebase/firestore'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MasksIcon from '@mui/icons-material/Masks';
import FlagIcon from '@mui/icons-material/Flag';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { getAuth, signOut } from "firebase/auth";
import { Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import DataTable from "../components/DataTable";
import Footer from "./Footer";
import Avatar  from "../assets/Avatar.png"



function Home() {
  const { currentUser } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [tpen, setTpen] = useState(0);
  const [fpen, setFpen] = useState(0);
  const [uppen, setUPpen] = useState(0);
  const [nppen, setNPpen] = useState(0);
  const [ppen, setPpen] = useState(0);
  const [ok, setOk] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
   
    const getCount = async()=>{
    try {
      const coll = collection(db, "users");
      const snapshot = await getCountFromServer(coll);
     
      setCount(snapshot.data().count);
    }
    catch (e) {
      console.log(e)
    }
  }
  getCount();
  }, [currentUser,count]);

  useEffect(() => {
   
    const getStatus = async()=>{
    try {
      let pen = 0 , t = 0, f = 0 ,up = 0 , np = 0, p = 0;
      const querySnapshot = await getDocs(collection(db,'users'));
              querySnapshot.forEach((doc)=>{
                if(doc.data().status)  pen++   
                if(doc.data().t_status) t++
                if(doc.data().f_status)  f++  
                if(doc.data().up_status)  up++
                if(doc.data().np_status) np++ 
                if(doc.data().p_status ) p++                   
              }) 
      setPending(pen);
      setOk(count-pen);
      setTpen(t);
      setFpen(f);
      setUPpen(up);
      setNPpen(np);
      setPpen(p)
    }
    catch (e) {
      console.log(e)
    }
  }
  getStatus();
  }, [count]);


  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("user signed out")
      navigate("/login");
    }).catch((err) => {
      console.log(err);
    });
  }



  return (

    <div className="mainContainer container-fluid">
      
      <div className="landing">
        <div className="sidebar">
          <Sidebar backgroundColor="rgb(34,42,73)" style={{ height: "150vh" }} >
            <Menu>
              <MenuItem
                
                style={{ textAlign: "center", paddingTop: "18vh" }}
              >
                <img className="avatar" src={Avatar} style={{height:"70px" ,width:"70px" }} alt=""/><br/><br/>
                <h4>Welcome Rahul</h4>
              </MenuItem>
              <MenuItem className="menuItem" style={{ color: "#ffffff", paddingTop: "15vh" }}><CurrencyRupeeIcon style ={{color:"rgb(233,31,99)",fontSize:"28px",paddingRight:"1vh"}}/>Tax Pending : {tpen}  </MenuItem>
              <MenuItem className="menuItem" style={{ color: "#ffffff", paddingTop: "10vh" }}><MonitorHeartIcon style ={{color:"rgb(246,190,26)",fontSize:"28px",paddingRight:"1vh"}}/>Fitness Pending : {fpen}  </MenuItem>
              <MenuItem className="menuItem" style={{ color: "#ffffff", paddingTop: "10vh" }}><FlagIcon style ={{color:"rgb(233,31,99)",fontSize:"28px",paddingRight:"1vh"}}/>UP Permit Pending : {uppen}  </MenuItem>
              <MenuItem className="menuItem"style={{ color: "#ffffff", paddingTop: "10vh" }}><FlagIcon style ={{color:"rgb(246,190,26)",fontSize:"28px",paddingRight:"1vh"}}/>NP Permit Pending : {nppen}  </MenuItem>
              <MenuItem className="menuItem"style={{ color: "#ffffff", paddingTop: "10vh" }}><MasksIcon style ={{color:"rgb(233,31,99",fontSize:"28px",paddingRight:"1vh"}}/>Pollution Pending : {ppen}  </MenuItem>
            
            </Menu>
          </Sidebar>
        </div>

        <div className="buttons col-md-10">
          <div className="navbar">
            <div className="input-field" ><i className="fa fa-search icon"></i><input placeholder="Enter User Name" onChange={e => setQuery(e.target.value)} /></div>
            <div><button onClick={handleLogout}>Logout</button></div>
          </div>
          <div style={{display:"flex", marginBottom:"5vh"}}><h3>Dashboard</h3><small>\ analytics</small></div>
          
          <div className="allCards">
          <div className="card-info"><div><AutoGraphIcon style ={{color:"rgb(246,190,26)",fontSize:"35px"}}/></div>Total Users:<br/>{count}</div>
          <div className="card-info"><div><PendingActionsIcon style ={{color:"rgb(233,31,99)",fontSize:"35px"}}/></div>Pending Users:<br/>{pending}</div>
          <div className="card-info"> <div><CheckBoxIcon style ={{color:"rgb(246,190,26)",fontSize:"35px"}}/></div>Ok users:<br/>{ok}</div>
              </div>
          <div className="dataTable-section">
            <div><Link to="/newEntry" className="addNew-btn">Add New Owner</Link></div>
            <div className="dataTable col-md-10">
              <DataTable query={query} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;