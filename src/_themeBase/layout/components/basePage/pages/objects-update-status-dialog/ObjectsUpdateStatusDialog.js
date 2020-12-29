import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ObjectStatusCssClasses, ObjectStatusTitles } from "../ObjectsUIHelpers";
import * as actions from "../../../../../../app/actions/generalActions";
import { useObjectsUIContext } from "../ObjectsUIContext";
import { FormattedMessage, useIntl } from "react-intl";

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

export const ObjectsUpdateStatusDialog = ({ show, onHide, currentState, api }) => {
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
  const { objects, isLoading, name } = useSelector(
    (state) => ({
      objects: selectedObjects(currentState.entities, objectsUIProps.ids),
      isLoading: currentState.actionsLoading,
      name: currentState.name
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

  const [isDeleted, setStatus] = useState(false);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing object by ids
    dispatch(actions.updateObjectsStatus(api, name, objectsUIProps.ids, isDeleted)).then(
      () => {
       
        // refresh list after deletion
        dispatch(actions.fetchObjects(api, name, objectsUIProps.queryParams)).then(
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

  const intl = useIntl();
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          <FormattedMessage id="sdsds" />
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
                    className={`label label-lg label-light-${ObjectStatusCssClasses[+object.isDeleted]
                      } label-inline`}
                    style={{ width: "60px" }}
                  >
                    {object.id}
                  </span>{" "}
                  <span className="ml-5">
                    {object.title}
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
            className={`form-control ${ObjectStatusCssClasses[isDeleted]}`}
            value={isDeleted}
            onChange={(e) => setStatus(+e.target.value)}
          >
            {ObjectStatusTitles.map((isDeleted, index) => (
              <option key={isDeleted} value={index}>
                {intl.formatMessage({ id: isDeleted })}
              </option>
            ))}
            {/* <option value="0"><FormattedMessage id="MODULES.GENERAL.STATUSENABLE" /></option>
            <option value="1"><FormattedMessage id= "MODULES.GENERAL.STATUSDELETED"/></option> */}
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            <FormattedMessage id="BUTTON.CANCEL" />
          </button>
          <> </>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            <FormattedMessage id="BUTTON.OK" />
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
