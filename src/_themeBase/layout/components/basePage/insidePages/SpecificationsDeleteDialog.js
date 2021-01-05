/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_themeBase/_partials/controls";
import * as actions from "../../../../../app/actions/generalActions";
import { useSpecificationsUIContext } from "./SpecificationsUIContext";
import { useFilterObjectsUIContext } from "../pages/FilterObjectsUIContext";
import { FormattedMessage, useIntl } from "react-intl";
import { ObjectAllowedCssClasses, ObjectAllowedTitles } from "./SpecificationsUIHelper";


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

export function SpecificationsDeleteDialog({ reduxName, api }) {
  // Specs UI Context
  const specsUIContext = useSpecificationsUIContext();
  const filterUIContext = useFilterObjectsUIContext();

  const specsUIProps = useMemo(() => {
    return {
      parentId: specsUIContext.parentId,
      ids: specsUIContext.ids,
      show: specsUIContext.showDeleteSpecificationsDialog,
      onHide: specsUIContext.closeDeleteSpecificationsDialog,
      setIds: specsUIContext.setIds,
      queryParams: filterUIContext.queryParams,
    };
  }, [specsUIContext, filterUIContext]);


  const { objects, isLoading, name } = useSelector(
    (state) => ({
      objects: selectedObjects(state[reduxName].entities, specsUIProps.ids),
      isLoading: state[reduxName].actionsLoading,
      name: state[reduxName].name
    }),
    shallowEqual
  );


  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  // if there weren't selected specs we should close modal
  useEffect(() => {
    if (!specsUIProps.ids || specsUIProps.ids.length === 0) {
      specsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specsUIProps.ids]);

  const [allowed, setStatus] = useState(false);

  const dispatch = useDispatch();
  const deleteSpecifications = () => {
    // server request for selected deleting specs
    dispatch(actions.updateObjectsAllowed(api, name, specsUIProps.ids, allowed)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchObjects(api, name,
          specsUIProps.queryParams
          // ,specsUIProps.parentId
        )
      ).then(() => {
        specsUIProps.setIds([]);
        specsUIProps.onHide();
      });
    });
  };
  const intl = useIntl();
  return (
    <Modal
      show={specsUIProps.show}
      onHide={specsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          تغییر دسترسی
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/* {!isLoading && (
          <span>
            آیا از تغییر دسترسی موارد انتخاب شده اطمینان دارید؟
          </span>
        )}
        {isLoading && <span>در حال تغییر دسترسی ...</span>} */}
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
                    className={`label label-lg label-light-${ObjectAllowedCssClasses[+object.allowed]
                      } label-inline`}
                    style={{ width: "60px" }}
                  >
                    {object.id}
                  </span>{" "}
                  <span className="ml-5">
                    {/* {object.roleTitle} */}
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
              className={`form-control ${ObjectAllowedCssClasses[allowed]}`}
              value={allowed}
              onChange={(e) => setStatus(+e.target.value)}
            >
              {ObjectAllowedTitles.map((allowed, index) => (
                <option key={allowed} value={index}>
                  {intl.formatMessage({ id: allowed })}
                </option>
              ))}
              {/* <option value="0"><FormattedMessage id="MODULES.GENERAL.STATUSENABLE" /></option>
            <option value="1"><FormattedMessage id= "MODULES.GENERAL.STATUSDELETED"/></option> */}
            </select>
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={specsUIProps.onHide}
              className="btn btn-light btn-elevate"
            >
              <FormattedMessage id="BUTTON.CANCEL" />
            </button>
            <> </>
            <button
              type="button"
              onClick={deleteSpecifications}
              className="btn btn-primary btn-elevate"
            >
              <FormattedMessage id="BUTTON.OK" />
            </button>
          </div>

      
      </Modal.Footer>
    </Modal>
  );
}
