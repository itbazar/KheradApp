import React from "react";
import {toAbsoluteUrl} from "../../../_themeBase/_helpers";

export function ErrorPage2() {
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/error/bg2.jpg")})`
        }}
      >
        <div className="d-flex flex-row-fluid flex-column justify-content-end align-items-center text-center text-white pb-40">
          <h1 className="display-1 font-weight-bold">کاربر گرامی!</h1>
          <span className="display-4 font-weight-boldest mb-8">
            شما به صفحه مورد نظر دسترسی ندارید.
          </span>
        </div>
      </div>
    </div>
  );
}
