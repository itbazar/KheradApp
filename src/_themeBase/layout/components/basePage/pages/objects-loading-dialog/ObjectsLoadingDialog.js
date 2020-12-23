import React, {useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {LoadingDialog} from "../../../../../../_themeBase/_partials/controls";

export function ObjectsLoadingDialog({listLoading}) {
  const { isLoading } = useSelector(
    state => ({ isLoading: listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
