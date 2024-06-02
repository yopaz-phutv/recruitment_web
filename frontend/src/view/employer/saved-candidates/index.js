import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BsEye, BsTrash3 } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CTooltip from "../../../components/CTooltip";
import useGetJobsByEmployer from "../../../hooks/useGetJobsByEmployer";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import candidateBookmarkApi from "../../../api/candidateBookmark";
import EditBookmarkModal from "./EditBookmarkModal";

export default function SavedCandidates() {
  const isAuth = useSelector((state) => state.employerAuth.isAuth);
  const { jobs } = useGetJobsByEmployer();
  const [bookmarks, setBookmarks] = useState([]);
  const [curBookmark, setCurBookmark] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRecommend, setIsSendingRecommend] = useState(false);
  const [filterJobId, setFilterJobId] = useState("");
  const [notiStatus, setNotiStatus] = useState("0");
  const [showEditModal, setShowEditModal] = useState(false);

  const getBookmarkList = async () => {
    try {
      setIsLoading(true);
      let params = { is_send_noti: notiStatus };
      if (filterJobId !== "") params.job_id = filterJobId;
      const res = await candidateBookmarkApi.getList(params);
      setBookmarks(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (bookmark, index) => {
    const choice = window.confirm("Bạn có chắc muốn xóa bản ghi này?");
    if (choice) {
      await candidateBookmarkApi.destroy({
        delete_by: "id",
        id: bookmark.id,
        is_send_noti: bookmark.is_send_noti,
      });
      let temp = [...bookmarks];
      temp.splice(index, 1);
      setBookmarks(temp);
      toast.success("Xóa thành công!");
    }
  };

  const handleSendRecommend = async (bookmark, index) => {
    try {
      setCurBookmark(bookmark);
      setIsSendingRecommend(true);

      let data = {};
      Object.entries(bookmark).forEach(([key, value]) => {
        if (["candidate_id", "resume_id", "jobs", "email"].includes(key))
          data[key] = value;
      });

      await candidateBookmarkApi.sendRecommend(bookmark.id, data);

      let temp = [...bookmarks];
      temp.splice(index, 1);
      setBookmarks(temp);

      toast.success("Gửi thành công!");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    } finally {
      setIsSendingRecommend(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getBookmarkList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, filterJobId, notiStatus]);

  // TODO: add edit bookmark feature

  return (
    <div
      className="bg-white ms-3 mt-3 pb-2 shadow-sm"
      style={{ paddingLeft: "45px", paddingRight: "35px" }}
    >
      <h5 className="mb-2 pt-3 text-main">Danh sách ứng viên đã đánh dấu</h5>
      <div className="d-flex gap-2 flex-column flex-sm-row">
        <CTooltip text="Trạng thái">
          <Form.Select
            size="sm"
            style={{ width: "210px" }}
            onChange={(e) => setNotiStatus(e.target.value)}
          >
            <option value="0">Chưa gửi thông báo gợi ý</option>
            <option value="1">Đã gửi thông báo gợi ý</option>
          </Form.Select>
        </CTooltip>
        <CTooltip text="Vị trí">
          <Form.Select
            size="sm"
            style={{ width: "210px" }}
            onChange={(e) => setFilterJobId(e.target.value)}
          >
            <option value="">Tất cả vị trí</option>
            <option value="0">Chưa xác định</option>
            {jobs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.jname}
              </option>
            ))}
          </Form.Select>
        </CTooltip>
      </div>
      <Table hover className="shadow-sm mt-3" style={{ width: "98%" }}>
        <thead className="table-primary ts-smd">
          <tr>
            <th className="fw-500">Tên</th>
            <th className="fw-500 w-25">Vị trí</th>
            <th className="fw-500">Điện thoại</th>
            <th className="fw-500 w-15">Email</th>
            <th className="fw-500">Đã lưu lúc</th>
            <th className="fw-500">Hành động</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody className="ts-sm">
            {bookmarks.map((item, index) => (
              <tr key={item.id}>
                <td className="text-capitalize">{item.fullname}</td>
                <td>
                  {item.jobs.length > 0
                    ? item.jobs.map((job, index, self) => (
                        <div key={job.id}>
                          {job.jname}
                          {index !== self.length - 1 && ", "}
                        </div>
                      ))
                    : "Chưa xác định"}
                </td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{dayjs(item.saved_time).format("DD/MM/YYYY HH:mm")}</td>
                <td>
                  {isSendingRecommend && item.id === curBookmark.id ? (
                    <div className="d-flex gap-1 align-items-center flex-wrap">
                      <Spinner size="sm" className="text-main" />
                      Đang gửi
                    </div>
                  ) : (
                    <div className="d-flex gap-2 ts-md">
                      <CTooltip text="Xem hồ sơ">
                        <a
                          href={item.resume_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BsEye className="text-main pointer" />
                        </a>
                      </CTooltip>
                      {notiStatus === "0" && (
                        <div
                          onClick={() => {
                            setCurBookmark(item);
                            setShowEditModal(true);
                          }}
                        >
                          <MdEdit className="text-primary pointer" fontSize="18px" />
                        </div>
                      )}
                      <div onClick={() => handleDelete(item, index)}>
                        <BsTrash3 className="text-danger pointer" />
                      </div>
                      {notiStatus === "0" && (
                        <CTooltip text="Gửi thông báo gợi ý việc làm tới ứng viên">
                          <div onClick={() => handleSendRecommend(item, index)}>
                            <IoIosSend
                              fontSize="18px"
                              className="text-success pointer"
                            />
                          </div>
                        </CTooltip>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {isLoading ? (
        <Loading />
      ) : (
        bookmarks.length === 0 && <h5>Không có bản ghi nào</h5>
      )}
      {showEditModal && (
        <EditBookmarkModal
          show={showEditModal}
          setShow={setShowEditModal}
          jobs={jobs}
          curBookmark={curBookmark}
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
        />
      )}
    </div>
  );
}
