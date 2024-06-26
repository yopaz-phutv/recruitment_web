import { useForm } from "react-hook-form";
import employerApi from "../../../api/employer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { emailjsConfig } from "../../../services";
import Spinner from "react-bootstrap/Spinner";

export default function NotificationModal({
  candidate,
  showDialog,
  setShowDialog,
  getCandidateList,
}) {
  let prefix_msg = "";
  const step = candidate.step;
  const actType = candidate.actType;
  const interview_round = candidate.interview_round;
  const interview_round_num = candidate.interview_round_num;

  if (step === "step1") {
    if (actType === "ACCEPT") prefix_msg = "Chấp nhận hồ sơ ứng viên ";
    else if (actType === "REJECT") prefix_msg = "Từ chối hồ sơ ứng viên ";
  } else if (step === "step2") {
    if (actType === "ACCEPT") {
      if (interview_round < interview_round_num) {
        prefix_msg = `Chấp nhận qua vòng phỏng vấn thứ ${interview_round} ứng viên  `;
      } else prefix_msg = "Tiếp nhận ứng viên ";
    } else if (actType === "REJECT") prefix_msg = "Không tiếp nhận ứng viên ";
  }
  const company = useSelector((state) => state.employerAuth.current.employer);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm();
  const requiredMsg = "Không được để trống!";
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      delete data.send_mail;
      if (!watch("send_mail")) delete data.title;
      setIsLoading(true);
      await employerApi.processApplying({ ...candidate, ...data });
      setIsLoading(false);
      toast.success("Gửi thông báo thành công!");
      getCandidateList();
      setShowDialog(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Gửi thông báo thất bại!");
    }
    if (watch("send_mail")) {
      var templateParams = {
        to_email: candidate.email,
        title: data.title,
        candidate_name: candidate.firstname,
        company_name: company.name,
        content: data.content,
      };
      try {
        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templates.templateId1,
          templateParams,
          emailjsConfig.publicKey
        );
        toast.success("Gửi email thành công!");
      } catch (e) {
        toast.error("Gửi email thất bại!");
      }
    }
  };
  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <Modal
      show={showDialog}
      onShow={() => {
        document.getElementById("reset").click();
      }}
      onHide={handleClose}
      size="lg"
      fullscreen="md-down"
      style={{ fontFamily: "sans-serif" }}
    >
      <Modal.Body>
        <div className="ts-xl fw-600 text-center border-bottom pb-1">
          Gửi thông báo
        </div>
        <div className="text-center bg-mlight">
          <div className="pt-1 pb-2">
            {prefix_msg}
            <span className="fw-600">
              {candidate.lastname + " " + candidate.firstname}
            </span>
            <div>
              Vị trí <span className="fw-600">{candidate.jname}</span>
            </div>
          </div>
        </div>
        <Form className="mt-2" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="ts-smd">
            <Form.Check
              type="checkbox"
              label="Gửi thêm email"
              {...register("send_mail")}
              onClick={() => {
                if (!watch("send_mail")) {
                  resetField("send_fast_noti", { defaultValue: false });
                }
              }}
            />
            <Form.Check
              type="checkbox"
              label="Gửi thông báo nhanh"
              {...register("send_fast_noti")}
              disabled={watch("send_mail")}
            />
          </div>
          {watch("send_mail") && (
            <Form.Group>
              <Form.Label className="fw-600">Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                {...register("title", { required: requiredMsg })}
                isInvalid={errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {!watch("send_fast_noti") && (
            <Form.Group>
              <Form.Label className="fw-600">Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                size="sm"
                rows={10}
                {...register("content", { required: requiredMsg })}
                isInvalid={errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <div className="d-flex gap-2 justify-content-end mt-3">
            <Button
              type="submit"
              size="sm"
              className="d-flex align-items-center gap-1 bg-main border-0 px-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  Đang xử lý
                </>
              ) : (
                "Xác nhận"
              )}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="px-3"
              onClick={handleClose}
            >
              Hủy
            </Button>
            <button type="reset" id="reset" className="d-none" />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
