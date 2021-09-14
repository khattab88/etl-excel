import { WorkBook, WorkSheet, utils } from 'xlsx';

import { FileType } from './enums/fileType';
import { Extractor } from './extractors/extractor';
import { Transformer } from './transformers/transformer';
import { AgeCategoryByVillageExtractor } from './extractors/ageCategoryByVillageExtractor';
import { AgeCategoryByVillageTransformer } from './transformers/ageCategoryByVillageTransformer';

export class ETL {
  private fileType?: FileType;
  private file?: WorkBook;

  private extractor: Extractor | any;
  private transformer: Transformer | any;

  constructor(fileType: FileType, file: WorkBook) {
    this.fileType = fileType;
    this.file = file;

    switch (fileType) {
      case FileType.AgeCategoryByVillage:
        this.extractor = new AgeCategoryByVillageExtractor();
        this.transformer = new AgeCategoryByVillageTransformer();
      default:
        this.extractor = new AgeCategoryByVillageExtractor();
        this.transformer = new AgeCategoryByVillageTransformer();
    }

    // console.log(this.fileType);
  }

  load() {
    const input = this.extractor.extract(this.file);
    const output = this.transformer.transform(input);

    // console.log(output);
    return output;
  }
}
