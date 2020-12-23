import React, { useMemo } from "react";
import { useObjectsUIContext } from "../ObjectsUIContext";
import { useIntl } from 'react-intl';

export function ObjectsGrouping() {
  // Objects UI Context
  const objectsUIContext = useObjectsUIContext();
  const objectsUIProps = useMemo(() => {
    return {
      ids: objectsUIContext.ids,
      setIds: objectsUIContext.setIds,
      openDeleteObjectsDialog: objectsUIContext.openDeleteObjectsDialog,
      openFetchObjectsDialog: objectsUIContext.openFetchObjectsDialog,
      openUpdateObjectsStatusDialog:
        objectsUIContext.openUpdateObjectsStatusDialog,
    };
  }, [objectsUIContext]);

  const intl = useIntl();

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                {intl.formatMessage({ id: 'MODULES.GENERAL.SELECTEDRECORDSCOUNT' })} <b>{objectsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={objectsUIProps.openDeleteObjectsDialog}
              >
                <i className="fa fa-trash"></i>{intl.formatMessage({ id: 'MODULES.GENERAL.BUTTONDELETEALL' })} 
              </button>
              &nbsp;
              {/* <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={objectsUIProps.openFetchObjectsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp; */}
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={objectsUIProps.openUpdateObjectsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> {intl.formatMessage({ id: 'MODULES.GENERAL.BUTTONUPDATESTATUS' })} 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
