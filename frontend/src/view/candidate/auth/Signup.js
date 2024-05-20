import { useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function Signup() {
  const required_field = <span className="text-danger fw-bold">*</span>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const AlertMsg = ({ msg }) => {
    return (
      <div className="d-flex justify-content-start">
        <span className="text-danger text-start" style={{ fontSize: "15px" }}>
          <span className="h5">
            <AiFillWarning />
          </span>
          <span className="ms-1">{msg}</span>
        </span>
      </div>
    );
  };
  const onSubmit = async (user) => {
    delete user.re_password;
    user.role = 1;
    try {
      setIsLoading(true);
      await authApi.register(user);
      toast.success("Đăng ký thành công!");
      if (window.location.pathname === "/sign-up") {
        navigate("/");
      }
    } catch (error) {
      toast.error("Email đã tồn tại trong hệ thống!");
      console.log("error::", error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="border rounded bg-white shadow mt-5 col-10 col-lg-5">
        <h5 className="py-3 text-center text-main border-bottom">
          Đăng ký tài khoản ứng viên
        </h5>
        <form className="px-4 mb-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 row row-cols-2">
            <div className="pe-2">
              <label htmlFor="lastname" className="d-flex form-label fw-600">
                Họ{required_field}
              </label>
              <input
                type="text"
                className="form-control"
                {...register("lastname", { required: true })}
                id="lastname"
                name="lastname"
                placeholder="Họ..."
              />
            </div>
            <div>
              <label htmlFor="firstname" className="d-flex form-label fw-600">
                Tên{required_field}
              </label>
              <input
                type="text"
                className="form-control"
                {...register("firstname", { required: true })}
                id="firstname"
                name="firstname"
                placeholder="Tên..."
              />
            </div>
          </div>
          {errors.lastname || errors.firstname ? (
            <AlertMsg msg="Hãy nhập đầy đủ họ, tên" />
          ) : null}
          <div className="mb-2">
            <label htmlFor="su_email" className="d-flex form-label fw-600">
              Email{required_field}
            </label>
            <input
              type="text"
              className="form-control"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              id="su_email"
              name="email"
              placeholder="Email..."
            />
          </div>
          {errors.email?.type === "required" && (
            <AlertMsg msg="Hãy nhập email" />
          )}
          {errors.email?.type === "pattern" && (
            <AlertMsg msg="Email không đúng định dạng" />
          )}
          <div className="mb-2">
            <label htmlFor="su_pswd" className="d-flex form-label fw-600">
              Mật khẩu{required_field}
            </label>
            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
              })}
              id="su_pswd"
              name="password"
              placeholder="Mật khẩu..."
            />
          </div>
          {errors.password?.type === "required" && (
            <AlertMsg msg="Hãy nhập mật khẩu" />
          )}
          {errors.password?.type === "pattern" && (
            <AlertMsg msg="Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số" />
          )}
          <div className="mb-2">
            <label htmlFor="re_pswd" className="d-flex form-label fw-600">
              Nhập lại mật khẩu{required_field}
            </label>
            <input
              type="password"
              className="form-control"
              {...register("re_password", {
                required: true,
              })}
              id="re_pswd"
              name="re_password"
              placeholder="Nhập lại mật khẩu..."
            />
          </div>
          {!errors.password && errors.re_password?.type === "required" && (
            <AlertMsg msg="Không được để trống" />
          )}
          {!errors.password &&
            (watch("re_password") !== "" &&
            watch("password") !== watch("re_password") ? (
              <AlertMsg msg="Mật khẩu nhập lại không khớp" />
            ) : null)}
          <button
            type="submit"
            className="btn bg-main text-white w-100 mt-2"
            disabled={isLoading}
          >
            {isLoading && <Spinner size="sm" className="me-1" />}
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
