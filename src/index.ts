import { FileType } from './etl/enums/fileType';
import { ETL } from './etl';

const Echo = (name: string) => `Hello ${name}`;

export { Echo, ETL, FileType };
