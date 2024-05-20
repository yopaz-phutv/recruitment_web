import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import employerApi from "../../../api/employer";

export default function SelectJobModal({
  show,
  setShow,
  jobs,
  curResume,
  updateBookmark,
}) {
  const { register, watch, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState(null);

  const handleSaving = async ({ job_none, job_ids }) => {
    if (!job_none && (!job_ids || job_ids.length === 0)) {
      setMessage("Vui lòng chọn!");
    } else {
      setShow(false);
      var postData = { candidate_id: curResume.candidate_id };
      if (job_none) postData.job_none = job_none;
      else postData.job_ids = job_ids;

      await employerApi.handleSavingCandidate(postData);
      updateBookmark();
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
            Chọn vị trí việc làm tương ứng với ứng viên
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
                } else reset();
              }}
            />
            {jobs.map((job) => (
              <Form.Check
                key={job.id}
                type="checkbox"
                label={job.jname}
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
              onClick={handleSubmit(handleSaving)}
            >
              Xác nhận
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
