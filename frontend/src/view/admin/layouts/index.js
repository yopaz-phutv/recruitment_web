import "./style.css";
import { AiTwotoneAppstore } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import authApi from "../../../api/auth";
import { adminAuthActions } from "../../../redux/slices/adminAuthSlice";
import { AppContext } from "../../../App";
import clsx from "clsx";

function Layout(props) {
  const nav = useNavigate();
  const { curUrl, setCurUrl } = useContext(AppContext);

  // const company = useSelector((state) => state.adminAuth.current.admin);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authApi.logout(0);
    dispatch(adminAuthActions.logout());
    localStorage.removeItem("admin_jwt");
    nav("/admin/login");
  };
  const getMe = async () => {
    const res = await authApi.getMe(0);
    dispatch(adminAuthActions.setUser(res));
  };
  const handleChangeUrl = (url) => {
    nav(url);
    setCurUrl(url);
  };

  useEffect(() => {
    setCurUrl(window.location.pathname)
    if (!localStorage.getItem("admin_jwt")) {
      nav("/admin/login");
    } else {
      getMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="navbar border-bottom shadow-sm fixed-top bg-white">
        <div className="navbar-brand ms-3 text-secondary">Recruitment</div>
        <div className="dropdown pointer">
          <div
            className="d-flex align-items-center me-5 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <BsFillPersonFill style={{ fontSize: "26px" }} />
            Admin
          </div>
          <ul className="dropdown-menu">
            <li className="dropdown-item" onClick={handleLogout}>
              Đăng xuất
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="d-flex flex-column flex-lg-row"
        style={{ marginTop: "57px" }}
      >
        <div className=" ts-smd fw-500 text-secondary menu-part d-flex flex-row flex-lg-column bg-white border-bottom border-lg-end">
          <div
            className={clsx(
              "d-flex align-items-center ps-lg-5 py-lg-2 px-2 py-2 pointer hover-bg-light hover-text-main",
              curUrl === "/admin" && "bg-mlight text-main"
            )}
            onClick={() => handleChangeUrl("/admin")}
          >
            <AiTwotoneAppstore className="fs-5 me-1" />
            Dashboard
          </div>
          <div
            className={clsx(
              "ps-lg-5 py-lg-2 px-2 py-2 pointer hover-bg-light hover-text-main",
              curUrl === "/admin/employers" && "bg-mlight text-main"
            )}
            onClick={() => handleChangeUrl("/admin/employers")}
          >
            Nhà tuyển dụng
          </div>
          <div
            className={clsx(
              "ps-lg-5 py-lg-2 px-2 py-2 pointer hover-bg-light hover-text-main",
              curUrl === "/admin/candidates" && "bg-mlight text-main"
            )}
            onClick={() => handleChangeUrl("/admin/candidates")}
          >
            Ứng viên
          </div>
        </div>
        <div className="content-part page-body">{props.children}</div>
      </div>
    </>
  );
}
export default Layout;
