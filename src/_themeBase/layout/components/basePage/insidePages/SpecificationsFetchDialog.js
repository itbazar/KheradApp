import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useFilterObjectsUIContext } from "../pages/FilterObjectsUIContext";
import { useSpecificationsUIContext } from "./SpecificationsUIContext";
import { ObjectFullAccessCssClasses, ObjectFullAccessTitles } from "./SpecificationsUIHelper";
import * as actions from "../../../../../app/actions/generalActions";


const selectedSpecifications = (entities, ids) => {
  const _specifications = [];
  ids.forEach((id) => {
    const specification = entities.find((el) => el.id === id);
    if (specification) {
      _specifications.push(specification);
    }
  });
  return _specifications;
};

export function SpecificationsFetchDialog({reduxName,api}) {
  // Specs UI Context
  const specsUIContext = useSpecificationsUIContext();
  const filterUIContext = useFilterObjectsUIContext();

  const specsUIProps = useMemo(() => {
    return {
      ids: specsUIContext.ids,
      show: specsUIContext.showFetchSpecificationsDialog,
      onHide: specsUIContext.closeFetchSpecificationsDialog,
      setIds: specsUIContext.setIds,
      queryParams: filterUIContext.queryParams,
    };
  }, [specsUIContext,filterUIContext]);

  const { specifications, isLoading, name } = useSelector(
    (state) => ({
      specifications: selectedSpecifications(state[reduxName].entities, specsUIProps.ids),
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

 const [isFullAccess, setStatus] = useState(false);

 const dispatch = useDispatch();
 const updateSpecifications = () => {
   // server request for selected deleting specs
   dispatch(actions.updateObjectsFullAccess(api, name, specsUIProps.ids, isFullAccess)).then(() => {
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
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
        تغییر دسترسی
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
          {specifications.map((object) => (
              <div className="list-timeline-item mb-3" key={object.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${ObjectFullAccessCssClasses[+object.isFullAccess]
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
      <Modal.Footer>
      <div className="form-group">
            <select
              className={`form-control ${ObjectFullAccessCssClasses[isFullAccess]}`}
              value={isFullAccess}
              onChange={(e) => setStatus(+e.target.value)}
            >
              {ObjectFullAccessTitles.map((isFullAccess, index) => (
                <option key={isFullAccess} value={index}>
                  {intl.formatMessage({ id: isFullAccess })}
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
              onClick={updateSpecifications}
              className="btn btn-primary btn-elevate"
            >
              <FormattedMessage id="BUTTON.OK" />
            </button>
          </div>
      </Modal.Footer>
    </Modal>
  );
}
