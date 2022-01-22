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
    <div className="container" style={{ paddingTop: "9rem" }}>
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
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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

      <div className="card p-3">
        <table className="table" style={{ marginBottom: 0 }}>
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
