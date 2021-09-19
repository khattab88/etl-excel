import { Transformer } from './transformer';

export class GenderByFollowerTransformer implements Transformer {
  transform(input: any): any {
    return input;
  }
}

// export class GenderByFollowerTransformer implements Transformer<any, any> {
//     transform(input: any) : any {
//         return input;
//     }
// }
