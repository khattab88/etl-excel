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


    let tableHeaders = {
      SectionOrCenter: { displayName: "قسم/مركز", col: "A" },
      villageType: { displayName: "حضر / ريف", col: "B" },
      village: { displayName: "شياخة / قرية", col: "C" },
      ageCategories: {
        ageCategory_0: { displayName: "أقل من سنة", col: "D" },
        ageCategory_1: { displayName: "١", col: "E" },
        ageCategory_2: { displayName: "٢", col: "F" },
        ageCategory_3: { displayName: "٣", col: "G" },
        ageCategory_4: { displayName: "٤", col: "H" },
        ageCategory_5: { displayName: "٥", col: "I" },
        ageCategory_6: { displayName: "٦", col: "J" },
        ageCategory_7: { displayName: "٧", col: "K" },
        ageCategory_8: { displayName: "٨", col: "L" },
        ageCategory_9: { displayName: "٩", col: "M" },
        ageCategory_10: { displayName: "١٠", col: "N" },
        ageCategory_11: { displayName: "١١", col: "O" },
        ageCategory_12: { displayName: "١٢", col: "P" },
        ageCategory_13: { displayName: "١٣", col: "Q" },
        ageCategory_14: { displayName: "١٤", col: "R" },
        ageCategory_15: { displayName: "١٥", col: "S" },
        ageCategory_16: { displayName: "١٦", col: "T" },
        ageCategory_17: { displayName: "١٧", col: "U" },
        ageCategory_18: { displayName: "١٨", col: "V" },
        ageCategory_19: { displayName: "١٩", col: "W" },
        ageCategory_20: { displayName: "٢٠", col: "X" },
      },
      total: { displayName: "الأجمالى", col: "Y" }
    };


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
    let sectionRows = columns[tableHeaders.SectionOrCenter.col].filter(cell => cell.row >= firstRow);

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
    let result = sections.map(section => {
      const sectionName = section.text;
      console.log(sectionName);

      // get village type rows (urban, rural)
      let villageTypeRows = columns[tableHeaders.villageType.col].filter(cell => cell.row >= section.start && cell.row < section.end - 1);
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
        villageTypes,
        // villages,
        // ageCategories,
        // total
      }
    });


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
      // year,
      // sectionRows,
      // sections: {
      //   count: sections.length,
      //   data: sections
      // },
      data: {
        count: result.length,
        sections: result
      }
    };

  }

}