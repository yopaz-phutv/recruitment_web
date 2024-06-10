import "./style.css";
import { AiFillProfile, AiFillAppstore } from "react-icons/ai";
import {
  BsFillBriefcaseFill,
  BsFillPeopleFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa6";
import { RiUserSearchFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../../api/auth";
import { employerAuthActions } from "../../../redux/slices/employerAuthSlice";
import { AppContext } from "../../../App";
import clsx from "clsx";

function Layout(props) {
  const nav = useNavigate();
  const { curUrl, setCurUrl } = useContext(AppContext);
  const dispatch = useDispatch();
  const company = useSelector((state) => state.employerAuth.current.employer);

  const handleLogout = async () => {
    await authApi.logout(2);
    dispatch(employerAuthActions.logout());
    localStorage.removeItem("employer_jwt");
    nav("/employer/login");
  };
  const getMe = async () => {
    try {
      const res = await authApi.getMe(2);
      dispatch(employerAuthActions.setUser(res));      
    } catch (error) {
      if (error.response.data.message === "Token has expired") {
        const res = await authApi.refresh(2);
        localStorage.setItem("employer_jwt", res.token)
        window.location.reload()
      }
    }
  };
  const handleChangePage = (url) => {
    nav(url);
    setCurUrl(url);
  };

  useEffect(() => {
    setCurUrl(window.location.pathname);
    if (!localStorage.getItem("employer_jwt")) {
      nav("/employer/login");
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
        style={{ marginTop: "56px" }}
      >
        <div className="ts-smd fw-600 text-secondary menu-part bg-white border-lg-end">
          <div className="sticky-top top-0 d-flex flex-row flex-wrap flex-lg-column">
            <div className="text-center text-main border-lg-bottom py-2 py-lg-3 px-2">
              {company && company.name}
            </div>
            <div
              className={clsx(
                "d-flex align-items-center ps-lg-5 py-2 px-2 pointer hover-bgt-light",
                curUrl === "/employer" && "bg-mlight text-main"
              )}
              onClick={() => handleChangePage("/employer")}
            >
              <AiFillAppstore className="fs-5 me-1" />
              Dashboard
            </div>
            <div
              className={clsx(
                "d-flex align-items-center ps-lg-5 py-2 px-2 pointer hover-bgt-light",
                curUrl === "/employer/jobs" && "bg-mlight text-main"
              )}
              onClick={() => handleChangePage("/employer/jobs")}
            >
              <BsFillBriefcaseFill className="ts-lg me-1" />
              Việc làm
            </div>
            <div
              className={clsx(
                "d-flex align-items-center ps-lg-5 py-2 px-2 pointer hover-bgt-light",
                curUrl === "/employer/candidates" && "bg-mlight text-main"
              )}
              onClick={() => handleChangePage("/employer/candidates")}
            >
              <BsFillPeopleFill className="fs-5 me-1" /> Ứng viên
            </div>
            <div
              className={clsx(
                "d-flex align-items-center ps-lg-5 py-2 px-2 pointer hover-bgt-light",
                curUrl === "/employer/find-candidates" && "bg-mlight text-main"
              )}
              onClick={() => handleChangePage("/employer/find-candidates")}
            >
              <RiUserSearchFill className="fs-5 me-1" /> Tìm kiếm ứng viên
            </div>
            <div
              className={clsx(
                "d-flex align-items-center ps-lg-5 py-2 px-2 pointer hover-bgt-light",
                curUrl === "/employer/saved-candidates" && "bg-mlight text-main"
              )}
              onClick={() => handleChangePage("/employer/saved-candidates")}
            >
              <FaUserCheck className="fs-5 me-1" /> Ứng viên đã đánh dấu
            </div>
            <div
              className={clsx(
                "d-flex align-items-center ps-lg-5 py-2 px-2 pointer hover-bgt-light",
                curUrl === "/employer/detail" && "bg-mlight text-main"
              )}
              onClick={() => handleChangePage("/employer/detail")}
            >
              <AiFillProfile className="fs-5 me-1" /> Công ty
            </div>
          </div>
        </div>
        <div className="content-part page-body">{props.children}</div>
      </div>
    </>
  );
}
export default Layout;
