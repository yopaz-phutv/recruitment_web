import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { BsEye, BsTrash3 } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import employerApi from "../../../api/employer";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CTooltip from "../../../components/CTooltip";
import useGetJobsByEmployer from "../../../hooks/useGetJobsByEmployer";
import clsx from "clsx";
import { toast } from "react-toastify";

export default function SavedCandidates() {
  const isAuth = useSelector((state) => state.employerAuth.isAuth);
  const { jobs } = useGetJobsByEmployer();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [curJobId, setCurJobId] = useState(null)

  const getResumeList = async (jobId) => {
    try {
      setIsLoading(true);
      const res = await employerApi.getSavedCandidates({ job_id: jobId });
      setResumes(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (resume_id, index) => {
    const choice = window.confirm("Bạn có chắc muốn xóa bản ghi này?");
    if (choice) {
      await employerApi.handleSavingCandidate({ resume_id, delete: 1 });
      let resumesTemp = [...resumes];
      resumesTemp.splice(index, 1);
      setResumes(resumesTemp);
    }
  };

  const handleSendRecommend = async (resume, index) => {
    try {
      await employerApi.sendRecommendToCandidate(resume);
      let resumesTemp = [...resumes]
      resumesTemp[index].is_send_noti = 1
      setResumes(resumesTemp)
      toast.success("Gửi thành công!");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    if (isAuth) {
      getResumeList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div
      className="bg-white ms-4 mt-3 pb-2"
      style={{ paddingLeft: "45px", paddingRight: "35px" }}
    >
      <h5 className="mb-2 pt-3 text-main">Danh sách ứng viên đã đánh dấu</h5>
      <Table hover className="shadow-sm mt-3" style={{ width: "98%" }}>
        <thead className="table-primary ts-smd">
          <tr>
            <th className="fw-500">Tên</th>
            <th className="fw-500 w-25">
              <Dropdown>
                <Dropdown.Toggle as="div" className="border pointer">
                  Vị trí
                </Dropdown.Toggle>
                <Dropdown.Menu className="ts-sm py-0">
                  <Dropdown.Item onClick={async () => await getResumeList()}>
                    Tất cả vị trí
                  </Dropdown.Item>
                  <Dropdown.Item onClick={async () => await getResumeList(0)}>
                    Chưa xác định
                  </Dropdown.Item>
                  {jobs.map((item) => (
                    <Dropdown.Item
                      key={item.id}
                      onClick={async () => await getResumeList(item.id)}
                    >
                      {item.jname}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th className="fw-500">Điện thoại</th>
            <th className="fw-500 w-15">Email</th>
            <th className="fw-500">Đã lưu lúc</th>
            <th className="fw-500">Hành động</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody className="ts-sm">
            {resumes.map((item, index) => (
              <tr key={item.id}>
                <td className="text-capitalize">{item.fullname}</td>
                <td>
                  {item.jobs.length > 0
                    ? item.jobs.map((job, index, self) => (
                        <div key={job.id}>
                          {job.jname}
                          {index !== self.length -1 && ", "}
                        </div>
                      ))
                    : "Chưa xác định"}
                </td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{dayjs(item.saved_time).format("DD/MM/YYYY HH:mm")}</td>
                <td>
                  <div className="d-flex gap-2 ts-md">
                    <CTooltip text="Xem hồ sơ">
                      <a href={item.image} target="_blank" rel="noreferrer">
                        <BsEye className="text-main pointer" />
                      </a>
                    </CTooltip>
                    <div onClick={() => handleDelete(item.id, index)}>
                      <BsTrash3 className="text-danger pointer" />
                    </div>
                    <CTooltip
                      text={clsx(
                        "Gửi thông báo gợi ý việc làm tới ứng viên: ",
                        item.is_send_noti ? "Đã gửi" : "Chưa gửi"
                      )}
                    >
                      <div
                        onClick={() => {
                          if (!item.is_send_noti) handleSendRecommend(item, index);
                        }}
                      >
                        <IoIosSend
                          fontSize="18px"
                          className={clsx(
                            "pointer",
                            item.is_send_noti
                              ? "text-secondary"
                              : "text-success"
                          )}
                        />
                      </div>
                    </CTooltip>
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
        resumes.length === 0 && <h5>Không có bản ghi nào</h5>
      )}
    </div>
  );
}
