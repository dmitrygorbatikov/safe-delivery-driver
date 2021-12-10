import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Card, Typography} from "@mui/material";
import MenuDrawer from "../components/home/MenuDrawer";
import {shippingSelector} from "../modules/shipping/selectors";
import {getShipping} from "../modules/shipping/actions";
import TableShipping from "../components/shipping/ShippingTable";
import {ShippingFilter} from "../components/shipping/ShippingFilter";
import {getDriverProfile} from "../modules/driver/actions";
import {languageSelector} from "../modules/auth/selectors";
import {LanguageEnum} from "../modules/auth/types";
import {englishLanguage, ukraineLanguage} from "../helpers/localization";

const ShippingPage = () => {
    const dispatch = useDispatch()
    const shipping = useSelector(shippingSelector)
    const language = useSelector(languageSelector)
    const languageObj = language === LanguageEnum.ua ? ukraineLanguage : englishLanguage
    useEffect(() => {
        dispatch(getShipping({}))
        dispatch(getDriverProfile())
    }, [])
    const headers = [languageObj.changeLanguage, languageObj.status, languageObj.dispatchTime, languageObj.arrivalTime, languageObj.registerDate]
    return (
        <div className="home">
            <div className="home__navigation">
                <div style={{marginLeft: 10}}><Typography variant="h4">{languageObj.shipping}</Typography></div>
                <div><MenuDrawer/></div>
            </div>
            <div className="home__navigation">
                <div style={{marginLeft: 10}}><ShippingFilter/></div>
            </div>
            <Card className="home__table">
                <TableShipping rows={shipping} headers={headers}/>
            </Card>
        </div>
    )
}
export default ShippingPage