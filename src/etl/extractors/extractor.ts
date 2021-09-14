import { ExcelFile } from "../files/excel-file";

export interface Extractor<ExcelFile, TOutput> {
    extract(file: ExcelFile): TOutput;
}