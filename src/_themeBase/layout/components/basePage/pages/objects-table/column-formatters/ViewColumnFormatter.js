/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_themeBase/_helpers";



export const ViewColumnFormatter = (
  cellContent,
  row,
  rowIndex,
   { openEditObjectPage }
) => (
    <>
      
    <OverlayTrigger
      overlay={<Tooltip id="objects-view-tooltip">مشاهده</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-info btn-sm mx-3"
        onClick={() => openEditObjectPage(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-info">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>
   
    </>
  );
