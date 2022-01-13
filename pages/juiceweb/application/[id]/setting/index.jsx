export default function Setting() {
  return (
    <div
      className="container"
      style={{ paddingTop: "9rem", fontSize: "1.5rem" }}
    >
      <h2 className="mb-5">Setting</h2>
      <div className="row mb-3" style={{ alignItems: "center" }}>
        <div className="col-md-3">Create IAM SuperUser</div>
        <div className="col-md-3">
          {/* <input type="checkbox" className="form-check-input" /> */}
          <button className="btn btn-primary">Yes</button>
        </div>
      </div>
    </div>
  );
}
