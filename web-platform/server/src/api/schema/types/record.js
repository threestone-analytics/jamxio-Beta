import Document from './document';
import Publisher from './publisher';

const Record = `
  type Record  @cacheControl(maxAge: 240){
    _id: ID
    publishedDate: Date
    document: Document
    publisher: Publisher
  }
`;

export default () => [Record, Document, Publisher];
