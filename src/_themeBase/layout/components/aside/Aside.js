/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/BaseLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import { AsideSearch } from "./AsideSearch";
import { AsideMenu } from "./aside-menu/AsideMenu";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuickUserToggler";
import { Brand } from "../brand/Brand";
import { KTUtil } from "./../../../_assets/js/components/util";
import { FormattedMessage } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";

// description: "اطلاعات پایه"
// hasSubMenu: false
// iconUrl: "/media/svg/icons/Code/Settings4.svg"
// isFullAccess: true
// isTabMenu: true
// parentMenuId: 1
// tabId: 0
// title: "ASID.TABS.BASEINFO"
// url: "/baseInfo"

const initialMenus = [
  { id: 1, isTabMenu: true, tabId: 0, title: "ASID.TABS.BASEINFO", url: '/baseInfo', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Code/Settings4.svg' },
  { id: 2, isTabMenu: true, tabId: 0, title: "ASID.TABS.CULLINAN", url: '/cullinan', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Cooking/Chef.svg' },
  { id: 3, isTabMenu: true, tabId: 0, title: "ASID.TABS.DORMITORY", url: '/dormitory', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Home/Bed.svg' },
  { id: 4, isTabMenu: true, tabId: 0, title: "ASID.TABS.ATTENDANCE", url: '/attendance', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Communication/Group.svg' },
  { id: 5, isTabMenu: true, tabId: 0, title: "ASID.TABS.SPORT", url: '/sport', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Clothes/T-Shirt.svg' },

  { id: 6, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.DASHBOARD", url: '/dashboard', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Design/Layers.svg' },
  { id: 7, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.SETTING", url: '', hasSubMenu: false, parentMenuId: 0, iconUrl: '' },
  // { id: 6, isTabMenu: false, tabId: 1, title: "راهبری عمومی", url: '\UniInfo', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Code/Settings4.svg' },
  { id: 8, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.UNIINFO", url:'/uni', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Home/Towel.svg' },
  { id: 9, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.TERMS", url: '/terms', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Code/Time-schedule.svg' },
  { id: 10, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.GRADES", url: '/grades', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Code/Puzzle.svg' },
  { id: 11, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.COLLAGES", url: '/collages', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Home/Home.svg' },
  { id: 12, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.GROUPS", url: '/groups', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Communication/Group.svg' },
  { id: 13, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.DORMS", url: '/dorms', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Home/Home.svg' },
  { id: 14, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.ACCOUNTS", url: '/accounts', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Communication/Group.svg' },
  { id: 15, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.SHIFTS", url: '/shifts', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Communication/Group.svg' },
  { id: 16, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.YEARCALENDAR", url: '/calendar', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Communication/Group.svg' },
  { id: 17, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.DEVICES", url: '/devices', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Communication/Group.svg' },
  { id: 18, isTabMenu: false,isFullAccess: true, tabId: 1, title: "ASID.TABS.BASEINFO.PERSONS", url: '/persons', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Communication/Group.svg' },
 
];

// const initialMenus2 = [
//   { id: 1, title: "پیشخوان", url: '\dashboard', hasSubMenu: false, parentMenuId: 0, iconUrl: '/media/svg/icons/Design/Layers.svg' },
//   { id: 2, title: "راهبری سیستم", url: '', hasSubMenu: false, parentMenuId: 0, iconUrl: '' },
//   { id: 3, title: "اطلاعات پایه", url: '', hasSubMenu: true, parentMenuId: 0, iconUrl: '/media/svg/icons/Design/Cap-2.svg' },
//   { id: 4, title: "گروه ها", url: '', hasSubMenu: true, parentMenuId: 3, iconUrl: '/media/svg/icons/Design/Layers.svg' },
//   { id: 5, title: "تعریف گروه ها", url: '/e-commerce/customers', hasSubMenu: false, parentMenuId: 4, iconUrl: '/media/svg/icons/Design/Layers.svg' },
//   { id: 6, title: "تنظیمات گروه ها", url: '/e-commerce/customers', hasSubMenu: false, parentMenuId: 4, iconUrl: '/media/svg/icons/Design/Layers.svg' },
//   { id: 7, title: "شیفت های کاری", url: '/react-bootstrap', hasSubMenu: true, parentMenuId: 0, iconUrl: '/media/svg/icons/Shopping/Box2.svg' },
//   { id: 8, title: "تعریف شیفت ها", url: '/react-bootstrap/badge', hasSubMenu: false, parentMenuId: 7, iconUrl: '/media/svg/icons/Shopping/Box2.svg' },
//   { id: 9, title: "تنظیمات شیفت ها", url: '/react-bootstrap/alert', hasSubMenu: false, parentMenuId: 7, iconUrl: '/media/svg/icons/Shopping/Box2.svg' },

// ];


export function Aside() {

  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

 
 const { menuList2 } = useSelector(
    (state) => ({ menuList2: state.auth.menu }),
    shallowEqual
  );
  console.log("menuList2 :")
  console.log(menuList2)
 
  const tabsTrget = [
    "kt_aside_tab_1",
    "kt_aside_tab_2",
    "kt_aside_tab_3",
    "kt_aside_tab_4",
    "kt_aside_tab_5"
  ];

  const tabs = {
    tabId1: "kt_aside_tab_1",
    tabId2: "kt_aside_tab_2",
    tabId3: "kt_aside_tab_3",
    tabId4: "kt_aside_tab_4",
    tabId5: "kt_aside_tab_5",
  };

  // console.log(tabs.tabId1)
  // console.log(tabs.tabId2)
  // console.log(tabs.tabId3)
  // console.log(tabs.tabId1)

  const [menuList, setMenuList] = React.useState(initialMenus);

  const [activeTab, setActiveTab] = useState(tabs.tabId1);
  const handleTabChange = (id) => {
    setActiveTab(id);
    const asideWorkspace = KTUtil.find(
      document.getElementById("kt_aside"),
      ".aside-secondary .aside-workspace"
    );
    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    }
  };

  return (
    <>
      {/* begin::Aside */}
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          {/* begin::Nav Wrapper */}
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">

              {
                menuList.filter(q => q.isTabMenu).map((tab, index) =>
                  <li key={tab.id}
                    className="nav-item mb-3"
                    data-toggle="tooltip"
                    data-placement="rigth"
                    data-container="body"
                    data-boundary="window"
                    title="Features"
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="features"> <FormattedMessage id={tab.title} /> </Tooltip>
                      }
                    >
                      <a
                        href="#"
                        className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                          tabsTrget[index] && "active"}`}
                        data-toggle="tab"
                        data-target={tabsTrget[index]}
                        onClick={() => handleTabChange(tabsTrget[index])}
                        role="tab"
                      >
                        <span className="svg-icon svg-icon-lg">
                          <SVG src={toAbsoluteUrl( tab.iconUrl  )}  />
                        </span>
                      </a>
                    </OverlayTrigger>
                  </li>
                )
              }

            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}

          {/* begin::Footer */}
          <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
            {/* begin::Aside Toggle */}
            {layoutProps.asideSecondaryDisplay &&
              layoutProps.asideSelfMinimizeToggle && (
                <>
                  <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip id="toggle-aside"></Tooltip>}
                  >
                    <span
                      className="aside-toggle btn btn-icon btn-light btn-hover-primary shadow-sm"
                      id="kt_aside_toggle"
                    >
                      <i className="ki ki-bold-arrow-back icon-sm" />
                    </span>
                  </OverlayTrigger>
                </>
              )}
            {/* end::Aside Toggle */}

            {/* begin::Search */}
            {layoutProps.extrasSearchDisplay && (
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="toggle-search">جستجوی سریع</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_search_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Search */}

            {/* begin::Notifications */}
            {layoutProps.extrasNotificationsDisplay && (
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip id="toggle-notifications">اعلان ها</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_notifications_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Notifications */}

            {/* begin::Quick Actions */}
            {/* {layoutProps.extrasQuickActionsDisplay && (
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip id="toggle-quick-actions">دسترسی سریع</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_actions_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Media/Equalizer.svg"
                      )}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )} */}
            {/* end::Quick Actions */}

            {/* begin::Quick Panel */}
            {/* {layoutProps.extrasQuickPanelDisplay && (
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="toggle-quick-panel">پنل دسترسی سریع</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_panel_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Layout/Layout-4-blocks.svg"
                      )}
                    />
                  </span>
                  <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top-0 right-0 mt-1 mr-1">
                    3
                  </span>
                </a>
              </OverlayTrigger>
            )} */}
            {/* end::Quick Panel */}

            {/* begin::Languages*/}
            {/* {layoutProps.extrasLanguagesDisplay && <LanguageSelectorDropdown />} */}
            {/* <LanguageSelectorDropdown /> */}
            {/* end::Languages */}

            {/* begin::User*/}
            {layoutProps.extrasUserDisplay && <QuickUserToggler />}
            {/* end::User */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Primary */}

        {layoutProps.asideSecondaryDisplay && (
          <>
            {/* begin::Secondary */}
            <div className="aside-secondary d-flex flex-row-fluid">
              {/* begin::Workspace */}
              <div className="aside-workspace scroll scroll-push my-2">
                <div className="tab-content bg-transparent" >

                  {
                    menuList.filter(q => q.isTabMenu).map((tab, index) =>
                      <AsideMenu key={tab.id} menuList={menuList.filter(q => q.tabId === tab.id)} isActive={activeTab === tabsTrget[index]} />
                    )
                  }

                  {/* <AsideMenu menuList={menuList} isActive={activeTab === tabs.tabId1} />
                  <AsideSearch isActive={activeTab === tabs.tabId2} />
                  <AsideMenu menuList={menuList} isActive={activeTab === tabs.tabId3} />
                  <AsideSearch isActive={activeTab === tabs.tabId4} />
                  <AsideMenu menuList={menuList} isActive={activeTab === tabs.tabId5} /> */}
                  {/* <AsideSearch isActive={activeTab === tabs.tabId2} /> */}

                </div>
              </div>
              {/* end::Workspace */}
            </div>
            {/* end::Secondary */}
          </>
        )}
      </div>
      {/* end::Aside */}
    </>
  );
}
