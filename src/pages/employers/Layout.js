import { AiFillProfile, AiTwotoneAppstore } from "react-icons/ai";
import {
  BsFillBriefcaseFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsMessenger,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./layout_style.css";
import { useEffect } from "react";
import authApi from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { employerAuthActions } from "../../redux/slices/employerAuthSlice";
// import { Tooltip } from 'bootstrap';

function Layout(props) {
  const nav = useNavigate();
  const company = useSelector(state => state.employerAuth.current.employer);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authApi.logout(2);
    dispatch(employerAuthActions.logout());
    localStorage.removeItem("employer_jwt");
    nav("/employer/login");
  };
  const getMe = async () => {
    const res = await authApi.getMe(2);
    dispatch(employerAuthActions.setUser(res));
  };

  useEffect(() => {
    if (!localStorage.getItem("employer_jwt")) {
      nav("/employer/login");
    }
    else {
        getMe();
    }
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // tooltipTriggerList.map(function (tooltipTriggerEl) {
    //     return new Tooltip(tooltipTriggerEl)
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav
        className="navbar border-bottom bg-light fixed-top"
        style={{ minHeight: "70px" }}
      >
        <div className="navbar-brand ms-3">Recruitment</div>
        <div className="dropdown" style={{ cursor: "pointer" }}>
          <div
            className="d-flex align-items-center me-5 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {/* <div data-bs-toggle="tooltip" title="company"> */}
            <BsFillPersonFill style={{ fontSize: "26px" }} />
            Company Account
            {/* </div>                         */}
          </div>
          <ul className="dropdown-menu">
            <li className="dropdown-item" onClick={handleLogout}>
              Đăng xuất
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex" style={{ marginTop: "70px" }}>
        <div
          className="border-end bg-light"
          style={{ width: "280px", minHeight: "90.5vh" }}
        >
          <ul className="nav flex-column">
            <li>
              <div
                className="border-bottom text-center text-danger py-3"
                style={{ fontSize: "17px" }}
              >
                {company && company.name}
              </div>
            </li>
            <li className="nav-item mt-3" style={{ width: "100%" }}>
              <Link to="/employer" className="nav-link empr-item">
                <span className="ms-5 d-flex align-items-center empr-item-color">
                  <AiTwotoneAppstore style={{ fontSize: "20px" }} />{" "}
                  &nbsp;Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item mt-3" style={{ width: "100%" }}>
              <Link to="#" className="nav-link empr-item ">
                <span className="ms-5 d-flex align-items-center empr-item-color">
                  <BsMessenger style={{ fontSize: "17px" }} /> &nbsp;Tin nhắn
                </span>
              </Link>
            </li>
            <li className="nav-item mt-3" style={{ width: "100%" }}>
              <Link
                to="/employer/job-management"
                className="nav-link empr-item"
              >
                <span className="ms-5 d-flex align-items-center empr-item-color">
                  <BsFillBriefcaseFill style={{ fontSize: "18px" }} />{" "}
                  &nbsp;Việc làm
                </span>
              </Link>
            </li>
            <li className="nav-item mt-3" style={{ width: "100%" }}>
              <Link
                to={`/employer/candidate-list`}
                className="nav-link empr-item"
              >
                <span className="ms-5 d-flex align-items-center empr-item-color">
                  <BsFillPeopleFill style={{ fontSize: "20px" }} /> &nbsp;Ứng
                  viên
                </span>
              </Link>
            </li>
            <li className="nav-item mt-3" style={{ width: "100%" }}>
              <Link to="#" className="nav-link empr-item">
                <span className="ms-5 d-flex align-items-center empr-item-color">
                  <AiFillProfile style={{ fontSize: "20px" }} /> &nbsp;Công ty
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          style={{
            width: "calc(1536px - 280px)",
            backgroundColor: "#bbb8b83a",
          }}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
export default Layout;
