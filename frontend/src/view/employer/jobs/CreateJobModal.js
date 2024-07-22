import { useForm } from "react-hook-form";
import { AiOutlineLine } from "react-icons/ai";
import jobApi from "../../../api/job";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function CreateJobModal({
  jtypes,
  jlevels,
  industries,
  locations,
  getJobList,
  show,
  setShow,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [expireAtError, setExpireAtError] = useState(null);

  const onSubmit = async (job_inf) => {
    try {
      setIsLoading(true);
      if (expireAtError) {
        toast.error("Vui lòng kiểm tra lại thông tin!");
        return;
      }

      job_inf.expire_at = job_inf.expire_at + " 23:59:00";
      for (let j = 0; j < job_inf.industries.length; j++) {
        job_inf.industries[j] = industries[job_inf.industries[j]].id;
      }
      for (let j = 0; j < job_inf.locations.length; j++) {
        job_inf.locations[j] = locations[job_inf.locations[j]].id;
      }
      delete job_inf.salaryOpt;
      if (job_inf.yoe === "") delete job_inf.yoe;
      if (job_inf.min_salary === "") delete job_inf.min_salary;
      if (job_inf.max_salary === "") delete job_inf.max_salary;

      await jobApi.create(job_inf);
      toast.success("Tạo mới thành công!");
      setShow(false);
      await getJobList();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      new Date(watch("expire_at") + " 23:59:00").getTime() <=
      new Date().getTime()
    ) {
      setExpireAtError("Vui lòng chọn hạn nộp lớn hơn thời điểm hiện tại!");
    } else setExpireAtError(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("expire_at")]);

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
          Đăng việc làm mới
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">
        <form className="ms-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <strong>Tên việc làm:</strong>
            <input
              type="text"
              className="form-control w-50 mt-1"
              placeholder="Nhập tên việc làm"
              required
              {...register("jname")}
            />
          </div>
          <div className="mt-2">
            <strong>Ngành nghề:</strong>
            <div className="d-flex mt-2">
              <span>Chọn:</span>
              <select
                className="form-select w-50 ms-2"
                multiple
                size="6"
                required
                {...register("industries")}
              >
                {industries.map((item, index) => (
                  <option value={index} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {watch("industries") && watch("industries").length > 0 ? (
              <div
                className="form-control disabled-field mt-2"
                style={{ width: "50%" }}
              >
                {watch("industries").map((item, index) => (
                  <span key={"cur_industry" + item}>
                    {industries[item].name}
                    {index !== watch("industries").length - 1 && ", "}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="mt-2">
            <strong>Hình thức việc làm:</strong>
            <select
              className="form-select w-50 mt-1"
              {...register("jtype_id", { required: true })}
            >
              {jtypes.map((item) => (
                <option key={item.name} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {errors.jtype_id && (
            <span className="text-danger">Vui lòng chọn 1 lựa chọn</span>
          )}
          <div className="mt-2">
            <strong>Cấp bậc việc làm:</strong>
            <select
              className="form-select w-50 mt-1"
              {...register("jlevel_id", { required: true })}
            >
              {jlevels.map((item) => (
                <option key={item.name} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <strong>Tỉnh thành:</strong>
            <div className="d-flex mt-2">
              <span>Chọn:</span>
              <select
                className="form-select w-30 ms-2"
                multiple
                size="6"
                required
                {...register("locations")}
              >
                {locations.map((item, index) => (
                  <option value={index} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {watch("locations") && watch("locations").length > 0 ? (
              <div
                className="form-control disabled-field mt-2"
                style={{ width: "50%" }}
              >
                {watch("locations").map((item, index) => (
                  <span key={item}>
                    {locations[item].name}
                    {index !== watch("locations").length - 1 && ", "}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="mt-2">
            <strong>Địa chỉ làm việc:</strong>
            <textarea
              rows="4"
              className="form-control mt-1 w-75"
              placeholder="Nhập địa chỉ"
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
              required
              {...register("longitude")}
            />
          </div>
          {/* {errors.jlevel_id && (
            <span className="text-danger">Vui lòng chọn 1 lựa chọn</span>
          )} */}
          <div className="mt-2 d-flex align-items-center">
            <strong>Số lượng tuyển:</strong>
            <input
              type="number"
              className="form-control ms-2"
              style={{ width: "70px" }}
              required
              {...register("amount", { min: 1 })}
            />
          </div>
          {errors.amount?.type === "min" && (
            <span className="text-danger">Hãy nhập 1 số lớn hơn 0</span>
          )}
          <div className="mt-2">
            <div className="d-flex align-items-center">
              <strong>Mức lương:</strong>
            </div>
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
              Cụ thể <br />
              <small className="text-danger">
                {!watch("salaryOpt") && "Hãy chọn 1 trong 2 lựa chọn trên"}
              </small>
              {watch("salaryOpt") === "1" && (
                <div className="d-flex mt-1 align-items-center">
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "70px" }}
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
                    required
                    {...register("max_salary")}
                  />
                  &nbsp; triệu VND
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 d-flex align-items-center">
            <strong>Yêu cầu kinh nghiệm:</strong>
            <select
              className="form-select ms-1"
              style={{ width: "100px" }}
              {...register("yoe")}
            >
              <option value="">Không</option>
              {Array.from({ length: 20 }, (e, index) => (
                <option value={index + 1} key={"yoe" + index}>
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
              required
              {...register("expire_at")}
            />
          </div>
          {expireAtError && (
            <small className="text-danger">{expireAtError}</small>
          )}
          <div className="mt-2">
            <strong>Mô tả việc làm:</strong>
            <textarea
              rows="10"
              className="form-control mt-1"
              style={{ width: "98%" }}
              placeholder="Nhập mô tả việc làm"
              required
              {...register("description")}
            />
          </div>
          <div className="mt-2">
            <strong>Yêu cầu ứng viên:</strong>
            <textarea
              rows="10"
              className="form-control mt-1"
              style={{ width: "98%" }}
              placeholder="Nhập yêu cầu ứng viên"
              required
              {...register("requirements")}
            />
          </div>
          <div className="mt-2">
            <strong>Chế độ phúc lợi:</strong>
            <textarea
              rows="10"
              className="form-control mt-1"
              style={{ width: "98%" }}
              placeholder="Nhập chế độ phúc lợi"
              required
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
                "Tạo mới"
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
