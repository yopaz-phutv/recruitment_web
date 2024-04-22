import "./login.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authApi from "../../../api/auth";
import { employerAuthActions } from "../../../redux/slices/employerAuthSlice";
import { toast } from "react-toastify";

function Login() {
  const required_mark = <span className="text-danger"> *</span>;
  const required_error = (
    <div className="text-danger text-start small">Vui lòng nhập thông tin!</div>
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isView, setIsView] = useState(false);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (inf) => {
    inf.role = 2;
    setIsLoading(true);
    try {
      const res = await authApi.login(inf);
      localStorage.setItem("employer_jwt", res.authorization.token);
      if (res.user.is_accepted === 0)
        nav("/employer/signup", { state: { wait: 1 } });
      else {
        toast.success("Đăng nhập thành công!");
        await authApi.getMe(2).then((res) => {
          dispatch(employerAuthActions.setUser(res));
          nav("/employer");
        });
      }
    } catch (error) {
      setMsg("Email hoặc mật khẩu không chính xác!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("employer_jwt")) {
      nav("/employer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        id="employer-login-form"
        className="mx-auto w-30"
        style={{ marginTop: "150px" }}
      >
        <form
          className="border px-4 py-3 rounded shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="mb-3 text-center text-main">
            Nhà tuyển dụng đăng nhập
          </h5>
          <div className="ts-smd">
            <label htmlFor="email" className="mb-1 fw-500">
              Email{required_mark}
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Nhập email..."
              {...register("email", { required: true })}
            />
            {errors.email && required_error}
          </div>
          <div className="mt-2 ts-smd">
            <label htmlFor="passwd" className="mb-1 fw-500">
              Password{required_mark}
            </label>
            <div className="input-group">
              <input
                type={isView ? "text" : "password"}
                className="form-control border-end-0"
                name="passwd"
                placeholder="Nhập password..."
                {...register("password", { required: true })}
              />
              <span
                className="input-group-text border-start-0 bg-white text-secondary"
                style={{ fontSize: "20px" }}
                onClick={() => setIsView(!isView)}
              >
                {isView ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            {errors.password && required_error}
          </div>
          {msg && <div className="text-danger text-center mt-2">{msg}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Đăng nhập
            {isLoading && (
              <div className="spinner-border spinner-border-sm ms-1"></div>
            )}
          </button>
          <div className="mt-1 text-center">
            <Link to={`#`} className="text-decoration-none">
              Quên mật khẩu
            </Link>
          </div>
          <hr />
          <div className="text-center">
            Bạn là nhà tuyển dụng mới?&nbsp;
            <Link to="/employer/signup" className="text-decoration-none">
              Đăng ký tài khoản
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
