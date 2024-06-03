import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import candidateBookmarkApi from "../../../api/candidateBookmark";
import { toast } from "react-toastify";

export default function EditBookmarkModal({
  show,
  setShow,
  jobs,
  curBookmark,
  bookmarks,
  setBookmarks,
}) {
  const jobIds =
    curBookmark.jobs.length > 0 ? curBookmark.jobs.map((job) => job.id) : [0];
  const { register, watch, handleSubmit, resetField } = useForm({
    defaultValues: {
      job_none: jobIds.includes(0) ? true : false,
    },
  });
  const [message, setMessage] = useState(null);

  const handleUpdate = async ({ job_none, job_ids }) => {
    if (!job_none && (!job_ids || job_ids.length === 0)) {
      setMessage("Vui lòng chọn!");
    } else {
      setShow(false);
      let temp = [...bookmarks];
      const index = temp.findIndex((item) => item.id === curBookmark.id);

      var data = { candidate_id: curBookmark.candidate_id };
      if (!job_none) data.job_ids = job_ids;
      else data.job_none = 1;

      await candidateBookmarkApi.update(curBookmark.id, data);
      toast.success("Đã cập nhật!");

      temp[index].jobs = job_none
        ? []
        : jobs.filter((job) => job_ids.includes(String(job.id)));
      setBookmarks(temp);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      style={{ fontFamily: "sans-serif" }}
    >
      <Modal.Header
        closeButton
        className="pt-2 pb-0 border-bottom-0"
      ></Modal.Header>
      <Modal.Body className="pt-0">
        <Form>
          <div className="text-center ts-17 fw-600">
            Sửa vị trí việc làm muốn đánh dấu
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
                defaultChecked={jobIds.includes(job.id)}
                disabled={watch("job_none")}
                value={job.id}
                {...register("job_ids")}
              />
            ))}
          </div>
          {message && <div className="text-danger">{message}</div>}
          <div className="mt-3 d-flex gap-2">
            <Button
              size="sm"
              className="w-100 border-0 bg-main"
              onClick={handleSubmit(handleUpdate)}
            >
              Cập nhật
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-100"
              onClick={() => setShow(false)}
            >
              Đóng
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
