import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import adminApi from "../../../api/admin";
import dayjs from "dayjs";
import clsx from "clsx";
import { WiMoonAltNew } from "react-icons/wi";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);
  const [curTabInd, setCurTabInd] = useState(0);
  const [hasNewRequest, setHasNewRequest] = useState(true);
  const [requests, setRequests] = useState([]);
  const [curList, setCurList] = useState([]);

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
    if (index === 1) setHasNewRequest(false);
  };
  const handleClickActionBtn = (employer, type) => {
    if (type === "ACCEPT") {
    } else if (type === "REJECT") {
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
              curTabInd === 1
                ? "bg-mlight text-main"
                : hasNewRequest && "text-danger"
            )}
            onClick={() => handleChangeTab(1)}
          >
            Yêu cầu đăng ký
            {hasNewRequest && (
              <WiMoonAltNew
                className="position-absolute text-danger"
                style={{ top: "8px", left: "5px" }}
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
              <th className="fw-500">Trạng thái</th>
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
                <td>
                  <Form.Check
                    type="switch"
                    aria-label="switch"
                    defaultChecked={item.is_active}
                  />
                </td>
                <td>
                  {curTabInd === 1 && (
                    <div>
                      <span
                        className="pointer"
                        onClick={() => handleClickActionBtn(item, "ACCEPT")}
                      >
                        <BsCheckCircle className="text-success" />
                      </span>
                      <span
                        className="pointer"
                        onClick={() => handleClickActionBtn(item, "REJECT")}
                      >
                        <BsXCircle className="ms-2 text-danger" />
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* {resumes.length === 0 && <h5 className="my-2">Không có bản ghi nào</h5>} */}
      </div>
    </div>
  );
}
