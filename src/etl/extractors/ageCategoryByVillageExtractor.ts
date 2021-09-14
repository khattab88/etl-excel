import { ExcelFile } from '../files/excel-file';
import { Extractor } from './extractor';

export class ageCategoryByVillageExtractor implements Extractor<ExcelFile, any> {
    extract(file: ExcelFile) : any {
        throw new Error('Method not implemented.');
    }
}