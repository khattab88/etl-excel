import { WorkBook, WorkSheet, utils } from "xlsx";

import { ExcelFile } from "./files/excel-file";
import { Extractor } from "./extractors/extractor";
import { Transformer } from './transformers/transformer';

export class ETL {
    private file: ExcelFile;
    private extractor: Extractor<ExcelFile, any>;
    private transformer: Transformer<any, any>;

   constructor(file: ExcelFile, extractor: Extractor<ExcelFile, any>, transformer: Transformer<any, any>) {
    this.file = file;
    this.extractor = extractor;
    this.transformer = transformer;
   }
    
    load() {
        const input = this.extractor.extract(this.file);
        const output = this.transformer.transform(input);
        return output;
    }
}