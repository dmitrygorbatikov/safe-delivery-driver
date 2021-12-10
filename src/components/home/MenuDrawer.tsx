import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {useState} from "react";
import TableRowsIcon from '@mui/icons-material/TableRows';
import {IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../modules/auth/actions";
import {useHistory} from "react-router";
import {driverProfileSelector, getDriverProfileLoadingSelector} from "../../modules/driver/selectors";
import {LocalizationDropdown} from "../localization/LocalizationDropdown";
import {languageSelector} from "../../modules/auth/selectors";
import {LanguageEnum} from "../../modules/auth/types";
import {englishLanguage, ukraineLanguage} from "../../helpers/localization";

const MenuDrawer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const profile = useSelector(driverProfileSelector)
    const loading = useSelector(getDriverProfileLoadingSelector)
    const pathName = document.location.pathname
    const language = useSelector(languageSelector)
    const languageObj = language === LanguageEnum.ua ? ukraineLanguage : englishLanguage
    return (
        <div>
            <IconButton onClick={() => {
                setOpen(true)
            }}>
                <TableRowsIcon/>
            </IconButton>
            {!loading &&
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <div className="drawer">
                        <div className="drawer__header">
                            <p>{profile?.email}</p>
                        </div>
                        <LocalizationDropdown color={'#fff'}/>
                        <div className="menu">
                            <div className={`menu__item ${pathName.includes('profile') ? 'menu__item-active' :''}`} onClick={() => {
                                history.push('/profile')
                            }
                            }>
                                <p>{languageObj.profile}</p>
                            </div>
                            <div className={`menu__item ${pathName.includes('shipping') ? 'menu__item-active' :''}`} onClick={() => {
                                history.push('/shipping')
                            }
                            }>
                                <p>{languageObj.shipping.toUpperCase()}</p>
                            </div>
                            <div className="menu__item" onClick={() => {
                            dispatch(logoutUser())}
                            }>
                                <p>{languageObj.logout}</p>
                            </div>
                        </div>
                    </div>
                </Drawer>
            }
        </div>
    )
}
export default MenuDrawer