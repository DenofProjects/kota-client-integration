import mainActionTypes from "../actionTypes/mainActionTypes";

export const uploadFile = (file: any) => ({
  type: mainActionTypes.UPLOAD_FILE,
  payload: file,
});

export const uploadReturningUserFile = (file: any) => ({
  type: mainActionTypes.UPLOAD_RETURNING_USER_FILE,
  payload: file
});

export const parseExcelData = (data: any[]) => ({
  type: mainActionTypes.PARSE_EXCEL_DATA,
  payload: data,
});

export const parseReturningUserExcelData = (data: any[], dispatch: any) => ({
  type: mainActionTypes.PARSE_RETURNING_USER_EXCEL_DATA,
  payload: data,
  dispatch: dispatch
});

export const handleInputChange = (row: any, col: any, value: any) => ({
  type: mainActionTypes.HANDLE_INPUT_CHANGE,
  row: row,
  col: col,
  value: value
});

export const updateRowCol = (row: any, col: any) => ({
  type: mainActionTypes.UPDATE_ROW_COL_SIZE,
  row: row,
  col: col
});

export const submitReport = (dispatch: any) => ({
  type: mainActionTypes.SUBMIT_REPORT,
  dispatch: dispatch
});

export const downloadUserData = (dispatch: any) => ({
  type: mainActionTypes.DOWNLOAD_USER_DATA,
  dispatch: dispatch
});

export const setReturningUserValue = () => ({
  type: mainActionTypes.SET_IS_RETURNING_USER_VALUE,
});

export const setEmail = (email: string) => ({
  type: mainActionTypes.SET_EMAIL,
  email: email
});

export const setPassword = (password: string) => ({
  type: mainActionTypes.SET_PASSWORD,
  password: password
});

export const setMessage = (message: string) => ({
  type: mainActionTypes.SET_ERROR_MESSAGE,
  message: message
});

export const loggingIn = () => ({
  type: mainActionTypes.LOGIN
})

export const clearReturningUserData = () => ({
  type: mainActionTypes.CLEAR_RETURNING_USER_DATA
})