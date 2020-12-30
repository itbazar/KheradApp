import React, { useEffect, useMemo } from 'react';
import {  useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../../../app/actions/generalActions";
import { Select } from '../../../../_partials/controls';
import { useIntl } from 'react-intl';
import { useObjectsUIContext } from './ObjectsUIContext';


export const SelectObjects = ({api,reduxState,sname,label,...props }) => {
    const objectsUIContext = useObjectsUIContext();
    const objectsUIProps = useMemo(() => {
      return {
        queryParams: objectsUIContext.queryParams,
        setQueryParams: objectsUIContext.setQueryParams,
      };
    }, [objectsUIContext]);

    const { currentState } = useSelector(
        (state) => ({ currentState: state[reduxState] }),
        shallowEqual
      );
      const {  entities, name } = currentState;

    const dispatch = useDispatch();
    //   useEffect(() => {
    //   dispatch(actions.fetchAllObjects(api,name));
    // }, [dispatch]);

    useEffect(() => {
        dispatch(actions.fetchSelectObjects(api,name,objectsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [objectsUIProps.queryParams,dispatch]);

    const intl = useIntl();
    return (
        <Select name={sname} label={label}  {...props}>
             <option key={0} value={0}>
                    {intl.formatMessage({ id: "SELECT.ALL" })}
            </option>
            {entities && entities.map((object, index) => (
                <option key={object.id} value={object.id}>
                    {object.title}
                </option>
            ))}
        </Select>
    )
}