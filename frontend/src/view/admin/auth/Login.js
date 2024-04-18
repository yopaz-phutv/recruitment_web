import "./login.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/auth";
import { toast } from "react-toastify";

function Login() {
  const required_mark = <span className="text-danger"> *</span>;
  const required_error = (
    <div className="text-danger small">Vui lòng nhập thông tin!</div>
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (user) => {
    user.role = 0;
    setIsLoading(true);
    await authApi
      .login(user)
      .then((res) => {
        localStorage.setItem("admin_jwt", res.authorization.token);
        toast.success("Đăng nhập thành công!");
        nav('/admin');
      })
      .catch(() => {
        setMsg("Email hoặc mật khẩu không chính xác!");
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("admin_jwt")) {
      nav("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        id="admin-login-form"
        className="mx-auto w-30"
        style={{ marginTop: "150px" }}
      >
        <form
          className="border px-4 py-3 rounded shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="mb-3 text-center text-main">
            Admin đăng nhập
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
                type={showPass ? "text" : "password"}
                className="form-control border-end-0"
                name="passwd"
                placeholder="Nhập password..."
                {...register("password", { required: true })}
              />
              <span
                className="input-group-text border-start-0 bg-white text-secondary"
                style={{ fontSize: "20px" }}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
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
        </form>
      </div>
    </>
  );
}

export default Login;
