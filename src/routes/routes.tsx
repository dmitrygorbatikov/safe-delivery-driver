import {Switch, Route, Redirect} from "react-router";
import LoginPage from "../pages/LoginPage";
import ShippingPage from "../pages/ShippingPage";
import ProfilePage from "../pages/ProfilePage";

export const useRoutes = (isAuthenticated: boolean) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <ShippingPage/>
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage/>
                </Route>

                <Redirect to=""/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}