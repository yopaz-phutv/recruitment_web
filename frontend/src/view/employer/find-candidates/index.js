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
import useGetAllJtypes from "../../../hooks/useGetAllJtypes";
import useGetAllJlevels from "../../../hooks/useGetAllJlevels";
import { expLevel } from "../../../common/constant";
import employerApi from "../../../api/employer";

export default function FindingCandidates() {
  // nganh nghe, dia diem, gioi tinh, độ tuổi, trinh do, ki nang
  // tim kiem theo tieu chi cong viec cua nha tuyen dung
  const { locations, isLoading: isLoadingLocations } = useGetAllLocations();
  const { industries, isLoading: isLoadingIndustries } = useGetAllIndustries();
  const { jtypes } = useGetAllJtypes();
  const { jlevels } = useGetAllJlevels();
  const [locationIds, setLocationIds] = useState([]);
  const [industryIds, setIndustryIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    for (let key in data) {
      if (!data[key]) delete data[key];
    }
    if (skills.length > 0) {
      var skillText = "";
      skills.forEach((item) => {
        skillText += item + " ";
      });
      data.skill_text = skillText;
    }
    if (locationIds.length > 0) data.location_ids = locationIds;
    if (industryIds.length > 0) data.industry_ids = industryIds;
    console.log({ data });
    try {
      const res = await employerApi.findCandidates(data);
      console.log({ res });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-white ms-4 mt-3 pb-2"
      style={{ paddingLeft: "45px", paddingRight: "35px" }}
    >
      <h5 className="mb-2 pt-3 text-main">
        Tìm kiếm ứng viên theo tiêu chí việc làm
      </h5>
      <Form noValidate className="mt-3">
        <div className="row row-cols-4 row-cols-lg-">
          {!isLoadingLocations && (
            <CMulSelect
              size="sm"
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
              size="sm"
              className="mb-2"
              contentWidth="300px"
              items={industries}
              textAtt="name"
              valueAtt="id"
              defaultText="Tất cả ngành nghề"
              setOutput={setIndustryIds}
            />
          )}
          <div>
            <Form.Select size="sm" className="mb-2" {...register("gender")}>
              <option value="">Giới tính</option>
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
            </Form.Select>
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="w-45 ts-sm">Độ tuổi</div>
            <InputGroup className="flex-fill align-items-center">
              <Form.Control
                type="number"
                size="sm"
                className="border-end-0"
                {...register("min_age")}
              />
              <div className="border-top border-bottom align-self-stretch">
                ---
              </div>
              <Form.Control
                type="number"
                size="sm"
                className="border-start-0"
                {...register("max_age")}
              />
            </InputGroup>
          </div>
          <div className="mb-2">
            <Form.Select size="sm" {...register("jtype_id")}>
              <option value="">Tất cả hình thức</option>
              {jlevels.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="mb-2">
            <Form.Select size="sm" {...register("jlevel_id")}>
              <option value="">Tất cả cấp bậc</option>
              {jtypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="mb-2">
            <Form.Select size="sm" {...register("job_yoe")}>
              {expLevel.map((item) => (
                <option key={item.name} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* <div className="d-flex align-items-center mb-2">
            <div className="w-45 ts-sm">Mức lương</div>
            <InputGroup className="flex-fill align-items-center">
              <Form.Control
                type="number"
                size="sm"
                className="border-end-0"
                {...register("min_salary")}
              />
              <div className="border-top border-bottom align-self-stretch">
                ---
              </div>
              <Form.Control
                type="number"
                size="sm"
                className="border-start-0"
                {...register("max_salary")}
              />
            </InputGroup>
          </div> */}
        </div>
        <div className="d-flex">
          <TagInput
            size="sm"
            className="flex-fill"
            listWord={skills}
            setListWord={setSkills}
            placeholder="Nhập các kỹ năng"
          />
          <Button
            size="sm"
            className="bg-main ms-2"
            style={{ width: "180px" }}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <Spinner size="sm" /> : <BsSearch className="fs-5" />}
            <span> Tìm kiếm</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
