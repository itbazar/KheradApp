/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_themeBase/_partials/controls";
import * as actions from "../../../../../../app/actions/generalActions";
import { useObjectsUIContext } from "../ObjectsUIContext";
import { useFilterObjectsUIContext } from "../FilterObjectsUIContext";

export function ObjectsDeleteDialog({api, show, onHide,currentState }) {
  // Objects UI Context
  const objectsUIContext = useObjectsUIContext();
  const filterUIContext = useFilterObjectsUIContext();

  const objectsUIProps = useMemo(() => {
    return {
      ids: objectsUIContext.ids,
      setIds: objectsUIContext.setIds,
      queryParams: filterUIContext.queryParams,
    };
  }, [objectsUIContext,filterUIContext]);

  // Objects Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: currentState.actionsLoading }),
    shallowEqual
  );

  const {name } = currentState;

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected objects we should close modal
  useEffect(() => {
    if (!objectsUIProps.ids || objectsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsUIProps.ids]);

  const deleteObjects = () => {
    // server request for deleting object by seleted ids
    dispatch(actions.deleteObjects(api,name,objectsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchObjects(api,name,objectsUIProps.queryParams)).then(() => {
        // clear selections list
        objectsUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          حذف چند تایی
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>آیا از حذف موارد انتخاب شده اطمینان دارید ؟</span>
        )}
        {isLoading && <span>در حال حذف ...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
           انصراف
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteObjects}
            className="btn btn-primary btn-elevate"
          >
            حذف همه
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
