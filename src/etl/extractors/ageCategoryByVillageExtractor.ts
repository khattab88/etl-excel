import { WorkBook, WorkSheet } from 'xlsx/types';
import * as _ from "lodash";

import { Cell } from '../abstractions/cell';
import { Extractor } from './extractor';

export class AgeCategoryByVillageExtractor implements Extractor {
  file: WorkBook;
  sheet: WorkSheet;

  constructor(file: WorkBook) {
    this.file = file;
    this.sheet = file.Sheets[this.file.SheetNames[1]];
  }

  set activeSheetIndex(value: number) {
    throw new Error('Method not implemented.');
  }

  extract(): any {

    // get !REF (A1, Yz)

    const firstCell: string = "A1"; 
    const lastCell: string | any = this.sheet['!ref']?.split(":")[1];

    const firstCol: string = "A";
    const lastCol: string = lastCell.substring(0, 1);

    const firstRow: number = 6;
    const lastRow: number = parseInt(lastCell.substr(1));


    // get sheet cells
    const cells = Object.entries(this.sheet)
      .filter(([key, value]) => { return key.indexOf("!") < 0; })
      .map(([key, value]) => { return new Cell(key, value) });

    // get sheet columns
    const columns = _.groupBy(cells, c => c.col);


    let tableHeaders  : { name: string, displayName: string, col: string }[]
      = [
        { name: "SectionOrCenter", displayName: "قسم/مركز", col: "A" },
        { name: "villageType", displayName: "حضر / ريف", col: "B" },
        { name: "village", displayName: "شياخة / قرية", col: "C" },
        { name: "ageCategory-0", displayName: "أقل من سنة", col: "D" },
        { name: "ageCategory-1", displayName: "١", col: "E" },
        { name: "ageCategory-2", displayName: "٢", col: "F" },
        { name: "ageCategory-3", displayName: "٣", col: "G" },
        { name: "ageCategory-4", displayName: "٤", col: "H" },
        { name: "ageCategory-5", displayName: "٥", col: "I" },
        { name: "ageCategory-6", displayName: "٦", col: "J" },
        { name: "ageCategory-7", displayName: "٧", col: "K" },
        { name: "ageCategory-8", displayName: "٨", col: "L" },
        { name: "ageCategory-9", displayName: "٩", col: "M" },
        { name: "ageCategory-10", displayName: "١٠", col: "N" },
        { name: "ageCategory-11", displayName: "١١", col: "O" },
        { name: "ageCategory-12", displayName: "١٢", col: "P" },
        { name: "ageCategory-13", displayName: "١٣", col: "Q" },
        { name: "ageCategory-14", displayName: "١٤", col: "R" },
        { name: "ageCategory-15", displayName: "١٥", col: "S" },
        { name: "ageCategory-16", displayName: "١٦", col: "T" },
        { name: "ageCategory-17", displayName: "١٧", col: "U" },
        { name: "ageCategory-18", displayName: "١٨", col: "V" },
        { name: "ageCategory-19", displayName: "١٩", col: "W" },
        { name: "ageCategory-20", displayName: "٢٠", col: "X" },
        { name: "total", displayName: "الأجمالى", col: "Y" }
      ];


    let sectionRows = columns[tableHeaders[0].col].filter(cell => cell.row >= firstRow && cell.row > lastCell);

    // get sections
    let sections: { start: number, end: number, text: string }[] = [];

    let i = 0;
    for (let j = 1; j < sectionRows.length; j++) {
      let section = {
        start: sectionRows[i].row,
        end: sectionRows[j].row - 1,
        text: sectionRows[i].text
      };

      sections.push(section);
    }

    const governorate = cells.find(c => c.ref === "A2")?.text;

    ////////////////////////////////////////////////////////////////////////////

    return {
      // sheet: this.sheet,
      firstCell,
      lastCell,
      firstCol,
      lastCol,
      firstRow,
      lastRow,
      // cells,
      // columns,
      // sectionRows,
      // sections: {
      //   count: sections.length,
      //   data: sections
      // },
      // governorate,
    };
  }
}