import Placeholder from "react-bootstrap/Placeholder";

export default function PersonalInforSkeleton() {
  return (
    <Placeholder animation="glow">
      <div className="d-flex gap-5 flex-wrap align-items-center">
        <Placeholder
          className="ms-4 rounded-circle"
          style={{ width: "130px", height: "130px" }}
        />
        <div className="flex-fill">
          <Placeholder xs={3} /> <br />
          <Placeholder xs={11} size="lg" />
        </div>
      </div>
      <hr />
      <div className="row row-cols-md-2 row-cols-sm-1">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index}>
            <Placeholder xs={4} /> <br />
            <Placeholder xs={10} />
          </div>
        ))}
      </div>
    </Placeholder>
  );
}
