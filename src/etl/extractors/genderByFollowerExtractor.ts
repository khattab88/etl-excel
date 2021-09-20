/* tslint:disable */
import { WorkBook, WorkSheet } from 'xlsx/types';
import * as _ from 'lodash';

import { ErrorMessage } from '../enums/errorMessage';
import { Cell } from '../abstractions/cell';
import { Extractor } from './extractor';

export class GenderByFollowerExtractor implements Extractor {
  file: WorkBook;
  sheet: WorkSheet;

  constructor(file: WorkBook) {
    this.file = file;
    this.sheet = file.Sheets[this.file.SheetNames[0]];
  }

  extract(): any {
    // get !REF (B1, Hz)
    const firstCell: string = 'B1';
    const lastCell: string | any = this.sheet['!ref']?.split(':')[1];

    const firstCol: string = 'B';
    const lastCol: string = lastCell.substring(0, 1);

    const firstRow: number = 4;
    const lastRow: number = parseInt(lastCell.substr(1));


    let tableHeaders = {
      SectionOrCenter: { displayName: 'المركز', col: 'B' },
      village: { displayName: 'أسم القرية', col: 'C' },
      follower: { displayName: 'أسماء التوابع', col: 'D' },
      gender: {
        male: { displayName: 'ذكور', col: 'E' },
        female: { displayName: 'اناث', col: 'F' },
      },
      total: { displayName: 'جملة', col: 'G' },
      familyCount: { displayName: 'عدد الأسر', col: 'H' },
    };

    // get sheet cells
    const cells = Object.entries(this.sheet)
      .filter(([key, value]) => {
        return key.indexOf('!') < 0;
      })
      .map(([key, value]) => {
        return new Cell(key, value);
      });

    // get sheet columns
    const columns = _.groupBy(cells, (c) => c.col);


    // read file header (governorate) cell
    const governorate = cells.find((c) => c.ref === 'B1')?.text;


    // get sections (sub-tables)
    let sectionRows: any = columns[tableHeaders.SectionOrCenter.col]
      .filter((cell) => cell.row >= firstRow)
      .map((cell) => {
        return {
          ref: cell.ref,
          col: cell.col,
          row: cell.row,
          text: cell.text,
        };
      });

    sectionRows = _.groupBy(sectionRows, (secRow) => secRow.text);

    // TODO: convert sectionRows into an array
    


    return {
      // sheet: this.sheet,
      // meta: {
      //   firstCell,
      //   lastCell,
      //   firstCol,
      //   lastCol,
      //   firstRow,
      //   lastRow,
      // },
      // cells,
      // columns,
      // governorate,
      sectionRows,
      // sections: {
      //   count: sections.length,
      //   data: sections
      // },
      // data: {
      //   count: result.length,
      //   sections: result
      // }
    };
  }
}
