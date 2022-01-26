import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useData } from "../../../../../../hooks/custom-hooks";
import Swal from "sweetalert2/dist/sweetalert2.js";
import rest from "../../../../../../utils/rest";
import Link from "next/link";

const initState = {
  rulename: "",
  format: "{seqno}",
  prefixchar: "0",
  mindigitlength: 1,
  details: [
    {
      types: [
        {
          type: "",
          sr: 1,
        },
      ],
      initseqno: 1,
      step: 1,
    },
  ],
};

export default function SequenceDetail() {
  const router = useRouter();
  const [state, setState] = useData({ ...initState });
  const [seqid, setSeqid] = useState("add");
  const [typecount, setTypecount] = useState(1);
  const [appname, setAppname] = useState("");

  const addRule = () => {
    const details = [...state.details];
    const types = [];
    for (let i = 1; i <= typecount; i++) {
      types.push({ type: "", sr: i });
    }
    details.push({
      types,
      initseqno: 1,
      step: 1,
    });
    setState({ details });
  };

  const setType = (index, type, sr) => {
    const details = [...state.details];
    for (const t of details[index].types) {
      if (t.sr == sr) {
        t.type = type;
        break;
      }
    }
    setState({ details });
  };

  const setRuleItem = (index, payload) => {
    const details = [...state.details];
    for (const [k, v] of Object.entries(payload)) {
      details[index][k] = v;
    }
    setState({ details });
  };

  const fetchSequence = async () => {
    const [res, err] = await rest.get(`/api/sequences/${router.query.seqid}`);
    if (!err) {
      setState({ ...res.data.data });
    }
  };

  useEffect(() => {
    setAppname(localStorage.getItem("appname"));
    if (router.query.seqid && router.query.seqid != "add") {
      setSeqid(router.query.seqid);
      fetchSequence();
    }
  }, [router.query.seqid]);

  const saveSequence = async () => {
    const [res, err] = await rest.post("/api/sequences", {
      ...state,
      appid: router.query.id,
    });
    if (!err) {
      router.push(`/juiceweb/application/${router.query.id}/sequence`);
    }
  };

  const updateSequence = async () => {
    const [res, err] = await rest.put(`/api/sequences/${router.query.seqid}`, {
      ...state,
      appid: router.query.id,
    });
    if (!err) {
      router.push(`/juiceweb/application/${router.query.id}/sequence`);
    }
  };

  const deleteSequence = async () => {
    const [res, err] = await rest.delete(
      `/api/sequences/${router.query.seqid}`
    );
    if (!err) {
    }
  };

  const reset = () => {
    setTypecount(1);
    if (seqid != "add") {
      router.push(`/juiceweb/application/${router.query.id}/sequence/add`);
    }
    setSeqid("add");
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
            <li className="breadcrumb-item">
              <Link href={`/juiceweb/application/${router.query.id}/sequence`}>
                <a>Sequence</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {seqid == "add" ? "Create New Sequence" : state.rulename}
            </li>
          </ol>
        </nav>
      </div>
      {/* <h2 className="mb-5">
        {seqid == "add" ? "Create New Sequence" : state.rulename}
      </h2> */}

      <div className="d-flex mb-5">
        {seqid == "add" ? (
          <button
            onClick={saveSequence}
            className="btn btn-primary"
            style={{ width: "8rem", marginRight: "1rem" }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={updateSequence}
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
                deleteSequence().then(() => {
                  swalWithBootstrapButtons
                    .fire(
                      "Deleted!",
                      "Your sequence has been deleted.",
                      "success"
                    )
                    .then(() => {
                      router.push(
                        `/juiceweb/application/${router.query.id}/sequence`
                      );
                    });
                });
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  "Your sequence is safe :)",
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
      </div>

      <div className="row mb-5">
        <div className="col-md-3">
          <label style={{ lineHeight: "2.5rem" }}>Sequence Name</label>
          <input
            type="text"
            className="form-control"
            value={state.rulename}
            onChange={(e) => setState({ rulename: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <label style={{ lineHeight: "2.5rem" }}>Format</label>
          <input
            type="text"
            className="form-control"
            value={state.format}
            onChange={(e) => setState({ format: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <label style={{ lineHeight: "2.5rem" }}>Prefix Character</label>
          <input
            type="text"
            className="form-control"
            value={state.prefixchar}
            onChange={(e) => setState({ prefixchar: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <label style={{ lineHeight: "2.5rem" }}>Min Digit Length</label>
          <input
            type="number"
            className="form-control"
            value={state.mindigitlength}
            onChange={(e) => setState({ mindigitlength: e.target.value })}
          />
        </div>
      </div>
      <hr />
      <div className="row my-5">
        <div className="col-md-1">
          <label style={{ lineHeight: "2.5rem" }}>Type Count</label>
          <input
            type="number"
            className="form-control"
            value={typecount}
            onChange={(e) => {
              setTypecount(e.target.value);
              if (e.target.value >= 1) {
                const details = [...state.details];
                for (const detail of details) {
                  while (detail.types.length != e.target.value) {
                    if (detail.types.length > e.target.value) {
                      detail.types.pop();
                    } else if (detail.types.length < e.target.value) {
                      detail.types.push({
                        type: "",
                        sr: detail.types.length + 1,
                      });
                    }
                  }
                }
                setState({ details });
              }
            }}
          />
        </div>
      </div>

      {state.details.map((detail, i) => (
        <div key={`detail_${i}`} className="row mb-3">
          {detail.types.map((type) => (
            <div key={type.sr} className="col-md-2">
              <label style={{ lineHeight: "2.5rem" }}>Type</label>
              <input
                type="text"
                className="form-control"
                value={type.type}
                onChange={(e) => setType(i, e.target.value, type.sr)}
              />
            </div>
          ))}
          <div className="col-md-2">
            <label style={{ lineHeight: "2.5rem" }}>Initial Sequence No.</label>
            <input
              type="number"
              className="form-control"
              value={detail.initseqno}
              onChange={(e) => setRuleItem(i, { initseqno: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label style={{ lineHeight: "2.5rem" }}>Step</label>
            <input
              type="number"
              className="form-control"
              value={detail.step}
              onChange={(e) => setRuleItem(i, { step: e.target.value })}
            />
          </div>
        </div>
      ))}

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          addRule();
        }}
      >
        Add More
      </a>
      <div className="mb-5"></div>
    </div>
  );
}
