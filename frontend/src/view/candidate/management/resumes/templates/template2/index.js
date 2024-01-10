import "./style.css";
import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import FlexInput from "../../../../../../components/FlexInput";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../layouts/CandidateLayout";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { ContentItem, InforPart } from "../../components";

export default function Template2() {
  const {
    personal,
    educations,
    experiences,
    projects,
    skills,
    certificates,
    prizes,
    activities,
    others,
  } = useContext(ProfileContext);
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    setFullname(personal.lastname + " " + personal.firstname);
  }, [personal]);

  const { register, handleSubmit } = useForm();

  const [cvEducations, setCvEducations] = useState([]);
  const [cvExperiences, setCvExperiences] = useState([]);
  const [cvProjects, setCvProjects] = useState([]);
  const [cvSkills, setCvSkills] = useState([]);
  const [cvCertificates, setCvCertificates] = useState([]);
  const [cvPrizes, setCvPrizes] = useState([]);
  const [cvActivities, setCvActivities] = useState([]);
  const [cvOthers, setCvOthers] = useState([]);
  // const [curPartKey, setCurPartKey] = useState("");
  // const [curPartInstruction, setCurPartInstruction] = useState("");

  const onSubmit = (data) => {
    console.log({ data });
  };
  const submit = () => {
    console.log("skills:", cvSkills);
    console.log("certificates:", cvCertificates);
    console.log("prizes:", cvPrizes);
    console.log("educations:", cvEducations);
  };

  const Skill = ({ infor, index }) => {
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
          innerClassName="bg-main fw-550"
          placeholder="Tên kỹ năng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          innerClassName="bg-main"
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Certificate = ({ infor, index }) => {
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
          className="w-20"
          innerClassName="bg-main fw-550 ts-sm"
          placeholder="Tgian nhận"
          defaultValue={dayjs(infor.receive_date).format("MM/YYYY")}
          setCurrent={setReceiveDate}
        />
        <FlexInput
          className="flex-fill"
          innerClassName="bg-main"
          placeholder="Tên chứng chỉ"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Prize = ({ infor, index }) => {
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
          className="w-20"
          innerClassName="bg-main fw-550 ts-sm"
          placeholder="Tgian nhận"
          defaultValue={dayjs(infor.receive_date).format("MM/YYYY")}
          setCurrent={setReceiveDate}
        />
        <FlexInput
          className="flex-fill"
          innerClassName="bg-main"
          placeholder="Tên giải thưởng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Education = ({ infor, index, menu }) => {
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
      <div className="content border-3 border-start border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName="fw-550"
            placeholder="Trường/Trung tâm"
            defaultValue={infor?.school}
            setCurrent={setSchool}
          />
          <FlexInput
            className="w-15"
            innerClassName="fst-italic text-secondary text-end"
            placeholder="Bắt đầu"
            defaultValue={dayjs(infor.start_date).format("YYYY")}
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName="fst-italic text-secondary"
            placeholder="Kết thúc"
            defaultValue={dayjs(infor.end_date).format("YYYY")}
            setCurrent={setEndDate}
          />
        </div>
        {menu[0].on && (
          <FlexInput
            innerClassName=""
            placeholder="Chuyên ngành"
            defaultValue={infor?.major}
            setCurrent={setMajor}
          />
        )}
        {menu[1].on && (
          <FlexInput
            innerClassName=""
            placeholder="Mô tả"
            defaultValue={infor?.description}
            setCurrent={setDescription}
          />
        )}
      </div>
    );
  };
  const PersonalPart = () => {
    return (
      <InforPart inforType="personal" handleChangePos={handleChangePos}>
        <FlexInput
          innerClassName="bg-main title"
          placeholder="Thông tin cá nhân"
          defaultValue="Thông tin cá nhân"
          {...register("personalTitle")}
        />
        <div className="ms-2">
          <FlexInput
            innerClassName="bg-main content"
            iconLeft={<IoCalendarClear className="mb-1" />}
            placeholder="Ngày tháng năm sinh"
            defaultValue={dayjs(personal.dob).format("DD-MM-YYYY")}
            {...register("dob")}
          />
          <FlexInput
            innerClassName="bg-main content"
            iconLeft={<FaPhoneAlt className="mb-1" />}
            placeholder="Số điện thoại"
            defaultValue={personal.phone}
            {...register("phone")}
          />
          <FlexInput
            innerClassName="bg-main content"
            iconLeft={<IoMdMail className="mb-1" />}
            placeholder="Email"
            defaultValue={personal.email}
            {...register("email")}
          />
          <FlexInput
            innerClassName="bg-main content"
            iconLeft={<IoIosLink className="mb-1" />}
            placeholder="Liên kết"
            defaultValue={personal.link}
            {...register("link")}
          />
          <FlexInput
            innerClassName="bg-main content"
            iconLeft={<MdLocationOn className="mb-1" />}
            placeholder="Địa chỉ"
            defaultValue={personal.address}
            {...register("address")}
          />
        </div>
        <hr className="text-main" />
      </InforPart>
    );
  };
  const SkillPart = () => {
    return (
      <InforPart inforType="skill" handleChangePos={handleChangePos}>
        <FlexInput
          innerClassName="bg-main title"
          placeholder="Các kỹ năng"
          defaultValue="Các kỹ năng"
          {...register("skillTitle")}
        />
        {cvSkills.map((item, index) => (
          <ContentItem
            key={`skill_${index}`}
            index={index}
            items={cvSkills}
            setItems={setCvSkills}
          >
            <Skill infor={item} index={index} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const CertificatePart = () => {
    return (
      <InforPart inforType="certificate" handleChangePos={handleChangePos}>
        <FlexInput
          innerClassName="bg-main title"
          placeholder="Chứng chỉ"
          defaultValue="Chứng chỉ"
          {...register("certificateTitle")}
        />
        {cvCertificates.map((item, index) => (
          <ContentItem
            key={`certificate_${index}`}
            index={index}
            items={cvCertificates}
            setItems={setCvCertificates}
          >
            <Certificate infor={item} index={index} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const PrizePart = () => {
    return (
      <InforPart inforType="prize" handleChangePos={handleChangePos}>
        <FlexInput
          innerClassName="bg-main title"
          placeholder="Giải thưởng"
          defaultValue="Giải thưởng"
          {...register("prizeTitle")}
        />
        {cvPrizes.map((item, index) => (
          <ContentItem
            key={`prize_${index}`}
            index={index}
            items={cvPrizes}
            setItems={setCvPrizes}
          >
            <Prize infor={item} index={index} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const EducationPart = () => {
    return (
      <InforPart inforType="education" handleChangePos={handleChangePos}>
        <FlexInput
          innerClassName="title"
          placeholder="Học vấn"
          defaultValue="Học vấn"
          {...register("educationTitle")}
        />
        {cvEducations.map((item, index) => (
          <ContentItem
            className="mb-2"
            key={`education_${index}`}
            index={index}
            items={cvEducations}
            setItems={setCvEducations}
            menuVaule={[
              { name: "Chuyên ngành", on: true },
              { name: "Mô tả", on: true },
            ]}
          >
            <Education infor={item} index={index} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };

  const [parts, setParts] = useState([
    "personal",
    "skill",
    "certificate",
    "prize",
    "education",
  ]);

  const renderPart = (index) => {
    switch (parts[index]) {
      case "personal":
        return <PersonalPart />;
      case "skill":
        return <SkillPart />;
      case "certificate":
        return <CertificatePart />;
      case "prize":
        return <PrizePart />;
      case "education":
        return <EducationPart />;
      default:
        break;
    }
  };
  const handleChangePos = (inforType, instruction) => {
    let temp = [...parts];
    let curInd = parts.findIndex((item) => item === inforType);
    let curPart = parts[curInd];
    if (instruction === "UP" && curInd > 0) {
      temp[curInd] = temp[curInd - 1];
      temp[curInd - 1] = curPart;
    } else if (instruction === "DOWN" && curInd < parts.length - 1) {
      temp[curInd] = temp[curInd + 1];
      temp[curInd + 1] = curPart;
    }
    setParts(temp);
  };

  useEffect(() => {
    if (educations.length > 0) setCvEducations(educations);
  }, [educations]);
  useEffect(() => {
    if (experiences.length > 0) setCvExperiences(experiences);
  }, [experiences]);
  useEffect(() => {
    if (projects.length > 0) setCvProjects(projects);
  }, [projects]);
  useEffect(() => {
    if (skills.length > 0) setCvSkills(skills);
  }, [skills]);
  useEffect(() => {
    if (certificates.length > 0) setCvCertificates(certificates);
  }, [certificates]);
  useEffect(() => {
    if (prizes.length > 0) setCvPrizes(prizes);
  }, [prizes]);
  useEffect(() => {
    if (activities.length > 0) setCvActivities(activities);
  }, [activities]);
  useEffect(() => {
    if (others.length > 0) setCvOthers(others);
  }, [others]);

  return (
    <>
      <form
        className="mx-auto border my-5 d-flex py-2 shadow"
        style={{ width: "800px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-main ms-2 ps-1 pe-2 pb-2" style={{ width: "340px" }}>
          <div className="mt-2 d-flex flex-column align-items-center">
            <img
              src="https://static.topcv.vn/avatars/oovNh1I1zrAJGotXsNea_63ecb2f362c9c_cvtpl.jpg"
              alt=""
              width="172px"
              height="172px"
              className="rounded-pill"
            />
            <FlexInput
              placeholder="HỌ TÊN"
              className="mt-2"
              innerClassName="bg-main h4 text-main text-center text-uppercase"
              defaultValue={fullname}
              {...register("fullname")}
            />
          </div>
          <hr className="text-main" />
          {parts.map((_, index) => {
            return (
              index <= 3 && <div key={`part_${index}`}>{renderPart(index)}</div>
            );
          })}
        </div>
        <div className="flex-fill px-1">
          <div className="ms-2">
            {parts.map((_, index) => {
              return (
                index > 3 && (
                  <div key={`part_${index}`}>{renderPart(index)}</div>
                )
              );
            })}
          </div>
        </div>
      </form>
      <button type="button" onClick={submit}>
        submit
      </button>
    </>
  );
}
