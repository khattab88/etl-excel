import { WorkBook, WorkSheet } from 'xlsx/types';

export interface Extractor {
  readonly file: WorkBook;
  // set activeSheetIndex (value: number);

  extract(): any;
}

// export interface Extractor<ExcelFile, TOutput> {
//     extract(file: ExcelFile): TOutput;
// }
