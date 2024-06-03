import Template2 from "./template2";
import Template1 from "./template1";
import template1 from "../../../../../assets/images/templates/template_1.png";
import template2 from "../../../../../assets/images/templates/template_2.png";

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
];

export default templateList;
