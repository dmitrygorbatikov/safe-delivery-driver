import {RootState} from "../root/store";
import {LanguageEnum} from "./types";

export const tokenSelector = (state: RootState) => state.auth.token
export const errorSelector = (state: RootState) => state.auth.error
export const loadingSelector = (state: RootState) => state.auth.authLoading
export const languageSelector = (state: RootState) => state.auth.language as LanguageEnum
