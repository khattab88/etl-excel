import { WorkBook, WorkSheet } from 'xlsx/types';
import * as _ from "lodash";

import { ErrorMessage } from '../enums/errorMessage';
import { Cell } from '../abstractions/cell';
import { Extractor } from './extractor';

export class AgeCategoryByVillageExtractor implements Extractor {
  file: WorkBook;
  sheet: WorkSheet;

  constructor(file: WorkBook) {
    this.file = file;
    this.sheet = file.Sheets[this.file.SheetNames[1]];
  }

  extract(): any {

    // get !REF (A1, Yz)
    const firstCell: string = "A1";
    const lastCell: string | any = this.sheet['!ref']?.split(":")[1];

    const firstCol: string = "A";
    const lastCol: string = lastCell.substring(0, 1);

    const firstRow: number = 6;
    const lastRow: number = parseInt(lastCell.substr(1));


    let tableHeaders: { name: string, displayName: string, col: string }[]
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


    // get sheet cells
    const cells = Object.entries(this.sheet)
      .filter(([key, value]) => { return key.indexOf("!") < 0; })
      .map(([key, value]) => { return new Cell(key, value) });

    // get sheet columns
    const columns = _.groupBy(cells, c => c.col);


    // read governorate cell
    const governorate = cells.find(c => c.ref === "A2")?.text;

    // read year cell
    const year = cells.find(c => c.ref === "A3")?.text;


    // get sections (sub-tables)
    let sectionRows = columns[tableHeaders[0].col].filter(cell => cell.row >= firstRow);

    let sections: { start: number, end: number, text: string }[] = [];

    for (let i = 0, j = 1; j < sectionRows.length; i++, j++) {
      let section = {
        start: sectionRows[i].row,
        end: sectionRows[j].row - 1,
        text: sectionRows[i].text
      };

      sections.push(section);
    }


    // FOREACH section, read row values
    let data = sections.map(section => {
      const sectionName = section.text;
      console.log(sectionName);

      // get village type rows (urban, rural)
      let villageTypeRows = columns[tableHeaders[1].col].filter(cell => cell.row >= section.start && cell.row < section.end - 1);
      console.log(villageTypeRows);

      let villageTypes: { start: number, end: number, text: string }[] = [];

      // TODO: use DO-WHILE instead of FOR loop 
      // (ensure that it will run at least once)
      for (let i = 0, j = 1; j < villageTypeRows.length; i++, j++) {
        let villageType = {
          start: villageTypeRows[i].row,
          end: villageTypeRows[j].row - 1,
          text: villageTypeRows[i].text
        };

        villageTypes.push(villageType);
      }

      // console.log(villageTypes);

      console.log("---------------------------------------");

      return {
        name: sectionName,
        villageTypes
      }
    });

    return {
      // sheet: this.sheet,
      // firstCell,
      // lastCell,
      // firstCol,
      // lastCol,
      // firstRow,
      // lastRow,
      // cells,
      // columns,
      // governorate,
      // year,
      // sectionRows,
      // sections: {
      //   count: sections.length,
      //   data: sections
      // },
      data
    };

  }

}