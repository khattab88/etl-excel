import { WorkBook, WorkSheet } from 'xlsx'; 

export class ExcelFile {
    
    file: WorkBook | any;
    sheetNames: string[] | any;
    sheet: WorkSheet | any;

    constructor(file: WorkBook) {
        this.file = file;
        this.sheetNames = this.file.SheetNames;
    }
}