import clsx from "clsx";
import "./style.css";
import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import dayjs from "dayjs";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { ProfileContext } from "../../layouts/CandidateLayout";

const Input = ({
  className,
  icon,
  content,
  contentStyle,
  iconPosition = "l",
}) => {
  return (
    <div className={clsx("d-flex align-items-center gap-1", className)}>
      {iconPosition === "l" && icon}
      <span className={contentStyle}>{content}</span>
      {iconPosition === "r" && icon}
    </div>
  );
};

export default function Template1({ kkk }) {
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

  // const generalInfor = {
  //   fullname: "Tran Van Phu",
  //   dob: "08/01/2001",
  //   phone: "0336935665",
  //   email: "tranphudhak@gmail.com",
  //   link: "https://github.com/tranphu033",
  //   address: "Gia Lâm, Hà Nội",
  // };
  const objective =
    "- Trau dồi thêm kiến thức và kỹ năng về lập trình web.\n- Tích lũy kinh nghiệm làm việc khi được tham gia vào dự án thực tế của công ty.\n- Định hướng trở thành fullstack web developer.";
  // const skills = [
  //   {
  //     name: "Ngôn ngữ lập trình",
  //     description: "C, HTML, CSS, JavaScript, PHP",
  //   },
  //   {
  //     name: "Framework, thư viện lập trình",
  //     description: "Laravel, ReactJS, Redux, Bootstrap",
  //   },
  //   { name: "Cơ sở dữ liệu", description: "MySQL" },
  //   { name: "Ngoại ngữ", description: "Tiếng Anh, Tiếng Nhật" },
  // ];
  // const certificates = [
  //   {
  //     name: "Chứng chỉ Tiếng Nhật JLPT N3",
  //     receive_date: "08/2022",
  //   },
  // ];
  // const educations = [
  //   {
  //     school: "Trường THPT Ân Thi",
  //     description: "",
  //     start_date: new Date("2016-08-20"),
  //     end_date: new Date("2019-08-20"),
  //   },
  //   {
  //     school: "Đại học Bách khoa Hà Nội",
  //     major: "Công nghệ thông tin",
  //     description: "CPA hiện tại: 3.25",
  //     start_date: new Date("2019-09-01"),
  //     end_date: new Date("2024-09-01"),
  //   },
  // ];
  // const experiences = [
  //   {
  //     name: "Thực tập sinh PHP",
  //     company: "Trung tâm CNTT MobiFone",
  //     description:
  //       "- Tìm hiểu về framework Laravel của PHP.\n- Xây dựng, hoàn thiện một module trong dự án của công ty (có sử dụng Laravel).",
  //     start_date: new Date("2023-03-07"),
  //     end_date: new Date("2023-06-20"),
  //   },
  // ];
  // const projects = [
  //   {
  //     name: "WEBSITE TUYỂN DỤNG",
  //     prj_type: 0,
  //     link: "https://github.com/tranphu033/recruitment_web",
  //     role: "",
  //     technologies: "Laravel, ReactJS, Redux, Bootstrap, MySQL",
  //     description: "Trang web tìm kiếm việc làm, đăng tin tuyển dụng.",
  //     start_date: new Date("2023-03-07"),
  //     end_date: new Date("2023-06-20"),
  //   },
  //   {
  //     name: "WEBSITE CỬA HÀNG GIÀY DÉP",
  //     prj_type: 1,
  //     link: "https://github.com/tranphu033/shoes_store",
  //     role: "back-end, thiết kế cơ sở dữ liệu, xây dựng các API.",
  //     technologies: "PHP thuần, ReactJS, Bootstrap, MySQL",
  //     description: "Trang web mua bán giày dép",
  //     start_date: new Date("2023-03-07"),
  //     end_date: new Date("2023-06-20"),
  //   },
  //   {
  //     name: "ỨNG DỤNG CHIA SẺ TỆP TIN",
  //     prj_type: 1,
  //     link: "https://github.com/tranphu033/file_sharing_app",
  //     role: "xây dựng một số chức năng của ứng dụng, viết truy vấn cơ sở dữ liệu.",
  //     technologies: "C, MySQL",
  //     description:
  //       "Ứng dụng cho phép người dùng tham gia vào các nhóm để download, upload tài liệu.",
  //     start_date: new Date("2023-03-07"),
  //     end_date: new Date("2023-06-20"),
  //   },
  // ];

  const General = () => {
    return (
      <>
        <div className="title">Thông tin cá nhân</div>
        <Input
          icon={<IoCalendarClear className="text-main me-1" />}
          content={personal.dob}
          contentStyle="content"
        />
        <Input
          className="mt-1"
          icon={<FaPhoneAlt className="text-main me-1" />}
          content={personal.phone}
          contentStyle="content"
        />
        <Input
          className="mt-1"
          icon={<IoMdMail className="text-main me-1" />}
          content={personal.email}
          contentStyle="content"
        />
        <Input
          className="mt-1"
          icon={<FaPhoneAlt className="text-main me-1" />}
          content={
            <a
              href={personal.link}
              className="del-underline text-body"
              target="_blank"
              rel="noreferrer"
            >
              {personal.link}
            </a>
          }
          contentStyle="content"
        />
        <Input
          className="mt-1"
          icon={<MdLocationOn className="text-main me-1" />}
          content={personal.address}
          contentStyle="content"
        />
      </>
    );
  };
  const Objective = () => {
    return (
      <>
        <div className="title mb-1">Mục tiêu nghề nghiệp</div>
        <div className="content whitespace-preline">{personal.objective}</div>
      </>
    );
  };
  const Skills = () => {
    return (
      <>
        <div className="title mb-1">Các kỹ năng</div>
        {skills.map((item, index) => (
          <div key={`skill_${index}`} className="content">
            <div className="fw-550">{item.name}</div>
            <div className="ms-1">{item.description}</div>
          </div>
        ))}
      </>
    );
  };
  const Certificates = () => {
    return (
      <>
        <div className="title mb-1">Chứng chỉ</div>
        {certificates.map((item, index) => (
          <div key={`certificate_${index}`} className="content">
            <span className="fw-550 me-2">{item.receive_date}</span>
            {item.name}
          </div>
        ))}
      </>
    );
  };
  const Educations = () => {
    return (
      <>
        <div className="title mb-1">Học vấn</div>
        {educations.map((item, index) => (
          <div
            key={`education_${index}`}
            className="content border-3 border-start border-lighter mb-3 ps-2"
          >
            <div className="clearfix">
              <span className="fw-550">{item.school}</span>
              <small className="float-end text-secondary me-2 fst-italic">
                {dayjs(item.start_date).format("MM/YYYY") +
                  " - " +
                  dayjs(item.end_date).format("MM/YYYY")}
              </small>
            </div>
            <div>{item?.major}</div>
            <div>{item?.description}</div>
          </div>
        ))}
      </>
    );
  };
  const Experiences = () => {
    return (
      <>
        <div className="title mb-1">Kinh nghiệm làm việc</div>
        {experiences.map((item, index) => (
          <div
            key={`experience_${index}`}
            className="content border-3 border-start border-lighter mb-3 ps-2"
          >
            <div className="clearfix">
              <span className="fw-550">{item.name}</span>
              <small className="float-end text-secondary me-2 fst-italic">
                {dayjs(item.start_date).format("MM/YYYY") +
                  " - " +
                  dayjs(item.end_date).format("MM/YYYY")}
              </small>
            </div>
            <div className="text-secondary">{item.company}</div>
            <div className="whitespace-preline">{item?.description}</div>
          </div>
        ))}
      </>
    );
  };
  const Projects = () => {
    return (
      <>
        <div className="title mb-1">Dự án</div>
        {projects.map((item, index) => (
          <div
            key={`project_${index}`}
            className="content border-3 border-start border-lighter mb-3 ps-2"
          >
            <div className="clearfix">
              <span className="fw-550">{item.name}</span>
              <small className="float-end text-secondary me-2 fst-italic">
                {dayjs(item.start_date).format("MM/YYYY") +
                  " - " +
                  dayjs(item.end_date).format("MM/YYYY")}
              </small>
            </div>
            <div className="text-secondary" style={{ fontSize: "14px" }}>
              Project {item.prj_type === 0 ? "cá nhân" : "nhóm"}
            </div>
            {item.link && (
              <div>
                <span className="fst-italic text-secondary">Link: </span>
                <a
                  href={item.link}
                  className="del-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.link}
                </a>
              </div>
            )}
            {item.role && (
              <div>
                <span className="fst-italic text-secondary">Công việc: </span>
                {item.role}
              </div>
            )}
            {item.technologies && (
              <div>
                <span className="fst-italic text-secondary">Công nghệ: </span>
                {item.technologies}
              </div>
            )}
            <div className="whitespace-preline">
              <span className="fst-italic text-secondary">Mô tả: </span>
              {item.description}
            </div>
          </div>
        ))}
      </>
    );
  };

  let itemList = [
    { key: "general", render: <General /> },
    { key: "objective", render: <Objective /> },
    { key: "skills", render: <Skills /> },
    { key: "certificates", render: <Certificates /> },
    { key: "educations", render: <Educations /> },
    { key: "experiences", render: <Experiences /> },
    { key: "projects", render: <Projects /> },
  ];
  // let order = {
  //   general: 0,
  //   objective: 2,
  //   skills: 1,
  //   certificates: 3,
  //   educations: 4,
  //   experiences: 6,
  //   projects: 5,
  // };
  // let newList = [];
  // for (let key in order) {
  //   newList[order[key]] = itemList.find((item) => item.key === key);
  // }
  // itemList = [...newList];

  return (
    <div
      className="mx-auto border my-5 d-flex py-2 shadow"
      style={{ width: "800px" }}
    >
      <div className="bg-main ms-2 ps-1 pe-2 pb-2" style={{ width: "340px" }}>
        <div className="mt-2 text-center">
          <img
            src={personal.avatar}
            alt=""
            height="172px"
            className="rounded-pill"
          />
          <h4 className="text-uppercase mt-2 text-main">
            {personal.lastname + " " + personal.firstname}
          </h4>
        </div>
        <hr className="text-main" />
        <div className="ms-2">{itemList[0].render}</div>
        <hr className="text-main" />
        <div className="ms-2">{itemList[1].render}</div>
        <hr className="text-main" />
        <div className="ms-2">{itemList[2].render}</div>
        <hr className="text-main" />
        <div className="ms-2">{itemList[3].render}</div>
      </div>
      <div className="flex-fill px-1">
        <div className="ms-2">
          {itemList[4].render}
          <hr className="text-main" />
        </div>
        <div className="ms-2">
          {itemList[5].render}
          <hr className="text-main" />
        </div>
        <div className="ms-2">
          {itemList[6].render}
          <hr className="text-main" />
        </div>
      </div>
    </div>
  );
}
