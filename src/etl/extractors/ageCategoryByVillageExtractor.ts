import { WorkBook, WorkSheet } from 'xlsx/types';
import * as _ from "lodash";

import { Cell } from '../abstractions/cell';
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

    // get !REF (A1, Yz)

    const lastCell: string | any = sheet['!ref']?.split(":")[1];
    const lastCol: string = lastCell.substring(0, 1);
    const lastRow: number = parseInt(lastCell.substr(1));
    const firstTableRow = 6;


    // get sheet cells
    const cells = Object.entries(sheet)
      .filter(([key, value]) => { return key.indexOf("!") < 0; })
      .map(([key, value]) => { return new Cell(key, value)  });

    // get columns
    const columns = _.groupBy(cells, c => c.col);

    // get sections
    let sections: { start: number, end: number, text: string }[] = [];

    let sectionRows = columns["A"]
      .filter(cell => cell.row >= firstTableRow);
    // .map(cell => cell.row);


    let i = 0;
    for (let j = 1; j < sectionRows.length; j++) {
      let section = {
        start: sectionRows[i].row,
        end: sectionRows[j].row - 1,
        text: sectionRows[i].text
      };

      sections.push(section);
    }

    const format = {
      fileHeader: {
        governorate: "A2",
        year: "A3"
      },
      tableHeaders: {
        SectionOrCenter: "A4",
        SectionOrCenterType: "B4",
        village: "C4",
        ageCategories: {
          0: "D5",
          1: "E5",
          2: "F5",
          3: "G5",
          4: "H5",
          5: "I5",
          6: "J5",
          7: "K5",
          8: "L5",
          9: "M5",
          10: "N5",
          11: "O5",
          12: "P5",
          13: "Q5",
          14: "R5",
          15: "S5",
          16: "T5",
          17: "U5",
          18: "V5",
          19: "W5",
          20: "X5"
        },
        total: "Y5"
      }
    };


    ////////////////////////////////////////////////////////////////////////////


    const governorate = cells.find(c => c.ref === "A2")?.text.indexOf("بمحافظة");

    return {
      // sheet
      lastCell,
      lastCol,
      lastRow,
      // cells,
      // columns,
      // sectionRows,
      sections,
      // governorate
    };
  }
}