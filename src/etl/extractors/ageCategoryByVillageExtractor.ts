import { WorkBook } from 'xlsx/types';
import { Extractor } from './extractor';

export class AgeCategoryByVillageExtractor implements Extractor {
  extract(file: WorkBook): any {
    return file.Sheets[file.SheetNames[1]];
  }
}

// export class AgeCategoryByVillageExtractor implements Extractor<ExcelFile, any> {
//     extract(file: ExcelFile) : any {
//         return file.sheet;
//     }
// }
