
import { useEffect, useState,useMemo } from 'react'
import {db} from "../firebase"
import { DataGrid} from "@mui/x-data-grid";
import { userColumns } from '../dataTableSource';
import { collection, getDocs, doc,deleteDoc,setDoc, updateDoc, getDoc } from 'firebase/firestore'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import clsx from "clsx";
import CircularProgress from '@mui/material/CircularProgress';


const DataTable = ({query}) =>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [udata, setUdata] = useState({});
    
    useEffect(()=>{
      const fetchData = async()=>{
          let list = [];
          try{
              const querySnapshot = await getDocs(collection(db,'users'));
              querySnapshot.forEach((doc)=>{
                  list.push({id:doc.id, ...doc.data()})
              
              })
              setData(list);
             
          }catch(err){
              console.log(err)
          }
      };

      fetchData();
  },[])

    const filteredData = useMemo(() => {
       
        if (query.trim() === '') {
            return data;
        }

        return data.filter(dataItem => dataItem.ownername.toLowerCase().includes(query));
    }, [data, query])

    const handleDelete = async (id) => {
     setLoading(false)
        try {
          await deleteDoc(doc(db, "users", id));
          setData(data.filter((item) => item.id !== id));
          setLoading(true)
          alert("Data deleted successfully")
         
          
        } catch (err) {

          console.log(err);
        }
        
        
      };

       
      const handleUpdate = async(par) => {
      
        setUdata( data.filter((item) => item.id === par.id));
        setLoading(false);
        if(udata){
        udata.vehicleno =   par.vehicleno   
        udata.ownername = par.ownername
        udata.taxdate =   par.taxdate
        udata.fitnessdate =   par.fitnessdate
        udata.uppermit =   par.uppermit   
        udata.nppermit =   par.nppermit 
        udata.pollutiondate =   par.pollutiondate  
        udata.mobileno =   par.mobileno 
   
        setUdata({...udata})
  
        const docRef = doc(db, "users",par.id);
        await setDoc(docRef, udata)
        .then(docRef => {
            console.log("Entire Document has been updated successfully");
            alert("Data updated successfully")
            setLoading(true)
            window.location.reload(false)
          
        })
        .catch(error => {
            console.log(error,"error");
        })

       
        }
      };

      const updateStatus = async(t,f,up,np,p,params)=>{

        console.log(params.id);
        const userDb = doc(db, "users", params.id);
        const docSnap = await getDoc(userDb);

        if (docSnap.exists()) {
          console.log(params.id);
          updateDoc(userDb, {
            status:(t < 15 || f < 15 || up < 15 || np < 15 || p < 15) ? 1 :0
          });
        
           updateDoc(userDb, {
            t_status:t<15?1:0
          });
        
           updateDoc(userDb, {
            f_status:f<15?1:0
          });
      
           updateDoc(userDb, {
            up_status:up<15?1:0
          });
      
           updateDoc(userDb, {
            np_status:np<15?1:0
          });
      
           updateDoc(userDb, {
            p_status:p<15?1:0
          });
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }   
          
       
      }
   

      const statusColumn  = [
        {
          field: "status",
          headerName: "Status",
          width: 100,
          cellClassName: (params) => {       
      
            return clsx('super-app', {
              
              negative: params.row.status === 1,
              positive: params.row.status === 0
            });
          },
          renderCell: (params) => {
           let t =  (Math.floor((( new Date(`${params.row.taxdate}`))       - ((new Date()).getTime())) / (24 * 60 * 60 * 1000)))
           let f =  (Math.floor((( new Date(`${params.row.fitnessdate}`))   - ((new Date()).getTime())) / (24 * 60 * 60 * 1000)))
           let up = (Math.floor((( new Date(`${params.row.uppermit}`))      - (((new Date()).getTime()))) / (24 * 60 * 60 * 1000)))
           let np = (Math.floor((( new Date(`${params.row.nppermit}`))      - ((new Date()).getTime())) / (24 * 60 * 60 * 1000)))
           let p =  (Math.floor((( new Date(`${params.row.pollutiondate}`)) - ((new Date()).getTime())) / (24 * 60 * 60 * 1000)))
        
           console.log(params,"deleteeeeeeeee")
          updateStatus(t,f,up,np,p,params);
            
            return (
              <div className="cellAction">
              { t < 15 || f < 15 || up < 15 || np < 15 || p < 15?
                <div
                  className="pending"
                >
             
                Pending
                </div>:
                 <div
                 className="ok"
               >
                
              OK
               </div>
          }       
              </div>
              
            );
          },
        },
      ];
    
      const updateColumn  = [
        {
          field: "update",
          headerName: "Update",
          width: 100,
          renderCell: (params) => {
            return (
              <div className="cellAction"> 
                <div
                  className="updateButton"
                  onClick={() => handleUpdate(params.row)}
                >
                  <SaveIcon style={{color:"rgb(233,31,99)",cursor:"pointer"}}/>
                </div>
              </div>
            );
          },
        },
      ];

      const actionColumn  = [
        {
          field: "action",
          headerName: "Action",
          width: 100,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  <DeleteIcon style={{color:"rgb(246,190,26)",cursor:"pointer"}}/>
                </div>
              </div>
            );
          },
        },
      ];

      
    return (
      <div className="datatable">
       {loading ?
      <DataGrid
        className="datagrid"
        {...filteredData }
        rows={filteredData}
        columns={userColumns.concat(statusColumn).concat(updateColumn).concat(actionColumn)}
        pageSize={9}
        editMode='row'
        rowsPerPageOptions={[9]}
        checkboxSelection
       
        sx={{
          color:"rgba(217, 219, 219, 0.864)",
          boxShadow: 3,
          border: 0.5,
          borderColor: 'grey',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          "& .MuiDataGrid-cell": {
            border: "0.5px solid rgba(208, 209, 209, 0.081)",
            borderRadius: "5px",
            width: "calc(100% - 100px)",
          
          },
          '& .super-app.negative': {
            backgroundColor: '#d474823d;',
            color: 'rgba(217, 219, 219, 0.864)',
            fontWeight: '500',
          },
          '& .super-app.positive': {
            backgroundColor: 'rgba(157, 255, 118, 0.229)',
            color: 'rgba(217, 219, 219, 0.864)',
            fontWeight: '500',
          },
        }}
        
      />:<div className='circularProgress'><p>Data is getting updated......</p><br/><div ><CircularProgress /></div></div>}
  
    </div>
    )
}

export default DataTable;