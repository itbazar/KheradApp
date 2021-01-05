import React, { useMemo } from "react";
import { Field, Formik } from "formik";
import { isEqual } from "lodash";
import { useSpecificationsUIContext } from "./SpecificationsUIContext";
import { useIntl } from 'react-intl';
import { useFilterObjectsUIContext } from "../pages/FilterObjectsUIContext";



export function SpecificationsFilter({ prepareFilter, filterFields, filterInitialValues }) {
  // Specs UI Context
  const specsUIContext = useSpecificationsUIContext();
  const filterUIContext = useFilterObjectsUIContext();


  const intl = useIntl();

  const specsUIProps = useMemo(() => {
    return {
      openNewSpecificationDialog: specsUIContext.openNewSpecificationDialog,
      setQueryParams: filterUIContext.setQueryParams,
      queryParams: filterUIContext.queryParams,
    };
  }, [specsUIContext,filterUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(specsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, specsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      specsUIProps.setQueryParams(newQueryParams);
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
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-12 margin-bottom-10-mobile">
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      {filterFields.map((field, index) => createFields(field, index, values, handleSubmit, handleBlur, handleChange, setFieldValue))}
                    </div>
                    {/* <div>
                      <input
                        type="text"
                        className="form-control"
                        name="searchText"
                        placeholder="Search"
                        onBlur={handleBlur}
                        value={values.searchText}
                        onChange={(e) => {
                          setFieldValue("searchText", e.target.value);
                          handleSubmit();
                        }}
                      />
                      <small className="form-text text-muted">
                        <b>Search</b> in all fields
                    </small>
                    </div> */}
                    {/* <div className="row">

                      {filterFields.map((field, index) =>
                        <div key={field.id} className="col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            name={field.name}
                            placeholder={field.placeholder}
                            onBlur={handleBlur}
                            value={values[field.name]}
                            onChange={(e) => {
                              setFieldValue(field.name, e.target.value);
                              handleSubmit();
                            }}
                          />
                          {/* <small className="form-text text-muted">
                          <b>Search</b> in all fields
                 </small> */}
                    {/* </div> */}

                    {/* )} */}
                    {/* </div> */}



                  </form>
                )}
            </Formik>
          </div>
          {/* <div className="col-md-7 margin-bottom-10-mobile"></div> */}
          {/* <div className="col-md-3 text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => specsUIProps.openNewSpecificationDialog()}
            >
              Create new specification
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
