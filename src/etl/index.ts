import { WorkBook, WorkSheet, utils } from "xlsx";

export class ETL {

    private file: WorkBook | any;
    private sheetNames: string[] | any;
    private sheet: WorkSheet | any;


    constructor(file: WorkBook) {
        this.file = file;
    }

    private extract() {
        this.sheetNames = this.file.SheetNames;
        this.sheet = this.file.Sheets[this.sheetNames[1]];
    }
    
    private transform() {}

    
    public load() {
        this.extract();
        this.transform();

        return this.sheet;
    }
}