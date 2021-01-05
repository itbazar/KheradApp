import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../_themeBase/_partials/controls";

export function SpecificationsLoadingDialog({reduxName}) {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state[reduxName].listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
