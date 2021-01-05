/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Link, Switch, Redirect} from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_themeBase/_helpers";
import {ContentRoute} from "../../../../_themeBase/layout"
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_themeBase/_assets/sass/pages/login/classic/login-1.scss";
import CardSlider from "../../../../_themeBase/layout/components/common/cardSlider/cardSlider";
import { LanguageSelectorDropdown } from "../../../../_themeBase/layout/components/extras/dropdowns/LanguageSelectorDropdown";
import SetLayout from "../../../SetLayout";
import { FormattedMessage } from "react-intl";




const cards = [
  {
    "image": "/images/cardSlides/etebari.jpg",
    "title": "خدمات اعتباری",
    "subtitle": "Advertising"
  },
  {
    "image": "/images/cardSlides/kar_daneshjooi.jpg",
    "title": "کار دانشجویی",
    "subtitle": "Sound & Vision"
  },
  {
    "image": "/images/cardSlides/taradod.jpg",
    "title": "حضور و غیاب پرسنل",
    "subtitle": "Accounting"
  },
  {
    "image": "/images/cardSlides/etebari.jpg",
    "title": "خدمات اعتباری",
    "subtitle": "Advertising"
  },
  {
    "image": "/images/cardSlides/kar_daneshjooi.jpg",
    "title": "کار دانشجویی",
    "subtitle": "Sound & Vision"
  },
  {
    "image": "/images/cardSlides/taradod.jpg",
    "title": "حضور و غیاب پرسنل",
    "subtitle": "Accounting"
  }
];

export const AuthPage = () => {
  return (
    <>
      {/* <SetLayout /> */}
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
            className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-dark"
            id="kt_login"
        >
          {/*begin::Aside*/}
          <div
              className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
             
          >
            {/*begin: Aside Container*/}
            
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-2">
                <img
                    alt="Logo"
                    className="max-h-70px"
                    src={toAbsoluteUrl("/images/Logo/CullinanLogo.png")}
                />
              </Link>
             
              {/* <Link to="/" className="flex-column-auto mt-2">
                <img
                    alt="LogoRefah"
                    className="max-h-100px"
                    src={toAbsoluteUrl("/images/Logo/logo_swf.png")}
                />
              </Link> */}
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
            
                {/* <h3 className="font-size-h1 mb-5 text-white">
                  Welcome to Kherad!
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  The ultimate Bootstrap & React 16 admin theme framework for next
                  generation web apps.
                </p> */}
                {/* <CardSlider data={cards} /> */}
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  &copy; <FormattedMessage id="COPY.WRITE.BEFORE" />{" "}
            <Link to="http://padide-af.com/" target="_blank" className="text-primary">
            <FormattedMessage id="COMPANY.NAME" />
                 </Link>{" "}
                 <FormattedMessage id="COPY.WRITE.AFTER" />
                </div>
              </div>

              {/* <div className="d-none flex-column-auto d-flex ">
                <div className="opacity-70 font-weight-bold	text-white">
                Powered by{" "}
             <Link to="http://padide-af.com/" target="_blank" className="t3 text-success">
               <span>7Diamonds</span>
             </Link>
             <br />
            <span id="Label1">Last Update: 11/08/1399</span>
             <br />
            <span id="lblVersion">Version : 5.8.3.0</span>
                </div>
              </div> */}
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden "  style={{
                backgroundImage: `url(${toAbsoluteUrl("/images/Style/Background.jpg")})`
              }}>
            {/*begin::Content header*/}
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
            <LanguageSelectorDropdown />
            </div>
            <div className="position-absolute bottom-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              {/* <span className="font-weight-bold text-dark-50">Don't have an account yet?</span> */}
              {/* <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">Sign Up!</Link> */}

              Powered by{" "}
             <Link to="http://padide-af.com/" target="_blank" className="t3 text-success">
               <span>7Diamonds</span>
             </Link>
             <br />
            <span id="Label1">Last Update: 11/08/1399</span>
             <br />
            <span id="lblVersion">Version : 5.8.3.0</span>



            </div>
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0" >
              <Switch>
              <ContentRoute path="/auth/login" component={Login}/>
              <ContentRoute path="/auth/registration" component={Registration}/>
              <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
              />
              <Redirect from="/auth" exact={true} to="/auth/login"/>
              <Redirect to="/auth/login"/>
            </Switch>
            </div>
            {/* <CardSlider data={cards} /> */}
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div  className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                {/* &copy;  تمامی حقوق مادی و معنوی این نرم افزار متعلق به{" "}
            <Link to="http://padide-af.com/" target="_blank">
              شرکت پدیده عصر فناوری
                 </Link>{" "}
                می باشد. */}
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
              
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
);
  // return (
  //     <>
  //       <div className="d-flex flex-column flex-root">
  //         {/*begin::Login*/}
  //         {/* <div
  //             className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
  //             id="kt_login"
  //         > */}
            

  //           {/*begin::Content*/}
  //           {/* <div className="flex-row-fluid d-flex flex-column position-relative p-12 overflow-hidden"> */}
  //             {/*begin::Content header*/}
  //             {/* <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
  //               <span className="font-weight-bold text-dark-50">Don't have an account yet?</span>
  //               <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">Sign Up!</Link>
  //             </div> */}
  //             {/*end::Content header*/}

  //             {/* begin::Content body */}
  //             {/* <div className="d-flex flex-column-fluid flex-center "> */}
  //               <Switch>
  //               <ContentRoute path="/auth/login" component={Login}/>
  //               <ContentRoute path="/auth/registration" component={Registration}/>
  //               <ContentRoute
  //                   path="/auth/forgot-password"
  //                   component={ForgotPassword}
  //               />
  //               <Redirect from="/auth" exact={true} to="/auth/login"/>
  //               <Redirect to="/auth/login"/>
  //             </Switch>
  //             </div>
  //             {/*end::Content body*/}

  //             {/* begin::Mobile footer */}
  //             {/* <div
  //                 className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
  //               <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
  //                 &copy; 2020 
  //               </div>
  //               <div className="d-flex order-1 order-sm-2 my-2">
  //                 <Link to="/terms" className="text-dark-75 text-hover-primary">
  //                   Privacy
  //                 </Link>
  //                 <Link
  //                     to="/terms"
  //                     className="text-dark-75 text-hover-primary ml-4"
  //                 >
  //                   Legal
  //                 </Link>
  //                 <Link
  //                     to="/terms"
  //                     className="text-dark-75 text-hover-primary ml-4"
  //                 >
  //                   Contact
  //                 </Link>
  //               </div>
  //             </div> */}
  //             {/* end::Mobile footer */}
  //           {/* </div> */}
  //           {/*end::Content*/}
  //         {/* </div> */}
  //         {/*end::Login*/}
  //       {/* </div> */}
  //     </>
  // );
}
