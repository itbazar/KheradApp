import React, { useEffect, useMemo } from 'react';
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../../../app/actions/generalActions";
import { useIntl } from 'react-intl';
import { useObjectsUIContext } from './ObjectsUIContext';
import { MultiSelectField } from '../../../../_partials/controls/forms/MultiSelectField';
import Select from 'react-select'
import { useFilterObjectsUIContext } from './FilterObjectsUIContext';



export const MultiSelectObjects = ({ api, reduxState, sname, label, ...props }) => {
  // const objectsUIContext = useObjectsUIContext();
  const objectsUIContext = useFilterObjectsUIContext();
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
  const { entities, name } = currentState;

  const dispatch = useDispatch();
  //   useEffect(() => {
  //   dispatch(actions.fetchAllObjects(api,name));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(actions.fetchSelectObjects(api, name, objectsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsUIProps.queryParams, dispatch]);

  const intl = useIntl();
  return (
    <Select options={entities}  {...props}>
      {/* {!label && <option key={0} value={0}>
        {intl.formatMessage({ id: "SELECT.ALL" })}
      </option>
      }
      {entities && entities.map((object, index) => (
        <option key={object.id} value={object.id}>
          {object.title}
        </option>
      ))} */}
    </Select>
  )
}