import { WorkBook } from "xlsx";
import { ExcelFile } from "./excel-file";

export class AgeCategoryByVillageExcelFile extends ExcelFile {
    file: any;
    sheetNames: any;
    sheet: any;
    
    constructor(file: WorkBook) {
        super(file);

        this.sheet = this.file.Sheets[this.sheetNames[1]];
    }
}