import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CandidateLayout from "./layouts/CandidateLayout";
import candidateApi from "../../../api/candidate";

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state) => state.candAuth.current);
  const isAuth = useSelector(state=>state.candAuth.isAuth);

  const getAppliedJobs = async () => {
    const res = await candidateApi.getAppliedJobs(user.id);
    setJobs(res);
  }

  useEffect(() => {
    getAppliedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <CandidateLayout>
      <div className="m-4 px-5 pt-4 bg-white" style={{ height: "92.5%" }}>
        <p className="mb-4 h4 ms-1">Việc làm đã nộp</p>
        <table className="table border">
          <thead className="table-primary">
            <tr>
              <th style={{ width: "28%" }}>Vị trí</th>
              <th style={{ width: "28%" }}>Công ty</th>
              <th style={{ width: "13%" }}>Ngày nộp</th>
              <th style={{ width: "13%" }}>Trạng thái</th>
              <th>Hồ sơ ứng tuyển</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "15px" }}>
            {jobs.map((item) => (
              <tr key={"job" + item.id}>
                <td>
                  <Link to={`/jobs/${item.id}`} className="nav-link">
                    {item.jname}
                  </Link>
                </td>
                <td>{item.name} </td>
                <td>{item.postDate} </td>
                <td>
                  {item.status === 0 && "Đang chờ duyệt"}
                  {item.status === 1 && "Đang duyệt"}
                  {item.status === 2 && "Được nhận"}
                  {item.status === 3 && "Bị từ chối"}
                </td>
                <td>
                  <a
                    className="ms-5"
                    style={{ textDecoration: "none" }}
                    href={item.cv_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Xem
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && <h5 className="">Không có bản ghi nào</h5>}
      </div>
    </CandidateLayout>
  );
}

export default AppliedJobs;
