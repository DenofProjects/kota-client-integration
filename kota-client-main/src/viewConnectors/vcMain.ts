import { downloadUserData, setEmail, setPassword, setReturningUserValue, submitReport, uploadFile, uploadReturningUserFile } from "../reducerActions/mainReducerActions";
import { fetchUserDetails } from "../thunk/mainThunk";

export const mapStateToProps = (state: any) => {
  return { mainState: state.mainReducerState };
};

export function mapDispatchToProps(dispatch: any) {
  return {
    handleFileChange: (event: any) => {
      const file = event.target.files[0];
      dispatch(uploadFile(file));
    },

    handleReturningUserFileUpload: (event: any) => {
      const file = event.target.files[0];
      dispatch(uploadReturningUserFile(file));
    },

    submitReport: () => {
      dispatch(submitReport(dispatch));
    },

    downloadUserData: () => {
      dispatch(downloadUserData(dispatch));
    }
    ,

    handleRadioChange: () => {
      dispatch(setReturningUserValue());
    },

    setEmail: (email: string) => {
      dispatch(setEmail(email));
    },

    setPassword: (password: string) => {
      dispatch(setPassword(password));
    },

    onLoginSubmit: () => {
      dispatch(fetchUserDetails());
    }
  };
}
