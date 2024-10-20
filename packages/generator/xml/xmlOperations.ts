import {XMLBuilder, XMLParser} from 'fast-xml-parser'

const options = {
  ignoreAttributes: false,
  format: true,
  suppressEmptyNode: true
};


export const parseXml = <T>(xmlData: string): T => {
  const parser = new XMLParser(options);
  return parser.parse(xmlData);
}

export const stringifyXml = (object: any) => {
  const builder = new XMLBuilder(options);
  return builder.build(object);
}