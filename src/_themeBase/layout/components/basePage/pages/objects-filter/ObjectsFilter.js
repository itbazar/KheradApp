import React, { useMemo } from "react";
import { Field, Formik } from "formik";
import { isEqual } from "lodash";
import { useObjectsUIContext } from "../ObjectsUIContext";
import { Input } from "@material-ui/core";
import { useIntl } from 'react-intl';


export function ObjectsFilter({ listLoading, prepareFilter, filterFields, filterInitialValues }) {
  // Objects UI Context
  const objectsUIContext = useObjectsUIContext();
  const intl = useIntl();
  const objectsUIProps = useMemo(() => {
    return {
      setQueryParams: objectsUIContext.setQueryParams,
      queryParams: objectsUIContext.queryParams,
    };
  }, [objectsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(objectsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, objectsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      objectsUIProps.setQueryParams(newQueryParams);
    }

  };


  const createFields = (item, index, values, handleSubmit, handleBlur, handleChange, setFieldValue) => {

    if (item.type === "select") {
      return (
        <div className="col-lg-2" key={index}>
          <select
            className="form-control"
            placeholder={intl.formatMessage({ id: "MODULES.GENERAL.ADDNEWRECORD" })}
            name={item.name}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue(item.name, e.target.value);
              handleSubmit();
            }}
            value={values[item.name]}
          >
            {item.list.map((opt, idx) => <option key={idx} value={opt.value}>{intl.formatMessage({ id: opt.lable })}</option>)}

          </select>
          <small className="form-text text-muted">
            <b>{intl.formatMessage({ id: "MODULES.GENERAL.FILTER" })} </b>  {intl.formatMessage({ id: item.lable })} 
          </small>
        </div>
      );
    }
    else if (item.type === "text") {
      return (
        <div className="col-lg-2" key={index}>
          <input
            type="text"
            className="form-control"
            name={item.name}
            placeholder={intl.formatMessage({ id: item.lable })} 
            onBlur={handleBlur}
            value={values[item.name]}
            onChange={(e) => {
              setFieldValue(item.name, e.target.value);
              handleSubmit();
            }}
          />

          <small className="form-text text-muted">
            <b>{intl.formatMessage({ id: "MODULES.GENERAL.FILTER" })} </b> {intl.formatMessage({ id: item.lable })} 
          </small>
        </div>
      );
    }
    else if (item.type === "component") {
      return (
        <div className="col-lg-2" key={index}>
          <Field
            name={item.name}
            component={item.component}
            placeholder={intl.formatMessage({ id: item.lable })} 
            onBlur={handleBlur}
            value={values[item.name]}
            onChange={(e) => {
              console.log("e.target.value")
              console.log(e.target.value)
              setFieldValue(item.name, e.target.value);
              handleSubmit();
            }}
           
            // InputProps={{onBlur:handleBlur , onChange:(e) => {
            //   console.log("e.target.value")
            //   console.log(e.target.value)
            //   setFieldValue(item.name, e.target.value);
            //   handleSubmit();
            // }}}

          />
          <small className="form-text text-muted">
            <b>{intl.formatMessage({ id: "MODULES.GENERAL.FILTER" })} </b> {intl.formatMessage({ id: item.lable })} 
          </small>
        </div>
      );
    }
  };


  return (
    <>
      <Formik
        initialValues={filterInitialValues}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row">
                {filterFields.map((field, index) => createFields(field, index, values, handleSubmit, handleBlur, handleChange, setFieldValue))}
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
