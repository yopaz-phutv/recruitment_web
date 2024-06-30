import "./style.css";
import { AiFillAppstore } from "react-icons/ai";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { RiBuilding2Fill } from "react-icons/ri";

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

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authApi.logout(0);
    dispatch(adminAuthActions.logout());
    localStorage.removeItem("admin_jwt");
    nav("/admin/login");
  };
  const getMe = async () => {
    try {
      const res = await authApi.getMe(0);
      dispatch(adminAuthActions.setUser(res));      
    } catch (error) {
      if (error.response.data.message === "Token has expired") {
        const res = await authApi.refresh(0);
        localStorage.setItem("admin_jwt", res.token)
        window.location.reload()
      }
    }
  };
  const handleChangeUrl = (url) => {
    nav(url);
    setCurUrl(url);
  };

  useEffect(() => {
    setCurUrl(window.location.pathname);
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
        <div className="navbar-brand ms-3 text-main fw-600">FastJob</div>
        <div className="dropdown pointer">
          <div
            className="d-flex align-items-center me-5 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <BsFillPersonFill fontSize="26px" className="text-main" />
            Tài khoản
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
        <div className=" ts-smd fw-600 text-secondary menu-part d-flex flex-row flex-lg-column bg-white border-bottom border-lg-end">
          <div
            className={clsx(
              "d-flex align-items-center ps-lg-5 py-lg-2 px-2 py-2 pointer hover-bg-light hover-text-main",
              curUrl === "/admin" && "bg-mlight text-main"
            )}
            onClick={() => handleChangeUrl("/admin")}
          >
            <AiFillAppstore className="fs-5 me-1" />
            Tổng quan
          </div>
          <div
            className={clsx(
              "d-flex align-items-center ps-lg-5 py-lg-2 px-2 py-2 pointer hover-bg-light hover-text-main",
              curUrl === "/admin/employers" && "bg-mlight text-main"
            )}
            onClick={() => handleChangeUrl("/admin/employers")}
          >
            <RiBuilding2Fill className="fs-5 me-1" />
            Nhà tuyển dụng
          </div>
          <div
            className={clsx(
              "d-flex align-items-center ps-lg-5 py-lg-2 px-2 py-2 pointer hover-bg-light hover-text-main",
              curUrl === "/admin/candidates" && "bg-mlight text-main"
            )}
            onClick={() => handleChangeUrl("/admin/candidates")}
          >
            <BsFillPeopleFill className="fs-5 me-1" />
            Ứng viên
          </div>
        </div>
        <div className="content-part page-body">{props.children}</div>
      </div>
    </>
  );
}
export default Layout;
