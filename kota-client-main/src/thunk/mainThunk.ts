import axios from "axios";
import { Messages } from "../constants/Messages";
import { clearReturningUserData, loggingIn, setMessage } from "../reducerActions/mainReducerActions";
import { EndPoints } from "../constants/EndPoint";
import axiosConfig from "../configs/axiosConfig";

export function fetchUserDetails() {
    return (dispatch: any, getState: any) => {
        console.log(getState());
        const uri = EndPoints.BASE_URL_SHEET;

        const userEmail = getState().mainReducerState.userEmail;
        const userPassword = getState().mainReducerState.userPassword;

        if (userEmail != "" && userPassword != "") {
            // const resp = [{ "Name": "Rahul", "LastName": "Verma", "Email": "rahulverma@gmail.com", "Password": "password" }, { "Name": "nikki ", "LastName": "yadav", "Email": "nikki@gmail.com", "Password": "password" }];
            axios
                .get(uri)
                .then((result) => {
                    if (result) {
                        console.log(JSON.stringify(result.data));
                        const resp = result.data;
                        const user = resp.find((user: any) => user.Email === userEmail);

                        console.log("user found is : ", user);

                        if (user) {
                            // User found, check the password
                            if (user.Password === userPassword) {
                                // Password matches, handle successful login (e.g., redirect to a new page)
                                console.log('Login successful!');
                                dispatch(loggingIn());
                            } else {
                                dispatch(setMessage(Messages.ERROR_PASSWORD_NOT_FOUND));
                            }
                        } else {
                            console.log("setting user not found error");
                            dispatch(setMessage(Messages.ERROR_USERNAME_NOT_FOUND));
                        }
                        //   dispatch(showNotification(result.data));
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    dispatch(setMessage(Messages.ERROR_FETCHING_USER_DETAILS));
                });
        }
    };
}

export function saveFilledDataAndErrorCountSoFarOnDownload(userEmail: any, filledDataCount: any, errorsSoFar: any) {
    return (dispatch: any, _getState: any) => {
        const uri = EndPoints.BASE_URL_SHEET + "/Email/" + userEmail;

        if (userEmail != "") {
            // const resp = [{ "Name": "Rahul", "LastName": "Verma", "Email": "rahulverma@gmail.com", "Password": "password" }, { "Name": "nikki ", "LastName": "yadav", "Email": "nikki@gmail.com", "Password": "password" }];
            axios
                .patch(uri, { filledDataCount: filledDataCount, errorsSoFar: errorsSoFar })
                .then((result) => {
                    if (result) {
                        console.log(JSON.stringify(result.data));
                        console.log("Data saved successfully");
                    } else {
                        dispatch(setMessage(Messages.ERROR_SAVING_DATA_ON_DOWNLOAD));
                    }
                })
                .catch((err) => {
                    console.log("In catch saveFilledDataAndErrorCountSoFarOnDownload ", JSON.stringify(err.response), err.response);
                    dispatch(setMessage(Messages.ERROR_SAVING_DATA_ON_DOWNLOAD));
                });
        }
    };
}

export function matchPrevDataAndSheetDataForReturningUser(userEmail: string, filledDataCount: number, errorsSoFar: number): any {
    return (dispatch: any, _getState: any) => {
        const uri = EndPoints.BASE_URL_SHEET;

        if (userEmail != "") {
            // const resp = [{ "Name": "Rahul", "LastName": "Verma", "Email": "rahulverma@gmail.com", "Password": "password" }, { "Name": "nikki ", "LastName": "yadav", "Email": "nikki@gmail.com", "Password": "password" }];
            axios
                .get(uri)
                .then((result) => {
                    if (result) {
                        console.log(JSON.stringify(result.data));
                        const user = result.data.find((user: any) => user.Email === userEmail);
                        const filledDataCountResp = user.filledDataCount;
                        const errorsSoFarResp = user.errorsSoFar;
                        if (filledDataCountResp != filledDataCount && errorsSoFarResp != errorsSoFar) {
                            dispatch(setMessage(Messages.ERROR_MATCHING_DATA));
                            dispatch(clearReturningUserData());
                        } else {
                            console.log("All good...");
                        }
                    } else {
                        dispatch(setMessage(Messages.ERROR_MATCHING_DATA));
                        dispatch(clearReturningUserData());
                    }
                })
                .catch((err) => {
                    console.log("In catch saveFilledDataAndErrorCountSoFarOnDownload ", JSON.stringify(err.response), err.response);
                    dispatch(setMessage(Messages.ERROR_MATCHING_DATA));
                });
        }
    };
}

export function sendMailAfterSubmission(request: any) {
    console.log("Request to send mail : ", JSON.stringify(request));
    return (dispatch: any, _getState: any) => {
        const uri = EndPoints.SEND_MAIL_ON_SUBMIT;
        axiosConfig
            .post(uri, request, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((result) => {
                if (result) {
                    console.log(JSON.stringify(result.data));
                    dispatch(setMessage(result.data.message));
                } else {
                    dispatch(setMessage(Messages.ERROR_SUBMIT_REPORT));
                }
            })
            .catch((err) => {
                console.log("In catch sendMailAfterSubmission ", JSON.stringify(err.response), err.response);
                dispatch(healthCheck());
                dispatch(setMessage(Messages.ERROR_SUBMIT_REPORT));
            });
    };
}

export function healthCheck() {
    console.log("Running health check...");
    return (_dispatch: any, _getState: any) => {
        const uri = EndPoints.HEALTH_CHECK;
        console.log("health check url : ", uri);
        axiosConfig
            .get(uri)
            .then((result) => {
                console.log("getting health check resp");
                if (result) {
                    console.log("health check resp is : ", JSON.stringify(result.data));
                } else {
                    console.log("Error in health check ");
                }
            })
            .catch((err) => {
                console.log("Error in health check , in catch", JSON.stringify(err));
            });
    };
}