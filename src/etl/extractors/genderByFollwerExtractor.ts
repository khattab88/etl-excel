import { WorkBook, WorkSheet } from 'xlsx/types';
import * as _ from "lodash";

import { Cell } from '../abstractions/cell';
import { Extractor } from './extractor';

export class GenderByFollwerExtractor implements Extractor {
    file: WorkBook;

    constructor(file: WorkBook) {
        this.file = file;

        // this.activeSheetIndex = 0;
    }
    
    set activeSheetIndex(value: number) {
        this.activeSheetIndex = value | 0;
    }

    extract() {
        throw new Error('Method not implemented.');
    }
}
