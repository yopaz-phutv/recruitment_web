import Template2 from "./template2";
import Template1 from "./template1";
import template1 from "../../../../../assets/images/templates/template_1.png";
import template2 from "../../../../../assets/images/templates/template_2.png";

const templateList = [
  {
    id: 1,
    render: <Template1 />,
    image: template1,
  },
  {
    id: 2,
    render: <Template2 />,
    image: template2,
  },
];
export default templateList;
