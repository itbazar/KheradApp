import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { useSpecificationsUIContext } from "./SpecificationsUIContext";

export function SpecificationsGrouping() {
  // Specs UI Context
  const specsUIContext = useSpecificationsUIContext();
  const specsUIProps = useMemo(() => {
    return {
      ids: specsUIContext.ids,
      openDeleteSpecificationsDialog:
        specsUIContext.openDeleteSpecificationsDialog,
      openFetchSpecificationsDialog:
        specsUIContext.openFetchSpecificationsDialog,
    };
  }, [specsUIContext]);
 
  const intl = useIntl();
  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger mt-5">
                <span> {intl.formatMessage({ id: 'MODULES.GENERAL.SELECTEDRECORDSCOUNT' })}  {specsUIProps.ids.length}</span>
              </label>
            </div>
            <div className="form-group-inline">
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={specsUIProps.openDeleteSpecificationsDialog}
              >
                <i className="fa fa-stream"></i>تغییر دسترسی
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={specsUIProps.openFetchSpecificationsDialog}
              >
                <i className="fa fa-stream"></i>تغییر نوع دسترسی 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
