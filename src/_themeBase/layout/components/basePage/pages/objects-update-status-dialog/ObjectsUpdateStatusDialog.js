import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ObjectStatusCssClasses } from "../ObjectsUIHelpers";
import * as actions from "../../../../../../app/actions/generalActions";
import { useObjectsUIContext } from "../ObjectsUIContext";

const selectedObjects = (entities, ids) => {
  const _objects = [];
  ids.forEach((id) => {
    const object = entities.find((el) => el.id === id);
    if (object) {
      _objects.push(object);
    }
  });
  return _objects;
};

export function ObjectsUpdateStatusDialog({ show, onHide,currentState }) {
  // Objects UI Context
  const objectsUIContext = useObjectsUIContext();
  const objectsUIProps = useMemo(() => {
    return {
      ids: objectsUIContext.ids,
      setIds: objectsUIContext.setIds,
      queryParams: objectsUIContext.queryParams,
    };
  }, [objectsUIContext]);

  // Objects Redux state
  const { objects, isLoading } = useSelector(
    (state) => ({
      objects: selectedObjects(currentState.entities, objectsUIProps.ids),
      isLoading: currentState.actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected objects we should close modal
  useEffect(() => {
    if (objectsUIProps.ids || objectsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing object by ids
    dispatch(actions.updateObjectsStatus(objectsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchObjects(objectsUIProps.queryParams)).then(
          () => {
            // clear selections list
            objectsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected objects
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {isLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-warning" />
          </div>
        )}
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {objects.map((object) => (
              <div className="list-timeline-item mb-3" key={object.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${
                      ObjectStatusCssClasses[object.status]
                    } label-inline`}
                    style={{ width: "60px" }}
                  >
                    ID: {object.id}
                  </span>{" "}
                  <span className="ml-5">
                    {object.manufacture}, {object.model}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className={`form-control ${ObjectStatusCssClasses[status]}`}
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Selling</option>
            <option value="1">Sold</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
