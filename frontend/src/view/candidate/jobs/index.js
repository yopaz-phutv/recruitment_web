import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import jobApi from "../../../api/job";
import Spinner from "react-bootstrap/Spinner";
import CPagination from "../../../components/CPagination";
import CMulSelect from "../../../components/CMulSelect";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
  const [industryErr, setIndustryErr] = useState(null);
  const [locationErr, setLocationErr] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [filterConditions, setFilterConditions] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [distance, setDistance] = useState(null);
  const [address, setAddress] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [refreshHint, setRefreshHint] = useState(false);
  const [hintLocations, setHintLocations] = useState([]);
  const [curLocation, setCurLocation] = useState({});
  const [useMap, setUseMap] = useState(false);

  const getJobs = async (page = 1, conditions) => {
    try {
      setIsLoading(true);
      let params = {
        ...(conditions || filterConditions),
      };
      if (useMap) params.type = "get_all";
      else params.page = page;

      const res = await jobApi.getList(params);
      if (useMap) {
        setJobs(res);
      } else {
        setJobs(res.data);
        setTotalPage(res.last_page);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (data) => {
    if (address && distance) {
      if (selectedIndustries.length === 0 || selectedLocations.length === 0)
        return;
    }
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

  // const handleEnter = (key) => {
  //   if (key === "Enter" && address !== "") {
  //     setRefreshHint(true);
  //     setShowHint(true);
  //   }
  // };

  const handleChangeAddress = async (address) => {
    setAddress(address);
    setRefreshHint(true);
  };

  const handleSelectLocation = (location) => {
    setShowHint(false);
    setCurLocation(location);
    document.getElementById("map-address-input").value = location.address.label;
  };

  const handleSelectYourLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setShowHint(false);
        setCurLocation({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
        document.getElementById("map-address-input").value = "Vị trí của bạn";
      });
    } else alert("Trình duyệt không hỗ trợ xác định vị trí của bạn!");
  };

  useEffect(() => {
    getJobs();
    if (!useMap) {
      setCurLocation({});
      setDistance(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMap]);

  useEffect(() => {
    if (address && distance) {
      if (selectedIndustries.length === 0) setIndustryErr("Vui lòng chọn!");
      else setIndustryErr(null);
      if (selectedLocations.length === 0) setLocationErr("Vui lòng chọn!");
      else setLocationErr(null);
    }
  }, [address, distance, selectedIndustries, selectedLocations]);

  return (
    <div className="pt-3 pb-4" style={{ margin: "0px 100px" }}>
      <Form noValidate className="bg-mlight p-3 rounded shadow-sm border">
        <h4 className="text-center text-main">
          Tìm việc làm nhanh, việc làm mới nhất trên toàn quốc
        </h4>
        <div className="mt-3 d-flex flex-column flex-lg-row">
          <div style={{ width: "89%" }}>
            <div className="row row-cols-lg-3 gap-1 gap-lg-0 ps-3">
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  size="sm"
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
                    size="sm"
                    defaultText="Tất cả ngành nghề"
                    items={industries}
                    textAtt="name"
                    valueAtt="id"
                    setOutput={setSelectedIndustries}
                    errorMsg={industryErr}
                  />
                )}
              </div>
              <div>
                {locations.length > 0 && (
                  <CMulSelect
                    size="sm"
                    defaultText="Tất cả tỉnh thành"
                    items={locations}
                    textAtt="name"
                    valueAtt="id"
                    setOutput={setSelectedLocations}
                    errorMsg={locationErr}
                  />
                )}
              </div>
            </div>
            <div className="row row-cols-lg-4 gap-1 gap-lg-0 mt-2 ps-3">
              <div>
                <select
                  className="form-select form-select-sm"
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
                <select
                  className="form-select form-select-sm"
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
              <div>
                <select
                  className="form-select form-select-sm"
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
              <div>
                <select
                  className="form-select form-select-sm"
                  {...register("posting_period")}
                >
                  <option value="">Đăng trong vòng</option>
                  <option value="3">4 ngày trước</option>
                  <option value="7">1 tuần trước</option>
                  <option value="14">2 tuần trước</option>
                  <option value="30">1 tháng trước</option>
                </select>
              </div>
            </div>
            <div className="ms-3 mt-2 d-flex gap-2 align-items-lg-center flex-lg-row flex-column">
              <Form.Check
                type="switch"
                label="Tìm kiếm với map"
                className="ts-smd"
                style={{ marginTop: "5px" }}
                onClick={() => setUseMap(!useMap)}
              />
              {useMap && (
                <>
                  <div className="position-relative" style={{ width: "390px" }}>
                    <Form.Control
                      id="map-address-input"
                      type="type"
                      size="sm"
                      aria-label="address-input"
                      placeholder="Nhập địa điểm"
                      onChange={(e) => handleChangeAddress(e.target.value)}
                      // onKeyDown={(e) => handleEnter(e.key)}()
                      onFocus={() => setShowHint(true)}
                      onBlur={() => {
                        setTimeout(() => {
                          setShowHint(false);
                        }, 500);
                      }}
                    />
                    {showHint && (
                      <div
                        className="position-absolute w-100 bg-white z-index-1 ts-smd mt-1 shadow border overflow-auto"
                        style={{ maxHeight: "280px" }}
                      >
                        <div
                          className="fw-600 px-2 py-1 hover-bg-primary hover-text-white pointer border-bottom"
                          onClick={handleSelectYourLocation}
                        >
                          Vị trí của bạn
                        </div>
                        {hintLocations?.map((location, index) => (
                          <div
                            key={index}
                            className="px-2 py-1 hover-bg-primary hover-text-white pointer border-bottom"
                            onClick={() => handleSelectLocation(location)}
                          >
                            {location.address.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <InputGroup size="sm" style={{ width: "220px" }}>
                    <Form.Control
                      type="number"
                      aria-label="job-distance-input"
                      placeholder="Nhập khoảng cách"
                      className="border-end-0"
                      onChange={(e) => setDistance(e.target.value)}
                    />
                    <InputGroup.Text className="bg-white border-start-0">
                      km
                    </InputGroup.Text>
                  </InputGroup>
                </>
              )}
            </div>
          </div>
          <div className="flex-fill ps-3 align-self-lg-center mt-2 mt-lg-0">
            <button
              type="button"
              className="btn btn-sm border-0 bg-main text-white rounded-sm px-4"
              onClick={handleSubmit(handleFilter)}
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
      {useMap ? (
        <JobMap
          className="mt-3"
          jobs={jobs}
          address={address}
          distance={distance}
          refreshHint={refreshHint}
          setRefreshHint={setRefreshHint}
          hintLocations={hintLocations}
          setHintLocations={setHintLocations}
          curLocation={curLocation}
        />
      ) : isLoading ? (
        <div className="row row-cols-lg-3 mt-4">
          {Array.from({ length: 9 }, (_, index) => (
            <JobItemSkeleton key={index} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <h4 className="my-4">Không có bản ghi nào phù hợp!</h4>
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
