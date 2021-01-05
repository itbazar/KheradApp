import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../app/actions/generalActions";
import { SpecificationEditDialogHeader } from "./SpecificationEditDialogHeader";
import { SpecificationEditForm } from "./SpecificationEditForm";
import { useSpecificationsUIContext } from "../SpecificationsUIContext";
import { useFilterObjectsUIContext } from "../../pages/FilterObjectsUIContext";

export function SpecificationEditDialog({reduxName,api}) {
  // Specifications UI Context
  const specsUIContext = useSpecificationsUIContext();
  const filterUIContext = useFilterObjectsUIContext();

  const specsUIProps = useMemo(() => {
    return {
      id: specsUIContext.selectedId,
      show: specsUIContext.showEditSpecificationDialog,
      onHide: specsUIContext.closeEditSpecificationDialog,
      parentId: specsUIContext.parentId,
      queryParams: filterUIContext.queryParams,
      initSpecification: specsUIContext.initSpecification,
    };
  }, [specsUIContext,filterUIContext]);

  // Specifications Redux state
  const dispatch = useDispatch();
  const { actionsLoading, specificationForEdit,name } = useSelector(
    (state) => ({
      actionsLoading: state[reduxName].actionsLoading,
      specificationForEdit: state[reduxName].specificationForEdit,
    }),
    shallowEqual
  );

  // useEffect(() => {
  //   // server request for getting spec by seleted id
  //   dispatch(actions.fetchObject(api,name,specsUIProps.id));
  // }, [specsUIProps.id, dispatch]);

  const saveSpecification = (specification) => {
    if (!specsUIProps.id) {
      dispatch(actions.createObject(api,name,specification)).then(() => {
        dispatch(
          actions.fetchObjects(api,name,
            specsUIProps.queryParams
            // ,specsUIProps.parentId
          )
        ).then(() => specsUIProps.onHide());
      });
    } else {
      dispatch(actions.updateObject(api,name,specification)).then(() => {
        dispatch(
          actions.fetchObjects(api,name,
            specsUIProps.queryParams
            // ,specsUIProps.parentId
          )
        ).then(() => specsUIProps.onHide());
      });
    }
  };

  return (
    <Modal
      show={specsUIProps.show}
      onHide={specsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <SpecificationEditDialogHeader id={specsUIProps.id} />
      <SpecificationEditForm
        saveSpecification={saveSpecification}
        actionsLoading={actionsLoading}
        specification={specificationForEdit || specsUIProps.initSpecification}
        onHide={specsUIProps.onHide}
      />
    </Modal>
  );
}
