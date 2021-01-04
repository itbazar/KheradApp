/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { FormattedMessage } from "react-intl";




export const AsideMenuList = ({ layoutProps ,menuList }) => {

  // const [menuList, setMenuList] = React.useState(initialMenus);

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  const getTypeMenu = (item) => {

    if (item.parentMenuId === 1) {
      if (item.hasSubMenu) {
        console.log(item)
        return <SubMenu key={item.id} menu={item} menuList={[...menuList]} />;
      }
      else {
        if (item.url === "") {
          return <SectionMenuItem key={item.id} menu={item} />;
        }
        else {
          return <MenuItem key={item.id} menu={item} />;
        }
      }
    }
  };

  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {
          menuList.map(menu =>
            getTypeMenu(menu)
          )
        }

      </ul>

    </>
  );
}


export const MenuItem = ({ menu }) => {

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <li key={menu.id}
      className={`menu-item ${getMenuItemActive(menu.url, menu.hasSubMenu)}`}
      aria-haspopup="true"
    >
      <NavLink className="menu-link" to={menu.url}>
        <span className="svg-icon menu-icon">
          <SVG src={toAbsoluteUrl(menu.iconUrl)} />
        </span>
        <span className="menu-text"><FormattedMessage id={menu.title} /></span>
      </NavLink>
    </li>
  )
}

export const SubMenuItem = ({ menu }) => {

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <li
      className={`menu-item ${getMenuItemActive(
        menu.url
      )}`}
      aria-haspopup="true"
    >
      <NavLink className="menu-link" to={menu.url}>
        <i className="menu-bullet menu-bullet-dot">
          <span />
        </i>
        <span className="menu-text"><FormattedMessage id={menu.title} /></span>
      </NavLink>
    </li>
  )
}

export const SectionMenuItem = ({ menu }) => {
  return (
    <li className="menu-section ">
      <h4 className="menu-text"><FormattedMessage id={menu.title} /></h4>
      <i className="menu-icon flaticon-more-v2" />
    </li>
  )
}

export const SubMenu = ({ menu, menuList }) => {

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  const getTypeMenu = (item) => {
    if (item.hasSubMenu) {
      return <SubMenu key={item.id} menu={item} menuList={[...menuList.filter(q => q.parentMenuId === item.id)]} />;
    }
    else {
      return <SubMenuItem key={item.id} menu={item} />;
    }
  };

  return (
    <li
      className={`menu-item menu-item-submenu ${getMenuItemActive(
        menu.url, true
      )}`}
      aria-haspopup="true"
      data-menu-toggle="hover"
    >
      <NavLink className="menu-link menu-toggle" to={menu.url}>
        <span className="svg-icon menu-icon">
          <SVG src={toAbsoluteUrl(menu.iconUrl)} />
        </span>
        <span className="menu-text"><FormattedMessage id={menu.title} /></span>
        <i className="menu-arrow" />
      </NavLink>

      <div className="menu-submenu ">
        <i className="menu-arrow" />
        <ul className="menu-subnav">
          <li className="menu-item  menu-item-parent" aria-haspopup="true">
            <span className="menu-link">
              <span className="menu-text"><FormattedMessage id={menu.title} /></span>
            </span>
          </li>
          {
            menuList.filter(q => q.parentMenuId === menu.id).map(child =>
              getTypeMenu(child)
            )
          }

        </ul>
      </div>
    </li>
    // <li
    //   className={`menu-item menu-item-submenu ${getMenuItemActive(
    //     menu.url, true
    //   )}`}
    //   aria-haspopup="true"
    //   data-menu-toggle="hover"
    // >
    //   <NavLink className="menu-link menu-toggle" to={menu.url}>
    //     <span className="svg-icon menu-icon">
    //       <SVG src={toAbsoluteUrl(menu.url)} />
    //     </span>
    //     <span className="menu-text">{menu.title}</span>
    //     <i className="menu-arrow" />
    //   </NavLink>

    //   <div className="menu-submenu ">
    //     <i className="menu-arrow" />
    //     <ul className="menu-subnav">
    //       <li className="menu-item  menu-item-parent" aria-haspopup="true">
    //         <span className="menu-link">
    //           <span className="menu-text">{menu.title}</span>
    //         </span>
    //       </li>

    //       {
    //         menuList.filter(q => q.parentMenuId === menu.id).map(child =>
    //           getTypeMenu(child)
    //         )
    //       }

    //     </ul>
    //   </div>
    // </li>


  )
}

export const SubMenuBullet = ({ menu, menuList }) => {

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  const getTypeMenu = (item) => {
    if (item.hasSubMenu) {
      return <SubMenu key={item.id} menu={item} menuList={[...menuList.filter(q => q.parentMenuId === item.id)]} />;
    }
    else {
      return <SubMenuItem key={item.id} menu={item} />;
    }
  };

  return (
    <li
      className={`menu-item menu-item-submenu ${getMenuItemActive(
        menu.url, true
      )}`}
      aria-haspopup="true"
      data-menu-toggle="hover"
    >
      <NavLink className="menu-link menu-toggle" to={menu.url}>
        <i className="menu-bullet menu-bullet-dot">
          <span />
        </i>
        <span className="menu-text"><FormattedMessage id={menu.title} /></span>
        <i className="menu-arrow" />
      </NavLink>
      <div className="menu-submenu ">
        <i className="menu-arrow" />
        <ul className="menu-subnav">
          {
            menuList.filter(q => q.parentMenuId === menu.id).map(child =>
              getTypeMenu(child)
            )
          }

        </ul>
      </div>
    </li>



  )
}

