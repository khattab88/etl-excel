import { WorkBook, WorkSheet } from 'xlsx/types';
import * as _ from "lodash";

import { Cell } from '../abstractions/cell';
import { Extractor } from './extractor';

export class GenderByFollwerExtractor implements Extractor {
    file: WorkBook;
    sheet: WorkSheet;

    constructor(file: WorkBook) {
        this.file = file;
        this.sheet = file.Sheets[this.file.SheetNames[0]];
      }

    set activeSheetIndex(value: number) {
        throw new Error('Method not implemented.');
    }

    extract(): any {
        throw new Error('Method not implemented.');
    }
}
