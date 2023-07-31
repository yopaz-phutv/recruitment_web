import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsBell, BsFillCircleFill } from "react-icons/bs";
import "./layout.css";

const user_icon = process.env.PUBLIC_URL + "/image/user_icon.png";

function Layout(props) {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("jwt"));
  const [bellMsgs, setBellMsgs] = useState([]);
  const [msgStyles, setMsgStyles] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  var candidate_id = null;
  if (isLoggedIn) {
    candidate_id = JSON.parse(localStorage.getItem("candidate")).id;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  const handleLogout = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/logout", config)
      .then((res) => {
        //console.log(res.data);
        setIsLoggedIn(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("candidate");
        if (window.location.pathname === "/profile") {
          nav("/");
        }
      })
      .catch((error) => {
        console.error("Lỗi:" + error);
      });
  };
  const getNewMessages = async () => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/cand-msgs/${candidate_id}/getByCandidateID`,
        config
      )
      .then((res) => {
        let msgs = res.data;
        let msg_styles = [];
        // console.log(msgs);
        setBellMsgs(msgs);
        for (let i = 0; i < msgs.length; i++) {
          if (msgs[i].isRead === 0) {
            setHasNew(true);
            break;
          }
        }
        for (let i = 0; i < msgs.length; i++) {
          if (msgs[i].isRead === 0) {
            msg_styles[i] = " text-primary";
          } else msg_styles[i] = " text-secondary";
        }
        setMsgStyles(msg_styles);
      })
      .catch((error) => {
        console.error("Lỗi:" + error);
      });
  };
  const handleReadMsg = async (inf) => {
    if (inf.isRead === 0) {
      await axios
        .get(
          `http://127.0.0.1:8000/api/cand-msgs/${inf.id}/updateReadMsg`,
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Lỗi:" + error);
        });
    }
    window.location.href = `/jobs/${inf.job_id}`;
  };

  useEffect(() => {
    if (isLoggedIn) {
      getNewMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm bg-light border-bottom py-3 fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand ms-1" href="/">
              Recruitment
            </a>
            <ul className="navbar-nav me-auto fw-bold">
              <li className="nav-item">
                <a className="nav-link" href="/companies">
                  Công ty
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/jobs">
                  Việc làm
                </a>
              </li>
            </ul>
            {!isLoggedIn ? (
              <div className="d-flex">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#login-box"
                  >
                    Đăng nhập
                  </button>
                  <Link to="/sign-up" className="btn btn-outline-primary">
                    Đăng ký
                  </Link>
                </div>
                <div className="ms-2">
                  <a
                    href="/employer/login"
                    className="btn"
                    style={{ backgroundColor: "#c1d7d7" }}
                  >
                    Đăng tuyển, tìm ứng viên
                  </a>
                </div>
              </div>
            ) : (
              <div className="d-flex sidebar-right">
                <div className="me-3 dropdown bell-part">
                  <div
                    className="bell fs-3 dropdown-toggle text-light"
                    data-bs-toggle="dropdown"
                  >
                    <BsBell className="text-dark" />
                  </div>
                  {hasNew > 0 && (
                    <div className="bell-new">
                      <BsFillCircleFill />
                    </div>
                  )}
                  <ul className="dropdown-menu shadow">
                    {bellMsgs.length > 0 ? (
                      bellMsgs.map((item, index) => (
                        <div
                          key={"bell_msg" + index}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleReadMsg(item)}
                        >
                          <li
                            className={
                              "dropdown-item text-wrap mb-2 msg-item" +
                              msgStyles[index]
                            }
                          >
                            {item.content}
                          </li>
                        </div>
                      ))
                    ) : (
                      <span className="ms-3">Không có thông báo nào</span>
                    )}
                  </ul>
                </div>
                <div className="dropdown pt-1">
                  <img
                    src={user_icon}
                    alt="user_icon"
                    style={{ width: "35px" }}
                    className="rounded-pill border border-2"
                  />
                  &nbsp;
                  <span
                    style={{ fontSize: "16px", cursor: "pointer" }}
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {
                      JSON.parse(localStorage.getItem("candidate")).name[
                        "firstname"
                      ]
                    }
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/candidate">
                        Tài khoản
                      </a>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="page-body" style={{ minHeight: "78vh", marginTop: '73px' }}>
        <Login />
        {props.children}
      </main>
      <footer className="bg-light border-top" 
      style={{ paddingTop: '35px' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4" style={{ fontSize: '15.6px', paddingLeft: '27px' }}>
              <h5>Thông tin liên hệ</h5>
              <p>Email: info@tuyendung.com</p>
              <p>Điện thoại: 0333-555-789</p>
              <p>Địa chỉ: 05 Đường Trâu Quỳ, Thị trấn Trâu Quỳ, <br />Huyện Gia Lâm, TP.Hà Nội</p>
            </div>
            <div className="col-md-4" style={{ paddingLeft: '125px' }}>
              <h5>Chuyên mục</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to={'#'} className="text-secondary no-underline">Việc làm IT</Link>                  
                </li>
                <li>
                  <Link to={'#'} className="text-secondary no-underline">Việc làm Kế toán</Link>
                </li>
                <li>
                  <Link to={'#'} className="text-secondary no-underline">Việc làm Kinh doanh</Link>
                </li>
                <li>
                  <Link to={'#'} className="text-secondary no-underline">Việc làm Marketing</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4" style={{ paddingLeft: '120px' }}>
              <h5>Liên kết</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to={'/'} className="text-secondary no-underline">Trang chủ</Link>
                </li>
                <li>
                  <Link to={'/jobs'} className="text-secondary no-underline">Danh sách việc làm</Link>
                </li>
                <li>
                  <Link to={'#'} className="text-secondary no-underline">Hướng dẫn ứng tuyển</Link>
                </li>
                <li>
                  <Link to={'#'} className="text-secondary no-underline">Chính sách bảo mật</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <p className="text-center">© 2023 Tuyển dụng. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
