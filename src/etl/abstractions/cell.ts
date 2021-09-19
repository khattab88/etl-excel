/* tslint:disable */
import { CellType } from '../enums/cellType';

export class Cell {
  ref?: string;
  col?: string;
  row: number;

  type?: CellType;
  text: string;
  value?: string | number;

  constructor(ref: string, obj: any) {
    this.ref = ref;
    this.col = ref.substring(0, 1);
    // @ts-ignore: Missing radix parameter
    this.row = parseInt(ref.substr(1));

    this.type = obj['t'] === 'n' ? CellType.Number : CellType.String;

    this.text = obj['w'];
    this.value = obj['v'];
  }
}
