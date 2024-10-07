import  {XMLParser} from 'fast-xml-parser'

const options = {
  ignoreAttributes : false
};


export const parseXml = <T>(xmlData: string): T => {
  const parser = new XMLParser(options);
  return parser.parse(xmlData);
}