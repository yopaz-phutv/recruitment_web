import { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
// import {userContext} from "../../context/index.js";
import { BsCheckCircle, BsEye, BsSearch, BsXCircle } from "react-icons/bs";
import "./custom.css";
import { MessagePopup } from "../../components/popup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import employerApi from "../../api/employer";

function CandidateList() {
  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm();
  const [candidates, setCandidates] = useState([]);
  const [curCandidate, setCurCandidate] = useState({});
  const [popupMsg, setPopupMsg] = useState("");
  const [status, setStatus] = useState("0");
  const com_inf = useSelector((state) => state.employerAuth.current.employer);
  const isAuth = useSelector((state) => state.employerAuth.isAuth);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("employer_jwt")}`,
    },
  };

  const getCandidateList = async (inf) => {
    const data = { id: com_inf.id, status: status };
    let keyword = "";
    if (inf) {
      keyword = inf.keyword;
    }
    const res = await employerApi.getCandidateList(keyword, data);
    setCandidates(res);
  };

  const handleClickActionBtn = async (cand_inf, key) => {
    console.log("status:", cand_inf.status, "key:", key);
    if (key === 1 && cand_inf.status === 0) {
      const data = { ...cand_inf, request_type: key };
      console.log("data:", data);
      await employerApi
        .processApplying(data)
        .then((res) => {
          console.log(res);
        })
        .catch();
    }
    if (key !== 1) {
      setCurCandidate({ ...cand_inf, request_type: key });
      const prefix_msg =
        key === 2 ? "Chấp nhận ứng viên " : "Từ chối ứng viên ";
      setPopupMsg(
        <p>
          {prefix_msg}
          <strong>
            {cand_inf.lastname} {cand_inf.firstname}
          </strong>
          ?
        </p>
      );
    }
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    // console.log(e.target.value);
  };

  useEffect(() => {
    if (isAuth) getCandidateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isAuth]);

  return (
    <Layout>
      <div
        className="bg-white"
        style={{
          height: "94%",
          margin: "17px 18px 0px 18px",
        }}
      >
        <div style={{ marginLeft: "35px" }}>
          <h4 className="pt-3">Danh sách ứng viên</h4>
          <div className="mt-4">
            <form className="mb-3" onSubmit={handleSubmit(getCandidateList)}>
              <div className="input-group" style={{ width: "35%" }}>
                <input
                  type="text"
                  className="form-control border-end-0"
                  placeholder="Nhập tên, email ứng viên, việc làm"
                  {...register("keyword")}
                />
                <button type="submit" className="input-group-text bg-white">
                  <BsSearch />
                </button>
              </div>
              <div
                className="d-flex align-items-center mt-3"
                style={{ fontSize: "15px" }}
              >
                <strong>Trạng thái: </strong>&nbsp;
                <select
                  className="rounded form-select"
                  name="status"
                  style={{ width: "13%" }}
                  onChange={handleChangeStatus}
                >
                  <option value="0">Chưa duyệt</option>
                  <option value="2">Đã chấp nhận</option>
                </select>
              </div>
            </form>
          </div>
          <div className="mt-4 " style={{ width: "90%" }}>
            <table className="table table-borderless border text-center">
              <thead className="table-danger" style={{ fontSize: "15px" }}>
                <tr>
                  <th style={{ width: "17%" }}>Họ tên</th>
                  <th style={{}}>Vị trí ứng tuyển</th>
                  <th style={{ width: "15%" }}>Thời gian</th>
                  <th style={{ width: "12%" }}>Số điện thoại</th>
                  <th style={{ width: "18%" }}>Email</th>
                  <th style={{ width: "13%" }}>Hành động</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {candidates.length !== 0 &&
                  candidates.map((item) => (
                    <tr key={item.jname + item.phone}>
                      <td>{item.lastname + " " + item.firstname}</td>
                      <td>{item.jname}</td>
                      <td>{item.appliedTime}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td style={{ fontSize: "17px" }}>
                        {status === "0" && (
                          <>
                            <button
                              className="border-0 bg-white"
                              data-bs-toggle="modal"
                              data-bs-target="#infModal"
                              onClick={() => handleClickActionBtn(item, 2)}
                            >
                              <BsCheckCircle className="text-success" />
                            </button>
                            <button
                              className="border-0 bg-white"
                              data-bs-toggle="modal"
                              data-bs-target="#infModal"
                              onClick={() => handleClickActionBtn(item, 3)}
                            >
                              <BsXCircle className="ms-2 text-danger" />
                            </button>
                          </>
                        )}
                        <a
                          className="ms-2"
                          style={{ textDecoration: "none" }}
                          href={item.cv_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BsEye
                            type="button"
                            className="text-primary"
                            // data-bs-toggle="modal"
                            // data-bs-target="#profileModal"
                            onClick={() => handleClickActionBtn(item, 1)}
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {candidates.length === 0 && (
              <h5 className="">Không có bản ghi nào</h5>
            )}
            <MessagePopup message={popupMsg} cand_inf={curCandidate} />
            {/* <ProfilePopup cand_inf={curCandidate} /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CandidateList;
