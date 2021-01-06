import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_themeBase/layout";
import {MyPage} from "./pages/MyPage";
import {DashboardPage} from "./pages/DashboardPage";
import UniInfoPage from "./modules/BaseInfo/UniInfo/UniInfoPage";
import { DormBasePage } from "./modules/BaseInfo/dorms/DormBasePage";
import { CollageBasePage } from "./modules/BaseInfo/collages/CollageBasePage";
import { GroupBasePage } from "./modules/BaseInfo/groups/GroupBasePage";
import { DeviceBasePage } from "./modules/BaseInfo/devices/DeviceBasePage";
import { TermBasePage } from "./modules/BaseInfo/terms/TermBasePage";
import GradePage from "./modules/BaseInfo/grades/GradePage";
import AccountPage from "./modules/BaseInfo/accounts/AccountPage";
import { ShiftBasePage } from "./modules/BaseInfo/shifts/ShiftBasePage";
import CalenderBasePage from "./modules/BaseInfo/yearCalendar/CalenderBasePage";
import { PermissionBasePage } from "./modules/BaseInfo/permissions/PermissionBasePage";
import UsersPage from "./modules/BaseInfo/user/UsersPage";
import UserProfilePage from "./modules/UserProfile/UserProfilePage";

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
          {/* <SetLayout /> */}
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={DashboardPage}/>
                <ContentRoute path="/terms" component={TermBasePage}/>
                <ContentRoute path="/uni" component={UniInfoPage}/>
                <ContentRoute path="/dorms" component={DormBasePage}/>
                <ContentRoute path="/collages" component={CollageBasePage}/>
                <ContentRoute path="/groups" component={GroupBasePage}/>
                <ContentRoute path="/devices" component={DeviceBasePage}/>
                <ContentRoute path="/grades" component={GradePage}/>
                <ContentRoute path="/accounts" component={AccountPage}/>
                <ContentRoute path="/shifts" component={ShiftBasePage}/>
                <ContentRoute path="/calendar" component={CalenderBasePage}/>
                <ContentRoute path="/permissions" component={PermissionBasePage}/>
                <ContentRoute path="/persons" component={UsersPage}/>
                <ContentRoute path="/user-profile" component={UserProfilePage}/>
                
                <Redirect to="error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
