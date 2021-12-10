import {RootState} from "../root/store";
import {DriverProfile} from "./types";

export const driverProfileSelector = (state: RootState) => state.driver.profile as DriverProfile
export const getDriverProfileLoadingSelector = (state: RootState) => state.driver.profileLoading as boolean
