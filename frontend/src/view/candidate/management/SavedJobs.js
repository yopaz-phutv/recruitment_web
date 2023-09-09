import { useEffect, useState } from "react";
import CandidateLayout from "./layouts/CandidateLayout";
import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import SavedJobPopup from "./SavedJobPopup";
import candidateApi from "../../../api/candidate";

function SavedJobs() {
  const [jobs, setJobs] = useState([{ locations: [], employer: {} }]);
  const [jobLocations, setJobLocations] = useState([]);
  const [curJob, setCurJob] = useState({});
  const user = useSelector((state) => state.candAuth.current);
  const isAuth = useSelector(state=>state.candAuth.isAuth);

  const getSavedJobs = async () => {
    const jobs = await candidateApi.getSavedJobs(user.id);
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
  };

  useEffect(() => {
    if(isAuth) getSavedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

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
      <SavedJobPopup job_id={curJob.id} />
    </CandidateLayout>
  );
}

export default SavedJobs;
