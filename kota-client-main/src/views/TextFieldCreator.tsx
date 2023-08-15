import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { handleInputChange, parseExcelData, updateRowCol } from "../reducerActions/mainReducerActions";
import _ from 'lodash';

const TextFieldCreator = (props: any) => {
  const dispatch = useDispatch();
  const file = props.props.mainState.file;
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
          throw new Error("Failed to read the file.");
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
        console.log("Sheet Data:", sheetData); // Add this line to debug
        console.log("row", sheetData.length);
        if (sheetData[0] && sheetData[0] instanceof Array) {
          console.log("col", sheetData[0].length);
          dispatch(updateRowCol(sheetData.length, sheetData[0].length));
        }
        dispatch(parseExcelData(sheetData));
      } catch (error: any) {
        console.error("Error parsing Excel data:", error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleInputChangeDebounced = _.debounce((rowIndex, colIndex, value) => {
    dispatch(handleInputChange(rowIndex, colIndex, value));
  }, 10); // Adjust the delay (in milliseconds) as needed.

  const strToArrBuf = (str: string): ArrayBuffer => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const renderTextFields = (): React.ReactNode => {
    if (data && data.length > 0) {
      const columnHeaders = Object.keys(data[0]);

      return (
        <div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <div style={{ width: "40px" }}>
              <div style={{ width: "40px" }}>
                {"Row"}
              </div>
            </div>
            {columnHeaders.map((header, colIndex) => (
              <div style={{ width: "107.2px" }}>
                <div key={colIndex} style={{ width: "107.2px", textAlign: "center", fontWeight: "bold" }}>
                  {String.fromCharCode(65 + colIndex)} {/* Convert numeric index to alphanumeric */}
                </div>
              </div>
            ))}
          </div>

          {data.map((row: any, rowIndex: number) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              <div style={{ width: "100px" }}><div style={{ width: "40px", textAlign: "center" }}>{rowIndex + 1}</div> {/* Row index */}</div>
              {columnHeaders.map((header, colIndex) => (
                <input
                  key={colIndex}
                  type="text"
                  onPaste={handlePaste}
                  onContextMenu={handleContextMenu}
                  onChange={(e) => handleInputChangeDebounced(rowIndex, colIndex, e.target.value)}
                  style={{ width: "100px" }}
                  defaultValue={props.props.mainState.returningUserData[rowIndex][colIndex]}
                />
              ))}
            </div>
          ))}
        </div>
      );
    }
    return <div>No data available. Please upload an Excel file.</div>;
  };


  return (
    <div>
      {data && data.length > 0 ? (
        <div>{renderTextFields()}</div>
      ) : (
        <div>No data available. Please upload an Excel file.</div>
      )}
    </div>
  );
};

export default TextFieldCreator;
