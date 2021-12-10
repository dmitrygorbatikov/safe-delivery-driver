import {useState} from "react";
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getShipping} from "../../modules/shipping/actions";
import {languageSelector} from "../../modules/auth/selectors";
import {LanguageEnum} from "../../modules/auth/types";
import {englishLanguage, ukraineLanguage} from "../../helpers/localization";

export const ShippingFilter = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const language = useSelector(languageSelector)
    const languageObj = language === LanguageEnum.ua ? ukraineLanguage : englishLanguage
    return (
        <>
            <TextField
                label={languageObj.status}
                variant="outlined"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        if (search && search !== '') {
                            dispatch(getShipping({search}))
                        } else {
                            dispatch(getShipping({}))
                        }
                    }
                }} value={search} onChange={(e) => setSearch(e.target.value)}/>
        </>
    )
}