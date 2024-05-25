import { useEffect, useState } from "react";
import { BsCheckCircle, BsEye, BsXCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import NotificationModal from "./NotificationModal";
import employerApi from "../../../api/employer";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import clsx from "clsx";
import Loading from "../../../components/Loading";
import CTooltip from "../../../components/CTooltip";
import useGetJobsByEmployer from "../../../hooks/useGetJobsByEmployer";
import CircleTabs from "./CircleTabs";

function CandidateList() {
  // loc ho so theo: vi tri ung tuyen, tinh thanh,
  const isAuth = useSelector((state) => state.employerAuth.isAuth);
  const { jobs } = useGetJobsByEmployer();
  const [candidates, setCandidates] = useState([]);
  const [curCandidate, setCurCandidate] = useState({});

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("WAITING");
  const [step, setStep] = useState("step1");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [curJobId, setCurJobId] = useState("");
  const [curRound, setCurRound] = useState(1);

  const { register, handleSubmit } = useForm();

  const makeTabStyle = (tabName) => {
    return clsx(
      "fw-600 pb-1 me-5",
      step === tabName
        ? "border-2 border-bottom border-primary"
        : "text-secondary"
    );
  };
  const getCandidateList = async () => {
    try {
      setIsLoading(true);
      const res = await employerApi.getCandidateList({
        keyword,
        status,
        job_id: curJobId,
      });
      setCandidates(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (step === "step1") setStatus("WAITING");
    else if (step === "step2") setStatus("BROWSING_INTERVIEW");
    else if (step === "step3") setStatus("PASSED");
  }, [step]);

  const handleClickActionBtn = async (candidate, actType) => {
    if (actType === "VIEWED" && candidate.status === "WAITING") {
      await employerApi
        .processApplying({ ...candidate, actType })
        .then((res) => {
          console.log(res);
        });
    }
    if (actType !== "VIEWED") {
      setCurCandidate({ ...candidate, actType, step });
      setShowDialog(true);
    }
  };

  useEffect(() => {
    if (isAuth) getCandidateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, keyword, status, curJobId]);

  return (
    <>
      <div
        className="bg-white ms-3 mt-3 py-3 shadow-sm"
        style={{ height: "95%" }}
      >
        <h5 className="mb-0 text-main" style={{ marginLeft: "45px" }}>
          Danh sách ứng viên
        </h5>
        <Tab.Container onSelect={(k) => setStep(k)}>
          <Nav className="mx-auto pb-1 justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="step1">
                <span className={makeTabStyle("step1")}>Duyệt hồ sơ</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="step2">
                <span className={makeTabStyle("step2")}>Duyệt phỏng vấn</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="step3">
                <span className={makeTabStyle("step3")}>Đã tiếp nhận</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Tab.Container>
        <div className="mt-1" style={{ marginLeft: "45px" }}>
          <Form onSubmit={handleSubmit((data) => setKeyword(data.keyword))}>
            {step !== "step3" && (
              <div className="d-flex gap-2 mt-2 ts-smd">
                <CTooltip text="Trạng thái">
                  <Form.Select
                    size="sm"
                    className="rounded"
                    style={{ width: "190px" }}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {step === "step1" && (
                      <>
                        <option value="WAITING">Chưa duyệt hồ sơ</option>
                        <option value="RESUME_FAILED">Hồ sơ bị loại</option>
                      </>
                    )}
                    {step === "step2" && (
                      <>
                        <option value="BROWSING_INTERVIEW">
                          Đang duyệt phỏng vấn
                        </option>
                        <option value="INTERVIEW_FAILED">
                          Phỏng vấn bị loại
                        </option>
                      </>
                    )}
                  </Form.Select>
                </CTooltip>
                <CTooltip text="Vị trí việc làm">
                  <Form.Select
                    size="sm"
                    style={{ width: "290px" }}
                    onChange={(e) => setCurJobId(e.target.value)}
                  >
                    <option value="">Tất cả vị trí</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.jname}
                      </option>
                    ))}
                  </Form.Select>
                </CTooltip>
              </div>
            )}
          </Form>
          {step === "step2" && status === "BROWSING_INTERVIEW" ? (
            <CircleTabs
              title="Vòng"
              tabNum={3}
              curStep={curRound}
              setCurStep={setCurRound}
              className="m-4 w-50 mx-auto"
            />
          ) : null}
          <div className="mt-3" style={{ width: "90%" }}>
            <table className="table table-borderless border text-center shadow-sm">
              <thead className="table-primary ts-smd">
                <tr>
                  <th style={{ width: "17%" }}>Họ tên</th>
                  <th>Vị trí</th>
                  <th style={{ width: "15%" }}>Thời gian</th>
                  <th style={{ width: "12%" }}>Số điện thoại</th>
                  <th style={{ width: "18%" }}>Email</th>
                  {step === "step2" && <th>Vòng phỏng vấn</th>}
                  <th style={{ width: "13%" }}>Hành động</th>
                </tr>
              </thead>
              {!isLoading && (
                <tbody className="ts-sm">
                  {candidates.map((item) => (
                    <tr key={item.jname + item.phone}>
                      <td>{item.lastname + " " + item.firstname}</td>
                      <td>{item.jname}</td>
                      <td>{item.appliedTime}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      {step === "step2" && <td>{item.interview_round}</td>}
                      <td style={{ fontSize: "17px" }}>
                        {status !== "PASSED" &&
                        status !== "RESUME_FAILED" &&
                        status !== "INTERVIEW_FAILED" ? (
                          <>
                            <BsCheckCircle
                              className="text-success pointer"
                              onClick={() =>
                                handleClickActionBtn(item, "ACCEPT")
                              }
                            />
                            <BsXCircle
                              className="ms-2 text-danger pointer"
                              onClick={() =>
                                handleClickActionBtn(item, "REJECT")
                              }
                            />
                          </>
                        ) : null}
                        <a
                          className="ms-2"
                          style={{ textDecoration: "none" }}
                          href={item.resume_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BsEye
                            type="button"
                            className="text-primary"
                            onClick={() => handleClickActionBtn(item, "VIEWED")}
                          />
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
              candidates.length === 0 && <h5>Không có bản ghi nào</h5>
            )}
            <NotificationModal
              candidate={curCandidate}
              showDialog={showDialog}
              setShowDialog={setShowDialog}
              getCandidateList={getCandidateList}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateList;
