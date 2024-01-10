import clsx from "clsx";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

export const InforPart = ({
  children,
  className,
  inforType,
  handleChangePos,
}) => {
  const [showOp, setShowOp] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = () => {
    setIsDelete(true);
  };

  return (
    <div
      className={clsx(
        "position-relative",
        isDelete && "d-none",
        showOp && "border border-secondary",
        className
      )}
      onMouseMove={() => setShowOp(true)}
      onMouseLeave={() => setShowOp(false)}
    >
      {children}
      {showOp && (
        <div className="position-absolute end-0 bottom-100">
          <div className="d-flex gap-1 align-items-center rounded shadow p-1 bg-light">
            <AiFillCaretDown
              className="fs-5 text-secondary pointer"
              onClick={() => handleChangePos(inforType, "DOWN")}
            />
            <AiFillCaretUp
              className="fs-5 text-secondary pointer"
              onClick={() => handleChangePos(inforType, "UP")}
            />
            <MdDelete
              className="fs-5 text-danger pointer"
              onClick={handleDelete}
            />
            <IoMdAddCircleOutline className="fs-5 text-success pointer" />
            <IoMdSettings className="fs-5 text-secondary pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export const ContentItem = ({
  className,
  children,
  index,
  items,
  setItems,
  menuVaule,
}) => {
  const [showOp, setShowOp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState(menuVaule);

  const handleAdd = () => {
    let temp = [...items];
    temp.splice(index + 1, 0, {});
    setItems(temp);
  };
  const handleDelete = () => {
    let temp = [...items];
    temp.splice(index, 1);
    setItems(temp);
  };
  const handleChangeMenu = (index) => {
    let temp = [...menu];
    temp[index].on = !temp[index].on;
    setMenu(temp);
  };
  const customChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { menu: menu });
    }
    return child;
  });

  return (
    <div
      className={clsx(
        "position-relative",
        showOp && "border border-secondary",
        className
      )}
      onMouseMove={() => setShowOp(true)}
      onMouseLeave={() => setShowOp(false)}
    >
      {customChildren}
      {showOp && (
        <div className="position-absolute bottom-100 end-0 z-index-2">
          <div className="d-flex gap-1 align-items-center rounded shadow p-1 bg-light">
            <AiFillCaretDown className="fs-5 text-secondary pointer" />
            <AiFillCaretUp className="fs-5 text-secondary pointer" />
            <MdDelete
              className="fs-5 text-danger pointer"
              onClick={handleDelete}
            />
            <IoMdAddCircleOutline
              className="fs-5 text-success pointer"
              onClick={handleAdd}
            />
            <div
              className="position-relative"
              onMouseMove={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <IoMdSettings className="fs-5 text-secondary pointer" />
              {showMenu && (
                <div
                  className="position-absolute top-100 end-0 bg-light border rounded ts-sm z-index-3"
                  style={{ minWidth: "160px" }}
                >
                  {menu?.map((item, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 pointer item-hover d-flex align-items-center"
                      onClick={() => handleChangeMenu(index)}
                    >
                      <div className="flex-fill">{item.name}</div>
                      {item.on && <FaCheck className="text-primary" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
