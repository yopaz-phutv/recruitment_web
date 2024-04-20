import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
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
  const [isDenied, setIsDenied] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const getEmployers = async () => {
    setIsLoading(true);
    const res = await adminApi.getEmployerList();
    setEmployers(res.data);
    setIsLoading(false);
  };
  const getRequests = async (params = { is_accepted: 0, is_denied: 0 }) => {
    setIsLoading(true);
    const res = await adminApi.getEmployerRequests(params);
    setRequests(res.data);
    setIsLoading(false);
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
  const handleChangeStatus = async (e) => {
    const status = e.target.value;
    let params = null;
    if (status === "0") {
      params = { is_accepted: 0, is_denied: 0 };
    } else if (status === "1") {
      setIsDenied(true);
      params = { is_accepted: 0, is_denied: 1 };
    }
    await getRequests(params);
    if (status === "0") {
      setIsDenied(false);
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
            {!isDenied && requests.length > 0 ? (
              <WiMoonAltNew
                className="position-absolute text-danger ts-xxs"
                style={{ top: "9px", left: "6px" }}
              />
            ) : null}
          </div>
        </div>
        {curTabInd === 1 && (
          <div>
            <Form.Select
              size="sm"
              aria-label="register status"
              className="mt-3"
              style={{ width: "150px" }}
              onChange={handleChangeStatus}
            >
              <option value="0">Chưa duyệt</option>
              <option value="1" selected={isDenied}>
                Đã từ chối
              </option>
            </Form.Select>
          </div>
        )}
        <Table hover className="w-95 shadow-sm mt-2">
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
          {!isLoading && (
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
                      {curTabInd === 1 && !isDenied ? (
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
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        {isLoading ? (
          <div className="ts-lg text-secondary d-flex align-items-center">
            <Spinner size="sm" className="me-1" />
            Đang tải...
          </div>
        ) : (
          curList.length === 0 && <h5 className="my-2">Không có bản ghi nào</h5>
        )}
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
