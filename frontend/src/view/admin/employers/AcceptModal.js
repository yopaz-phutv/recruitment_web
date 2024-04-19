import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import adminApi from "../../../api/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "../../../services";

export default function AcceptModal({
  show,
  setShow,
  employer,
  setCurTabInd,
  getEmployers,
  getRequests,
}) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await adminApi.handleRequest({ id: employer.id, type: 1 });
      setIsLoading(false);
      setShow(false);
      toast.success("Cập nhật thành công!");
      nav("/admin/employers");
      setCurTabInd(0);
      await getEmployers();
      await getRequests();
    } catch (error) {
      setIsLoading(false);
      toast.error("Đã có lỗi xảy ra!");
    }
    const title = 'Đăng ký thành công';
    const content = `Tài khoản nhà tuyển dụng "${employer.name}" đã được kích hoạt thành công.\n
    Vui lòng đăng nhập vào hệ thống để hoàn thiện thông tin!`;
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="text-center">
        Chấp nhận tài khoản nhà tuyển dụng <br />
        <strong className="ts-lg">{employer.name}</strong>
      </Modal.Body>
      <Modal.Footer className="pt-0 pb-2 border-top-0 justify-center">
        <Button
          variant="primary"
          disabled={isLoading}
          className="w-50"
          onClick={handleConfirm}
        >
          {isLoading && <Spinner size="sm" className="me-1" />}
          Xác nhận
        </Button>
        <Button variant="secondary" className="flex-fill" onClick={handleClose}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
