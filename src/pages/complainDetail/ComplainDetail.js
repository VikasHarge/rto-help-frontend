import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchComplainDetails,
  postRemark,
  postStatus,
} from "../../feature/complain/complainDetailSlice";
import Loader from "../../utils/loader/Loader";
import "./complaindetail.css";
import GoogleMap from "./GoogleMap";

const ComplainDetail = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [isRemark, setIsRemark] = useState(null);
  const [remarkValue, setRemarkValue] = useState("");

  const { complainId } = useParams();
  const { complainDetail, loading, error } = useSelector(
    (state) => state.complainDetail
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchComplainDetails(complainId));
  }, [complainId]);

  useEffect(() => {
    if (complainDetail !== null) {
      console.log(complainDetail.singleComplain);
      setLat(complainDetail.singleComplain.cord.latitude);
      setLong(complainDetail.singleComplain.cord.longitude);
      setIsRemark(complainDetail.singleComplain.remark);
    }
  }, [complainDetail, isRemark]);

  const handleSubmitRemark = () => {
    dispatch(postRemark({ complainId, remarkValue }));
    dispatch(postStatus({ complainId, statusValue: "resolve" }));
    dispatch(fetchComplainDetails(complainId));
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="complain-detail-container">
            <div className="complain-detail-div">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="backButton"
              >
                Back
              </button>
              <div className="map_panel">
                <h3 className="complainId_header">{`Complain Id : ${complainId}`}</h3>
                <GoogleMap lat={lat} long={long} />
              </div>

              <div className="video_panel">
                <h3 className="videopanel_header">Video proof of Incident</h3>
                {complainDetail && (
                  <>
                    <video width="auto" height="240" controls>
                      <source
                        src={complainDetail.singleComplain.frontVideoUrl}
                        type="video/webm"
                      />
                    </video>
                    <video width="150" height="auto" controls>
                      <source
                        src={complainDetail.singleComplain.frontVideoUrl}
                        type="video/webm"
                      />
                    </video>
                  </>
                )}
              </div>
              <div className="detail_panel">
                <div className="complain-detail-table">
                  {complainDetail && (
                    <table className="detailTable">
                      <thead>
                        <tr>
                          <th>Perticular</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{complainDetail.singleComplain.name}</td>
                        </tr>
                        <tr>
                          <td>Phone Number</td>
                          <td>{complainDetail.singleComplain.phone}</td>
                        </tr>
                        <tr>
                          <td>Vehicle Number</td>
                          <td>{complainDetail.singleComplain.vehicleNumber}</td>
                        </tr>
                        <tr>
                          <td>Date</td>
                          <td>
                            {new Date(
                              complainDetail.singleComplain.date
                            ).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td>Discription</td>
                          <td>{complainDetail.singleComplain.description}</td>
                        </tr>
                        <tr>
                          <td>Remark</td>
                          <td>
                            {complainDetail.singleComplain.remark == null
                              ? "No Remark By Officer yet"
                              : complainDetail.singleComplain.remark}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
                {isRemark == null ? (
                  <>
                    <div className="remark_div">
                      <textarea
                        placeholder="Write Remark here...(by officer Incharge)"
                        value={remarkValue}
                        onChange={(e) => setRemarkValue(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="detail-btn-container">
                      <button onClick={handleSubmitRemark}>
                        Submit Remark
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="remark_submit_tag">
                    Remark is Submitted by Officer
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ComplainDetail;
