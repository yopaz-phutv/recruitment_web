import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import resumeApi from "../../../../api/resume";
import dayjs from "dayjs";
import { BsEye } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CandidateContext } from "../layouts";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import Spinner from "react-bootstrap/Spinner";

export default function Resume() {
  const { setCvMode } = useContext(CandidateContext);
  const nav = useNavigate();
  const isAuth = useSelector((state) => state.candAuth.isAuth);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [curResumeId, setCurResumeId] = useState(null);

  const getResumes = async () => {
    try {
      setIsLoading(true);
      const res = await resumeApi.getByCurrentCandidate();
      setResumes(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    nav("/candidate/templates");
  };

  const handleEdit = (item) => {
    setCvMode("EDIT");
    nav(`/candidate/resumes/${item.id}`, {
      state: { templateId: item.template_id },
    });
  };

  const handleDelete = async (id) => {
    setCurResumeId(id);
    const choice = window.confirm("Bạn có chắc muốn xóa bản ghi này?");
    if (choice) {
      try {
        setIsDeleteLoading(true);
        await resumeApi.destroy(id);
        toast.success("Xóa bản ghi thành công!");
        await getResumes();
      } catch (error) {
        toast.error("Đã có lỗi xảy ra!");
      } finally {
        setIsDeleteLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      getResumes();
    }
  }, [isAuth]);

  return (
    <div className="pt-4 ps-4">
      <div className="bg-white py-3 ps-5 vh-100">
        <h4 className="text-main">Quản lý hồ sơ</h4>
        <div className="w-85 clearfix">
          <Button
            variant="info"
            className="py-1 pe-3 text-white d-flex align-items-center gap-1 float-end"
            onClick={handleCreate}
          >
            <IoMdAdd className="fs-5" />
            Tạo mới hồ sơ
          </Button>
        </div>
        <Table hover className="w-85 shadow-sm mt-3">
          <thead className="table-primary">
            <tr>
              <th className="fw-600 w-30">Tiêu đề hồ sơ</th>
              <th className="fw-600">Thời gian tạo</th>
              <th className="fw-600">Thời gian sửa</th>
              <th className="fw-600">Hành động</th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {resumes.map((item) => (
                <tr key={`resume_${item.id}`}>
                  <td className="ts-smd">{item.title}</td>
                  <td className="ts-smd">
                    {dayjs(item.created_at).format("H:mm DD/MM/YYYY")}
                  </td>
                  <td className="ts-smd">
                    {dayjs(item.updated_at).format("H:mm DD/MM/YYYY")}
                  </td>
                  <td>
                    {isDeleteLoading && item.id === curResumeId ? (
                      <div>
                        <Spinner variant="primary" size="sm" className="me-1" />
                        <span className="text-secondary">Đang xóa</span>
                      </div>
                    ) : (
                      <div className="d-flex gap-3 align-items-center ts-lg">
                        <a
                          href={item.resume_link}
                          target="_blank"
                          rel="noreferrer"
                          className="d-block"
                        >
                          <BsEye
                            className="text-main pointer"
                            style={{ marginBottom: "2px" }}
                          />
                        </a>
                        <MdEdit
                          className="text-primary pointer"
                          onClick={() => handleEdit(item)}
                        />
                        <BsTrash3
                          className="text-danger pointer"
                          fontSize="16px"
                          onClick={() => handleDelete(item.id)}
                        />
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
          resumes.length === 0 && <h5 className="my-2">Không có bản ghi nào</h5>
        )}
      </div>
    </div>
  );
}
