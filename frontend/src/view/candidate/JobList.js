import { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jobApi from "../../api/job";
import industryApi from "../../api/industry";
import locationApi from "../../api/location";
import jtypeApi from "../../api/jtype";
import jlevelApi from "../../api/jlevel";
import { AppContext } from "../../App";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import dayjs from "dayjs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CPagination from "../../components/CPagination";
import CMulSelect from "../../components/CMulSelect";

function JobList() {
  const nav = useNavigate();
  const { setCurrentPage } = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const [jobs, setJobs] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jtypes, setJtypes] = useState([]);
  const [jlevels, setJlevels] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [filterConditions, setFilterConditions] = useState({});
  const [kkk, setKkk] = useState([]);

  const getJobs = async (page = 1, conditions) => {
    const res = await jobApi.getList({
      page,
      ...(conditions || filterConditions),
    });
    setJobs(res.data);
    setTotalPage(res.last_page);
  };
  const getAllIndustries = async () => {
    const res = await industryApi.getAll();
    setIndustries(res.inf);
  };

  const getAllLocations = async () => {
    const res = await locationApi.getAll();
    setLocations(res);
  };

  const getAllJtypes = async () => {
    const res = await jtypeApi.getAll();
    setJtypes(res.inf);
  };

  const getAllJlevels = async () => {
    const res = await jlevelApi.getAll();
    setJlevels(res.inf);
  };

  const handleFilter = async (data) => {
    // console.log(data);
    setFilterConditions(data);
    getJobs(1, data);
    setCurPage(1);
  };

  useEffect(() => {
    setCurrentPage("jobs");
    getJobs();
    getAllIndustries();
    getAllLocations();
    getAllJtypes();
    getAllJlevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log("kkk::", kkk);
  }, [kkk]);

  return (
    <div className="pt-3 pb-4" style={{ margin: "0px 100px" }}>
      <form
        className="bg-mlight p-3 rounded shadow-sm border"
        onSubmit={handleSubmit(handleFilter)}
      >
        <h4 className="text-center text-main">
          Tìm việc làm nhanh, việc làm mới nhất trên toàn quốc
        </h4>
        <div className="d-flex flex-wrap gap-2 mt-3 ps-4">
          <div className="me-2">
            <input
              type="text"
              className="form-control"
              style={{ width: "300px" }}
              placeholder="Tên công ty"
              {...register("keyword")}
            />
          </div>
          <div className="me-2">
            <select
              className="form-select"
              style={{ width: "300px" }}
              {...register("industry_id")}
            >
              <option value="">Tất cả ngành nghề</option>
              {industries.map((item) => (
                <option value={item.id} key={"industry" + item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select
              className="form-select"
              style={{ width: "300px" }}
              {...register("location_id")}
            >
              <option value="">Tất cả tỉnh thành</option>
              {locations.map((item) => (
                <option value={item.id} key={"location" + item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="me-2">
            <select
              className="form-select"
              style={{ width: "300px" }}
              {...register("salary")}
            >
              <option value="">Mức lương</option>
              <option value="5">Trên 5 triệu</option>
              <option value="10">Trên 10 triệu</option>
              <option value="15">Trên 15 triệu</option>
              <option value="20">Trên 20 triệu</option>
              <option value="25">Trên 25 triệu</option>
              <option value="30">Trên 30 triệu</option>
              <option value="40">Trên 40 triệu</option>
              <option value="50">Trên 50 triệu</option>
            </select>
          </div>
          <div>
            <select
              className="form-select me-2"
              style={{ width: "300px" }}
              {...register("jtype_id")}
            >
              <option value="">Hình thức việc làm</option>
              {jtypes.map((item) => (
                <option value={item.id} key={"jtype" + item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="me-2">
            <select
              className="form-select"
              style={{ width: "300px" }}
              {...register("jlevel_id")}
            >
              <option value="">Cấp bậc</option>
              {jlevels.map((item) => (
                <option value={item.id} key={"jlevel" + item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="border-0 bg-main text-white rounded px-3"
          >
            <BsSearch className="fs-5" /> Tìm kiếm
          </button>
        </div>
      </form>
      {locations.length > 0 && (
        <CMulSelect
          className="w-25"
          defaultText="dia diem"
          items={locations}
          textAtt="name"
          valueAtt="id"
          setOutput={setKkk}
        />
      )}
      <div className="row row-cols-lg-3 mt-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              className="mb-3 pointer"
              key={`job_${job.id}`}
              onClick={() => nav(`/jobs/${job.id}`)}
            >
              <div className="d-flex p-2 border hover-border-main hover-shadow-sm bg-white h-100">
                <div
                  className="border d-flex align-items-center px-2"
                  style={{ width: "100px", height: "100px" }}
                >
                  <img src={job.employer.logo} width="100%" alt={job.jname} />
                </div>
                <div
                  className="ms-2 mt-1"
                  style={{ width: "calc(100% - 125px)" }}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="ts-xs">{job.jname}</Tooltip>}
                  >
                    <div
                      className="text-truncate fw-bold text-dark text-decoration-none hover-text-main"
                      onClick={() => nav(`/jobs/${job.id}`)}
                    >
                      {job.jname}
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="ts-xs">{job.employer.name}</Tooltip>
                    }
                  >
                    <div className="ts-smd text-secondary text-truncate">
                      {job.employer.name}
                    </div>
                  </OverlayTrigger>
                  <div className="ts-sm">
                    <div className="d-flex flex-wrap gap-1">
                      <div className="d-flex align-items-center me-3">
                        <MdOutlineAttachMoney className="fs-5 text-main" />
                        {job.min_salary ? (
                          <span>
                            {job.min_salary} - {job.max_salary} triệu VND
                          </span>
                        ) : (
                          <span>Theo thỏa thuận</span>
                        )}
                      </div>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip className="ts-xs">
                            {job.locations?.map((item, index) => (
                              <div key={`location_${index}`}>
                                {item.name}
                                {index !== job.locations?.length - 1 && ", "}
                              </div>
                            ))}
                          </Tooltip>
                        }
                      >
                        <div className="d-flex align-items-center">
                          <MdLocationOn className="fs-5 text-main" />
                          {job.locations && job.locations[0].name}
                          {job.locations?.length > 1 && "..."}
                        </div>
                      </OverlayTrigger>
                    </div>
                    <div className="mt-1">
                      <span
                        className="rounded-pill bg-disabled"
                        style={{ padding: "2.5px 8px" }}
                      >
                        Còn&nbsp;
                        {dayjs().diff(job.expire_at, "day") <= 30
                          ? dayjs().diff(job.expire_at, "day")
                          : "30+"}{" "}
                        ngày
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="my-4" style={{ marginLeft: "100px" }}>
            Không có kết quả nào phù hợp!
          </h4>
        )}
      </div>
      <CPagination
        className="justify-content-center"
        totalPage={totalPage}
        curPage={curPage}
        setCurPage={setCurPage}
        getList={getJobs}
      />
    </div>
  );
}

export default JobList;
