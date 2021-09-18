import { WorkBook, WorkSheet } from 'xlsx/types';
import * as _ from "lodash";

import { ErrorMessage } from '../enums/errorMessage';
import { Cell } from '../abstractions/cell';
import { Extractor } from './extractor';

export class GenderByFollwerExtractor implements Extractor {
    file: WorkBook;
    sheet: WorkSheet;

    constructor(file: WorkBook) {
        this.file = file;
        this.sheet = file.Sheets[this.file.SheetNames[0]];
      }

    extract(): any {
        throw new Error(ErrorMessage.MethodNotImplementedYet);
    }
}
