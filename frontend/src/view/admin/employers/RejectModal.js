import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import adminApi from "../../../api/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "../../../services";
import { useForm } from "react-hook-form";

export default function RejectModal({
  show,
  setShow,
  employer,
  setCurTabInd,
  getEmployers,
  getRequestsAmount,
}) {
  const nav = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const onSubmit = async ({ reason }) => {
    setIsLoading(true);
    try {
      await adminApi.handleRequest({ id: employer.id, type: 0 });
      setIsLoading(false);
      setShow(false);
      toast.success("Cập nhật thành công!");
      nav("/admin/employers");
      setCurTabInd(0);
      await getEmployers();
      await getRequestsAmount();
    } catch (error) {
      setIsLoading(false);
      toast.error("Đã có lỗi xảy ra!");
    }
    const title = "Đăng ký thất bại";
    const content = `Tài khoản nhà tuyển dụng "${employer.name}" đã bị từ chối.
    *Lí do từ chối: \n${reason}`;
    const templateParams = {
      to_email: employer.email,
      name: employer.contact_name,
      title,
      content,
    };
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templates.common,
      templateParams,
      emailjsConfig.publicKey
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ fontFamily: "sans-serif" }}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="text-center">
          Từ chối tài khoản nhà tuyển dụng <br />
          <strong className="ts-lg">{employer.name}</strong>
          <Form.Group className="text-start">
            <Form.Label className="fw-600">Lí do từ chối</Form.Label>
            <Form.Control
              as="textarea"
              {...register("reason", { required: "Vui lòng điền thông tin" })}
              isInvalid={errors.reason}
            />
            <Form.Control.Feedback type="invalid">
              {errors.reason?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="pt-0 pb-2 border-top-0 justify-center">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-50"
          >
            {isLoading && <Spinner size="sm" className="me-1" />}
            Xác nhận
          </Button>
          <Button variant="danger" className="flex-fill" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
