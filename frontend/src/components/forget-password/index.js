import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import emailjs from "@emailjs/browser";
import "./style.css";
import { emailjsConfig } from "../../services";
import { useForm } from "react-hook-form";
import authApi from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "clsx";

export default function ForgetPassword({className, redirectUrl}) {
  const nav = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const requiredMsg = "Vui lòng nhập";
  const ErrorArea = ({ error }) => (
    <div className="text-danger ts-smd">{error}</div>
  );

  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState(null);
  const [codeInput, setCodeInput] = useState(null);
  const [codeError, setCodeError] = useState(null);
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    const newCode = Math.floor(Math.random() * 8999 + 1000);
    setCode(newCode);

    const templateParams = {
      to_email: email,
      name: "bạn",
      title: "Quên mật khẩu",
      content: `Vui lòng nhập mã sau để tạo mật khẩu mới: ${newCode}`,
    };

    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templates.common,
      templateParams,
      emailjsConfig.publicKey
    );    
    setIsLoading(false);
    setStep(2);
    setTimeout(() => {
      setIsCodeExpired(true);
    }, 3 * 60 * 1000);
  };

  const handleCheckCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (Number(codeInput) !== code) {
        setCodeError("Mã bạn nhập không đúng");
      } else {
        if (isCodeExpired) {
          setCodeError("Mã đã hết hiệu lực");
          setCode(null);
        } else {
          setIsCodeExpired(false);
          setStep(3);
        }
      }
    }, 2000);
  };

  const handleCreateNewPassword = async ({ password }) => {
    try {
      setIsLoading(true);
      await authApi.updateNewPassword({ email, password });
      toast.success("Cập nhật thành công!");
      nav(redirectUrl);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper mx-auto" style={{ width: "450px", paddingTop: "150px" }}>
      <div className={clsx("bg-white px-3 pb-3 rounded shadow-sm", className)}>
        {step === 1 && (
          <div className="pt-2">
            <Form.Group>
              <Form.Label className="fw-600">
                Nhập địa chỉ email của bạn
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              size="sm"
              className="mt-2 w-100 bg-main border-0 d-flex justify-content-center align-items-center gap-1"
              disabled={isLoading || !email}
              onClick={handleSendRequest}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  Đang gửi
                </>
              ) : (
                "Gửi"
              )}
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="pt-1">
            <small className="text-main pointer" onClick={() => setStep(1)}>
              {"<<"} Quay lại
            </small>
            <Form.Group>
              <Form.Label className="fw-600">
                Nhập mã vừa được gửi đến email của bạn
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mã"
                onChange={(e) => setCodeInput(e.target.value)}
              />
            </Form.Group>
            {codeError && (
              <div className="text-danger ts-smd mt-1">{codeError}</div>
            )}
            <Button
              size="sm"
              className="mt-2 w-100 bg-main border-0 d-flex justify-content-center align-items-center gap-1"
              disabled={isLoading || !codeInput}
              onClick={handleCheckCode}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  Đang xác thực
                </>
              ) : (
                "Xác thực"
              )}
            </Button>
          </div>
        )}
        {step === 3 && (
          <Form className="pt-1">
            <small className="text-main pointer" onClick={() => setStep(2)}>
              {"<<"} Quay lại
            </small>
            <Form.Group>
              <Form.Label className="fw-600 mb-1">Nhập mật khẩu mới</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mật khẩu"
                {...register("password", { required: true })}
              />
              {errors.password && <ErrorArea error={requiredMsg} />}
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600 mb-1">
                Nhập lại mật khẩu mới
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập lại mật khẩu"
                {...register("re_password", { required: true })}
              />
            </Form.Group>
            {errors.re_password && <ErrorArea error={requiredMsg} />}
            {watch("re_password") &&
            watch("re_password") !== watch("password") ? (
              <ErrorArea error="Mật khẩu nhập lại không khớp" />
            ) : null}
            <Button
              size="sm"
              className="mt-2 w-100 bg-main ts-smd border-0 d-flex justify-content-center align-items-center gap-1"
              disabled={
                isLoading ||
                !watch("password") ||
                !watch("re_password") ||
                watch("re_password") !== watch("password")
              }
              onClick={handleSubmit(handleCreateNewPassword)}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  Đang xử lý
                </>
              ) : (
                "Tạo mật khẩu mới"
              )}
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}
