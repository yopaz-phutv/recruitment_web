import "./style.css";
import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import FlexInput from "../../../../../../components/FlexInput";
import { createContext, useContext, useEffect, useState } from "react";
import { CandidateContext } from "../../../layouts/CandidateLayout";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { ContentItem, InforPart } from "../../components";
import clsx from "clsx";
import resumeApi from "../../../../../../api/resume";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const TemplateContext = createContext();

export default function Template1() {
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
    cvMode,
    setCvMode,
  } = useContext(CandidateContext);

  const { id } = useParams(); //resume ID if exist
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [fullname, setFullname] = useState("");
  const [basicInfor, setBasicInfor] = useState({});
  const [cvEducations, setCvEducations] = useState([{}]);
  const [cvExperiences, setCvExperiences] = useState([{}]);
  const [cvProjects, setCvProjects] = useState([{}]);
  const [cvSkills, setCvSkills] = useState([{}]);
  const [cvCertificates, setCvCertificates] = useState([{}]);
  const [cvPrizes, setCvPrizes] = useState([{}]);
  const [cvActivities, setCvActivities] = useState([{}]);
  const [cvOthers, setCvOthers] = useState([{}]);
  //default order of parts
  const [parts, setParts] = useState([
    "personal",
    "objective",
    "skill",
    "certificate",
    "prize",
    "other",
    "education",
    "experience",
    "project",
    "activity",
  ]);
  const [partMenu, setPartMenu] = useState([
    { key: "personal", name: "Thông tin cá nhân", on: true },
    { key: "objective", name: "Mục tiêu nghề nghiệp", on: true },
    { key: "education", name: "Học vấn", on: true },
    { key: "experience", name: "Kinh nghiệm", on: true },
    { key: "project", name: "Dự án", on: true },
    { key: "skill", name: "Kỹ năng", on: true },
    { key: "certificate", name: "Chứng chỉ", on: true },
    { key: "prize", name: "Giải thưởng", on: true },
    { key: "activity", name: "Hoạt động", on: true },
    { key: "other", name: "Khác", on: true },
  ]);

  const getEditResume = async () => {
    let partsTemp = ["personal", "objective"];
    const res = await resumeApi.getById(id);
    console.log("current resume::", res);

    setBasicInfor(res.basicInfor);
    if (res.skills.length > 0) {
      setCvSkills(res.skills);
      partsTemp.push("skill");
    }
    if (res.certificates.length > 0) {
      setCvCertificates(res.certificates);
      partsTemp.push("certificate");
    }
    if (res.prizes.length > 0) {
      setCvPrizes(res.prizes);
      partsTemp.push("prize");
    }
    if (res.others.length > 0) {
      setCvOthers(res.others);
      partsTemp.push("other");
    }
    if (res.educations.length > 0) {
      setCvEducations(res.educations);
      partsTemp.push("education");
    }
    if (res.experiences.length > 0) {
      setCvExperiences(res.experiences);
      partsTemp.push("experience");
    }
    if (res.projects.length > 0) {
      setCvProjects(res.projects);
      partsTemp.push("project");
    }
    if (res.activities.length > 0) {
      setCvActivities(res.activities);
      partsTemp.push("activity");
    }
    setParts(partsTemp);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInfor]);

  useEffect(() => {
    if (id) {
      setCvMode("EDIT");
      getEditResume();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (basicInfor.lastname && basicInfor.firstname)
      setFullname(basicInfor.lastname + " " + basicInfor.firstname);
  }, [basicInfor]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      setBasicInfor(personal);
    }
  }, [cvMode, personal]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (educations.length > 0) setCvEducations(educations);
    }
  }, [cvMode, educations]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (experiences.length > 0) setCvExperiences(experiences);
    }
  }, [cvMode, experiences]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (projects.length > 0) setCvProjects(projects);
    }
  }, [cvMode, projects]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (skills.length > 0) setCvSkills(skills);
    }
  }, [cvMode, skills]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (certificates.length > 0) setCvCertificates(certificates);
    }
  }, [certificates, cvMode]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (prizes.length > 0) setCvPrizes(prizes);
    }
  }, [cvMode, prizes]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (activities.length > 0) setCvActivities(activities);
    }
  }, [activities, cvMode]);
  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (others.length > 0) setCvOthers(others);
    }
  }, [cvMode, others]);

  const formatDate = (str) => {
    const arr = str.split("/");
    const len = arr.length;
    if (arr[0].length !== 4) {
      if (len === 2) {
        //only include month and year
        let temp = arr[0];
        arr[0] = arr[1];
        arr[1] = temp;
      } else if (len === 3) {
        // inlude day, month, year
        let temp = arr[0];
        arr[0] = arr[2];
        arr[2] = temp;
      }
    }
    return arr.join("-");
  };
  const formatDateInPart = (part) => {
    part.forEach((item, index, self) => {
      if (item.start_date) self[index].start_date = formatDate(item.start_date);
      if (item.end_date) self[index].end_date = formatDate(item.end_date);
    });
  };
  // const isEmptyObj = (object) => {
  //   return Object.keys(object).length === 0;
  // };
  // const formatPart = (part) => {
  //   part.forEach((item, index, self) => {
  //     if (isEmptyObj(item)) self.splice(index, 1);
  //   });
  // };
  const isPresentInParts = (partName) => {
    return parts.findIndex((item) => item === partName) > -1 ? true : false;
  };
  const onSubmit = async (data) => {
    console.log({ data });
    var dob = "";
    if (data.dob) {
      const [dobDay, dobMonth, dobYear] = data.dob.split("/");
      dob = dobYear + "-" + dobMonth + "-" + dobDay;
    }

    let educations = [...cvEducations];
    let experiences = [...cvExperiences];
    let projects = [...cvProjects];
    let skills = [...cvSkills];
    let certificates = [...cvCertificates];
    let prizes = [...cvPrizes];
    let activities = [...cvActivities];
    let others = [...cvOthers];

    //format date
    formatDateInPart(educations);
    formatDateInPart(experiences);
    formatDateInPart(projects);
    formatDateInPart(activities);
    certificates.forEach((item, index, self) => {
      if (item.receive_date)
        self[index].receive_date = formatDate(item.receive_date);
    });
    prizes.forEach((item, index, self) => {
      if (item.receive_date)
        self[index].receive_date = formatDate(item.receive_date);
    });
    //end: format date
    console.log("skills:", cvSkills);
    console.log("certificates:", certificates);
    console.log("prizes:", prizes);
    console.log("educations:", educations);
    console.log("experiences:", experiences);
    console.log("projects:", projects);
    console.log("activities:", activities);
    console.log("others:", cvOthers);
    try {
      const ret = await resumeApi.create({
        basicInfor: { ...data, dob },
        educations: isPresentInParts("education") ? educations : null,
        experiences: isPresentInParts("experience") ? experiences : null,
        projects: isPresentInParts("project") ? projects : null,
        skills: isPresentInParts("skill") ? skills : null,
        certificates: isPresentInParts("certificate") ? certificates : null,
        prizes: isPresentInParts("prize") ? prizes : null,
        activities: isPresentInParts("activity") ? activities : null,
        others: isPresentInParts("other") ? others : null,
      });
      console.log("result:", ret);
      toast.success("Tạo mới thành công!");
    } catch (e) {
      toast.error("Đã có lỗi xảy ra!");
      console.error(">>Error:", e.response.data.message);
    }
  };

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
          innerClassName={clsx("fw-550", bgColor)}
          placeholder="Tên kỹ năng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
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
          className="w-20"
          innerClassName={clsx("fw-550 ts-sm", bgColor)}
          placeholder="Tgian nhận"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format("MM/YYYY")
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
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
          className="w-20"
          innerClassName={clsx("fw-550 ts-sm", bgColor)}
          placeholder="Tgian nhận"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format("MM/YYYY")
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
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
      <div className="content border-3 border-start border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Trường/Trung tâm"
            defaultValue={infor?.school}
            setCurrent={setSchool}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              "fst-italic text-secondary text-end ts-sm",
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
            className="w-15"
            innerClassName={clsx("fst-italic text-secondary ts-sm", bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format("YYYY") : null
            }
            setCurrent={setEndDate}
          />
        </div>
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Chuyên ngành"
            defaultValue={infor?.major}
            setCurrent={setMajor}
          />
        )}
        {menu[1].on && (
          <FlexInput
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
      <div className="content border-3 border-start border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Vị trí việc làm"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              "fst-italic text-secondary text-end ts-sm",
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
            className="w-15"
            innerClassName={clsx("fst-italic text-secondary ts-sm", bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format("MM/YYYY") : null
            }
            setCurrent={setEndDate}
          />
        </div>

        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Công ty/Doanh nghiệp"
          defaultValue={infor?.company}
          setCurrent={setCompany}
        />

        <FlexInput
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
      <div className="content border-3 border-start border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              "fst-italic text-secondary text-end ts-sm",
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
            className="w-15"
            innerClassName={clsx("fst-italic text-secondary ts-sm", bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format("MM/YYYY") : null
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          innerClassName={clsx("text-capitalize text-secondary ts-sm", bgColor)}
          placeholder="Loại dự án (Cá nhân/Nhóm)"
          defaultValue={infor?.prj_type}
          setCurrent={setType}
        />
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx("text-decoration-underline", bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        {menu[1].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Công việc/Vai trò"
            defaultValue={infor?.role}
            setCurrent={setRole}
          />
        )}
        {menu[2].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Công nghệ sử dụng"
            defaultValue={infor?.technologies}
            setCurrent={setTechnologies}
          />
        )}
        <FlexInput
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
      <div className="content border-3 border-start border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx("fw-550", bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.organization}
            setCurrent={setOrganization}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              "fst-italic text-secondary text-end ts-sm",
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
            className="w-15"
            innerClassName={clsx("fst-italic text-secondary ts-sm", bgColor)}
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
          innerClassName={clsx("text-secondary ts-sm", bgColor)}
          placeholder="Vị trí/Vai trò"
          defaultValue={infor?.role}
          setCurrent={setRole}
        />
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx("text-decoration-underline", bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        <FlexInput
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
          innerClassName={clsx("title", bgColor)}
          placeholder="Khác"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const PersonalPart = ({ bgColor }) => {
    return (
      <InforPart type="personal">
        <FlexInput
          innerClassName={clsx("title", bgColor)}
          placeholder="Thông tin cá nhân"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.personalTitle : "Thông tin cá nhân"
          }
          {...register("personalTitle")}
        />
        <div className="ms-2">
          <FlexInput
            innerClassName={clsx("content", bgColor)}
            iconLeft={<IoCalendarClear className="mb-1" />}
            placeholder="Ngày/tháng/năm sinh"
            defaultValue={
              cvMode !== "CREATE_0"
                ? dayjs(basicInfor.dob).format("DD/MM/YYYY")
                : null
            }
            {...register("dob")}
          />
          <FlexInput
            innerClassName={clsx("content", bgColor)}
            iconLeft={<FaPhoneAlt className="mb-1" />}
            placeholder="Số điện thoại"
            defaultValue={cvMode !== "CREATE_0" ? basicInfor.phone : null}
            {...register("phone")}
          />
          <FlexInput
            innerClassName={clsx("content", bgColor)}
            iconLeft={<IoMdMail className="mb-1" />}
            placeholder="Email"
            defaultValue={cvMode !== "CREATE_0" ? basicInfor.email : null}
            {...register("email")}
          />
          <FlexInput
            innerClassName={clsx("content", bgColor)}
            iconLeft={<IoIosLink className="mb-1" />}
            placeholder="Liên kết"
            defaultValue={cvMode !== "CREATE_0" ? basicInfor.link : null}
            {...register("link")}
          />
          <FlexInput
            innerClassName={clsx("content", bgColor)}
            iconLeft={<MdLocationOn className="mb-1" />}
            placeholder="Địa chỉ"
            defaultValue={cvMode !== "CREATE_0" ? basicInfor.address : null}
            {...register("address")}
          />
        </div>
        <hr className="text-main" />
      </InforPart>
    );
  };
  const ObjectivePart = ({ bgColor }) => {
    return (
      <InforPart type="objective">
        <FlexInput
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
          innerClassName={clsx("content", bgColor)}
          placeholder="Nội dung"
          defaultValue={cvMode !== "CREATE_0" ? basicInfor?.objective : null}
          {...register("objective")}
        />
        <hr className="text-main" />
      </InforPart>
    );
  };
  const SkillPart = ({ bgColor }) => {
    return (
      <InforPart type="skill">
        <FlexInput
          innerClassName={clsx("title", bgColor)}
          placeholder="Các kỹ năng"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.skillTitle : "Các kỹ năng"
          }
          {...register("skillTitle")}
        />
        {cvSkills.map((item, index) => (
          <ContentItem
            key={`skill_${index}`}
            index={index}
            items={cvSkills}
            setItems={setCvSkills}
          >
            <Skill infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const CertificatePart = ({ bgColor }) => {
    return (
      <InforPart type="certificate">
        <FlexInput
          innerClassName={clsx("title", bgColor)}
          placeholder="Chứng chỉ"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.certificateTitle : "Chứng chỉ"
          }
          {...register("certificateTitle")}
        />
        {cvCertificates.map((item, index) => (
          <ContentItem
            key={`certificate_${index}`}
            index={index}
            items={cvCertificates}
            setItems={setCvCertificates}
          >
            <Certificate infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const PrizePart = ({ bgColor }) => {
    return (
      <InforPart type="prize">
        <FlexInput
          innerClassName={clsx("title", bgColor)}
          placeholder="Giải thưởng"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.prizeTitle : "Giải thưởng"
          }
          {...register("prizeTitle")}
        />
        {cvPrizes.map((item, index) => (
          <ContentItem
            key={`prize_${index}`}
            index={index}
            items={cvPrizes}
            setItems={setCvPrizes}
          >
            <Prize infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const EducationPart = ({ bgColor }) => {
    return (
      <InforPart type="education">
        <FlexInput
          innerClassName={clsx("title", bgColor)}
          placeholder="Học vấn"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.educationTitle : "Học vấn"
          }
          {...register("educationTitle")}
        />
        {cvEducations.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`education_${index}`}
            index={index}
            items={cvEducations}
            setItems={setCvEducations}
            menuVaule={[
              { name: "Chuyên ngành", on: true },
              { name: "Mô tả", on: true },
            ]}
          >
            <Education infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const ExperiencePart = ({ bgColor }) => {
    return (
      <InforPart type="experience">
        <FlexInput
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
            className="mb-1 py-1"
            key={`experience_${index}`}
            index={index}
            items={cvExperiences}
            setItems={setCvExperiences}
          >
            <Experience infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const ProjectPart = ({ bgColor }) => {
    return (
      <InforPart type="project">
        <FlexInput
          innerClassName={clsx("title", bgColor)}
          placeholder="Dự án"
          defaultValue={cvMode === "EDIT" ? basicInfor.projectTitle : "Dự án"}
          {...register("projectTitle")}
        />
        {cvProjects.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`project_${index}`}
            index={index}
            items={cvProjects}
            setItems={setCvProjects}
            menuVaule={[
              { name: "Liên kết", on: true },
              { name: "Công việc", on: true },
              { name: "Công nghệ", on: true },
            ]}
          >
            <Project infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };
  const ActivityPart = ({ bgColor }) => {
    return (
      <InforPart type="activity">
        <FlexInput
          innerClassName={clsx("title", bgColor)}
          placeholder="Hoạt động"
          defaultValue={
            cvMode === "EDIT" ? basicInfor.activityTitle : "Hoạt động"
          }
          {...register("activityTitle")}
        />
        {cvActivities.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`activity_${index}`}
            index={index}
            items={cvActivities}
            setItems={setCvActivities}
            menuVaule={[{ name: "Liên kết", on: true }]}
          >
            <Activity infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };

  const OtherPart = ({ bgColor }) => {
    return (
      <InforPart type="other">
        {cvOthers.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`other_${index}`}
            index={index}
            items={cvOthers}
            setItems={setCvOthers}
          >
            <Other infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="text-main" />
      </InforPart>
    );
  };

  const renderPart = (index) => {
    const bgColor = index <= 5 ? "bg-main" : "";
    switch (parts[index]) {
      case "personal":
        return <PersonalPart bgColor={bgColor} />;
      case "objective":
        return <ObjectivePart bgColor={bgColor} />;
      case "skill":
        return <SkillPart bgColor={bgColor} />;
      case "certificate":
        return <CertificatePart bgColor={bgColor} />;
      case "prize":
        return <PrizePart bgColor={bgColor} />;
      case "education":
        return <EducationPart bgColor={bgColor} />;
      case "experience":
        return <ExperiencePart bgColor={bgColor} />;
      case "project":
        return <ProjectPart bgColor={bgColor} />;
      case "activity":
        return <ActivityPart bgColor={bgColor} />;
      case "other":
        return <OtherPart bgColor={bgColor} />;
      default:
        break;
    }
  };

  return (
    <TemplateContext.Provider
      value={{ parts, setParts, partMenu, setPartMenu }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="clearfix py-3 shadow-sm">
          <Form.Group className="float-start ms-3 w-20">
            <Form.Control
              type="text"
              aria-label="resume_title"
              placeholder="Tiêu đề hồ sơ"
              defaultValue={cvMode === "EDIT" ? basicInfor.title : null}
              className="border-primary"
              {...register("title", {
                required: "Vui lòng điền tiêu đề hồ sơ",
              })}
              isInvalid={errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="outline-primary"
            className="float-end me-5 px-5 py-1"
          >
            <span className="fw-600">Lưu</span>
          </Button>
        </div>
        <div
          className="resume mx-auto border mt-4 mb-5 d-flex py-2 shadow"
          style={{ width: "800px" }}
        >
          <div className="bg-main ms-2 ps-1 pe-2" style={{ width: "340px" }}>
            <div className="mt-2 d-flex flex-column align-items-center">
              <img
                src={basicInfor?.avatar}
                alt="avatar"
                width="172px"
                height="172px"
                className="rounded-pill"
              />
              <FlexInput
                placeholder="HỌ TÊN"
                className="mt-2"
                innerClassName="bg-main h4 text-main text-center text-uppercase"
                defaultValue={fullname ? fullname : null}
                {...register("fullname")}
              />
            </div>
            <hr className="text-main" />
            {parts.map((_, index) => {
              return (
                index <= 5 && (
                  <div key={`part_${index}`}>{renderPart(index)}</div>
                )
              );
            })}
          </div>
          <div className="flex-fill px-1">
            <div className="ms-2">
              {parts.map((_, index) => {
                return (
                  index > 5 && (
                    <div key={`part_${index}`}>{renderPart(index)}</div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </TemplateContext.Provider>
  );
}
