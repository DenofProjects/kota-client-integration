export interface mainDTO {
  file: any,
  data: any[] | null,
  returningUserFile: any,
  userData: any[] | null,
  resultData: any[] | null,
  returningUserData: any[] | null,
  row: number,
  col: number,
  isReturningUser: boolean;
  userEmail: string;
  userPassword: string;
  showLoginForm: boolean;
  errorMessage: string;
  filledDataCount: number;
  errorsSoFar: number;
  totalRowsFilledWhileSubmit: number;
}
