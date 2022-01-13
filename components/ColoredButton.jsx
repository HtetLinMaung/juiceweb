export default function ColordButton({ item, clickHandler = () => {} }) {
  const width = "7rem";
  switch (item.method) {
    case "post":
      return (
        <button
          onClick={clickHandler}
          className="btn btn-warning"
          style={{ width }}
        >
          {item.method.toUpperCase()}
        </button>
      );
    case "put":
      return (
        <button
          onClick={clickHandler}
          className="btn btn-primary"
          style={{ width }}
        >
          {item.method.toUpperCase()}
        </button>
      );
    case "delete":
      return (
        <button
          onClick={clickHandler}
          className="btn btn-danger"
          style={{ width }}
        >
          {item.method.toUpperCase()}
        </button>
      );
    default:
      return (
        <button
          onClick={clickHandler}
          className="btn btn-success"
          style={{ width }}
        >
          {item.method.toUpperCase()}
        </button>
      );
  }
}
