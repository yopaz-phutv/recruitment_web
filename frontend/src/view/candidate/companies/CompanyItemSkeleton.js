import Placeholder from "react-bootstrap/Placeholder";

export default function CompanyItemSkeleton() {
  return (
    <Placeholder animation="glow" className="col-sm-12 col-lg-4 mb-3">
      <div className="card border" style={{ height: "240px" }}>
        <div className="d-flex align-items-center border-bottom ps-2 py-2">
          <Placeholder style={{ width: "100px", height: "100px" }} />
          <Placeholder size="lg" xs={8} className="ms-2" />
        </div>
        <div className="card-body">
          <Placeholder xs={5} /> <br />
          <Placeholder xs={12} /> <br />
          <Placeholder xs={8} />
        </div>
      </div>
    </Placeholder>
  );
}
