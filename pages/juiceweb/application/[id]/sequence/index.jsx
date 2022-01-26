import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rest from "../../../../../utils/rest";
import moment from "moment";
import Link from "next/link";

export default function Sequence() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [appname, setAppname] = useState("");

  const fetchSequences = async () => {
    setAppname(localStorage.getItem("appname"));
    if (router.query.id) {
      const [res, err] = await rest.get(
        `/api/sequences?appid=${router.query.id}&search=${search}`
      );
      if (!err) {
        setItems(res.data.data);
      }
    }
  };

  useEffect(() => {
    fetchSequences();
  }, [router.query.id, search]);

  return (
    <div className="container" style={{ paddingTop: "6rem" }}>
      <div className="mb-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/juiceweb/application">
                <a>Application</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/juiceweb/application/${router.query.id}`}>
                <a>{appname || router.query.id}</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Sequence
            </li>
          </ol>
        </nav>
      </div>
      {/* <h2 className="mb-5">Sequence</h2> */}
      <div
        className="row mb-3"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <div className="col-md-3">
          <div
            className="input-group raised"
            style={{
              borderRadius: 10,
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="basic-addon1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 0 }}
            />
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                background: "rgb(255, 255, 255)",
                borderRadius: "0px 10px 10px 0px",
                border: 0,
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-search fa-w-16 fa-3x"
                style={{ width: "1rem" }}
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  style={{ color: "grey" }}
                ></path>
              </svg>
            </span>
          </div>
          {/* <input
            type="text"
            placeholder="Search"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </div>
        <div className="col-md-2">
          <div className="d-flex" style={{ justifyContent: "flex-end" }}>
            <button
              onClick={() =>
                router.push(
                  `/juiceweb/application/${router.query.id}/sequence/add`
                )
              }
              className="btn btn-primary"
            >
              Create Sequence
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table __table" style={{ marginBottom: 0 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Format</th>
              <th>Min Digit Length</th>
              <th>Prefix Character</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td
                  onClick={() =>
                    router.push(
                      `/juiceweb/application/${router.query.id}/sequence/${item._id}`
                    )
                  }
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {item._id}
                </td>
                <td>{item.rulename}</td>
                <td>{item.format}</td>
                <td>{item.mindigitlength}</td>
                <td>{item.prefixchar}</td>
                <td>
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
