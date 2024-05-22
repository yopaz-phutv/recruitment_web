import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import candidateApi from "../../../api/candidate";
import Loading from "../../../components/Loading";

function AppliedJobs() {
  const nav = useNavigate();
  const user = useSelector((state) => state.candAuth.current);
  const isAuth = useSelector((state) => state.candAuth.isAuth);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAppliedJobs = async () => {
    try {
      setIsLoading(true);
      const res = await candidateApi.getAppliedJobs(user.id);
      setJobs(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getAppliedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <>
      <div className="mx-4 mt-4 px-5 py-3 bg-white">
        <h4 className="mb-4 text-main">Việc làm đã nộp</h4>
        <table className="table border shadow-sm">
          <thead className="table-primary">
            <tr>
              <th className="fw-500" style={{ width: "28%" }}>
                Vị trí
              </th>
              <th className="fw-500" style={{ width: "26%" }}>
                Công ty
              </th>
              <th className="fw-500" style={{ width: "13%" }}>
                Ngày nộp
              </th>
              <th className="fw-500" style={{ width: "18%" }}>
                Trạng thái
              </th>
              <th className="fw-500">Hồ sơ</th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody className="ts-smd">
              {jobs.map((item) => (
                <tr key={"job" + item.id}>
                  <td>
                    <div
                      className="hover-text-main pointer"
                      onClick={() => nav(`/jobs/${item.id}`)}
                    >
                      {item.jname}
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.postDate} </td>
                  <td>
                    {item.status === "WAITING" && "Đang chờ duyệt"}
                    {item.status === "BROWSING_RESUME" && "Đang duyệt hồ sơ"}
                    {item.status === "RESUME_FAILED" && "Bị từ chối hồ sơ"}
                    {item.status === "BROWSING_INTERVIEW" &&
                      "Đang duyệt phỏng vấn"}
                    {item.status === "INTERVIEW_FAILED" && "Phỏng vấn thất bại"}
                    {item.status === "PASSED" && "Được nhận"}
                  </td>
                  <td>
                    <a
                      className=""
                      style={{ textDecoration: "none" }}
                      href={item.resume_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Xem
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {isLoading ? (
          <Loading />
        ) : (
          jobs.length === 0 && <h5 className="">Không có bản ghi nào</h5>
        )}
      </div>
    </>
  );
}

export default AppliedJobs;
