import { WorkBook, WorkSheet } from 'xlsx/types';
import { Extractor } from './extractor';

export class AgeCategoryByVillageExtractor implements Extractor {

  sheetIndex: number;
  sheetName: string;

  constructor() {
    this.sheetIndex = 1;
    this.sheetName = "Sheet1";
  }

  extract(file: WorkBook): any {
    
    const sheet = file.Sheets[this.sheetName];

    return sheet;
  }
}

// export class AgeCategoryByVillageExtractor implements Extractor<ExcelFile, any> {
//     extract(file: ExcelFile) : any {
//         return file.sheet;
//     }
// }
