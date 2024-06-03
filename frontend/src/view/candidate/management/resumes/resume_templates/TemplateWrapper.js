import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import sample from "./sample";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CandidateContext } from "../../layouts/CandidateLayout";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import resumeApi from "../../../../../api/resume";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import templateList from "./templateList";
import { srcToFile } from "../../../../../common/functions";
// import { jsPDF } from "jspdf";
// import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import {
  cvContentSize,
  cvFontFamily,
  cvTitleSize,
} from "../../../../../common/constant";

export const TemplateContext = createContext();

export default function TemplateWrapper({
  templateId = 1,
  mode,
  useSampleData = false,
}) {
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

  const location = useLocation();
  if (location.state?.templateId) templateId = location.state.templateId;
  const curTemplate = templateList.find((item) => item.id === templateId);

  const [style, setStyle] = useState(structuredClone(curTemplate.defaultStyle));

  useEffect(() => {
    if (mode) setCvMode(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { id } = useParams(); //resume ID if exist
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    // getFieldState,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      title_size: style.title.fontSize,
      content_size: style.content.fontSize,
    },
  });

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
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
  const defaultPartMenu = [
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
  ];
  const [partMenu, setPartMenu] = useState(defaultPartMenu);

  const getEditResume = async () => {
    let res = await resumeApi.getById(id);
    const avatar = await resumeApi.getAvatar(id);
    if (Object.keys(avatar).length !== 0) {
      res.basicInfor = { ...res.basicInfor, avatar };
    }
    const partsOrder = JSON.parse(res.parts_order);
    const templateStyle = JSON.parse(res.style);

    setParts(partsOrder);
    if (templateStyle) setStyle(templateStyle);
    setBasicInfor(res.basicInfor);
    templateId = res.basicInfor.template_id;

    if (res.skills.length > 0) {
      setCvSkills(res.skills);
    }
    if (res.certificates.length > 0) {
      setCvCertificates(res.certificates);
    }
    if (res.prizes.length > 0) {
      setCvPrizes(res.prizes);
    }
    if (res.others.length > 0) {
      setCvOthers(res.others);
    }
    if (res.educations.length > 0) {
      setCvEducations(res.educations);
    }
    if (res.experiences.length > 0) {
      setCvExperiences(res.experiences);
    }
    if (res.projects.length > 0) {
      setCvProjects(res.projects);
    }
    if (res.activities.length > 0) {
      setCvActivities(res.activities);
    }
    //update part menu:
    let tempMenu = [...defaultPartMenu];
    tempMenu.forEach((item, index, self) => {
      if (!partsOrder.includes(item.key)) {
        self[index].on = false;
      }
    });
    setPartMenu(tempMenu);
  };

  useEffect(() => {
    reset(); //reset form to get defaultValue correctly
  }, [basicInfor, reset]);

  useEffect(() => {
    if (useSampleData) {
      setFullname(sample.basicInfor.fullname);
      setBasicInfor(sample.basicInfor);
      setCvEducations(sample.educations);
      setCvExperiences(sample.experiences);
      setCvProjects(sample.projects);
      setCvSkills(sample.skills);
      setCvCertificates(sample.certificates);
      setCvPrizes(sample.prizes);
      setCvActivities(sample.activities);
      setCvOthers(sample.others);
    } else if (id) {
      setCvMode("EDIT");
      getEditResume();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cvMode === "CREATE_1") {
      if (basicInfor.lastname && basicInfor.firstname)
        setFullname(basicInfor.lastname + " " + basicInfor.firstname);
    } else if (cvMode === "EDIT") {
      setFullname(basicInfor.fullname);
    }
  }, [basicInfor, cvMode]);
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
    const arr = str.split(/[/, -]/);
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

    return dayjs(arr.join("-")).format("YYYY-MM-DD");
  };

  const formatDateInPart = (part) => {
    part.forEach((item, index, self) => {
      if (item.start_date) self[index].start_date = formatDate(item.start_date);
      if (item.end_date) self[index].end_date = formatDate(item.end_date);
      if (item.receive_date)
        self[index].receive_date = formatDate(item.receive_date);
    });
  };
  const isPresentInParts = (partName) => {
    return parts.findIndex((item) => item === partName) > -1 ? true : false;
  };
  const onSubmit = async (data) => {
    setIsSaveLoading(true);
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
    formatDateInPart(certificates);
    formatDateInPart(prizes);
    //end: format date

    const image = await getImgData();
    const resumeFile = await srcToFile(image, "resumeImage.png", "image/png");

    var skillText = "";
    skills.forEach((item) => {
      skillText += item.name + " " + item.description + "";
    });

    delete data["bg_main_color"];
    delete data["title_color"];
    delete data["title_size"];
    delete data["content_size"];
    delete data["font_family"];

    let postData = {
      basicInfor: {
        ...data,
        dob,
        template_id: templateId,
        parts_order: JSON.stringify(parts),
        avatar: !avatarFile && cvMode === "CREATE_1" ? personal.avatar : null,
        skill_text: skillText,
        style: JSON.stringify(style),
      },
      educations: isPresentInParts("education") ? educations : null,
      experiences: isPresentInParts("experience") ? experiences : null,
      projects: isPresentInParts("project") ? projects : null,
      skills: isPresentInParts("skill") ? skills : null,
      certificates: isPresentInParts("certificate") ? certificates : null,
      prizes: isPresentInParts("prize") ? prizes : null,
      activities: isPresentInParts("activity") ? activities : null,
      others: isPresentInParts("other") ? others : null,
    };

    const formData = new FormData();
    if (cvMode === "EDIT") postData = { ...postData, resume_id: id };
    if (avatarFile) formData.append("avatar", avatarFile);
    formData.append("resume_file", resumeFile);
    formData.append("otherData", JSON.stringify(postData));

    if (cvMode.startsWith("CREATE")) {
      try {
        await resumeApi.create(formData);
        setIsSaveLoading(false);
        toast.success("Tạo mới thành công!");
        nav("/candidate/resumes");
      } catch (e) {
        setIsSaveLoading(false);
        toast.error("Đã có lỗi xảy ra!");
        console.error(">>Error:", e.response.data.message);
      }
    } else if (cvMode === "EDIT") {
      try {
        await resumeApi.update(formData);
        setIsSaveLoading(false);
        toast.success("Cập nhật thành công!");
        nav("/candidate/resumes");
      } catch (e) {
        setIsSaveLoading(false);
        toast.error("Đã có lỗi xảy ra!");
        console.error(">>Error:", e.response.data.message);
      }
    }
  };
  const handleDisplayImg = (e) => {
    setAvatarFile(e.target.files[0]);
    var reader = new FileReader();
    reader.onload = () => {
      var output = document.getElementById("cv-avatar");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const getImgData = async () => {
    let cvElement = document.querySelector("#resume");
    const canvas = await html2canvas(cvElement);
    const imgData = canvas.toDataURL("image/png");

    return imgData;
  };

  const handleDownload = async () => {
    let filename = watch("title") + ".png";
    let link = document.createElement("a");

    const imgData = await getImgData();
    link.href = imgData;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // const pdf = new jsPDF();
    // pdf.addImage(imgData, "PNG", 0, 0);
    // pdf.save(filename);
  };

  const changeElementsStyle = () => {
    var elements;
    for (let className in style) {
      if (className === "fontFamily") {
        document.getElementById("resume").style.fontFamily = style.fontFamily;
      } else {
        elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
          var attributeObj = style[className];
          for (let att in attributeObj) {
            elements[i].style[att] = attributeObj[att];
          }
        }
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeElementsStyle();
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style]);

  useEffect(() => {
    if (cvMode === "READ") {
      setStyle(curTemplate.defaultStyle);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvMode]);

  useEffect(() => {
    if (isDirty) {
      let temp = { ...style };
      const color = watch("title_color");
      temp.title.color = color;
      temp["cv-fullname"].color = color;
      if (style["personal-icon"]) temp["personal-icon"].color = color;
      if (style["cv-line"]) temp["cv-line"].borderColor = color;
      setStyle(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("title_color")]);

  useEffect(() => {
    if (isDirty) {
      let temp = { ...style };
      temp["cv-bg-main"].backgroundColor = watch("bg_main_color");
      setStyle(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("bg_main_color")]);

  useEffect(() => {
    if (isDirty) {
      let temp = { ...style };
      temp.title.fontSize = watch("title_size");
      setStyle(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("title_size")]);

  useEffect(() => {
    if (isDirty) {
      let temp = { ...style };
      temp.content.fontSize = watch("content_size");
      setStyle(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("content_size")]);

  useEffect(() => {
    if (isDirty) {
      let temp = { ...style };
      temp.fontFamily =
        watch("font_family") === "Mặc định" ? "" : watch("font_family");
      setStyle(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("font_family")]);

  return (
    <TemplateContext.Provider
      value={{
        parts,
        setParts,
        partMenu,
        setPartMenu,
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
        errors,
        handleDisplayImg,
      }}
    >
      {mode !== "READ" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="ms-3 ps-3 py-2 border-top shadow-sm bg-white">
            <div className="clearfix mt-1">
              <Form.Group className="float-start w-20">
                <Form.Control
                  type="text"
                  aria-label="resume_title"
                  size="sm"
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
                variant="outline-primary"
                size="sm"
                className="float-end me-5 px-5 py-1"
                onClick={handleDownload}
              >
                <span className="fw-600">Tải xuống CV</span>
              </Button>
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                className="float-end me-3 px-5 py-1"
                disabled={isSaveLoading}
              >
                {isSaveLoading && <Spinner size="sm" className="me-1" />}
                <span className="fw-600">
                  {!isSaveLoading ? "Lưu" : "Đang xử lý"}
                </span>
              </Button>
            </div>
            <div className="mt-2 ts-sm d-flex flex-wrap gap-3">
              <div className="d-flex align-items-center">
                <Form.Control
                  type="color"
                  className="border-0"
                  defaultValue={style["cv-bg-main"].backgroundColor}
                  {...register("bg_main_color")}
                />
                <span>Màu nền chủ đề</span>
              </div>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="color"
                  className="border-0"
                  defaultValue={style.title.color}
                  {...register("title_color")}
                />
                <span>Màu chữ chủ đề</span>
              </div>
              <div className="d-flex gap-1 align-items-center">
                <Form.Select
                  size="sm"
                  style={{ width: "62px" }}
                  {...register("title_size")}
                >
                  {cvTitleSize.map((item, index) => (
                    <option key={index} value={`${item}px`}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
                <span>Size chữ tiêu đề</span>
              </div>
              <div className="d-flex gap-1 align-items-center">
                <Form.Select
                  size="sm"
                  style={{ width: "62px" }}
                  {...register("content_size")}
                >
                  {cvContentSize.map((item, index) => (
                    <option key={index} value={`${item}px`}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
                <span>Size chữ nội dung</span>
              </div>
              <div className="d-flex gap-1 align-items-center">
                <Form.Select size="sm" {...register("font_family")}>
                  {cvFontFamily.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
                <span style={{ width: "100px" }}>Font chữ</span>
              </div>
            </div>
          </div>
          <div className="my-4">{curTemplate.render}</div>
        </form>
      ) : (
        <div>{curTemplate.render}</div>
      )}
    </TemplateContext.Provider>
  );
}
