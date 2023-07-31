import { useEffect, useState } from "react";
import CandidateLayout from "./CandidateLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SavedJobPopup from "./SavedJobPopup";

function SavedJobs() {
  const [jobs, setJobs] = useState([{ locations: [], employer: {} }]);
  const [jobLocations, setJobLocations] = useState([]);
  const [curJob, setCurJob] = useState({});
  const user = JSON.parse(localStorage.getItem("candidate"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  const getSavedJobs = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/candidates/${user.id}/getSavedJobs`)
      .then((res) => {
        const jobs = res.data;
        let jobLocs = [];
        console.log(jobs);
        setJobs(jobs);
        for (let i = 0; i < jobs.length; i++) {
          jobLocs[i] = "";
          for (let j = 0; j < jobs[i].locations.length; j++) {
            jobLocs[i] = jobLocs[i] + jobs[i].locations[j].name;
            if (j !== jobs[i].locations.length - 1) {
              jobLocs[i] = jobLocs[i] + ", ";
            }
          }
        }
        setJobLocations(jobLocs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSavedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CandidateLayout>
      <div className="m-4 px-5 pt-4 bg-white" style={{ height: "92.5%" }}>
        <p className="mb-4 h4 ms-1">Việc làm đã lưu</p>
        <table className="table border">
          <thead className="table-primary">
            <tr>
              <th style={{ width: "25%" }}>Vị trí</th>
              <th style={{ width: "25%" }}>Công ty</th>
              <th style={{ width: "20%" }}>Địa điểm</th>
              <th style={{ width: "14%" }}>Hạn nộp</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "15px" }}>
            {jobs.map((item, index) => (
              <tr key={"saveJob" + item.id}>
                <td>{item.jname}</td>
                <td>{item.employer.name} </td>
                <td>{jobLocations[index]}</td>
                <td>{item.deadline} </td>
                <td>
                  {item.is_active === 1 ? (
                    <Link to={`/jobs/${item.id}`}>
                      <button className="btn btn-sm btn-outline-primary">
                        Ứng tuyển
                      </button>
                    </Link>
                  ) : (
                    <button className="btn btn-sm btn-outline-primary disabled">
                      Đã đóng
                    </button>
                  )}

                  <button
                    className="text-danger bg-white border-0 ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#jobDeletingModal"
                    onClick={() => setCurJob(item)}
                  >
                    <BsTrash3 className="fs-5 mb-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && <h5 className="">Không có bản ghi nào</h5>}
      </div>
      <SavedJobPopup config={config} job_id={curJob.id} />
    </CandidateLayout>
  );
}

export default SavedJobs;
