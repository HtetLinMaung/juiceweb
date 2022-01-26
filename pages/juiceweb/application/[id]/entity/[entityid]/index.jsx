import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useData } from "../../../../../../hooks/custom-hooks";
import Swal from "sweetalert2/dist/sweetalert2.js";
import rest from "../../../../../../utils/rest";
import Link from "next/link";

const initState = {
  name: "",
  timestamps: true,
  columns: [
    {
      name: "",
      datatype: "text",
      isrequired: true,
      defaultvalue: "",
      isunique: false,
      issequence: false,
      seqheaderid: "",
    },
  ],
};

export default function AddEntity() {
  const router = useRouter();
  const [state, setState] = useData(initState);
  const [entityid, setEntityid] = useState("add");
  const [sequences, setSequences] = useState([]);
  const [appname, setAppname] = useState("");

  const fetchEntity = async () => {
    const [res, err] = await rest.get(`/api/entities/${router.query.entityid}`);
    if (!err) {
      setState({ ...res.data.data });
      setAppname(localStorage.getItem("appname"));
    }
  };

  const fetchSequences = async () => {
    if (router.query.id) {
      const [res, err] = await rest.get(
        `/api/sequences?appid=${router.query.id}`
      );
      if (!err) {
        setSequences(res.data.data);
      }
    }
  };

  useEffect(() => {
    if (router.query.entityid && router.query.entityid != "add") {
      setEntityid(router.query.entityid);
      fetchEntity();
    }
    fetchSequences();
  }, [router.query.entityid]);

  const addColumn = () => {
    const columns = [
      ...state.columns,
      {
        name: "",
        datatype: "text",
        isrequired: true,
        defaultvalue: "",
        isunique: false,
        issequence: false,
        seqheaderid: "",
      },
    ];
    setState({ columns });
  };

  const updateColumn = (index, payload = {}) => {
    const columns = [...state.columns];
    columns[index] = { ...columns[index], ...payload };
    setState({ columns });
  };

  const removeColumn = (index) => {
    setState({ columns: state.columns.filter((c, i) => i != index) });
  };

  const getBody = () => {
    const body = { ...state };
    body.columns = [...state.columns].map((c) => {
      if (!c.seqheaderid) {
        c.seqheaderid = null;
      }
      return c;
    });

    return body;
  };

  const saveEntity = async () => {
    const [res, err] = await rest.post("/api/entities", {
      ...getBody(),
      appid: router.query.id,
    });
    if (!err) {
      router.push(`/juiceweb/application/${router.query.id}/entity`);
    }
  };

  const updateEntity = async () => {
    const [res, err] = await rest.put(
      `/api/entities/${router.query.entityid}`,
      {
        ...getBody(),
      }
    );
    if (!err) {
      router.push(`/juiceweb/application/${router.query.id}/entity`);
    }
  };

  const deleteEntity = async () => {
    const [res, err] = await rest.delete(
      `/api/entities/${router.query.entityid}`
    );
    if (!err) {
    }
  };

  const reset = () => {
    if (entityid != "add") {
      router.push(`/juiceweb/application/${router.query.id}/entity/add`);
    }
    setEntityid("add");
    setState({ ...initState });
  };

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
            <li className="breadcrumb-item ">
              <Link href={`/juiceweb/application/${router.query.id}/entity`}>
                <a>Entity</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {router.query.entityid}
            </li>
          </ol>
        </nav>
      </div>
      <h2 className="mb-5">
        {entityid == "add" ? "Create New Entity" : state.name}
      </h2>

      <div className="d-flex mb-5">
        {entityid == "add" ? (
          <button
            onClick={saveEntity}
            className="btn btn-primary"
            style={{ width: "8rem", marginRight: "1rem" }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={updateEntity}
            className="btn btn-primary"
            style={{ width: "8rem", marginRight: "1rem" }}
          >
            Update
          </button>
        )}
        <button
          onClick={reset}
          className="btn btn-primary"
          style={{ width: "8rem", marginRight: "1rem" }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });

            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                deleteEntity().then(() => {
                  swalWithBootstrapButtons
                    .fire(
                      "Deleted!",
                      "Your entity has been deleted.",
                      "success"
                    )
                    .then(() => {
                      router.push(
                        `/juiceweb/application/${router.query.id}/entity`
                      );
                    });
                });
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  "Your entity is safe :)",
                  "error"
                );
              }
            });
          }}
          className="btn btn-danger"
          style={{ width: "8rem", marginRight: "1rem" }}
        >
          Delete
        </button>
        <button
          onClick={() =>
            router.push(
              `/juiceweb/application/${router.query.id}/entity/${router.query.entityid}/endpoint`
            )
          }
          className="btn btn-warning"
          style={{ width: "8rem", marginRight: "1rem" }}
        >
          Endpoints
        </button>
      </div>

      <div className="row mb-5" style={{ alignItems: "center" }}>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Entity Name"
            value={state.name}
            onChange={(e) => setState({ name: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <div className="center" style={{ justifyContent: "flex-start" }}>
            <label style={{ marginRight: "1rem" }}>Auto Timestamps</label>
            <input
              className="form-check-input"
              style={{ marginRight: "1rem" }}
              type="checkbox"
              checked={state.timestamps}
              onChange={(e) => setState({ timestamps: e.target.checked })}
            />
          </div>
        </div>
      </div>

      <hr />
      <div className="my-5">
        {state.columns.map((column, i) => (
          <div
            key={i}
            className="row center mb-4"
            style={{ justifyContent: "flex-start" }}
          >
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Column Name"
                value={column.name}
                onChange={(e) => updateColumn(i, { name: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <select
                value={column.datatype}
                onChange={(e) =>
                  updateColumn(i, {
                    datatype: e.target.value,
                    defaultvalue: e.target.value == "boolean" ? false : "",
                  })
                }
                className="form-control"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="default">General</option>
                <option value="date">Date</option>
              </select>
            </div>
            {!column.issequence ? (
              <div className="col-md-2">
                {["text", "number", "date", "default"].includes(
                  column.datatype
                ) ? (
                  <input
                    onChange={(e) =>
                      updateColumn(i, {
                        defaultvalue:
                          column.datatype == "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                    type={
                      column.datatype == "default" ? "text" : column.datatype
                    }
                    className="form-control"
                    placeholder="Default Value"
                    value={column.defaultvalue}
                  />
                ) : (
                  ""
                )}
                {column.datatype == "boolean" ? (
                  <select
                    value={!!column.defaultvalue ? "1" : ""}
                    onChange={(e) =>
                      updateColumn(i, { defaultvalue: !!e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="1">True</option>
                    <option value="">False</option>
                  </select>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="col-md-2">
                <select
                  className="form-control"
                  value={column.seqheaderid}
                  onChange={(e) => {
                    const payload = { seqheaderid: e.target.value };
                    const sequence = sequences.find(
                      (seq) => seq._id == e.target.value
                    );
                    if (
                      sequence.format == "{seqno}" &&
                      sequence.mindigitlength == 1
                    ) {
                      payload.datatype = "number";
                    } else {
                      payload.datatype = "text";
                    }
                    updateColumn(i, payload);
                  }}
                >
                  {sequences.map((seq) => (
                    <option key={seq._id} value={seq._id}>
                      {seq.rulename}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="col-md-3">
              <div className="center" style={{ justifyContent: "flex-start" }}>
                <label style={{ marginRight: "1rem" }}>Require</label>
                <input
                  className="form-check-input"
                  style={{ marginRight: "1rem" }}
                  type="checkbox"
                  checked={column.isrequired}
                  onChange={(e) =>
                    updateColumn(i, { isrequired: e.target.checked })
                  }
                />

                <label style={{ marginRight: "1rem" }}>Unique</label>
                <input
                  className="form-check-input"
                  style={{ marginRight: "1rem" }}
                  type="checkbox"
                  checked={column.isunique}
                  onChange={(e) =>
                    updateColumn(i, { isunique: e.target.checked })
                  }
                />

                <label style={{ marginRight: "1rem" }}>Sequence</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={column.issequence}
                  onChange={(e) => {
                    const payload = {
                      issequence: e.target.checked,
                      seqheaderid: e.target.checked ? sequences[0]._id : "",
                    };
                    if (e.target.checked) {
                      if (
                        sequences[0].format == "{seqno}" &&
                        sequences[0].mindigitlength == 1
                      ) {
                        payload.datatype = "number";
                      } else {
                        payload.datatype = "text";
                      }
                    }
                    updateColumn(i, payload);
                  }}
                />
              </div>
            </div>
            <div className="col-md-3">
              {i > 0 ? (
                <button
                  onClick={() => removeColumn(i)}
                  className="btn btn-danger "
                >
                  Remove
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          addColumn();
        }}
      >
        Add More
      </a>
    </div>
  );
}
