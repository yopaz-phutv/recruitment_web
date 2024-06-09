import Template1 from "./template1";
import Template2 from "./template2";
import Template3 from "./template3";
import Template4 from "./template4";
import Template5 from "./template5";
import Template6 from "./template6";
import Template7 from "./template7";
import Template8 from "./template8";
import template1 from "../../../../../assets/images/templates/template_1.png";
import template2 from "../../../../../assets/images/templates/template_2.png";
import template3 from "../../../../../assets/images/templates/template_3.png";
import template4 from "../../../../../assets/images/templates/template_4.png";
import template5 from "../../../../../assets/images/templates/template_5.png";
import template6 from "../../../../../assets/images/templates/template_6.png";
import template7 from "../../../../../assets/images/templates/template_7.png";
import template8 from "../../../../../assets/images/templates/template_8.png";

const templateList = [
  {
    id: 1,
    render: <Template1 />,
    image: template1,
    defaultStyle: {
      "cv-fullname": { color: "#0e849c", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#c6e2ff" },
      "cv-text-main": { color: "#0e849c" },
      "cv-line": {
        borderLeftStyle: "solid",
        borderWidth: "3px",
        borderColor: "#0e849c",
      },
      title: {
        fontSize: "18px",
        fontWeight: "550",
        color: "#0e849c",
      },
      content: { fontSize: "14px" },
      "personal-icon": { color: "#0e849c" },
    },
  },
  {
    id: 2,
    render: <Template2 />,
    image: template2,
    defaultStyle: {
      "cv-fullname": { color: "#ffa211", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#fbebd1" },
      "cv-text-main": { color: "#ffa211" },
      title: {
        fontSize: "19px",
        fontWeight: "550",
        color: "#ffa211",
      },
      content: { fontSize: "14px" },
      "personal-icons-bar": { backgroundColor: "#ffa211" },
    },
  },
  {
    id: 3,
    render: <Template3 />,
    image: template3,
    defaultStyle: {
      "cv-fullname": { color: "#009933", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#ccffcc" },
      "cv-text-main": { color: "#e6ffe6" },
      "cv-line": {
        borderLeftStyle: "solid",
        borderWidth: "3px",
        borderColor: "#009933",
      },
      title: {
        fontSize: "18px",
        fontWeight: "550",
        color: "#009933",
      },
      content: { fontSize: "14px" },
      "personal-icon": { color: "#009933" },
    },
  },
  {
    id: 4,
    render: <Template4 />,
    image: template4,
    defaultStyle: {
      "cv-fullname": { color: "#e62e00", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#ffebe6" },
      "cv-text-main": { color: "#e62e00" },
      title: {
        fontSize: "19px",
        fontWeight: "550",
        color: "#e62e00",
      },
      content: { fontSize: "14px" },
      "personal-icons-bar": { backgroundColor: "#e62e00" },
    },
  },
  {
    id: 5,
    render: <Template5 />,
    image: template5,
    defaultStyle: {
      "cv-fullname": { color: "#0052cc", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#e6e6ff" },
      "cv-text-main": { color: "#e6ffe6" },
      "cv-line": {
        borderLeftStyle: "solid",
        borderWidth: "3px",
        borderColor: "#0052cc",
      },
      title: {
        fontSize: "18px",
        fontWeight: "550",
        color: "#0052cc",
      },
      content: { fontSize: "14px" },
      "personal-icon": { color: "#0052cc" },
    },
  },
  {
    id: 6,
    render: <Template6 />,
    image: template6,
    defaultStyle: {
      "cv-fullname": { color: "#669900", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#f7ffe6" },
      "cv-text-main": { color: "#669900" },
      title: {
        fontSize: "19px",
        fontWeight: "550",
        color: "#669900",
      },
      content: { fontSize: "14px" },
      "personal-icons-bar": { backgroundColor: "#669900" },
    },
  },
  {
    id: 7,
    render: <Template7 />,
    image: template7,
    defaultStyle: {
      "cv-fullname": { color: "#8600b3", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#e6e6ff" },
      "cv-text-main": { color: "#e6ffe6" },
      "cv-line": {
        borderLeftStyle: "solid",
        borderWidth: "3px",
        borderColor: "#8600b3",
      },
      title: {
        fontSize: "18px",
        fontWeight: "550",
        color: "#8600b3",
      },
      content: { fontSize: "14px" },
      "personal-icon": { color: "#8600b3" },
    },
  },
  {
    id: 8,
    render: <Template8 />,
    image: template8,
    defaultStyle: {
      "cv-fullname": { color: "#86592d", fontSize: "22px", fontWeight: "550" },
      "cv-bg-main": { backgroundColor: "#f9f2ec" },
      "cv-text-main": { color: "#86592d" },
      title: {
        fontSize: "19px",
        fontWeight: "550",
        color: "#86592d",
      },
      content: { fontSize: "14px" },
      "personal-icons-bar": { backgroundColor: "#86592d" },
    },
  },
];

export default templateList;
