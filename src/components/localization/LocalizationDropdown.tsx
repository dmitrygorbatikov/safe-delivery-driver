import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {languageSelector} from "../../modules/auth/selectors";
import {LanguageEnum} from "../../modules/auth/types";
import {englishLanguage, ukraineLanguage} from "../../helpers/localization";
import {changeLang} from "../../modules/auth/actions";
interface LocalizationDropdownProps {
    color: string
}
export const LocalizationDropdown = (props: LocalizationDropdownProps) => {
    const {color} = props
    const language = useSelector(languageSelector)
    const dipatch = useDispatch()
    const langArray = [{
        value: LanguageEnum.eng,
        name: 'English',
    }, {
        value: LanguageEnum.ua,
        name: 'Українська'
    }]
    const [lang, setLang] = useState(language);

    const handleChange = (event: any) => {
        setLang(event.target.value)
        dipatch(changeLang(event.target.value))
    };
    const languageObj = language === LanguageEnum.ua ? ukraineLanguage : englishLanguage
    return (
        <Box style={{padding: 20}} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel style={{color: color}} id="demo-simple-select-label">{languageObj.changeLanguage}</InputLabel>
                <Select
                    style={{color: color}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lang}
                    label="Age"
                    onChange={handleChange}
                >
                    {langArray.map((item, index) => {
                        return <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}