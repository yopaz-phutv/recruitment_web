import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import jobApi from "../../../api/job";
import Spinner from "react-bootstrap/Spinner";
import CPagination from "../../../components/CPagination";
import CMulSelect from "../../../components/CMulSelect";
import Form from "react-bootstrap/Form";
import useGetAllIndustries from "../../../hooks/useGetAllIndustries";
import useGetAllLocations from "../../../hooks/useGetAllLocations";
import useGetAllJtypes from "../../../hooks/useGetAllJtypes";
import useGetAllJlevels from "../../../hooks/useGetAllJlevels";
import JobItem from "./JobItem";
import JobItemSkeleton from "./JobItemSkeleton";
import JobMap from "./JobMap";

function JobList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { industries } = useGetAllIndustries();
  const { locations } = useGetAllLocations();
  const { jtypes } = useGetAllJtypes();
  const { jlevels } = useGetAllJlevels();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [filterConditions, setFilterConditions] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const getJobs = async (page = 1, conditions) => {
    try {
      setIsLoading(true);
      const res = await jobApi.getList({
        page,
        ...(conditions || filterConditions),
      });
      setJobs(res.data);
      setTotalPage(res.last_page);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (data) => {
    try {
      const conditions = {
        ...data,
        industry_id: selectedIndustries,
        location_id: selectedLocations,
      };
      setIsSearchLoading(true);
      setFilterConditions(conditions);
      await getJobs(1, conditions);
      setCurPage(1);
      setIsSearchLoading(false);
    } catch (e) {
      setIsSearchLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-3 pb-4" style={{ margin: "0px 100px" }}>
      <Form
        noValidate
        className="bg-mlight p-3 rounded shadow-sm border"
        onSubmit={handleSubmit(handleFilter)}
      >
        <h4 className="text-center text-main">
          Tìm việc làm nhanh, việc làm mới nhất trên toàn quốc
        </h4>
        <div className="mt-3 d-flex flex-column flex-lg-row">
          <div className="w-85">
            <div className="row row-cols-lg-3 gap-1 gap-lg-0 ps-3">
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  aria-label="job_keyword"
                  placeholder="Tìm việc làm"
                  {...register("keyword", { minLength: 3 })}
                  isInvalid={errors.keyword}
                />
                <Form.Control.Feedback
                  type="invalid"
                  tooltip
                  style={{ top: "-85%" }}
                >
                  Vui lòng nhập tối thiểu 3 kí tự
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                {industries.length > 0 && (
                  <CMulSelect
                    defaultText="Tất cả ngành nghề"
                    items={industries}
                    textAtt="name"
                    valueAtt="id"
                    setOutput={setSelectedIndustries}
                  />
                )}
              </div>
              <div>
                {locations.length > 0 && (
                  <CMulSelect
                    defaultText="Tất cả tỉnh thành"
                    items={locations}
                    textAtt="name"
                    valueAtt="id"
                    setOutput={setSelectedLocations}
                  />
                )}
              </div>
            </div>
            <div className="row row-cols-lg-4 gap-1 gap-lg-0 mt-2 ps-3">
              <div>
                <select className="form-select" {...register("salary")}>
                  <option value="">Mức lương</option>
                  <option value="5">Trên 5 triệu</option>
                  <option value="10">Trên 10 triệu</option>
                  <option value="15">Trên 15 triệu</option>
                  <option value="20">Trên 20 triệu</option>
                  <option value="25">Trên 25 triệu</option>
                  <option value="30">Trên 30 triệu</option>
                  <option value="40">Trên 40 triệu</option>
                  <option value="50">Trên 50 triệu</option>
                  <option value="5">Trên 5 triệu</option>
                  <option value="10">Trên 10 triệu</option>
                  <option value="15">Trên 15 triệu</option>
                  <option value="20">Trên 20 triệu</option>
                  <option value="25">Trên 25 triệu</option>
                  <option value="30">Trên 30 triệu</option>
                  <option value="40">Trên 40 triệu</option>
                  <option value="50">Trên 50 triệu</option>
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
                <select className="form-select " {...register("jtype_id")}>
                  <option value="">Hình thức việc làm</option>
                  {jtypes.map((item) => (
                    <option value={item.id} key={"jtype" + item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select className="form-select" {...register("jlevel_id")}>
                  <option value="">Cấp bậc</option>
                  {jlevels.map((item) => (
                    <option value={item.id} key={"jlevel" + item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select className="form-select" {...register("posting_period")}>
                  <option value="">Đăng trong vòng</option>
                  <option value="3">4 ngày trước</option>
                  <option value="7">1 tuần trước</option>
                  <option value="14">2 tuần trước</option>
                  <option value="30">1 tháng trước</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex-fill ps-3 mt-2 mt-lg-0">
            <button
              type="submit"
              className="btn border-0 bg-main text-white rounded"
            >
              {isSearchLoading ? (
                <Spinner size="sm" />
              ) : (
                <BsSearch className="fs-5" />
              )}
              <span> Tìm kiếm</span>
            </button>
          </div>
        </div>
      </Form>

      {/* <JobMap className="mt-3" jobs={jobs} /> */}

      {isLoading ? (
        <div className="row row-cols-lg-3 mt-4">
          {Array.from({ length: 9 }, (_, index) => (
            <JobItemSkeleton key={index} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <h4 className="my-4">
          Không có bản ghi nào phù hợp!
        </h4>
      ) : (
        <>
          <div className="row row-cols-lg-3 mt-4">
            {jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
          <CPagination
            className="justify-content-center"
            totalPage={totalPage}
            curPage={curPage}
            setCurPage={setCurPage}
            getList={getJobs}
          />
        </>
      )}
    </div>
  );
}

export default JobList;
