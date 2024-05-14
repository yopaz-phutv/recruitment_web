import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function CTooltip({ children, placement = "top", text }) {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip className="ts-xs">{text}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
}
