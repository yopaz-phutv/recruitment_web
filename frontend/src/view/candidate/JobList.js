import { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import jobApi from "../../api/job";
import industryApi from "../../api/industry";
import locationApi from "../../api/location";
import jtypeApi from "../../api/jtype";
import jlevelApi from "../../api/jlevel";

function JobList() {
  const [jobs, setJobs] = useState([{ employer: {} }]);
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jtypes, setJtypes] = useState([]);
  const [jlevels, setJlevels] = useState([]);
  const { register, handleSubmit } = useForm();
  // const [isSavedJobs, setIsSavedJobs] = useState([]);
  // const user = JSON.parse(localStorage.getItem('candidate'))

  const getAllJobs = async () => {
    // let tjobs = []
    const res = await jobApi.getAll();
    setJobs(res.inf);
    
      // await axios
      // .get(`http://127.0.0.1:8000/api/candidates/${user.id}/getSavedJobs`, config)
      // .then((res) => {
      //   console.log(res.data);
      //   let savedJobIDs = res.data       
      //   let mark = 0
      //   for (let i = 0; i < savedJobIDs.length; i++) {
      //     for (let j = mark; j < tjobs.length; j++) {
      //       if(tjobs[j].id === savedJobIDs[i]){
      //         tjobs[j].isSaved = true
      //         mark = j+1
      //         break;
      //       } else {
      //         tjobs[j].isSaved = false
      //       }
      //     }          
      //   }
      //   setJobs(tjobs)
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
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
    console.log(data);
    const res = await jobApi.filter(data);
    setJobs(res.inf);
  };
  
  // const handleClickSaveBtn = async (index) => {
  //   let temps = [...isSavedJobs];
  //   temps[index] = !temps[index];
  //   setIsSavedJobs(temps);
  //   await axios
  //     .get(`http://127.0.0.1:8000/api/candidates/${user.id}/saveJob`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    getAllJobs();
    getAllIndustries();
    getAllLocations();
    getAllJtypes();
    getAllJlevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <form
        className="pt-3 pb-2"
        style={{ marginLeft: "76px" }}
        onSubmit={handleSubmit(handleFilter)}
      >
        <div className="input-group">
          <div className="">
            <input
              type="text"
              className="form-control"
              style={{ width: "300px" }}
              placeholder="Tên công ty"
              {...register("keyw")}
            />
          </div>
          <div className="ms-2">
            <select
              className="form-select"
              style={{ width: "300px" }}
              {...register("industry_id")}
            >
              <option value="">Tất cả ngành nghề</option>
              {industries.map((item) => (
                <option value={item.id} key={'industry'+item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="ms-2">
            <select
              className="form-select"
              style={{ width: "300px" }}
              {...register("location_id")}
            >
              <option value="">Tất cả tỉnh thành</option>
              {locations.map((item) => (
                <option value={item.id} key={'location'+item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn text-white rounded ms-2 px-3"
            style={{ backgroundColor: "#00b33c" }}
          >
            <BsSearch />
          </button>
        </div>
        <div className="input-group mt-2">
          <div>
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
              className="form-select ms-2"
              style={{ width: "300px" }}
              {...register("jtype_id")}
            >
              <option value="">Hình thức việc làm</option>
              {jtypes.map((item) => (
                <option value={item.id} key={'jtype'+item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="form-select ms-2"
              style={{ width: "300px" }}
              {...register("jlevel_id")}
            >
              <option value="">Cấp bậc</option>
              {jlevels.map((item) => (
                <option value={item.id} key={'jlevel'+item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          {/* <div>
            <select
              className="form-select ms-1"
              style={{ width: "225px" }}
              {...register("sort_type")}
            >
              <option value="">Sắp xếp theo</option>
            </select>
          </div> */}
        </div>
      </form>

      <div className="row pb-5">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              className="col-md-5 col-sm-10 bg-white border p-1 my-2"
              key={'job' + job.id}
              style={{ marginLeft: "88px" }}
            >
              <div className="d-flex p-3">
                <div className="border d-flex align-items-center">
                  <Link to={`/companies/${job.employer.id}`}>
                    <img
                      src={job.employer.logo}
                      style={{
                        maxHeight: "130px",
                        maxWidth: "130px",
                        cursor: "pointer",
                      }}
                      alt={job.jname}
                    />
                  </Link>
                </div>
                <div className="container-fluid ms-3 mt-1 text-start">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="fw-bold text-dark"
                    style={{
                      fontSize: "18px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span>{job.jname}</span>
                  </Link>
                  <br />
                  <span className="text-secondary">{job.employer.name}</span>
                  <br />
                  <div style={{ fontSize: "15.5px" }}>
                    <span className="fw-bold">Mức lương:</span>&nbsp;
                    {job.min_salary ? (
                      <span>
                        {job.min_salary} - {job.max_salary} triệu VND
                      </span>
                    ) : (
                      <span>Theo thỏa thuận</span>
                    )}
                    <br />
                    <div className="clearfix">
                      <span>
                        <strong>Địa điểm: </strong>
                        {job.location}
                      </span>
                      {/* <span
                        className="float-end me-3 text-muted"
                        onClick={() => handleClickSaveBtn(index)}
                        style={{ cursor: "pointer" }}
                      >
                        <span>
                          {!job.isSaved ? (
                            <AiOutlineHeart className="fs-5" />
                          ) : (
                            <AiFillHeart className="fs-5 text-danger" />
                          )}
                        </span>{" "}
                        Lưu việc làm
                      </span> */}
                    </div>
                    <div className="clearfix">
                      <span>
                        <strong>Ngày đăng: </strong>
                        {job.postDate ? job.postDate : "06/04/2023"}
                      </span>
                      <span className="float-end me-3">
                        <strong>Hạn nộp: </strong>
                        {job.expire_at}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="my-4 text-start" style={{ marginLeft: "100px" }}>
            Không có kết quả nào phù hợp!
          </h4>
        )}
      </div>
    </Layout>
  );
}

export default JobList;
