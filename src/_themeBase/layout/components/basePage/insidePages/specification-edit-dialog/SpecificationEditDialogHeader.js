/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_themeBase/_partials/controls";

export function SpecificationEditDialogHeader({ id,reduxName }) {
  const [title, setTitle] = useState("");
  // Specs Redux state
  const { specificationForEdit, actionsLoading } = useSelector(
    (state) => ({
      specificationForEdit: state[reduxName].specificationForEdit,
      actionsLoading: state[reduxName].actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "New Specification";
    if (specificationForEdit && id) {
      _title = "Edit Specification";
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [specificationForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
