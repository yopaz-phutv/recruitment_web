import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLine } from "react-icons/ai";
import jobApi from "../../../api/job";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

export default function EditJobModal({
  inf,
  jtypes,
  jlevels,
  industries,
  locations,
  getJobList,
  show,
  setShow,
}) {
  const jobIndustries = inf.industries;
  const jobLocations = inf.locations;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [isEditIndustry, setIsEditIndustry] = useState(false);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [isEditSalary, setIsEditSalary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (job_inf) => {
    try {
      setIsLoading(true);
      const keys = Object.keys(job_inf);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (key !== "yoe" && job_inf[key] === "") {
          delete job_inf[key];
        }
        if (key === "salaryOpt") {
          if (job_inf[key] === "0") {
            job_inf.min_salary = null;
            job_inf.max_salary = null;
          }
          delete job_inf[key];
        }
        if (key === "industries") {
          for (let j = 0; j < job_inf[key].length; j++) {
            job_inf[key][j] = industries[job_inf[key][j]].id;
          }
        }
        if (key === "locations") {
          for (let j = 0; j < job_inf[key].length; j++) {
            job_inf[key][j] = locations[job_inf[key][j]].id;
          }
        }
      }

      await jobApi.update(inf.id, job_inf);
      toast.success("Cập nhật thành công!");
      setShow(false);
      await getJobList();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      size="lg"
      fullscreen="xl-down"
      scrollable
      show={show}
      onHide={() => setShow(false)}
      style={{ fontFamily: "sans-serif" }}
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title className="w-100 text-center fw-600">
          Thông tin việc làm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">
        <form className="ms-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <strong>Tên việc làm:</strong>
            <input
              type="text"
              className="form-control w-50 mt-1"
              defaultValue={inf.jname}
              required
              {...register("jname")}
            />
          </div>
          <div className="mt-2">
            <strong>Ngành nghề:</strong>
            <div className="d-flex align-items-center mt-1">
              <div
                className="form-control disabled-field"
                style={{ width: "50%" }}
              >
                {!watch("industries") ? (
                  <>
                    {jobIndustries.map((item, index) => (
                      <span key={item.name}>
                        {item.name}
                        {index !== jobIndustries.length - 1 && ", "}
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                    {watch("industries").map((item, index) => (
                      <span key={"cur_industry" + index}>
                        {industries[item].name}
                        {index !== watch("industries").length - 1 && ", "}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <button
                type="button"
                className="btn btn-outline-primary ms-2"
                onClick={() => setIsEditIndustry(!isEditIndustry)}
              >
                {!isEditIndustry ? "Sửa" : "OK"}
              </button>
            </div>
            {isEditIndustry && (
              <div className="d-flex mt-2">
                <span>Chọn:</span>
                <select
                  className="form-select w-50 ms-2"
                  multiple
                  size="4"
                  {...register("industries")}
                >
                  {industries.map((item, index) => (
                    <option value={index} key={"industry" + item.id}>
                      {item.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="mt-2">
            <strong>Hình thức việc làm:</strong>
            <select className="form-select w-50 mt-1" {...register("jtype_id")}>
              {jtypes.map((item) => (
                <option
                  key={item.name}
                  value={item.id}
                  selected={item.name === inf.jtype_name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <strong>Cấp bậc:</strong>
            <select
              className="form-select w-50 mt-1"
              {...register("jlevel_id")}
            >
              {jlevels.map((item) => (
                <option
                  key={item.name}
                  value={item.id}
                  selected={item.name === inf.jlevel_name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <strong>Tỉnh thành:</strong>
            <div className="d-flex align-items-center mt-1">
              <div
                className="form-control disabled-field"
                style={{ width: "35%" }}
              >
                {!watch("locations") ? (
                  <>
                    {jobLocations.map((item, index) => (
                      <span key={item.name}>
                        {item.name}
                        {index !== jobLocations.length - 1 && ", "}
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                    {watch("locations").map((item, index) => (
                      <span key={"cur_location" + index}>
                        {locations[item].name}
                        {index !== watch("locations").length - 1 && ", "}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <button
                type="button"
                className="btn btn-outline-primary ms-2"
                onClick={() => setIsEditLocation(!isEditLocation)}
              >
                {!isEditLocation ? "Sửa" : "OK"}
              </button>
            </div>
            {isEditLocation && (
              <div className="d-flex mt-2">
                <span>Chọn:</span>
                <select
                  className="form-select ms-2 w-30"
                  multiple
                  size="6"
                  {...register("locations")}
                >
                  {locations.map((item, index) => (
                    <option value={index} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="mt-2">
            <strong>Địa chỉ làm việc:</strong>
            <textarea
              rows="4"
              className="form-control mt-1 w-75"
              defaultValue={inf.address}
              required
              {...register("address")}
            />
          </div>
          <div className="mt-2 d-inline-block">
            <strong>Vĩ độ:</strong>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Nhập vĩ độ địa lý"
              defaultValue={inf.latitude}
              required
              {...register("latitude")}
            />
          </div>
          <div className="mt-2 d-inline-block ms-4">
            <strong>Kinh độ:</strong>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Nhập kinh độ địa lý"
              defaultValue={inf.longitude}
              required
              {...register("longitude")}
            />
          </div>
          <div className="mt-2 d-flex align-items-center">
            <strong>Số lượng tuyển:</strong>
            <input
              type="number"
              className="form-control ms-2"
              style={{ width: "70px" }}
              defaultValue={inf.amount}
              required
              {...register("amount", { min: 1 })}
            />
          </div>
          {errors.amount?.type === "min" && (
            <span className="text-danger">Hãy nhập 1 số lớn hơn 0</span>
          )}
          <div className="mt-2">
            <div className="d-flex align-items-center">
              <strong>Lương:</strong>
              <div
                className="form-control ms-1 disabled-field"
                style={{ width: "180px" }}
              >
                {!watch("salaryOpt") && !inf.min_salary ? "Thỏa thuận" : null}
                {!watch("salaryOpt") && inf.min_salary ? (
                  <span>{inf.min_salary + "-" + inf.max_salary} triệu VND</span>
                ) : null}
                {watch("salaryOpt") === "0" && "Thỏa thuận"}
                {watch("salaryOpt") === "1" && (
                  <span>
                    {watch("min_salary") && watch("min_salary")}-
                    {watch("max_salary") && watch("max_salary")} triệu VND
                  </span>
                )}
              </div>
              <button
                type="button"
                className=" ms-2 btn btn-outline-primary"
                onClick={() => setIsEditSalary(!isEditSalary)}
              >
                {!isEditSalary ? "Sửa" : "OK"}
              </button>
            </div>
            {isEditSalary && (
              <div className="form-check mt-1">
                <input
                  type="radio"
                  className="form-check-input"
                  name="salaryOpt"
                  value="0"
                  {...register("salaryOpt")}
                />
                Thỏa thuận <br />
                <input
                  type="radio"
                  className="form-check-input"
                  name="salaryOpt"
                  value="1"
                  {...register("salaryOpt")}
                />
                Cụ thể
                {watch("salaryOpt") === "1" && (
                  <div className="d-flex mt-1 align-items-center">
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: "70px" }}
                      defaultValue={inf.min_salary}
                      required
                      {...register("min_salary")}
                    />
                    <AiOutlineLine
                      className="mx-1"
                      style={{ fontSize: "14px" }}
                    />
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: "70px" }}
                      defaultValue={inf.max_salary}
                      required
                      {...register("max_salary")}
                    />
                    &nbsp; triệu VND
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 d-flex align-items-center">
            <strong>Yêu cầu kinh nghiệm:</strong>
            <select
              className="form-select ms-1"
              style={{ width: "100px" }}
              {...register("yoe")}
            >
              <option value="" selected={inf.yoe === null}>
                Không
              </option>
              {Array.from({ length: 20 }, (e, index) => (
                <option
                  value={index + 1}
                  selected={inf.yoe === index + 1}
                  key={"yoe" + index}
                >
                  {index + 1 + " năm"}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 d-flex align-items-center">
            <strong>Số vòng phỏng vấn:</strong>
            <input
              type="number"
              className="form-control ms-2"
              style={{ width: "70px" }}
              defaultValue={inf.interview_round_num}
              required
              {...register("interview_round_num", { min: 1 })}
            />
          </div>
          {errors.interview_round_num?.type === "min" && (
            <span className="text-danger">Hãy nhập 1 số lớn hơn 0</span>
          )}
          <div className="mt-2 d-flex align-items-center">
            <strong>Hạn nộp hồ sơ:</strong>
            <input
              type="date"
              className="form-control ms-1"
              style={{ width: "180px" }}
              defaultValue={inf.expire_at}
              {...register("expire_at")}
            />
          </div>
          <div className="mt-2">
            <strong>Mô tả công việc:</strong>
            <textarea
              rows="10"
              className="form-control mt-1"
              style={{ width: "98%" }}
              defaultValue={inf.description}
              {...register("description")}
            />
          </div>
          <div className="mt-2">
            <strong>Yêu cầu ứng viên:</strong>
            <textarea
              rows="10"
              className="form-control mt-1"
              style={{ width: "98%" }}
              defaultValue={inf.requirements}
              {...register("requirements")}
            />
          </div>
          <div className="mt-2">
            <strong>Chế độ phúc lợi:</strong>
            <textarea
              rows="10"
              className="form-control mt-1"
              style={{ width: "98%" }}
              defaultValue={inf.benefits}
              {...register("benefits")}
            />
          </div>
          <div className="mt-3 float-end">
            <button
              type="submit"
              className="btn bg-main text-white d-inline-flex gap-1 align-items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  Đang xử lý
                </>
              ) : (
                "Cập nhật"
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary me-2 ms-3"
              onClick={() => setShow(false)}
            >
              Đóng
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
