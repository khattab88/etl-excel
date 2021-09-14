import { Transformer } from './transformer';

export class AgeCategoryByVillageTransformer implements Transformer {
  transform(input: any): any {
    return input;
  }
}

// export class AgeCategoryByVillageTransformer implements Transformer<any, any> {
//     transform(input: any) : any {
//         return input;
//     }
// }
