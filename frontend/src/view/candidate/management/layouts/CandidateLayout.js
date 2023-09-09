import { Link } from "react-router-dom";
import { AiTwotoneAppstore } from "react-icons/ai";
import "./layout.css";
import Layout from "../../layouts/Layout";

function CandidateLayout(props) {
  return (
    <Layout>
      <div className="d-flex">
        <div
          className="border-end bg-light"
          style={{ width: "280px", minHeight: "90.9vh" }}
        >
          <ul className="nav flex-column">
            <li>
              <div
                className="border-bottom fw-bold text-center py-4"
                style={{ fontSize: "18px" }}
              >
                Tài khoản của tôi
              </div>
            </li>
            <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  <AiTwotoneAppstore style={{ fontSize: "20px" }} />
                  &nbsp;Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item border-bottom py-1 cand-item">
              <Link
                to="/candidate/applied-jobs"
                className="nav-link"
              >
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  {/* <AiTwotoneAppstore style={{ fontSize: "20px" }} /> */}
                  Việc làm đã nộp
                </span>
              </Link>
            </li>
            <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate/saved-jobs" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  {/* <AiTwotoneAppstore style={{ fontSize: "20px" }} /> */}
                  Việc làm đã lưu
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ width: "calc(1536px - 280px)" }}>
          {props.children}
        </div>
      </div>
    </Layout>
  );
}

export default CandidateLayout;
