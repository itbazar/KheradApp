import React from "react";
import { QuickUser } from "../../../../_themeBase/layout/components/extras/offcanvas/QuickUser";
import { ListsWidget14 } from "../../../../_themeBase/_partials/widgets";


const  SearchUserPage = () => {
  return (
    <>
      {/* begin::Dashboard */}


      {/* begin::Row */}
      <div className="row">
        <div className="col-xl-6">
        
          {/* <div className="row">
            <div className="col-xl-12">
              <StatsWidget11
                className="gutter-b"
                symbolShape="circle"
                baseColor="danger"
              />
            </div>
            <div className="col-xl-12">
              <StatsWidget10
                className="gutter-b"
                symbolShape="circle"
                baseColor="info"
              />
            </div>
          </div> */}
        </div>
        <div className="col-xl-6">
          <ListsWidget14 className="gutter-b card-stretch" />
        </div>
      </div>
      {/* end::Row */}

    </>
  );
}

export default SearchUserPage
