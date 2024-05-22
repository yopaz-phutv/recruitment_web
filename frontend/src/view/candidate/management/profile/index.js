import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CandidateContext } from "../layouts/CandidateLayout";
import resumeApi from "../../../../api/resume";
import { useSelector } from "react-redux";
import candidateApi from "../../../../api/candidate";
import PersonalInfor from "./personalInformation";
import Education from "./educations";
import Experience from "./experiences";
import Project from "./projects";
import Skill from "./skills";
import Certificate from "./certificates";
import Prize from "./prizes";
import Activity from "./activities";

export default function Profile() {
  const nav = useNavigate();
  const { personal } = useContext(CandidateContext);
  const partList = [
    { name: "Thông tin cá nhân", href: "#profile-personal" },
    { name: "Thông tin học vấn", href: "#profile-education" },
    { name: "Kinh nghiệm việc làm", href: "#profile-experience" },
    { name: "Dự án", href: "#profile-project" },
    { name: "Kỹ năng", href: "#profile-skill" },
    { name: "Chứng chỉ", href: "#profile-certificate" },
    { name: "Giải thưởng", href: "#profile-prize" },
    { name: "Hoạt động", href: "#profile-activity" },
  ];
  const isAuth = useSelector((state) => state.candAuth.isAuth);
  const [showChangeProfileStatusPart, setShowChangeProfileStatusPart] =
    useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [selectNewResume, setSelectNewResume] = useState(false);
  const [isLoadingUpdatePublicResume, setIsLoadingUpdatePublicResume] =
    useState(false);
  const [resumes, setResumes] = useState([]);
  const [curResume, setCurResume] = useState({});

  const getResumes = async () => {
    const res = await resumeApi.getByCurrentCandidate();
    setResumes(res);
  };
  const handleChangePublicResume = async (publicState = null) => {
    if (publicState === null) publicState = isPublic;
    setIsLoadingUpdatePublicResume(true);
    let data = {};
    if (!publicState) data.not_public = 1;
    else data.resume_id = curResume.id;

    await candidateApi.updatePublicResume(data);
    setIsLoadingUpdatePublicResume(false);
    setSelectNewResume(false);
  };

  useEffect(() => {
    if (isAuth && Object.keys(personal).length > 0) {
      setIsPublic(personal.public_resume_id ? true : false);
      setShowChangeProfileStatusPart(true);
    }
  }, [isAuth, personal]);

  useEffect(() => {
    if (isAuth && Object.keys(personal).length > 0 && resumes.length > 0) {
      setCurResume(
        resumes.find((item) => item.id === personal.public_resume_id) || {}
      );
    }
  }, [isAuth, personal, resumes]);

  useEffect(() => {
    if (isAuth) {
      getResumes();
    }
  }, [isAuth]);

  return (
    <div className="px-lg-4 pt-4 pb-5">
      <div className="d-flex">
        <div
          style={{ width: "70%" }}
          data-bs-spy="scroll"
          data-bs-target="#profile-part-list"
          data-bs-offset="0"
          tabIndex="0"
        >
          <PersonalInfor />
          <Education />
          <Experience />
          <Project />
          <Skill />
          <Certificate />
          <Prize />
          <Activity />
        </div>
        <div className="ps-3" style={{ width: "30%" }}>
          <div className="bg-white rounded sticky-top" style={{ top: "62px" }}>
            <div id="profile-part-list" className="pt-2 pb-1">
              <div className="border-bottom text-center fw-bold pb-1">
                Danh mục
              </div>
              {partList.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="d-block text-decoration-none text-main fw-600 px-3 px-lg-4 py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
            {showChangeProfileStatusPart && (
              <div className="border-top p-2 pb-3 ts-sm">
                <span>Cho phép nhà tuyển dụng tìm kiếm hồ sơ</span>
                <Form.Check
                  type="switch"
                  className="d-inline ms-2"
                  defaultChecked={isPublic}
                  onClick={() => {
                    if (isPublic) {
                      setSelectNewResume(false);
                      handleChangePublicResume(!isPublic);
                    }
                    setIsPublic(!isPublic);
                  }}
                />
                {isPublic && (
                  <div className="mt-2 mb-1">
                    {!selectNewResume ? (
                      <>
                        {Object.keys(curResume).length > 0 ? (
                          <>
                            Hồ sơ đã chọn: &nbsp;
                            <a
                              href={curResume.resume_link}
                              className="ts-sm text-primary pointer"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {curResume.title}
                            </a>
                          </>
                        ) : (
                          <div className="text-main">
                            Vui lòng chọn hồ sơ để nhà tuyển dụng xem được
                          </div>
                        )}
                        <Button
                          size="sm"
                          className="mt-1 w-100 bg-main border-0 px-3"
                          onClick={() => setSelectNewResume(true)}
                        >
                          Chọn hồ sơ mới
                        </Button>
                      </>
                    ) : resumes.length === 0 ? (
                      <div>
                        Bạn chưa có hồ sơ nào,{" "}
                        <span
                          className="text-primary pointer"
                          onClick={() => nav("/candidate/templates")}
                        >
                          nhấn vào đây
                        </span>{" "}
                        để tạo hồ sơ.
                      </div>
                    ) : (
                      <>
                        <div className="mb-1">Chọn hồ sơ:</div>
                        {resumes?.map((item) => (
                          <div key={item.id}>
                            <Form.Check
                              type="radio"
                              name="resume"
                              className="d-inline-block"
                              label={item.title}
                              onClick={() => setCurResume(item)}
                            />
                            <a
                              href={item.resume_link}
                              className="ts-sm ms-5 text-primary pointer"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Xem
                            </a>
                          </div>
                        ))}
                        <div className="mt-1 d-flex gap-2">
                          <Button
                            size="sm"
                            className="w-100 bg-main border-0 px-3"
                            onClick={handleChangePublicResume}
                            disabled={isLoadingUpdatePublicResume}
                          >
                            {isLoadingUpdatePublicResume ? (
                              <div className="d-flex align-items-center">
                                <Spinner size="sm" className="me-1" /> Đang lưu
                              </div>
                            ) : (
                              "Lưu"
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-100 px-3"
                            onClick={() => {
                              setSelectNewResume(false);
                              setCurResume({});
                            }}
                          >
                            Hủy
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
