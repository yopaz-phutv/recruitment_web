import { useState } from "react";
import CTooltip from "../CTooltip";

const NumberItem = ({ title, number, items = [] }) => {
  const [curItem, setCurItem] = useState(items[0] || {});
  const isSelect = () => items.length > 0;

  return (
    <div className="ps-0 mb-4 pe-4">
      <div
        className="bg-main rounded px-3 d-flex gap-2 align-items-center h-100"
        style={{ minHeight: "78px" }}
      >
        <div className="w-80">
          {!isSelect() ? (
            <CTooltip text={title}>
              <div className="text-center ts-lg text-white text-maxline-2">
                {title}
              </div>
            </CTooltip>
          ) : (
            <div className="dropdown pointer">
              <CTooltip text={curItem.title}>
                <div
                  className="dropdown-toggle ts-lg text-white text-center text-wrap text-maxline-2"
                  data-bs-toggle="dropdown"
                >
                  {curItem.title}
                </div>
              </CTooltip>
              <ul className="dropdown-menu">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
                    onClick={() => setCurItem(item)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className="bg-white rounded text-main ts-xxl fw-bold px-2 my-3 flex-fill d-flex justify-content-center align-items-center"
          style={{ aspectRatio: "1/1" }}
        >
          {!isSelect() ? number : curItem.value}
        </div>
      </div>
    </div>
  );
};

export default NumberItem;
