import { WorkBook, WorkSheet, utils } from 'xlsx';

import { FileType } from './enums/fileType';
import { Extractor } from './extractors/extractor';
import { AgeCategoryByVillageExtractor } from './extractors/ageCategoryByVillageExtractor';
import { GenderByFollwerExtractor } from './extractors/genderByFollowerExtractor';
import { Transformer } from './transformers/transformer';
import { AgeCategoryByVillageTransformer } from './transformers/ageCategoryByVillageTransformer';
import { GenderByFollowerTransformer } from './transformers/genderByFollowerTransformer';
import { ErrorMessage } from './enums/errorMessage';


export class ETL {
  private fileType?: FileType;
  private file?: WorkBook;

  private extractor: Extractor | any;
  private transformer: Transformer | any;

  constructor(fileType: FileType, file: WorkBook) {
    this.fileType = fileType;
    this.file = file;

    // console.log(this.fileType);

    if (fileType === FileType.AgeCategoryByVillage) 
    {
      this.extractor = new AgeCategoryByVillageExtractor(file);
      this.transformer = new AgeCategoryByVillageTransformer();
    } 
    else if (fileType === FileType.GenderByFollower) {
      this.extractor = new GenderByFollwerExtractor(file);
      this.transformer = new GenderByFollowerTransformer();
    }
    else {
      throw new Error(ErrorMessage.NoFileTypeSelected);
    }

  }

  load() {
    const input = this.extractor.extract(this.file);
    const output = this.transformer.transform(input);

    // console.log(output);
    return output;
  }
}
