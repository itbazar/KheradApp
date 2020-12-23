
import React from 'react';
import { useLang } from "../_themeBase/i18n/Basei18n";
import { Helmet } from "react-helmet";
import { toAbsoluteUrl } from '../_themeBase/_helpers';


const languages = [
    {
        lang: "fa",
        name: "فارسی",
        // flag: toAbsoluteUrl("/media/svg/flags/136-iran.svg"),
    },
    {
        lang: "en",
        name: "English",
        // flag: toAbsoluteUrl("/media/svg/flags/226-united-states.svg"),
    },
    {
        lang: "ar",
        name: "العربیه",
        // flag: toAbsoluteUrl("/media/svg/flags/133-saudi-arabia.svg"),
    },
];


let currentLanguage = 'en';
export const SetLayout = () => {

    const linkGlobalStyle = document.querySelector(".global_style");
    console.log(linkGlobalStyle);

    const divBody = document.querySelector("#kt_body");
    console.log(divBody);

    const lang = useLang();
    currentLanguage = languages.find((x) => x.lang === lang);
    console.log(currentLanguage);

    return (
        <Helmet>
            <link
                rel="stylesheet"
                id="global_style"
                class="global_style"
                href={(currentLanguage.lang === 'en' && toAbsoluteUrl("/css/style.react.css")) ||
                    (currentLanguage.lang !== 'en' && toAbsoluteUrl("/css/style.react.rtl.css"))}
            />
            {(currentLanguage.lang === 'en' && <body id="kt_body" />) ||
                (currentLanguage.lang !== 'en' && <body id="kt_body" direction="rtl" dir="rtl" style="direction: rtl"></body>)}

        </Helmet>
        )


    // let ret = '<div></div>'
    // if (currentLanguage.lang === 'en') {
    //     // console.log("left to right layout");

    //     // linkGlobalStyle.setAttribute("href", "./css/style.react.css");
    //     // divBody.setAttribute("direction", "");
    //     // divBody.setAttribute("dir", "");
    //     // divBody.setAttribute("style", "");
    //     // // console.log(linkGlobalStyle);
    //     ret =
    //     <Helmet>

    //         <link
    //             rel="stylesheet"
    //             id="global_style"
    //             class="global_style"
    //             href={toAbsoluteUrl("/css/style.react.css")} 
    //         />
    //         <body id="kt_body" />
    //     </Helmet>

    // }
    // else {
    //     // console.log("Right to left layout");
    //     // linkGlobalStyle.setAttribute("href", "./css/style.react.rtl.css");
    //     // divBody.setAttribute("direction", "rtl");
    //     // divBody.setAttribute("dir", "rtl");
    //     // divBody.setAttribute("style", "direction: rtl");
    //     // // console.log(linkGlobalStyle);
    //     ret = 
    //     <Helmet>

    //         <link
    //             rel="stylesheet"
    //             id="global_style"
    //             class="global_style"
    //             href={toAbsoluteUrl("/css/style.react.rtl.css")}
    //         />
    //         <body id="kt_body" direction="rtl" dir="rtl" style="direction: rtl"></body>
    //     </Helmet>
    // }
    // return ret;
    // // return (null);

}

export default SetLayout;