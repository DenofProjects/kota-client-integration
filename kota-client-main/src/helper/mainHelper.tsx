import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export class MainHelper {

    static downloadUserData_Helper(resultData: any) {
        console.log("Data to download : ", resultData);
        const worksheet = XLSX.utils.aoa_to_sheet(resultData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "user-data.xlsx");
    }

    static copyReturningUserDataToUserData(returningUserData: any, userData: any, row: any, col: any) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (!userData[i][j])
                    userData[i][j] = returningUserData[i][j];
            }
        }
        console.log("copied returning user data to user data : ", userData);
    }

    static convertStringToInteger(userData: any, row: any, col: any) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (userData[i][j])
                    userData[i][j] = Math.floor(userData[i][j]);
            }
        }
    }

    static countErrorsSoFar(userData: any, data: any, row: any, col: any) {
        let errorsSoFar: number = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (userData[i]) {
                    if (userData[i][j]) {
                        if (userData[i][j] != data[i][j]) {
                            console.log("increasing error count");
                            errorsSoFar++;
                        }
                    }
                }
            }
        }
        return errorsSoFar;
    }

    static countFilledData(userData: any, row: number, col: number): number {
        let filledDataCount: number = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (userData[i]) {
                    if (userData[i][j]) {
                        filledDataCount++;
                    }
                }
            }
        }
        return filledDataCount;
    }

    static clearReturningUserData(returningUserData: any, row: any, col: any) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (returningUserData[i]) {
                    returningUserData[i][j] = undefined;
                }
            }
        }
    }

    static countTotalRowsFilled(resultData: any, row: any, col: any) {
        let totalRowsFilled: number = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (resultData[i])
                    totalRowsFilled++;
            }
        }
        return totalRowsFilled;
    }

    static getRedCells(resultData: any, data: any, row: any, col: any) {
        let redCells: any = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (resultData[i][j] != data[i][j]) {
                    let redCell: any = {};
                    redCell.row = i;
                    redCell.col = j;
                    redCells.push(redCell);
                }
            }
        }
        return redCells;
    }

    static async convert2dArrayToExcelSheet(data: any, redCells: any) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Apply red color to specific cells
        // redCells.forEach((row: any, col: any) => {
        //     const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });

        //     // Get the cell object (if it already exists)
        //     const cell = worksheet[cellAddress];

        //     // Create or update the cell with the desired style
        //     XLSX.utils.sheet_add_aoa(worksheet, [[{ v: "Value", s: { fill: { fgColor: { rgb: "#FF0000" } } } }]], { origin: cellAddress });
        // });

        redCells.forEach((row: any, col: any) => {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });

            // Create or update the cell with the desired style
            XLSX.utils.sheet_add_aoa(worksheet, [[{ v: "Value", s: { fill: { fgColor: { rgb: "#FF0000" } } } }]], { origin: cellAddress });
        });
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Write the workbook to a file
        XLSX.writeFile(workbook, "output.xlsx");
    }

    private static buildFormData(result: any) {
        const worksheet = XLSX.utils.aoa_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const formData = new FormData();
        formData.append('file', blob, 'data.xlsx');
        return formData;
    }

    static buildSubmitRequest(newState: any, result: any, row: any, col: any, errorsSoFar: any, totalRowsFilledWhileSubmit: any) {
        const formData = this.buildFormData(newState.resultData);
        const fivePercentage = this.calculate5Per(newState.errorsSoFar, newState.totalRowsFilledWhileSubmit);
        const email = newState.userEmail;
        let request: any = {};
        request.formData = newState.resultData;
        request.fivePercentage = fivePercentage;
        request.email = email;

        return request;
    }

    private static calculate5Per(errorsSoFar: any, totalRowsFilledWhileSubmit: any) {
        let percentages: any = [];
        for (let i = 1; i <= 5; i++) {
            const percentage = this.calculatePerX(errorsSoFar, totalRowsFilledWhileSubmit, i);
            const headline = `${i}% is:`;
            percentages.push({ headline, percentage });
        }
        return percentages;
    }

    private static calculatePerX(errorsSoFar: any, totalRowsFilledWhileSubmit: any, perenctageCount: number) {
        if (errorsSoFar < totalRowsFilledWhileSubmit) {
            return ((totalRowsFilledWhileSubmit - errorsSoFar) / totalRowsFilledWhileSubmit) * perenctageCount;
        } else {
            return 0;
        }
    }
}