import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import adminApi from "../../../api/admin";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CPagination from "../../../components/CPagination";

export default function AdminCandidateList() {
  const isAuth = useSelector((state) => state.adminAuth.isAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getCandidateList = async (page = 1) => {
    setIsLoading(true);
    const res = await adminApi.getCandidateList({ page, keyword });
    setCandidates(res.data);
    setTotalPage(res.last_page);
    setIsLoading(false);
  };

  const handleSearch = async () => {
    await getCandidateList();
  };

  const handleChangeActiveStatus = async (candidate_id) => {
    await adminApi.changeAccActiveStatus({ user_id: candidate_id });
  };

  useEffect(() => {
    if (isAuth) {
      getCandidateList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="vh-100 pt-4 px-4">
      <div className="bg-white py-3 ps-5">
        <h4 className="text-main">Danh sách tài khoản ứng viên</h4>
        <InputGroup size="sm" className="mt-3 w-50">
          <Form.Control
            type="text"
            className="border-end-0"
            placeholder="Nhập tên, email, số điện thoại"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <InputGroup.Text className="bg-white pointer" onClick={handleSearch}>
            <BsSearch />
          </InputGroup.Text>
        </InputGroup>
        <Table hover className="shadow-sm mt-3" style={{ width: "98%" }}>
          <thead className="table-primary ts-smd">
            <tr>
              <th className="fw-600 w-20">Tên</th>
              <th className="fw-600 w-20">Email</th>
              <th className="fw-600">Điện thoại</th>
              <th className="fw-600">Đăng ký lúc</th>
              <th className="fw-600">Cập nhật lúc</th>
              <th className="fw-600">Trạng thái</th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody className="ts-sm">
              {candidates.map((item) => (
                <tr key={item.id}>
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    {dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>
                    {dayjs(item.updated_at).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>
                    <Form.Check
                      type="switch"
                      aria-label="switch"
                      defaultChecked={item.is_active}
                      onClick={() => handleChangeActiveStatus(item.id)}
                    />
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
        ) : totalPage > 0 && (
          <CPagination
            className="justify-content-center"
            totalPage={totalPage}
            curPage={curPage}
            setCurPage={setCurPage}
            getList={getCandidateList}
          />
        )}
      </div>
    </div>
  );
}
