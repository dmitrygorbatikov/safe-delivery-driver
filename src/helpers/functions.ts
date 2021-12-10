import {LanguageEnum} from "../modules/auth/types";

export const createdDate = (registerDate: number | undefined) => {
    if(registerDate) {
        return new Date(registerDate).toLocaleDateString() + ' / ' + new Date(registerDate).toLocaleTimeString()
    } else return ''
}

export const msToTime = (duration: number, language: string) => {
    let minutes: string | number = parseInt(String((duration / (1000 * 60)) % 60)),
        hours: string | number = parseInt(String((duration / (1000 * 60 * 60)) % 24));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes + `${hours > 0 ? (language === LanguageEnum.eng ? 'h' : 'ч') : (language === LanguageEnum.eng ? 'm' : 'хв')}`
}