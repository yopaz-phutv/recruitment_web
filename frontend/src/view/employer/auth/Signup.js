import "./signup.css";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import RequiredMark from "../../../components/form/requiredMark";
import useGetAllLocations from "../../../hooks/useGetAllLocations";

export default function Signup() {
  const locations = useGetAllLocations();

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

  const onSubmit = (data) => {
    console.log("form data:", data);
  };

  return (
    <div className="page-bg py-5">
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
          <Link className="ps-5 ts-sm text-decoration-none">
            Quay lại trang Đăng nhập
          </Link>
        </div>
        <div className="px-5 py-2">
          <div className="fw-600 ts-lg">1. Thông tin tài khoản</div>
          <Form.Group className="ts-smd">
            <Form.Label className="mb-1 fw-600">Email</Form.Label>
            <RequiredMark />
            <Form.Control
              type="text"
              size="sm"
              {...register("email")}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-1 ts-smd">
            <Form.Label className="mb-1 fw-600">Mật khẩu</Form.Label>
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
            <Form.Label className="mb-1 fw-600">Nhập lại mật khẩu</Form.Label>
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
          <div className="fw-600 ts-lg mt-3">2. Thông tin người liên hệ</div>
          <Form.Group className="mt-1 ts-smd">
            <Form.Label className="mb-1 fw-600">Họ tên</Form.Label>
            <RequiredMark />
            <Form.Control
              type="text"
              size="sm"
              {...register("contact_name")}
              isInvalid={errors.contact_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact_name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-1 ts-smd">
            <Form.Label className="mb-1 fw-600">Số điện thoại</Form.Label>
            <RequiredMark />
            <Form.Control
              type="text"
              size="sm"
              {...register("phone")}
              isInvalid={errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="fw-600 ts-lg mt-3">3. Thông tin công ty</div>
          <Form.Group className="mt-1 ts-smd">
            <Form.Label className="mb-1 fw-600">Tên công ty</Form.Label>
            <RequiredMark />
            <Form.Control
              type="text"
              size="sm"
              {...register("name")}
              isInvalid={errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-1 ts-smd">
            <Form.Label className="mb-1 fw-600">Mã số thuế</Form.Label>
            <Form.Control type="text" size="sm" {...register("tax_code")} />
          </Form.Group>
          <Form.Group className="ts-smd mt-3 d-flex align-items-center">
            <Form.Label className="mb-1 fw-600 me-3">Số nhân sự</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              className="w-20"
              {...register("min_employees")}
            />
            <span className="mx-1">---</span>
            <Form.Control
              type="number"
              size="sm"
              className="w-20"
              {...register("min_employees")}
            />
            &nbsp;nhân viên
          </Form.Group>
          <Form.Label className="mb-1 fw-600">Địa chỉ</Form.Label>
          <RequiredMark />
          <Form.Group className="ts-smd">
            <Form.Select
              size="sm"
              className="w-35 mb-2"
              multiple
              aria-label="employer locations"
              {...register("location_ids")}
              isInvalid={errors.location_ids}
            >
              {locations?.map((item) => (
                <option key={item.id} value={item.id}>
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
              {...register("address")}
              isInvalid={errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group className="mt-1 ts-smd">
          <Form.Label className="mb-1 fw-600">Email</Form.Label>
          <RequiredMark />
          <Form.Control
            type="text"
            size="sm"
            {...register("email")}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group> */}
          <Button type="submit" className="w-100 my-3">
            Đăng ký
          </Button>
        </div>
      </Form>
    </div>
  );
}
