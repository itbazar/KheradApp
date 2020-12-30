import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import {toAbsoluteUrl} from "../../../../_themeBase/_helpers";
import CardSlider from "../../../../_themeBase/layout/components/common/cardSlider/cardSlider.jsx"
import { LanguageSelectorDropdown } from "../../../../_themeBase/layout/components/extras/dropdowns/LanguageSelectorDropdown";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "admin",
  password: "102030",
};


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

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  // const minUsernameError = intl.formatMessage({ id: "AUTH.VALIDATION.MIN_LENGTH_FIELD" }, { lenght: 3 }) ;
  const LoginSchema = Yup.object().shape({
    userName: Yup.string()
    .min(3, intl.formatMessage({ id: "AUTH.VALIDATION.MIN_LENGTH_FIELD" }, { lenght: 3 }) )
    // .min(3, `${minUsernameError}` )
      .max(15, intl.formatMessage({ id: "AUTH.VALIDATION.MAX_LENGTH_FIELD" }, { lenght: 15 }))
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, intl.formatMessage({ id: "AUTH.VALIDATION.MIN_LENGTH_FIELD" }, { lenght: 3 }))
      .max(15, intl.formatMessage({ id: "AUTH.VALIDATION.MAX_LENGTH_FIELD" }, { lenght: 15 }))
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.userName, values.password)
        // .then(({ data: { data.accessToken,  user, menu } }) => {
          // .then(response.data =>{
          //   console.log("access token" + JSON.stringify(response.data.accessToken))
          //   console.log("access user" + JSON.stringify(response.data.user))
          //   console.log("access menu" + JSON.stringify(response.data.menu))
          //   disableLoading();
          //   props.login(accessToken);
          // })
          .then(response => {
            console.log("login response :")
            console.log(response)
            console.log("access token " + JSON.stringify(response.data.data.accessToken));
            console.log("access user " + JSON.stringify(response.data.data.user));
            console.log("access menu " + JSON.stringify(response.data.data.menu));
            sessionStorage.setItem('authUser', JSON.stringify(response.data.data.user));
            sessionStorage.setItem('authUserMenu', JSON.stringify(response.data.data.menu));

            props.login(response.data.data.accessToken);
          })
          .catch((error) => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }, 1000);
    },
  });


  return (
    <div className="login-form login-signin" id="kt_login_signin_form" >
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20" >
       <img src={toAbsoluteUrl("/images/LogoUni/Logo-Uni.png")} alt="-" style={{width: "8.5rem"}}/>
        
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className=" font-weight-bold">
        <FormattedMessage id="UNIVERSITY.NAME" />
       
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
            <div className="alert-text ">
            <FormattedMessage id="AUTH.VALIDATION.LOGIN_DESCRIPTION" />
            </div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder= { intl.formatMessage({
              id: "AUTH.INPUT.USERNAME",
            })}
            type="userName"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "userName"
            )}`}
            name="userName"
            {...formik.getFieldProps("userName")}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.userName}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={ intl.formatMessage({
              id: "AUTH.INPUT.PASSWORD",
            })}
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Captcha"
            type="captcha"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "captcha"
            )}`}
            name="captcha"
            {...formik.getFieldProps("captcha")}
          />
          <audio id="audio"  preload="metadata" width="300" height="32" src="/UserControls/AudioPlayer.aspx"></audio>
          <img  id="SoundIcon" src="images/Icon/Sound.gif" style="width:10%; padding-top:2%;float:right;"  title="پخش صوتی کد امنیتی" alt="پخش صوتی کد امنیتی" onclick="playaudio();return false;" />
                            
          {formik.touched.captcha && formik.errors.captcha ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.captcha}</div>
            </div>
          ) : null}
        </div> */}
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-success my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
        
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-success font-weight-bold px-9 py-4 my-3`}
            // style={{
            //   backgroundImage: `url(${toAbsoluteUrl("/images/Style/bgLogin.png")})`
            // }}
          >
            <span> <FormattedMessage id="AUTH.GENERAL.LOGIN" /> </span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
         
        </div>
       
      </form>
      {/*end::Form*/}
    </div>
  );

//   return (
//      <div className="col-md-12">
//       {/* <div className="login-form login-signin" id="kt_login_signin_form"> */}

//         {/*begin::Form*/}
//         <form
//           onSubmit={formik.handleSubmit}
//           className="form fv-plugins-bootstrap fv-plugins-framework"
//         >
//           {/* {formik.status ? (
//           <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
//             <div className="alert-text font-weight-bold">{formik.status}</div>
//           </div>
//         ) : (
//             <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
//               <div className="alert-text ">
//                 Use account <strong>admin@demo.com</strong> and password{" "}
//                 <strong>demo</strong> to continue.
//             </div>
//             </div>
//           )} */}

//           <div className="hdrDiv">
//             <div className="topDiv">
//               <div className="logo">
//                 <img
//                   src="/images/Logo/CullinanLogo.png"
//                   id="imgLogo"
//                   width={85}
//                   height={54}
//                   style={{ borderLeft: 0 }}
//                 />
//               </div>
//               <div className="logoUni">
//                 <img
//                   src="/images/LogoUni/Logo-Uni.png"
//                   id="imgLogoUni"
//                   width={75}
//                   height={70}
//                 />

//               </div>
//               <div
//                 className="logoUni"
//                 style={{ margin: "15px 0px 0px 5px", textAlign: "center" }} >
//                 <label
//                   id="lblUniNamePersian"
//                   style={{ fontSize: "small", color: "gray" }} > راضیه خان زاده
//                 </label>
//                 <br />
//                 <label
//                   id="lblUniNameEnglish"
//                   style={{ fontSize: "smaller", color: "gray" }} > Mrs.Khanzadeh
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="ribbon">
//             <div className="ribbonLeft" />
//             <div className="ribbonRight" />
//             <div className="middleBox">
//               <div className="rightBox">
//                 <div className="plateLogo" align="center"></div>
//                 <div className="loginDiv" align="center">
//                   <input
//                     name="txtUsername"
//                     type="text"
//                     id="txtUsername"
//                     placeholder="نام کاربری"
//                     className="t3"
//                   />
//                   <br />
//                   <input
//                     name="txtPassword"
//                     type="password"
//                     id="txtPassword"
//                     placeholder="کلمه عبور"
//                     className="t3"
//                   />
//                   <br />
//                   <div style={{ width: "40%", textAlign: "left" }}>
//                     <div id="divCaptcha">
//                       <img
//                         src="UserControls/Captcha.ashx"
//                         id="captcha"
//                         name="captcha"
//                       // onclick="window.location.reload();"
//                       />
//                     </div>
//                     <input
//                       name="txtCaptcha"
//                       type="text"
//                       id="txtCaptcha"
//                       placeholder="کد امنیتی"
//                       style={{ width: "46%" }}
//                     />
//                   </div>
//                   <input
//                     name="btnLogin"
//                     type="submit"
//                     id="btnLogin"
//                     value="ورود"
//                     style={{ clear: "both", marginBottom: 10 }}
//                   />
//                   <br />
//                   <a

//                     // onclick="PasswordRecovery();return false;"
//                     className="t3"
//                   >
//                     <span>بازیابی کلمه عبور</span>
//                   </a>
//                   <br />
//                 </div>
//               </div>
//               <div className="leftBox">
//                 <div className="newsBox">
//                   <input type="button" defaultValue="اطلاعیه ها" />
//                   <br />
//                   <ul style={{ margin: 0, height: "9em", overflow: "auto" }}>

//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <div className="row">
//                     <div className="col-md-1"></div> */}
//           <div className="appSlider">
//             <CardSlider data={cards} />
//           </div>
//           {/* </div> */}
//           <br></br>
//           <div className="copyRight"></div>
//           <div className="crRight">
//             تمامی حقوق مادی و معنوی این نرم افزار متعلق به{" "}
//             <Link to="http://padide-af.com/" target="_blank">
//               شرکت پدیده عصر فناوری
//                  </Link>{" "}
//                  می باشد.
//         </div>
//           <div className="crLeft">
//             Powered by{" "}
//             <Link to="http://padide-af.com/" target="_blank" className="t3">
//               <span>7Diamonds</span>
//             </Link>
//             <br />
//             <span id="Label1">Last Update: 11/08/1399</span>
//             <br />
//             <span id="lblVersion">Version : 5.8.3.0</span>
//             <br />
//           </div>
//           <div className="footerBox"></div>
//           <div
//             id="dialog-PasswordRecovery"
//             title="بازیابی کلمه عبور"
//             style={{ display: "none" }} >
//             <label id="lblMessage"></label>
//             <div style={{ clear: "both", direction: "rtl", lineHeight: 38 }}>
//               <input
//                 name="txtUserName_RePass"
//                 type="text"
//                 id="txtUserName_RePass"
//                 placeholder="نام کاربری"
//                 className="t3"
//               />
//               <br />
//               <input
//                 name="txtMobile_RePass"
//                 type="text"
//                 id="txtMobile_RePass"
//                 placeholder="تلفن همراه"
//                 className="t3"
//               />
//               <br />
//             </div>
//           </div>
//           <input name="btnPasswordRecovery"
//             type="submit"
//             id="btnPasswordRecovery"
//             defaultValue="تأیید"
//             style={{ display: "none" }} />



// {/* 
//           <div className="form-group fv-plugins-icon-container">
//             <input
//               placeholder="Email"
//               type="email"
//               className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
//                 "email"
//               )}`}
//               name="email"
//               {...formik.getFieldProps("email")}
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div className="fv-plugins-message-container">
//                 <div className="fv-help-block">{formik.errors.email}</div>
//               </div>
//             ) : null}
//           </div>
//           <div className="form-group fv-plugins-icon-container">
//             <input
//               placeholder="Password"
//               type="password"
//               className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
//                 "password"
//               )}`}
//               name="password"
//               {...formik.getFieldProps("password")}
//             />
//             {formik.touched.password && formik.errors.password ? (
//               <div className="fv-plugins-message-container">
//                 <div className="fv-help-block">{formik.errors.password}</div>
//               </div>
//             ) : null}
//           </div>
//           <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
//             <Link
//               to="/auth/forgot-password"
//               className="text-dark-50 text-hover-primary my-3 mr-2"
//               id="kt_login_forgot"
//             >
//               <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
//             </Link>
//             <button
//               id="kt_login_signin_submit"
//               type="submit"
//               disabled={formik.isSubmitting}
//               className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
//             >
//               <span>Sign In</span>
//               {loading && <span className="ml-3 spinner spinner-white"></span>}
//             </button>
//           </div>
      
//        */}
      
//        </form>
//         {/*end::Form*/}
//       {/* </div> */}
//      </div>
//   );
}

export default injectIntl(connect(null, auth.actions)(Login));
