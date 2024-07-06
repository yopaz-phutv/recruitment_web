import defaultAvt from "../../../../../../assets/images/default-avatar.webp";
import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { ContentItem, InforPart } from "../../components";
import { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../../../layouts";
import clsx from "clsx";
import dayjs from "dayjs";
import { TemplateContext } from "../TemplateWrapper";
import FlexInput from "../../../../../../components/FlexInput";

export default function Template2() {
  const {
    parts,
    setParts,
    basicInfor,
    fullname,
    cvEducations,
    setCvEducations,
    cvExperiences,
    setCvExperiences,
    cvProjects,
    setCvProjects,
    cvSkills,
    setCvSkills,
    cvCertificates,
    setCvCertificates,
    cvPrizes,
    setCvPrizes,
    cvActivities,
    setCvActivities,
    cvOthers,
    setCvOthers,
    register,
    handleDisplayImg,
  } = useContext(TemplateContext);
  const { cvMode } = useContext(CandidateContext);

  useEffect(() => {
    setParts([
      "objective",
      "experience",
      "project",
      "activity",
      "prize",
      "personal",
      "education",
      "skill",
      "certificate",
      "other",
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Skill = ({ infor, index, bgColor }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
      if (name) cvSkills[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (description) cvSkills[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);

    return (
      <div className="content">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("fw-550", bgColor)}
          placeholder="Tên kỹ năng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Certificate = ({ infor, index, bgColor }) => {
    const [name, setName] = useState("");
    const [receiveDate, setReceiveDate] = useState("");
    useEffect(() => {
      if (name) cvCertificates[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (receiveDate) cvCertificates[index].receive_date = receiveDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiveDate]);

    return (
      <div className="content d-flex">
        <FlexInput
          disabled={cvMode === "READ"}
          className="w-25"
          innerClassName={clsx("fw-550 ts-sm", bgColor)}
          placeholder="mm/yyyy"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format("MM/YYYY")
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
          disabled={cvMode === "READ"}
          className="flex-fill"
          innerClassName={clsx(bgColor)}
          placeholder="Tên chứng chỉ"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Prize = ({ infor, index, bgColor }) => {
    const [name, setName] = useState("");
    const [receiveDate, setReceiveDate] = useState("");
    useEffect(() => {
      if (name) cvPrizes[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (receiveDate) cvPrizes[index].receive_date = receiveDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiveDate]);

    return (
      <div className="content d-flex">
        <FlexInput
          disabled={cvMode === "READ"}
          className="w-25"
          innerClassName={clsx("fw-550", bgColor)}
          placeholder="mm/yyyy"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format("MM/YYYY")
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
          disabled={cvMode === "READ"}
          className="flex-fill"
          innerClassName={clsx(bgColor)}
          placeholder="Tên giải thưởng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Education = ({ infor, index, menu, bgColor }) => {
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
      if (school) cvEducations[index].school = school;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [school]);
    useEffect(() => {
      if (major) cvEducations[index].major = major;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [major]);
    useEffect(() => {
      if (description) cvEducations[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvEducations[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvEducations[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content">
        <div className="d-flex align-items-center">
          <FlexInput
            disabled={cvMode === "READ"}
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Trường/Trung tâm"
            defaultValue={infor?.school}
            setCurrent={setSchool}
          />
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx(
              "fst-italic text-secondary ts-xxs text-end",
              bgColor
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date ? dayjs(infor.start_date).format("YYYY") : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx("fst-italic text-secondary ts-xxs", bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format("YYYY") : null
            }
            setCurrent={setEndDate}
          />
        </div>
        {menu[0].on && (
          <FlexInput
            disabled={cvMode === "READ"}
            innerClassName={clsx(bgColor)}
            placeholder="Chuyên ngành"
            defaultValue={infor?.major}
            setCurrent={setMajor}
          />
        )}
        {menu[1].on && (
          <FlexInput
            disabled={cvMode === "READ"}
            innerClassName={clsx(bgColor)}
            placeholder="Mô tả"
            defaultValue={infor?.description}
            setCurrent={setDescription}
          />
        )}
      </div>
    );
  };

  const Experience = ({ infor, index, bgColor }) => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
      if (name) cvExperiences[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (company) cvExperiences[index].company = company;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company]);
    useEffect(() => {
      if (description) cvExperiences[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvExperiences[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvExperiences[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content">
        <div className="d-flex align-items-center">
          <FlexInput
            disabled={cvMode === "READ"}
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Vị trí việc làm"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx(
              "fst-italic text-secondary ts-xxs text-end",
              bgColor
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format("MM/YYYY")
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx("fst-italic text-secondary ts-xxs", bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format("MM/YYYY") : null
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx(bgColor)}
          placeholder="Công ty/Doanh nghiệp"
          defaultValue={infor?.company}
          setCurrent={setCompany}
        />

        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Project = ({ infor, index, menu, bgColor }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [role, setRole] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
      if (name) cvProjects[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (type) cvProjects[index].prj_type = type;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);
    useEffect(() => {
      if (role) cvProjects[index].role = role;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);
    useEffect(() => {
      if (technologies) cvProjects[index].technologies = technologies;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technologies]);
    useEffect(() => {
      if (link) cvProjects[index].link = link;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);
    useEffect(() => {
      if (description) cvProjects[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvProjects[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvProjects[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content">
        <div className="d-flex align-items-center">
          <FlexInput
            disabled={cvMode === "READ"}
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx(
              "fst-italic text-secondary ts-xxs text-end",
              bgColor
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format("MM/YYYY")
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx("fst-italic text-secondary ts-xxs", bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format("MM/YYYY") : null
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("text-capitalize text-secondary ts-sm", bgColor)}
          placeholder="Loại dự án (Cá nhân/Nhóm)"
          defaultValue={infor?.prj_type}
          setCurrent={setType}
        />
        {menu[0].on && (
          <FlexInput
            disabled={cvMode === "READ"}
            innerClassName={clsx("text-decoration-underline", bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        {menu[1].on && (
          <FlexInput
            disabled={cvMode === "READ"}
            innerClassName={clsx(bgColor)}
            placeholder="Công việc/Vai trò"
            defaultValue={infor?.role}
            setCurrent={setRole}
          />
        )}
        {menu[2].on && (
          <FlexInput
            disabled={cvMode === "READ"}
            innerClassName={clsx(bgColor)}
            placeholder="Công nghệ sử dụng"
            defaultValue={infor?.technologies}
            setCurrent={setTechnologies}
          />
        )}
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };

  const Activity = ({ infor, index, menu, bgColor }) => {
    const [organization, setOrganization] = useState("");
    const [role, setRole] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
      if (organization) cvActivities[index].organization = organization;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);
    useEffect(() => {
      if (role) cvActivities[index].role = role;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);
    useEffect(() => {
      if (link) cvActivities[index].link = link;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);
    useEffect(() => {
      if (description) cvActivities[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvActivities[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvActivities[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content">
        <div className="d-flex align-items-center">
          <FlexInput
            disabled={cvMode === "READ"}
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.organization}
            setCurrent={setOrganization}
          />
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx(
              "fst-italic text-secondary ts-xxs text-end",
              bgColor
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format("MM/YYYY")
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            disabled={cvMode === "READ"}
            style={{ width: "17%" }}
            innerClassName={clsx("fst-italic text-secondary ts-xxs", bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              !infor.is_present
                ? infor.end_date
                  ? dayjs(infor.end_date).format("MM/YYYY")
                  : null
                : "hiện tại"
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("text-secondary ts-sm", bgColor)}
          placeholder="Vị trí/Vai trò"
          defaultValue={infor?.role}
          setCurrent={setRole}
        />
        {menu[0].on && (
          <FlexInput
            disabled={cvMode === "READ"}
            innerClassName={clsx("text-decoration-underline", bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Other = ({ infor, index, bgColor }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
      if (name) cvOthers[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (description) cvOthers[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);

    return (
      <div className="content">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Khác"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  // part wrappers:
  const PersonalPart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="personal" className="mb-3">
        <div className="position-relative mt-2">
          <div
            className="personal-icons-bar rounded-pill"
            style={{ height: "200px", width: "38px" }}
          ></div>
          <div
            className="position-absolute w-100 pe-2"
            style={{ fontSize: "14px", left: "9px", top: "15px" }}
          >
            <FlexInput
              disabled={cvMode === "READ"}
              className="mb-2"
              innerClassName={bgColor}
              iconLeft={
                <IoCalendarClear className="fs-5 mb-1 me-3 text-white" />
              }
              placeholder="Ngày/tháng/năm sinh"
              defaultValue={
                cvMode !== "CREATE_0"
                  ? dayjs(basicInfor.dob).format("DD/MM/YYYY")
                  : null
              }
              {...register("dob")}
            />
            <FlexInput
              disabled={cvMode === "READ"}
              className="mb-2"
              innerClassName={bgColor}
              iconLeft={<FaPhoneAlt className="fs-5 mb-1 me-3 text-white" />}
              placeholder="Số điện thoại"
              defaultValue={cvMode !== "CREATE_0" ? basicInfor.phone : null}
              {...register("phone")}
            />
            <FlexInput
              disabled={cvMode === "READ"}
              className="mb-2"
              innerClassName={bgColor}
              iconLeft={<IoMdMail className="fs-5 mb-1 me-3 text-white" />}
              placeholder="Email"
              defaultValue={cvMode !== "CREATE_0" ? basicInfor.email : null}
              {...register("email")}
            />
            <FlexInput
              disabled={cvMode === "READ"}
              className="mb-2"
              innerClassName={bgColor}
              iconLeft={<IoIosLink className=" fs-5 mb-1 me-3 text-white" />}
              placeholder="Liên kết"
              defaultValue={cvMode !== "CREATE_0" ? basicInfor.link : null}
              {...register("link")}
            />
            <FlexInput
              disabled={cvMode === "READ"}
              className="mb-2"
              innerClassName={bgColor}
              iconLeft={
                <MdLocationOn
                  className="fs-4 mb-1 text-white"
                  style={{ marginRight: "14px" }}
                />
              }
              placeholder="Địa chỉ"
              defaultValue={cvMode !== "CREATE_0" ? basicInfor.address : null}
              {...register("address")}
            />
          </div>
        </div>
      </InforPart>
    );
  };
  const ObjectivePart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="objective" className="mb-3">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Mục tiêu nghề nghiệp"
          defaultValue={
            cvMode === "EDIT"
              ? basicInfor.objectiveTitle
              : "Mục tiêu nghề nghiệp"
          }
          {...register("objectiveTitle")}
        />
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("content", bgColor)}
          placeholder="Nội dung"
          defaultValue={cvMode !== "CREATE_0" ? basicInfor?.objective : null}
          {...register("objective")}
        />
      </InforPart>
    );
  };
  const SkillPart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="skill" className="mb-3">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Các kỹ năng"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.skillTitle : "Các kỹ năng"
          }
          {...register("skillTitle")}
        />
        {cvSkills.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            key={`skill_${index}`}
            index={index}
            items={cvSkills}
            setItems={setCvSkills}
          >
            <Skill infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const CertificatePart = ({ bgColor }) => {
    return (
      <InforPart
        disabled={cvMode === "READ"}
        type="certificate"
        className="mb-3"
      >
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Chứng chỉ"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.certificateTitle : "Chứng chỉ"
          }
          {...register("certificateTitle")}
        />
        {cvCertificates.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            key={`certificate_${index}`}
            index={index}
            items={cvCertificates}
            setItems={setCvCertificates}
          >
            <Certificate infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const PrizePart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="prize" className="mb-3">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Giải thưởng"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.prizeTitle : "Giải thưởng"
          }
          {...register("prizeTitle")}
        />
        {cvPrizes.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            key={`prize_${index}`}
            index={index}
            items={cvPrizes}
            setItems={setCvPrizes}
          >
            <Prize infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const EducationPart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="education" className="mb-3">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Học vấn"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.educationTitle : "Học vấn"
          }
          {...register("educationTitle")}
        />
        {cvEducations.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            className="mb-1 py-1"
            key={`education_${index}`}
            index={index}
            items={cvEducations}
            setItems={setCvEducations}
            menuVaule={[
              { name: "Chuyên ngành", on: item.major },
              { name: "Mô tả", on: item.description },
            ]}
          >
            <Education infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const ExperiencePart = ({ bgColor }) => {
    return (
      <InforPart
        disabled={cvMode === "READ"}
        type="experience"
        className="mb-3"
      >
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Kinh nghiệm làm việc"
          defaultValue={
            cvMode === "EDIT"
              ? basicInfor.experienceTitle
              : "Kinh nghiệm làm việc"
          }
          {...register("experienceTitle")}
        />
        {cvExperiences.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            className="mb-1 py-1"
            key={`experience_${index}`}
            index={index}
            items={cvExperiences}
            setItems={setCvExperiences}
          >
            <Experience infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const ProjectPart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="project" className="mb-3">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Dự án"
          defaultValue={cvMode === "EDIT" ? basicInfor.projectTitle : "Dự án"}
          {...register("projectTitle")}
        />
        {cvProjects.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            className="mb-1 py-1"
            key={`project_${index}`}
            index={index}
            items={cvProjects}
            setItems={setCvProjects}
            menuVaule={[
              { name: "Liên kết", on: item.link },
              { name: "Công việc", on: item.role },
              { name: "Công nghệ", on: item.technologies },
            ]}
          >
            <Project infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const ActivityPart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="activity" className="mb-3">
        <FlexInput
          disabled={cvMode === "READ"}
          innerClassName={clsx("title", bgColor)}
          placeholder="Hoạt động"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.activityTitle : "Hoạt động"
          }
          {...register("activityTitle")}
        />
        {cvActivities.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            className="mb-1 py-1"
            key={`activity_${index}`}
            index={index}
            items={cvActivities}
            setItems={setCvActivities}
            menuVaule={[{ name: "Liên kết", on: item.link }]}
          >
            <Activity infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };

  const OtherPart = ({ bgColor }) => {
    return (
      <InforPart disabled={cvMode === "READ"} type="other" className="mb-3">
        {cvOthers.map((item, index) => (
          <ContentItem
            disabled={cvMode === "READ"}
            className="mb-1 py-1"
            key={`other_${index}`}
            index={index}
            items={cvOthers}
            setItems={setCvOthers}
          >
            <Other infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };

  const renderPart = (index) => {
    const bgColor = index >= 5 ? "cv-bg-main" : "bg-white";
    switch (parts[index]) {
      case "personal":
        return <PersonalPart bgColor={bgColor} />;
      case "objective":
        return basicInfor.objective ? (
          <ObjectivePart bgColor={bgColor} />
        ) : null;
      case "skill":
        return cvSkills.length > 0 ? <SkillPart bgColor={bgColor} /> : null;
      case "certificate":
        return cvCertificates.length > 0 ? (
          <CertificatePart bgColor={bgColor} />
        ) : null;
      case "prize":
        return cvPrizes.length > 0 ? <PrizePart bgColor={bgColor} /> : null;
      case "education":
        return cvEducations.length > 0 ? (
          <EducationPart bgColor={bgColor} />
        ) : null;
      case "experience":
        return cvExperiences.length > 0 ? (
          <ExperiencePart bgColor={bgColor} />
        ) : null;
      case "project":
        return cvProjects.length > 0 ? <ProjectPart bgColor={bgColor} /> : null;
      case "activity":
        return cvActivities.length > 0 ? (
          <ActivityPart bgColor={bgColor} />
        ) : null;
      case "other":
        return cvOthers.length > 0 ? <OtherPart bgColor={bgColor} /> : null;
      default:
        break;
    }
  };

  return (
    <div className="mx-auto " style={{ width: "800px" }}>
      <div id="resume" className="border d-flex shadow-sm">
        <div className="bg-white ps-1 pe-2" style={{ width: "510px" }}>
          <div className="mt-3 ms-3">
            <input
              id="cv-avatar-upload"
              type="file"
              className="d-none"
              onChange={(e) => handleDisplayImg(e)}
              disabled={cvMode === "READ"}
            />
            <div style={{ width: "180px", height: "186px" }}>
              <img
                id="cv-avatar"
                src={basicInfor.avatar || defaultAvt}
                alt="avatar"
                className={clsx("w-100 h-100", cvMode !== "READ" && "pointer")}
                style={{ objectFit: "cover" }}
                onClick={() =>
                  document.getElementById("cv-avatar-upload").click()
                }
              />
            </div>
            <FlexInput
              disabled={cvMode === "READ"}
              placeholder="HỌ TÊN"
              className="mt-2"
              innerClassName={clsx(
                "h4 cv-text-main text-uppercase",
                cvMode === "READ" && "bg-white"
              )}
              defaultValue={fullname}
              {...register("fullname")}
            />
          </div>
          <hr className="text-secondary" />
          {parts.map((_, index) => {
            return (
              index < 5 && <div key={`part_${index}`}>{renderPart(index)}</div>
            );
          })}
        </div>
        <div className="flex-fill px-1 cv-bg-main">
          <div className="ms-2">
            {parts.map((_, index) => {
              return (
                index >= 5 && (
                  <div key={`part_${index}`}>{renderPart(index)}</div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
