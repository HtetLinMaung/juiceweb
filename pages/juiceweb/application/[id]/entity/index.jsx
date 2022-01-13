import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rest from "../../../../../utils/rest";
import moment from "moment";

export default function Entity() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEntities = async () => {
    if (router.query.id) {
      const [res, err] = await rest.get(
        `/api/entities?appid=${router.query.id}&search=${search}`
      );
      if (!err) {
        setItems(res.data.data);
      }
    }
  };

  useEffect(() => {
    fetchEntities();
  }, [router.query.id, search]);

  return (
    <div className="container" style={{ paddingTop: "9rem" }}>
      <h2 className="mb-5">Entity</h2>
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
                  `/juiceweb/application/${router.query.id}/entity/add`
                )
              }
              className="btn btn-primary"
            >
              Create Entity
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
              <th>Auto Timestamps</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td
                  onClick={() =>
                    router.push(
                      `/juiceweb/application/${router.query.id}/entity/${item._id}`
                    )
                  }
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {item._id}
                </td>
                <td>{item.name}</td>
                <td>{item.timestamps ? "Yes" : "No"}</td>
                <td>
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  <button
                    onClick={() =>
                      router.push(
                        `/juiceweb/application/${router.query.id}/entity/${item._id}/endpoint`
                      )
                    }
                    className="btn btn-warning"
                  >
                    Endpoints
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
