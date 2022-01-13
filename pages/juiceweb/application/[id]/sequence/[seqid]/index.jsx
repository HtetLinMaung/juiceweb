import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useData } from "../../../../../../hooks/custom-hooks";
import Swal from "sweetalert2/dist/sweetalert2.js";
import rest from "../../../../../../utils/rest";

const initState = {
  rulename: "",
  format: "{seqno}",
  prefixchar: "0",
  mindigitlength: 1,
  rules: [
    {
      types: [
        {
          type: "",
          sr: 1,
        },
      ],
      seqno: 1,
      step: 1,
    },
  ],
};

export default function SequenceDetail() {
  const router = useRouter();
  const [state, setState] = useData({ ...initState });
  const [seqid, setSeqid] = useState("add");
  const [typecount, setTypecount] = useState(1);

  const addRule = () => {
    const rules = [...state.rules];
    const types = [];
    for (let i = 1; i <= typecount; i++) {
      types.push({ type: "", sr: i });
    }
    rules.push({
      types,
      seqno: 1,
      step: 1,
    });
    setState({ rules });
  };

  const setType = (index, type, sr) => {
    const rules = [...state.rules];
    for (const t of rules[index].types) {
      if (t.sr == sr) {
        t.type = type;
        break;
      }
    }
    setState({ rules });
  };

  const setRuleItem = (index, payload) => {
    const rules = [...state.rules];
    for (const [k, v] of Object.entries(payload)) {
      rules[index][k] = v;
    }
    setState({ rules });
  };

  const fetchSequence = async () => {
    const [res, err] = await rest.get(`/api/sequences/${router.query.seqid}`);
    if (!err) {
      setState({ ...res.data.data });
    }
  };

  useEffect(() => {
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
    <div className="container" style={{ paddingTop: "9rem" }}>
      <h2 className="mb-5">
        {seqid == "add" ? "Create New Sequence" : state.rulename}
      </h2>

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
                const rules = [...state.rules];
                for (const rule of rules) {
                  while (rule.types.length != e.target.value) {
                    if (rule.types.length > e.target.value) {
                      rule.types.pop();
                    } else if (rule.types.length < e.target.value) {
                      rule.types.push({ type: "", sr: rule.types.length + 1 });
                    }
                  }
                }
                setState({ rules });
              }
            }}
          />
        </div>
      </div>

      {state.rules.map((rule, i) => (
        <div key={`rule_${i}`} className="row mb-3">
          {rule.types.map((type) => (
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
            <label style={{ lineHeight: "2.5rem" }}>Sequence No.</label>
            <input
              type="number"
              className="form-control"
              value={rule.seqno}
              onChange={(e) => setRuleItem(i, { seqno: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label style={{ lineHeight: "2.5rem" }}>Step</label>
            <input
              type="number"
              className="form-control"
              value={rule.step}
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
