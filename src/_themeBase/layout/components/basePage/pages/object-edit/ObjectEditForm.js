import React from "react";
import { Formik, Form, Field } from "formik";
import * as columnFormatters from "../../pages/objects-table/column-formatters";

import DatePickerFieldJalali from "../../../../../_partials/controls/forms/DatePickerFieldJalali";
import { useLang } from "../../../../../i18n/Basei18n";
import { useIntl } from 'react-intl';


export const ObjectEditForm = ({
  formFields,
  otherFields,
  ObjectEditSchema,
  object,
  btnRef,
  saveObject,
  isFullAccess,
}) => {

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
              {formFields.map(formRow =>
                <div key={formRow.row} className="form-group row">
                  {formRow.list.map((field, index) =>
                    <div key={index} className={field.class}>
                      <Field
                        name={field.name}
                        component={field.component}
                        placeholder={intl.formatMessage({ id: field.placeholder })}
                        label={intl.formatMessage({ id: field.label })}
                        type={field.type}
                        as={field.as}
                        disabled={!isFullAccess}
                      />
                    </div>
                  )}
                </div>
              )}

              {otherFields.map((ofield, index) =>
                <div key={index} className="form-group">
                  <label>{intl.formatMessage({ id: ofield.lable})}</label>
                  <Field
                    name={ofield.name}
                    as={ofield.as}
                    className={ofield.class}
                    disabled={!isFullAccess}
                  />
                </div>
              )}
 
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
}




