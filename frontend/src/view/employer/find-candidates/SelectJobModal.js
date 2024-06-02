import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import candidateBookmarkApi from "../../../api/candidateBookmark";
import { toast } from "react-toastify";

export default function SelectJobModal({
  show,
  setShow,
  jobs,
  curResume,
  resumes,
  setResumes,
}) {
  const { register, watch, handleSubmit, resetField } = useForm({
    defaultValues: { job_none: curResume.job_ids?.includes(0) ? true : false },
  });
  const [message, setMessage] = useState(null);

  const handleSaving = async ({ job_none, job_ids }) => {
    if (!job_none && (!job_ids || job_ids.length === 0)) {
      setMessage("Vui lòng chọn!");
    } else {
      setShow(false);
      let temp = [...resumes];
      const index = temp.findIndex((item) => item.id === curResume.id);

      var data = { candidate_id: curResume.candidate_id };
      if (!job_none) data.job_ids = job_ids;
      else data.job_none = 1;

      if (!curResume.candidate_bookmark_id || curResume.is_send_noti === 1) {
        const new_bookmark_id = await candidateBookmarkApi.create(data);
        temp[index].candidate_bookmark_id = new_bookmark_id;
        toast.success("Đã đánh dấu!");
      } else {
        await candidateBookmarkApi.update(
          curResume.candidate_bookmark_id,
          data
        );
        toast.success("Đã cập nhật!");
      }
      temp[index].is_send_noti = 0;
      temp[index].job_ids = job_none ? [0] : job_ids.map((item) => Number(item));
      setResumes(temp);
    }
  };

  const handleDelete = async () => {
    if (curResume.candidate_bookmark_id) {
      let params = {};
      if (curResume.is_send_noti) {
        params = {
          delete_by: "candidate_id",
          candidate_id: curResume.candidate_id,
        };
      } else {
        params = {
          delete_by: "id",
          id: curResume.candidate_bookmark_id,
        };
      }

      await candidateBookmarkApi.destroy(params);
      let temp = [...resumes];
      const index = temp.findIndex((item) => item.id === curResume.id);
      temp[index].candidate_bookmark_id = null;
      delete temp[index].is_send_noti;
      delete temp[index].job_ids;
      setResumes(temp);

      toast.success("Đã bỏ đánh dấu");
      setShow(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header
        closeButton
        className="pt-2 pb-0 border-bottom-0"
      ></Modal.Header>
      <Modal.Body className="pt-0">
        <Form>
          <div className="text-center ts-17 fw-600">
            Chọn vị trí việc làm muốn đánh dấu
          </div>
          <div>
            <Form.Check
              type="checkbox"
              label="Không chọn"
              {...register("job_none")}
              onClick={() => {
                if (!watch("job_none")) {
                  let inputs = document.getElementsByName("job_ids");

                  for (let i = 0; i < inputs.length; i++) {
                    inputs[i].checked = false;
                    inputs[i].value = null;
                  }
                } else resetField("job_ids", { defaultValue: false });
              }}
            />
            {jobs.map((job) => (
              <Form.Check
                key={job.id}
                type="checkbox"
                label={job.jname}
                defaultChecked={curResume.job_ids?.includes(job.id)}
                disabled={watch("job_none")}
                value={job.id}
                {...register("job_ids")}
              />
            ))}
          </div>
          {curResume.is_send_noti === 1 && (
            <div className="ts-sm text-danger mt-1">
              Lần gần đây nhất bạn đã gửi thông báo gợi ý việc làm cho ứng viên
              này!
            </div>
          )}
          {message && <div className="text-danger">{message}</div>}
          <div className="mt-3 d-flex gap-2">
            <Button
              size="sm"
              className="w-100 border-0 bg-main"
              onClick={handleSubmit(handleSaving)}
            >
              {curResume.is_send_noti === 1 || !curResume.candidate_bookmark_id
                ? "Tạo đánh dấu mới"
                : "Cập nhật"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-100"
              onClick={handleDelete}
            >
              {curResume.candidate_bookmark_id ? "Bỏ đánh dấu" : "Đóng"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
