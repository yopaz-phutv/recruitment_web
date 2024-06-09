import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import useGetAllLocations from "../../../hooks/useGetAllLocations";
import { useEffect, useState } from "react";
import CMulSelect from "../../../components/CMulSelect";
import useGetAllIndustries from "../../../hooks/useGetAllIndustries";
import TagInput from "../../../components/TagInput";
import { BsSearch } from "react-icons/bs";
import useGetAllJtypes from "../../../hooks/useGetAllJtypes";
import useGetAllJlevels from "../../../hooks/useGetAllJlevels";
import { expLevel } from "../../../common/constant";
import employerApi from "../../../api/employer";
import resumeApi from "../../../api/resume";
import CandidateItem from "./CandidateItem";
import ResumeModal from "./ResumeModal";
import { useLocation } from "react-router-dom";
import CPagination from "../../../components/CPagination";
import useGetJobsByEmployer from "../../../hooks/useGetJobsByEmployer";
import { useSelector } from "react-redux";
import SelectJobModal from "./SelectJobModal";

export default function FindingCandidates() {
  const isAuth = useSelector((state) => state.employerAuth.isAuth);
  const { locations, isLoading: isLoadingLocations } = useGetAllLocations();
  const { industries, isLoading: isLoadingIndustries } = useGetAllIndustries();
  const { jtypes } = useGetAllJtypes();
  const { jlevels } = useGetAllJlevels();
  const [locationIds, setLocationIds] = useState([]);
  const [industryIds, setIndustryIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [curResume, setCurResume] = useState({});
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const { jobs } = useGetJobsByEmployer();
  const [totalResumes, setTotalResumes] = useState(0);
  const [showSelectJobModal, setShowSelectJobModal] = useState(false);
  const [conditions, setConditions] = useState({});

  const location = useLocation();
  const searchCondition = location.state;
  const job_yoe = searchCondition?.yoe;
  const formatedJobYoe = !job_yoe ? null : job_yoe > 5 ? 6 : job_yoe;
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      gender: searchCondition?.gender,
      jtype_id: searchCondition?.jtypeId,
      jlevel_id: searchCondition?.jlevelId,
      job_yoe: formatedJobYoe,
    },
  });

  const fetchCandidates = async (page = 1, data) => {
    if (data) setConditions(data);
    let params = {
      ...(data || conditions),
      page,
    };
    const res = await employerApi.findCandidates(params);
    var resumeList = res.data;
    setResumes(resumeList);
    setTotalResumes(res.total);
    setTotalPage(res.last_page);
    for (let i = 0; i < resumeList.length; i++) {
      const avtSrc = await resumeApi.getAvatar(resumeList[i].id);
      resumeList[i].avtSrc = avtSrc.length === 0 ? null : avtSrc;
    }
    setResumes(resumeList);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    for (let key in data) {
      if (!data[key]) delete data[key];
    }
    if (skills.length > 0) {
      var skillText = "";
      skills.forEach((item) => {
        skillText += item + " ";
      });
      data.skill_text = skillText;
    }
    if (locationIds.length > 0) data.location_ids = locationIds;
    if (industryIds.length > 0) data.industry_ids = industryIds;

    await fetchCandidates(1, data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuth) {
      fetchCandidates();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div
      className="bg-white ms-3 mt-3 pb-2 shadow-sm"
      style={{ paddingLeft: "45px", paddingRight: "35px", height: "92.5%" }}
    >
      <h4 className="mb-2 pt-3 text-main">
        Tìm kiếm ứng viên theo tiêu chí việc làm
      </h4>
      <Form noValidate className="mt-3">
        <div className="row row-cols-4">
          {!isLoadingLocations && (
            <CMulSelect
              size="sm"
              className="mb-2"
              items={locations}
              textAtt="name"
              valueAtt="id"
              defaultText="Tất cả tỉnh thành"
              setOutput={setLocationIds}
              defaultValue={searchCondition?.locationIds}
            />
          )}
          {!isLoadingIndustries && (
            <CMulSelect
              size="sm"
              className="mb-2"
              contentWidth="300px"
              items={industries}
              textAtt="name"
              valueAtt="id"
              defaultText="Tất cả ngành nghề"
              setOutput={setIndustryIds}
              defaultValue={searchCondition?.industryIds}
            />
          )}
          <div>
            <Form.Select size="sm" className="mb-2" {...register("gender")}>
              <option value="">Giới tính</option>
              <option value="0" selected={searchCondition?.gender === 0}>
                Nam
              </option>
              <option value="1" selected={searchCondition?.gender === 1}>
                Nữ
              </option>
            </Form.Select>
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="w-30 ts-sm text-end pe-2">Độ tuổi</div>
            <InputGroup className="flex-fill align-items-center">
              <Form.Control
                type="number"
                size="sm"
                className="border-end-0"
                {...register("min_age")}
              />
              <div className="border-top border-bottom align-self-stretch">
                ---
              </div>
              <Form.Control
                type="number"
                size="sm"
                className="border-start-0"
                {...register("max_age")}
              />
            </InputGroup>
          </div>
          <div className="mb-2">
            <Form.Select size="sm" {...register("jtype_id")}>
              <option value="">Tất cả hình thức</option>
              {jtypes.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  selected={searchCondition?.jtypeId === item.id}
                >
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="mb-2">
            <Form.Select size="sm" {...register("jlevel_id")}>
              <option value="">Tất cả cấp bậc</option>
              {jlevels.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  selected={searchCondition?.jlevelId === item.id}
                >
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="mb-2">
            <Form.Select size="sm" {...register("job_yoe")}>
              {expLevel.map((item) => (
                <option
                  key={item.name}
                  value={item.value}
                  selected={formatedJobYoe === item.value}
                >
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* <div className="d-flex align-items-center mb-2">
            <div className="w-45 ts-sm">Mức lương</div>
            <InputGroup className="flex-fill align-items-center">
              <Form.Control
                type="number"
                size="sm"
                className="border-end-0"
                {...register("min_salary")}
              />
              <div className="border-top border-bottom align-self-stretch">
                ---
              </div>
              <Form.Control
                type="number"
                size="sm"
                className="border-start-0"
                {...register("max_salary")}
              />
            </InputGroup>
          </div> */}
        </div>
        <div className="d-flex">
          <TagInput
            size="sm"
            className="flex-fill"
            listWord={skills}
            setListWord={setSkills}
            placeholder="Nhập các kỹ năng"
          />
          <Button
            size="sm"
            className="bg-main ms-2 border-0 d-flex align-items-center justify-content-center gap-1"
            style={{ width: "180px" }}
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <Spinner size="sm" /> : <BsSearch className="fs-5" />}
            <span>Tìm kiếm</span>
          </Button>
        </div>
      </Form>
      <div className="mt-4 ts-sm text-main">
        Có {totalResumes} ứng viên phù hợp
      </div>
      <div className="mt-2 row row-cols-2 row-cols-lg-3">
        {resumes.length > 0 &&
          resumes.map((item) => (
            <div key={item.id}>
              <CandidateItem
                resume={item}
                handleViewDetail={() => {
                  setCurResume(item);
                  setShowResumeModal(true);
                }}
                setShowSelectJobModal={setShowSelectJobModal}
                setCurResume={setCurResume}
              />
            </div>
          ))}
      </div>
      {resumes.length > 0 && (
        <CPagination
          className="mt-2 justify-content-center"
          totalPage={totalPage}
          curPage={curPage}
          setCurPage={setCurPage}
          getList={fetchCandidates}
        />
      )}
      {showResumeModal && (
        <ResumeModal
          show={showResumeModal}
          setShow={setShowResumeModal}
          imageSrc={curResume.resume_link}
        />
      )}
      {showSelectJobModal && (
        <SelectJobModal
          show={showSelectJobModal}
          setShow={setShowSelectJobModal}
          jobs={jobs}
          curResume={curResume}
          resumes={resumes}
          setResumes={setResumes}
        />
      )}
    </div>
  );
}
