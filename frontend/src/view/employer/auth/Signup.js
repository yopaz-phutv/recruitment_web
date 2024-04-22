import "./signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import RequiredMark from "../../../components/form/requiredMark";
import useGetAllLocations from "../../../hooks/useGetAllLocations";
import authApi from "../../../api/auth";
import { toast } from "react-toastify";
import RegisterPreview from "./RegisterPreview";
import { useEffect, useState } from "react";
import employerApi from "../../../api/employer";

export default function Signup() {
  const loc = useLocation();
  const wait = loc.state?.wait;
  const locations = useGetAllLocations();
  const nav = useNavigate();

  const requiredMsg = "Không được để trống";
  const schema = yup.object({
    email: yup.string().email("Sai định dạng email").required(requiredMsg),
    password: yup
      .string()
      .required(requiredMsg)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số"
      ),
    re_password: yup
      .string()
      .required(requiredMsg)
      .equals([yup.ref("password")], "Mật khẩu không khớp"),
    contact_name: yup.string().required(requiredMsg),
    phone: yup
      .string()
      .required(requiredMsg)
      .matches(/^[0-9]{10}$/, "Sai định dạng số điện thoại"),
    name: yup.string().required(requiredMsg),
    location_ids: yup.array().min(1, requiredMsg),
    address: yup.string().required(requiredMsg),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [employer, setEmployer] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const getDetail = async () => {
    const res = await employerApi.getDetail();
    setEmployer(res);
  };

  const onSubmit = async (data) => {
    console.log("form data:", data);
    delete data.re_password;
    data.role = 2;
    try {
      await authApi.register(data);
      toast.success("Đăng ký thành công!");
      nav("/employer/login");
    } catch (error) {
      let errorMsg = "Đã có lỗi xảy ra!";
      const emailError = error.response.data.errors.email;
      if (emailError) errorMsg = "Email đã tồn tại trong hệ thống!";
      toast.error(errorMsg, { position: "top-right" });
      console.log("error::", error.response.data.message);
    }
  };

  useEffect(() => {
    if (wait) getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-bg py-5">
      {!wait || isEdit ? (
        <Form
          id="employer-signup-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="border mx-auto w-40 shadow bg-white rounded"
        >
          <div className="border-bottom pt-3 pb-1">
            <h5 className="text-center text-main mb-1">
              Đăng ký tài khoản Nhà tuyển dụng
            </h5>
            <Link
              to="/employer/login"
              className="ps-5 ts-sm text-decoration-none"
            >
              Quay lại trang Đăng nhập
            </Link>
          </div>
          <div className="px-5 py-2">
            <div className="fw-500 ts-lg">1. Thông tin tài khoản</div>
            <Form.Group className="ts-smd">
              <Form.Label className="mb-1 fw-500">Email</Form.Label>
              <RequiredMark />
              <Form.Control
                type="text"
                size="sm"
                defaultValue={isEdit ? employer.user.email : null}
                {...register("email")}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-1 ts-smd">
              <Form.Label className="mb-1 fw-500">Mật khẩu</Form.Label>
              <RequiredMark />
              <Form.Control
                type="text"
                size="sm"
                {...register("password")}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-1 ts-smd">
              <Form.Label className="mb-1 fw-500">Nhập lại mật khẩu</Form.Label>
              <RequiredMark />
              <Form.Control
                type="text"
                size="sm"
                {...register("re_password")}
                isInvalid={errors.re_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.re_password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="fw-500 ts-lg mt-3">2. Thông tin liên hệ</div>
            <Form.Group className="mt-1 ts-smd">
              <Form.Label className="mb-1 fw-500">Người liên hệ</Form.Label>
              <RequiredMark />
              <Form.Control
                type="text"
                size="sm"
                defaultValue={isEdit ? employer.contact_name : null}
                {...register("contact_name")}
                isInvalid={errors.contact_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contact_name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-1 ts-smd">
              <Form.Label className="mb-1 fw-500">Số điện thoại</Form.Label>
              <RequiredMark />
              <Form.Control
                type="text"
                size="sm"
                defaultValue={isEdit ? employer.phone : null}
                {...register("phone")}
                isInvalid={errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="fw-500 ts-lg mt-3">3. Thông tin công ty</div>
            <Form.Group className="mt-1 ts-smd">
              <Form.Label className="mb-1 fw-500">Tên công ty</Form.Label>
              <RequiredMark />
              <Form.Control
                type="text"
                size="sm"
                defaultValue={isEdit ? employer.name : null}
                {...register("name")}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-1 ts-smd">
              <Form.Label className="mb-1 fw-500">Mã số thuế</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                defaultValue={isEdit ? employer.tax_code : null}
                {...register("tax_code")}
              />
            </Form.Group>
            <Form.Group className="ts-smd mt-3 d-flex align-items-center">
              <Form.Label className="mb-1 fw-500 me-3">Số nhân sự</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                className="w-20"
                defaultValue={isEdit ? employer.min_employees : null}
                {...register("min_employees")}
              />
              <span className="mx-1">---</span>
              <Form.Control
                type="number"
                size="sm"
                className="w-20"
                defaultValue={isEdit ? employer.max_employees : null}
                {...register("max_employees")}
              />
              &nbsp;nhân viên
            </Form.Group>
            <Form.Label className="mb-1 fw-500">Địa chỉ</Form.Label>
            <RequiredMark />
            <Form.Group className="ts-smd">
              <Form.Select
                className="w-35 mb-2"
                style={{ height: "105px" }}
                size="sm"
                multiple
                aria-label="employer locations"
                {...register("location_ids")}
                isInvalid={errors.location_ids}
              >
                {locations?.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    selected={employer.locations
                      ?.map((loc) => loc.id)
                      .includes(item.id)}
                  >
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.location_ids?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2 ts-smd">
              <Form.Control
                as="textarea"
                size="sm"
                aria-label="employer address"
                placeholder="Nhập địa chỉ cụ thể"
                defaultValue={isEdit ? employer.address : null}
                {...register("address")}
                isInvalid={errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {!isEdit ? (
              <Button type="submit" className="w-100 my-3">
                Đăng ký
              </Button>
            ) : (
              <div className="d-flex gap-2 my-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-40"
                  onClick={() => setIsEdit(false)}
                >
                  Quay lại
                </Button>
                <Button size="sm" className="w-60">
                  Cập nhật thông tin đăng ký
                </Button>
              </div>
            )}
          </div>
        </Form>
      ) : (
        <RegisterPreview employer={employer} setIsEdit={setIsEdit} />
      )}
    </div>
  );
}
