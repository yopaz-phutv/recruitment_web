import "./signup.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import RequiredMark from "../../../components/form/requiredMark";

export default function Signup() {
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
    // lastname: yup.string().required(),
    // firstname: yup.string().required(),
    // gender: yup.number().required(requiredMsg),
    // dob: yup.string().required(requiredMsg),
    phone: yup
      .string()
      .required(requiredMsg)
      .matches(/^[0-9]{10}$/, "Sai định dạng số điện thoại"),
    // address: yup.string().required(requiredMsg),
    // link: yup.string().url("Sai định dạng URL"),
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
    <>
      <Form
        id="employer-signup-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="border mx-auto w-40 my-5 shadow"
      >
        <h5 className="text-center text-main border-bottom py-2">
          Đăng ký tài khoản Nhà tuyển dụng
        </h5>
        <div className="px-5">
          <div className="fw-600 ts-lg">1. Thông tin tài khoản</div>
          <Form.Group>
            <Form.Label className="mb-1 fw-600 ts-smd">Email</Form.Label>
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
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">Mật khẩu</Form.Label>
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
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">
              Nhập lại mật khẩu
            </Form.Label>
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
          <hr />
          <div className="fw-600 ts-lg">2. Thông tin người liên hệ</div>
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">Họ tên</Form.Label>
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
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">
              Số điện thoại
            </Form.Label>
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
          <div className="fw-600 ts-lg">3. Thông tin công ty</div>
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">Tên công ty</Form.Label>
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
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">Mã số thuế</Form.Label>
            <RequiredMark />
            <Form.Control
              type="text"
              size="sm"
              {...register("tax_code")}
              isInvalid={errors.tax_code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tax_code?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3 d-flex align-items-center">
            <Form.Label className="mb-1 fw-600 ts-smd w-30">
              Số nhân sự
            </Form.Label>
            <Form.Control
              type="number"
              size="sm"
              className="w-30"
              {...register("min_employees")}
            />
            <span className="mx-1">---</span>
            <Form.Control
              type="number"
              size="sm"
              className="w-30"
              {...register("min_employees")}
            />
          </Form.Group>
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">Địa chỉ</Form.Label>
            <RequiredMark />
            <Form.Control
              type="text"
              size="sm"
              {...register("address")}
              isInvalid={errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">Ngành nghề</Form.Label>
            <RequiredMark />
            <Form.Control
              type="text"
              size="sm"
              {...register("industries")}
              isInvalid={errors.industries}
            />
            <Form.Control.Feedback type="invalid">
              {errors.industries?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-1">
            <Form.Label className="mb-1 fw-600 ts-smd">Email</Form.Label>
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
          {/* <Form.Group className="mt-1">
          <Form.Label className="mb-1 fw-600 ts-smd">Email</Form.Label>
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
        </div>
        <Button type="submit" className="d-block ms-auto">
          Đăng ký
        </Button>
      </Form>
    </>
  );
}
