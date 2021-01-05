import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../../../app/actions/generalActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_themeBase/_partials/controls";
import { ObjectsUIProvider } from "../ObjectsUIContext";
import { ObjectEditForm } from "./ObjectEditForm";
import { useSubheader } from "../../../../../../_themeBase/layout";
import { ModalProgressBar } from "../../../../../../_themeBase/_partials/controls";
import { useIntl } from 'react-intl';
import GradePage from "../../../../../../app/modules/BaseInfo/grades/GradePage";
import { FilterObjectsUIProvider } from "../FilterObjectsUIContext";



export function ObjectEdit({
  basePath,
  isFullAccess,
  api,
  prepareFilter,
  currentState,
  initObject,
  formFields,
  otherFields,
  ObjectEditSchema,
  otherTabs,
  history,
  match: {
    params: { id },
  },

}) {
  // Subheader
  const suhbeader = useSubheader();

  const intl = useIntl();
  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState();
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, objectForEdit } = useSelector(
    (state) => ({
      actionsLoading: currentState.actionsLoading,
      objectForEdit: currentState.objectForEdit,
    }),
    shallowEqual
  );

  const { name } = currentState;

  useEffect(() => {
    dispatch(actions.fetchObject(api, name, id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : intl.formatMessage({ id: "MODULES.GENERAL.ADDNEWRECORD" });
    if (objectForEdit && id) {
      _title = intl.formatMessage({ id: "MODULES.GENERAL.ADDNEWRECORD" });
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectForEdit, id]);

  const saveObject = (values) => {
    if (!id) {
      dispatch(actions.createObject(api, name, values)).then(() => backToObjectsList());
    } else {
      dispatch(actions.updateObject(api, name, values)).then(() => backToObjectsList());
    }
  };

  const btnRef = useRef();
  const saveObjectClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToObjectsList = () => {
    history.push(basePath);
  };

  const getTab = (item) => {
     if ((tab === item.tab) && id) {
      return <item.component id={+id} />;
     }
  };

  return (
    <FilterObjectsUIProvider>
      <Card>
        {actionsLoading && <ModalProgressBar />}
        <CardHeader title={title}>
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={backToObjectsList}
              className="btn btn-light"
            >
              <i className="fa fa-arrow-left"></i>
              {intl.formatMessage({ id: "MODULES.GENERAL.BUTTONBACK" })}
            </button>
            {/* {`  `}
            <button className="btn btn-light ml-2" disabled={!isFullAccess}>
              <i className="fa fa-redo"></i>
              {intl.formatMessage({ id: "MODULES.GENERAL.BUTTONRESET" })}
            </button> */}
            {`  `}
            <button
              type="submit"
              className="btn btn-primary ml-2"
              onClick={saveObjectClick}
              disabled={!isFullAccess}
            >
              {intl.formatMessage({ id: "MODULES.GENERAL.BUTTONSAVE" })}

            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ul className="nav nav-otherTabs nav-otherTabs-line " role="tablist">
            <li className="nav-item" onClick={() => setTab("basic")}>
              <a
                className={`nav-link ${tab === "basic" && "active"}`}
                data-toggle="tab"
                role="tab"
                aria-selected={(tab === "basic").toString()}
              >
                {intl.formatMessage({ id: "ASID.TABS.BASEINFO" })}

              </a>
            </li>

            {otherTabs && otherTabs.map(curTab =>
              <>
                {" "}
                <li key={curTab.id} className="nav-item" onClick={() => setTab(curTab.tab)}>
                  <a
                    className={`nav-link ${tab === curTab.tab && "active"}`}
                    data-toggle="tab"
                    role="button"
                    aria-selected={(tab === curTab.tab).toString()}
                  >
                    {intl.formatMessage({ id: curTab.title })}
                  </a>
                </li>
              </>
            )}


          </ul>
          <div className="mt-5">

            {tab === "basic" && (
              <ObjectEditForm
                actionsLoading={actionsLoading}
                object={objectForEdit || initObject}
                btnRef={btnRef}
                saveObject={saveObject}
                formFields={formFields}
                otherFields={otherFields}
                ObjectEditSchema={ObjectEditSchema}
                isFullAccess={isFullAccess}
                prepareFilter={prepareFilter}
              />

            )}
            

            {otherTabs && tab !== "basic" && otherTabs.map(item =>
              getTab(item)
            )}

          </div>
        </CardBody>
      </Card>
    </FilterObjectsUIProvider>
  );
}
