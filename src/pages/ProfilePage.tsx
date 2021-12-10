import React, {useEffect, useState} from "react";
import {Box, Card, IconButton, LinearProgress, TextField, Typography} from "@mui/material";
import MenuDrawer from "../components/home/MenuDrawer";
import {useDispatch, useSelector} from "react-redux";
import {createdDate} from "../helpers/functions";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {driverProfileSelector, getDriverProfileLoadingSelector} from "../modules/driver/selectors";
import {editDriverProfile, getDriverProfile} from "../modules/driver/actions";
import {languageSelector} from "../modules/auth/selectors";
import {LanguageEnum} from "../modules/auth/types";
import {englishLanguage, ukraineLanguage} from "../helpers/localization";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const language = useSelector(languageSelector)
    const languageObj = language === LanguageEnum.ua ? ukraineLanguage : englishLanguage
    const profile = useSelector(driverProfileSelector)
    const loading = useSelector(getDriverProfileLoadingSelector)
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [nameLabel, setNameLabel] = useState(languageObj.name)
    const [displayEditName, setDisplayEditName] = useState(true)
    const [disabledEditName, setDisabledEditName] = useState(false)
    const [disabledEditSurname, setDisabledEditSurname] = useState(false)
    const [surname, setSurname] = useState('')
    const [surnameError, setSurnameError] = useState(false)
    const [surnameLabel, setSurnameLabel] = useState(languageObj.surname)
    const [displayEditSurname, setDisplayEditSurname] = useState(true)
    useEffect(() => {
        dispatch(getDriverProfile())
    }, [])
    if (loading) {
        return (
            <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>
        )
    }
    return (
        <div className="detail-storage">
            {!loading && (
                <>
                    <div className="home__navigation" style={{padding: 20}}>
                        <Card style={{padding: 15}}>
                            <Typography variant="h4">{languageObj.name}: <span
                                style={{display: `${!displayEditName ? 'none' : ''}`}}>{profile?.name}</span>
                                <IconButton disabled={disabledEditName}
                                            style={{display: `${!displayEditName ? 'none' : ''}`}} onClick={() => {
                                    setDisplayEditName(false)
                                    setName(profile?.name ?? '')
                                    setDisabledEditSurname(true)
                                }}><DriveFileRenameOutlineIcon color="warning"/></IconButton>
                                <TextField error={nameError} style={{display: `${displayEditName ? 'none' : ''}`}}
                                           label={nameLabel}
                                           value={name}
                                           onChange={(e) => {
                                               setName(e.target.value)
                                               if (e.target.value) {
                                                   setNameError(false)
                                                   setNameLabel(languageObj.name)
                                               }
                                           }}
                                           variant="outlined"
                                />
                                <IconButton onClick={() => {
                                    if (name !== '') {
                                        dispatch(editDriverProfile({name, surname: profile?.surname ?? ''}))
                                        setNameError(false)
                                        setDisplayEditName(true)
                                        setDisabledEditSurname(false)
                                    } else {
                                        setNameError(true)
                                        setNameLabel(languageObj.nameMustBeFilled)
                                    }
                                }} style={{display: `${displayEditName ? 'none' : ''}`}}><CheckIcon
                                    color="success"/></IconButton>
                                <IconButton style={{display: `${displayEditName ? 'none' : ''}`}}
                                            onClick={() => {
                                                setDisplayEditName(true)
                                                setNameError(false)
                                                setNameLabel(languageObj.name)
                                                setDisabledEditSurname(false)
                                            }}><CloseIcon
                                    color="error"/></IconButton>
                            </Typography>
                            <Typography variant="h4">{languageObj.surname}: <span
                                style={{display: `${!displayEditSurname ? 'none' : ''}`}}>{profile?.surname}</span>
                                <IconButton disabled={disabledEditSurname}
                                            style={{display: `${!displayEditSurname ? 'none' : ''}`}} onClick={() => {
                                    setDisplayEditSurname(false)
                                    setSurname(profile?.surname ?? '')
                                    setDisabledEditName(true)
                                }}><DriveFileRenameOutlineIcon color="warning"/></IconButton>
                                <TextField error={surnameError} style={{display: `${displayEditSurname ? 'none' : ''}`}}
                                           label={surnameLabel}
                                           value={surname}
                                           onChange={(e) => {
                                               setSurname(e.target.value)
                                               if (e.target.value) {
                                                   setSurnameError(false)
                                                   setSurnameLabel(languageObj.surname)
                                               }
                                           }}
                                           variant="outlined"
                                />
                                <IconButton onClick={() => {
                                    if (surname !== '') {
                                        dispatch(editDriverProfile({name: profile?.name ?? '', surname}))
                                        setSurnameError(false)
                                        setDisplayEditSurname(true)
                                        setDisabledEditName(false)
                                    } else {
                                        setSurnameError(true)
                                        setSurnameLabel(languageObj.surnameMustBeFilled)
                                    }
                                }} style={{display: `${displayEditSurname ? 'none' : ''}`}}><CheckIcon
                                    color="success"/></IconButton>
                                <IconButton style={{display: `${displayEditSurname ? 'none' : ''}`}}
                                            onClick={() => {
                                                setDisplayEditSurname(true)
                                                setSurnameError(false)
                                                setSurnameLabel(languageObj.surname)
                                                setDisabledEditName(false)
                                            }}><CloseIcon
                                    color="error"/></IconButton>
                            </Typography>
                            <Typography variant="h4">{languageObj.email}: {profile?.email}</Typography>
                            <Typography variant="h4">{languageObj.registerDate}: {createdDate(profile?.registerDate)}</Typography>
                        </Card>
                        <div>
                            <MenuDrawer/>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    )
}
export default ProfilePage