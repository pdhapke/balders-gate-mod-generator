import {parseXml} from "./xmlParser";
import {BaldursGateModLsx} from "./index";
import {UUID} from "node:crypto";
import {getFileContents} from "../utils";

type Metadata = BaldursGateModLsx<'MetaData', {
  attribute: [
    { '@_id': "GameProject", '@_type': "LSString", '@_value': '' },
    { '@_id': "Module", '@_type': "LSString", '@_value': UUID },
    { '@_id': "Name", '@_type': "LSString", '@_value': string },
    { '@_id': "UUID", '@_type': "LSString", '@_value': UUID }
  ]
}>

export const loadMetadataFile = (filename: string): Metadata | undefined => {
  const file = getFileContents(filename);
  if (file) {
    return parseXml<Metadata>(file);
  }
}