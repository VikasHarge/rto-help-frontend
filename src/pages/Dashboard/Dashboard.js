import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postStatus } from "../../feature/complain/complainDetailSlice";
import { fetchAllComplains } from "../../feature/complain/complainSlice";
import Loader from "../../utils/loader/Loader";
import "./dashboard.css";

//Toastify
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




const Dashboard = () => {
  const [complainArr, setComplainArr] = useState([]);

  const navigate = useNavigate()
  


  const { complainData, loading, error } = useSelector((state) => state.complain);
  const {isAuthenticated} = useSelector((state)=>state.userDetails)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllComplains());
  }, []);



  useEffect(()=>{
    if(complainData){
        setComplainArr(() => complainData.complains);
        }
  },[complainData, complainArr])

  useEffect(()=>{
    if(error){
      toast.error(error.messege)
    }
    console.log("user auth", isAuthenticated);
    if(!isAuthenticated){
      toast.error("unauthorise, Please Login")
      navigate('/')
    }
  },[error, isAuthenticated])

  return (
    <>
      {
        loading ? <Loader /> : <div className="dashboard-container">
          <ToastContainer/>
        <div className="complain-table">
          <table className="table-body">
            <thead className="table-head">
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Vehicle Number</th>
                <th>Date</th>
                <th className="discription-clm" >Discription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {complainArr &&
              (
                complainArr.slice(0).reverse().map((item, index)=>{
                    let dateStr = item.date
                    let formatedDate = new Date(dateStr).toLocaleString()
                    return <tr key={index} >
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.vehicleNumber}</td>
                    <td>{formatedDate}</td>
                    <td>{item.description}</td>
                    <td>
                      <button 
                        onClick={()=>{ 
                          if(item.status === 'new'){
                            dispatch(postStatus({complainId : item._id, statusValue :"pending"}))
                          }
                          navigate(`/admin/complainDetail/${item._id}`)}} 
                        className="detail-btn" >
                          View Details
                        </button>
                      <p className={item.status === 'new' ? 'newLable' : item.status === 'pending' ? 'pendingLable' : 'resolveLable'} >{item.status}</p>
                    </td>
                  </tr>
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      }
    </>
  );
};

export default Dashboard;
