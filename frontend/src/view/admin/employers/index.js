import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import adminApi from "../../../api/admin";
import dayjs from "dayjs";
import clsx from "clsx";
import { WiMoonAltNew } from "react-icons/wi";
import { BsCheckCircle, BsEye, BsXCircle } from "react-icons/bs";
import AcceptModal from "./AcceptModal";
import ViewModal from "./ViewModal";
import RejectModal from "./RejectModal";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);
  const [curEmployer, setCurEmployer] = useState({});
  const [curTabInd, setCurTabInd] = useState(0);
  const [requests, setRequests] = useState([]);
  const [curList, setCurList] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const getEmployers = async () => {
    const res = await adminApi.getEmployerList();
    setEmployers(res.data);
  };
  const getRequests = async () => {
    const res = await adminApi.getEmployerRequests();
    setRequests(res.data);
  };
  const handleChangeTab = (index) => {
    setCurTabInd(index);
  };
  const handleClickActionBtn = (item, type) => {
    setCurEmployer(item);
    if (type === "ACCEPT") {
      setShowAcceptModal(true);
    } else if (type === "REJECT") {
      setShowRejectModal(true);
    } else if (type === "VIEW") {
      setShowViewModal(true);
    }
  };

  useEffect(() => {
    if (curTabInd === 0) setCurList(employers);
    else if (curTabInd === 1) setCurList(requests);
  }, [curTabInd, employers, requests]);
  useEffect(() => {
    getEmployers();
    getRequests();
  }, []);

  return (
    <div className="vh-100 pt-4 px-4">
      <div className="bg-white py-3 ps-5">
        <h4 className="text-main">Danh sách nhà tuyển dụng</h4>
        <div className="mt-3 border-bottom d-flex border-main w-95 ts-smd fw-600 text-secondary">
          <div
            className={clsx(
              "pointer border border-bottom-0 border-main px-4 py-1",
              curTabInd === 0 && "bg-mlight text-main"
            )}
            onClick={() => handleChangeTab(0)}
          >
            Danh sách
          </div>
          <div
            className={clsx(
              "position-relative pointer border border-bottom-0 border-start-0 border-main px-4 py-1",
              curTabInd === 1 && "bg-mlight text-main"
            )}
            onClick={() => handleChangeTab(1)}
          >
            Yêu cầu đăng ký
            {requests.length > 0 && (
              <WiMoonAltNew
                className="position-absolute text-danger ts-xxs"
                style={{ top: "9px", left: "6px" }}
              />
            )}
          </div>
        </div>
        <Table hover className="w-95 shadow-sm mt-3">
          <thead className="table-primary ts-smd">
            <tr>
              <th className="fw-500 w-30">Tên</th>
              <th className="fw-500">Địa chỉ</th>
              <th className="fw-500">Email</th>
              <th className="fw-500">Điện thoại</th>
              <th className="fw-500">Ngày đăng ký</th>
              {curTabInd === 0 && <th className="fw-500">Trạng thái</th>}
              <th className="fw-500">Hành động</th>
            </tr>
          </thead>
          <tbody className="ts-sm">
            {curList?.map((item) => (
              <tr key={item.id}>
                <td>{item.name} </td>
                <td>
                  {item.locations.map((location, index, self) => (
                    <span key={location.id}>
                      {location.name}
                      {index !== self.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td>{item.email} </td>
                <td>{item.phone} </td>
                <td>{dayjs(item.register_time).format("DD/MM/YYYY")}</td>
                {curTabInd === 0 && (
                  <td>
                    <Form.Check
                      type="switch"
                      aria-label="switch"
                      defaultChecked={item.is_active}
                    />
                  </td>
                )}
                <td>
                  <div className="ms-2 d-flex gap-2">
                    <BsEye
                      type="button"
                      className="text-primary ts-md"
                      onClick={() => handleClickActionBtn(item, "VIEW")}
                    />
                    {curTabInd === 1 && (
                      <>
                        <BsCheckCircle
                          type="button"
                          className="text-success"
                          onClick={() => handleClickActionBtn(item, "ACCEPT")}
                        />
                        <BsXCircle
                          type="button"
                          className="text-danger"
                          onClick={() => handleClickActionBtn(item, "REJECT")}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* {resumes.length === 0 && <h5 className="my-2">Không có bản ghi nào</h5>} */}
        <ViewModal
          show={showViewModal}
          setShow={setShowViewModal}
          employer={curEmployer}
          curTabInd={curTabInd}
        />
        <AcceptModal
          show={showAcceptModal}
          setShow={setShowAcceptModal}
          employer={curEmployer}
          setCurTabInd={setCurTabInd}
          getEmployers={getEmployers}
          getRequests={getRequests}
        />
        <RejectModal
          show={showRejectModal}
          setShow={setShowRejectModal}
          employer={curEmployer}
          setCurTabInd={setCurTabInd}
          getEmployers={getEmployers}
          getRequests={getRequests}
        />
      </div>
    </div>
  );
}
