import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { parseExcelData, parseReturningUserExcelData } from "../reducerActions/mainReducerActions";

const ExcelParserForReturningUser = (props: any) => {
    const dispatch = useDispatch();
    const file = props.props.mainState.returningUserFile;
    const data = props.props.mainState.data;

    useEffect(() => {
        if (file) {
            parseExcelFile(file);
        }
    }, [file]);
    const parseExcelFile = (file: any): void => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                const target = e.target;
                if (!target || !target.result) {
                    throw new Error("Failed to read the file for returning user.");
                }

                const result = target.result;
                const data =
                    typeof result === "string"
                        ? strToArrBuf(result)
                        : new Uint8Array(result);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                const sheetData = XLSX.utils.sheet_to_json(
                    workbook.Sheets[firstSheetName],
                    { header: 1 }
                );
                dispatch(parseReturningUserExcelData(sheetData, dispatch));
            } catch (error: any) {
                console.error("Error parsing Excel data for returning user :", error.message);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const strToArrBuf = (str: string): ArrayBuffer => {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0; i < str.length; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };

    return (
        <div>
        </div>
    );
};

export default ExcelParserForReturningUser;
