import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function Login(props) {
  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm();
  const [msg, setMsg] = useState();

  const handleLogin = async (user) => {
    //add role 1(for candidate login)
    user.role = 1
    try {
      await axios.post("http://127.0.0.1:8000/api/login", user).then((res) => {
        const data = res.data;
        console.log(data);
        localStorage.setItem("jwt", data.authorization.token);
        localStorage.setItem("candidate", JSON.stringify(data.user));
        if (window.location.pathname === "/sign-up") {
          window.location.href = "/";
        } else {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Lỗi:" + error);
      setMsg("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="modal fade" id="login-box">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Đăng nhập</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  {...register('email')}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mt-2">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register('password')}
                />
                <label htmlFor="password">Mật khẩu</label>
              </div>
              <a
                href="#"
                className="d-flex ms-1"
                style={{ textDecoration: "none" }}
              >
                Quên mật khẩu
              </a>
              <span className="text-danger">{msg && msg}</span>
              <div className="d-flex justify-content-end mt-2">
                <button
                  type="submit"
                  className="btn btn-primary me-1"
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
