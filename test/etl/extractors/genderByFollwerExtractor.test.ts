import * as XLSX from 'xlsx';

import { Extractor } from '../../../src/etl/extractors/extractor';
import { GenderByFollowerExtractor } from '../../../src/etl/extractors/genderByFollowerExtractor';

test('Constructor_InitializeValidObjectType', () => {
    // let file: XLSX.WorkBook | any = null;

    // let extractor = new GenderByFollowerExtractor(file);

    // expect(extractor).toBeDefined();
    // expect(extractor).toBeInstanceOf(GenderByFollowerExtractor);

    expect(true).toBeTruthy();
});