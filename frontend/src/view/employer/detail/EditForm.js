import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RequiredMark from "../../../components/form/requiredMark";
import useGetAllLocations from "../../../hooks/useGetAllLocations";
import { useState } from "react";
import employerApi from "../../../api/employer";
import { toast } from "react-toastify";

export default function EditForm({
  className,
  employer,
  getDetail,
  returnView,
}) {
  const requiredMsg = "Không được để trống";
  const schema = yup.object({
    contact_name: yup.string().required(requiredMsg),
    phone: yup
      .string()
      .required(requiredMsg)
      .matches(/^[0-9]{10}$/, "Sai định dạng số điện thoại"),
    name: yup.string().required(requiredMsg),
    location_ids: yup.array().min(1, requiredMsg),
    address: yup.string().required(requiredMsg),
    website: yup.string().url("Sai định dạng đường link"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { locations } = useGetAllLocations();
  const [isLoading, setIsLoading] = useState(false);
  const [changeLogo, setChangeLogo] = useState(false);
  const [deleteCurLogo, setDeleteCurLogo] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [deleteCurImage, setDeleteCurImage] = useState(false);

  const onSubmit = async (data) => {
    console.log({ data });
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tax_code", data.tax_code);
    formData.append("min_employees", data.min_employees);
    formData.append("max_employees", data.max_employees);
    formData.append("location_ids", data.location_ids);
    formData.append("address", data.address);
    if (data.website) formData.append("website", data.website);
    formData.append("contact_name", data.contact_name);
    formData.append("phone", data.phone);
    if (data.description) formData.append("description", data.description);
    if (changeLogo && data.logo_file.length > 0)
      formData.append("logo_file", data.logo_file[0]);
    if (!changeLogo && deleteCurLogo) formData.append("delete_logo", 1);
    if (changeImage && data.image_file.length > 0)
      formData.append("image_file", data.image_file[0]);
    if (!changeImage && deleteCurImage) formData.append("delete_image", 1);

    try {
      setIsLoading(true);
      await employerApi.update(formData);
      toast.success("Cập nhật thành công!");
      returnView();
      getDetail();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      id="employer-edit-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={className}
    >
      <Form.Group className="ts-smd">
        <Form.Label className="mb-1 fw-600">Tên công ty</Form.Label>
        <RequiredMark />
        <Form.Control
          type="text"
          size="sm"
          defaultValue={employer.name}
          {...register("name")}
          isInvalid={errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mt-2 ts-smd">
        <Form.Label className="mb-1 fw-600">Mã số thuế</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          defaultValue={employer.tax_code}
          {...register("tax_code")}
        />
      </Form.Group>
      <Form.Group className="ts-smd mt-2 d-flex align-items-center">
        <Form.Label className="mb-1 fw-600 me-3">Số nhân sự</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          className="w-20"
          defaultValue={employer.min_employees}
          {...register("min_employees")}
        />
        <span className="mx-1">---</span>
        <Form.Control
          type="number"
          size="sm"
          className="w-20"
          defaultValue={employer.max_employees}
          {...register("max_employees")}
        />
        &nbsp;nhân viên
      </Form.Group>
      <Form.Label className="mb-1 fw-600">Địa chỉ</Form.Label>
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
          defaultValue={employer.address}
          {...register("address")}
          isInvalid={errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {errors.address?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="ts-smd mt-2">
        <Form.Label className="mb-1 fw-600">Website</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          defaultValue={employer.website}
          {...register("website")}
          isInvalid={errors.website}
        />
        <Form.Control.Feedback type="invalid">
          {errors.website?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="mt-2 d-flex gap-3">
        <Form.Group className="ts-smd w-60">
          <Form.Label className="mb-1 fw-600">Người liên hệ</Form.Label>
          <RequiredMark />
          <Form.Control
            type="text"
            size="sm"
            defaultValue={employer.contact_name}
            {...register("contact_name")}
            isInvalid={errors.contact_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.contact_name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="ts-smd flex-fill">
          <Form.Label className="mb-1 fw-600">Số điện thoại</Form.Label>
          <RequiredMark />
          <Form.Control
            type="text"
            size="sm"
            defaultValue={employer.phone}
            {...register("phone")}
            isInvalid={errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Form.Group className="ts-smd mt-2">
        <Form.Label className="mb-1 fw-600">Mô tả công ty</Form.Label>
        <Form.Control
          as="textarea"
          size="sm"
          rows={5}
          defaultValue={employer.description}
          {...register("description")}
        />
      </Form.Group>
      <Form.Group className="ts-smd mt-2">
        <Form.Label className="mb-1 fw-600">Logo công ty</Form.Label>
        {employer.logo && !changeLogo ? (
          <>
            {!deleteCurLogo && (
              <a
                href={employer.logo}
                className="ms-3"
                target="_blank"
                rel="noreferrer"
              >
                Logo hiện tại
              </a>
            )}
            <Button
              size="sm"
              variant="secondary"
              className="ms-2 py-0"
              onClick={() => setDeleteCurLogo(!deleteCurLogo)}
            >
              {!deleteCurLogo ? "Xóa logo hiện tại" : "Bỏ xóa logo hiện tại"}
            </Button>
          </>
        ) : null}
        <div className="mt-1 d-flex gap-2">
          <Button
            size="sm"
            className="w-20 lh-sm bg-main border-0"
            onClick={() => setChangeLogo(!changeLogo)}
          >
            {!changeLogo ? "Logo mới" : "Xóa"}
          </Button>
          {changeLogo && (
            <Form.Control
              id="employer-logo"
              type="file"
              size="sm"
              {...register("logo_file")}
            />
          )}
        </div>
      </Form.Group>
      <Form.Group className="ts-smd mt-2">
        <Form.Label className="mb-1 fw-600">Ảnh đại diện công ty</Form.Label>
        {employer.image && !changeImage ? (
          <>
            {!deleteCurImage && (
              <a
                href={employer.image}
                className="ms-3"
                target="_blank"
                rel="noreferrer"
              >
                Ảnh hiện tại
              </a>
            )}
            <Button
              size="sm"
              variant="secondary"
              className="ms-2 py-0"
              onClick={() => setDeleteCurImage(!deleteCurImage)}
            >
              {!deleteCurImage ? "Xóa ảnh hiện tại" : "Bỏ xóa ảnh hiện tại"}
            </Button>
          </>
        ) : null}
        <div className="mt-1 d-flex gap-2">
          <Button
            size="sm"
            className="w-20 lh-sm bg-main border-0"
            onClick={() => setChangeImage(!changeImage)}
          >
            {!changeImage ? "Ảnh mới" : "Xóa"}
          </Button>
          {changeImage && (
            <Form.Control
              id="employer-image"
              type="file"
              size="sm"
              {...register("image_file")}
            />
          )}
        </div>
        <hr />
        <div className="d-flex gap-2 justify-content-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-main border-0"
          >
            {isLoading && <Spinner size="sm" className="me-1" />}
            {!isLoading ? "Cập nhật" : "Đang xử lý"}
          </Button>
          <Button variant="secondary" onClick={returnView}>
            Hủy
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}
