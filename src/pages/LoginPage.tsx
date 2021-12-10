import React, {useState} from "react";
import {Alert, Box, Button, Card, LinearProgress, OutlinedInput, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../modules/auth/actions";
import {errorSelector, languageSelector, loadingSelector} from "../modules/auth/selectors";
import {LocalizationDropdown} from "../components/localization/LocalizationDropdown";
import {LanguageEnum} from "../modules/auth/types";
import {englishLanguage, ukraineLanguage} from "../helpers/localization";

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const language = useSelector(languageSelector)
    const languageObj = language === LanguageEnum.ua ? ukraineLanguage : englishLanguage

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const error = useSelector(errorSelector)
    const loading = useSelector(loadingSelector)
    const loginUser = () => {
        if (!email || !password) {
            setErrorMessage('Email and password not must be empty')
            setOpenSnackBar(true)
            setEmail('')
            setPassword('')
        } else {
            dispatch(login({email, password}))
            setEmail('')
            setPassword('')
            if (!loading) {
                if (error) {
                    setErrorMessage(error)
                    setOpenSnackBar(true)
                }
            }
        }
    }
    if (loading) {
        return (
            <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>
        )
    }
    return (
        <div className="login">
            <span className="login__header">{languageObj.logoLogin}</span>
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
                <Alert onClose={() => setOpenSnackBar(false)} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Card className="login__form">
                <LocalizationDropdown color={'#000'}/>

                <div>
                    <OutlinedInput
                        className="login__email-input"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <OutlinedInput
                        className="login__input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <br/>
                <Button variant="outlined" color="primary" className="login__button" onClick={loginUser}>{languageObj.signIn}</Button>
                <div className="login__not-registered">
                    <p className="login__bottom-p">{languageObj.notRegistered}</p>
                    <p>{languageObj.contactManager}</p>
                </div>
            </Card>
        </div>
    )
}
export default LoginPage