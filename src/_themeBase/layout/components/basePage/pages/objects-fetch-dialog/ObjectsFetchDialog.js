import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { ObjectStatusCssClasses } from "../ObjectsUIHelpers";
import { useObjectsUIContext } from "../ObjectsUIContext";
import { useFilterObjectsUIContext } from "../FilterObjectsUIContext";

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

export const ObjectsFetchDialog = ({ show, onHide,currentState }) => {
  // Objects UI Context
  const objectsUIContext = useObjectsUIContext();
  const filterUIContext = useFilterObjectsUIContext();

  const objectsUIProps = useMemo(() => {
    return {
      ids: objectsUIContext.ids,
      queryParams: filterUIContext.queryParams,
    };
  }, [objectsUIContext,filterUIContext]);

  // Objects Redux state
  const { objects } = useSelector(
    (state) => ({
      objects: selectedObjects(currentState.entities, objectsUIProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!objectsUIProps.ids || objectsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
