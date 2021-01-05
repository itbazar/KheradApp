/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_themeBase/_partials/controls";
import * as actions from "../../../../../../app/actions/generalActions";
import { useObjectsUIContext } from "../ObjectsUIContext";
import { useFilterObjectsUIContext } from "../FilterObjectsUIContext";

export function ObjectDeleteDialog({api, id, show, onHide,currentState}) {
  // Objects UI Context
  const objectsUIContext = useObjectsUIContext();
  const filterUIContext = useFilterObjectsUIContext();
  const objectsUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const {name } = currentState;
  // console.log("delete slice name :")
  // console.log(name)

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);
  const deleteObject = () => {
    // server request for deleting object by id
    dispatch(actions.deleteObject(api,name,id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchObjects(api,name,objectsUIProps.queryParams));
      // clear selections list
      objectsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          حذف رکورد
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>آیا از حذف اطمینان دارید؟</span>
        )}
        {isLoading && <span>در حال حذف...</span>}
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
            onClick={deleteObject}
            className="btn btn-primary btn-elevate"
          >
            حذف
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
