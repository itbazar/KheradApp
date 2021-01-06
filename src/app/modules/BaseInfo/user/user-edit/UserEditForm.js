import React, { useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useIntl } from "react-intl";
import { isEqual } from "lodash";
import { useFilterObjectsUIContext } from "../../../../../_themeBase/layout/components/basePage/pages/FilterObjectsUIContext";

export const UserEditForm = ({
  formFields,
  otherFields,
  ObjectEditSchema,
  object,
  btnRef,
  saveObject,
  isFullAccess,
  prepareFilter,
}) => {
  const filterUIContext = useFilterObjectsUIContext();
  const objectsUIProps = useMemo(() => {
    return {
      queryParams: filterUIContext.queryParams,
      setQueryParams: filterUIContext.setQueryParams,
    };
  }, [filterUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(objectsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, objectsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      objectsUIProps.setQueryParams(newQueryParams);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const temp = { ...object };
    temp[input.name] = input.value;
    applyFilter(temp);
    // setData(temp)
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={object}
        validationSchema={ObjectEditSchema}
        onSubmit={(values) => {
          saveObject(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              {formFields.map((formRow) => (
                <div key={formRow.row} className="form-group row">
                  {formRow.list.map((field, index) => (
                    <div key={index} className={field.class}>
                      <Field
                        name={field.name}
                        component={field.component}
                        placeholder={intl.formatMessage({
                          id: field.placeholder,
                        })}
                        label={intl.formatMessage({ id: field.label })}
                        type={field.type}
                        as={field.as}
                        disabled={!isFullAccess}
                        // onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              ))}

              {otherFields.map((ofield, index) => (
                <div key={index} className="form-group">
                  <label>{intl.formatMessage({ id: ofield.lable })}</label>
                  <Field
                    name={ofield.name}
                    as={ofield.as}
                    className={ofield.class}
                    disabled={!isFullAccess}
                  />
                </div>
              ))}

              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
