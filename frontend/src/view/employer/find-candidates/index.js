import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import useGetAllLocations from "../../../hooks/useGetAllLocations";
import { useState } from "react";
import CMulSelect from "../../../components/CMulSelect";
import useGetAllIndustries from "../../../hooks/useGetAllIndustries";
import TagInput from "../../../components/TagInput";
import { BsSearch } from "react-icons/bs";

export default function FindingCandidates() {
  // nganh nghe, dia diem, gioi tinh, độ tuổi, trinh do, ki nang
  const { locations, isLoading: isLoadingLocations } = useGetAllLocations();
  const { industries, isLoading: isLoadingIndustries } = useGetAllIndustries();
  const [locationIds, setLocationIds] = useState([]);
  const [industryIds, setIndustryIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
  };

  return (
    <div
      className="bg-white ms-4 mt-3 pb-2"
      style={{ paddingLeft: "45px", paddingRight: "35px" }}
    >
      <h5 className="mb-2 pt-3 text-main">Tìm kiếm ứng viên</h5>
      <Form noValidate className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row row-cols-3 row-cols-lg-5">
          {!isLoadingLocations && (
            <CMulSelect
              className="mb-2"
              items={locations}
              textAtt="name"
              valueAtt="id"
              defaultText="Tất cả tỉnh thành"
              setOutput={setLocationIds}
            />
          )}
          {!isLoadingIndustries && (
            <CMulSelect
              className="mb-2"
              contentWidth="300px"
              items={industries}
              textAtt="name"
              valueAtt="id"
              defaultText="Tất cả ngành nghề"
              setOutput={setIndustryIds}
            />
          )}
          <div className="mb-2">
            <Form.Select>
              <option>Tất cả trình độ</option>
              <option>kkk</option>
            </Form.Select>
          </div>
          <div>
            <Form.Select className="mb-2" {...register("gender")}>
              <option value="">Giới tính</option>
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </Form.Select>
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="w-40">Độ tuổi</div>
            <InputGroup className="flex-fill">
              <Form.Control
                type="number"
                className="border-end-0"
                {...register("min_age")}
              />
              <InputGroup.Text className="bg-white">-</InputGroup.Text>
              <Form.Control
                type="number"
                className="border-start-0"
                {...register("max_age")}
              />
            </InputGroup>
          </div>
        </div>
        <div className="d-flex">
          <TagInput
            className="flex-fill"
            listWord={skills}
            setListWord={setSkills}
            placeholder="Nhập các kỹ năng"
          />
          <Button
            type="submit"
            className="bg-main ms-2"
            style={{ width: '180px' }}
          >
            {isLoading ? <Spinner size="sm" /> : <BsSearch className="fs-5" />}
            <span> Tìm kiếm</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
