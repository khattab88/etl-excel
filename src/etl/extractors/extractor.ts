import { WorkBook } from 'xlsx/types';

export interface Extractor {
  extract(file: WorkBook): any;
}

// export interface Extractor<ExcelFile, TOutput> {
//     extract(file: ExcelFile): TOutput;
// }
