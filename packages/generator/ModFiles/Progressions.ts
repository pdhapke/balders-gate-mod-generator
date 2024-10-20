import {BaldursGateModTbl} from "../xml";
import {v4 as uuidv4} from 'uuid';
import cloneDeep from 'lodash/cloneDeep'

export type ProgressionsData = BaldursGateModTbl<[
  { '@_name': "Name", '@_type': "NameTableFieldDefinition", '@_value': string },
  { '@_name': "UUID", '@_type': "IdTableFieldDefinition", '@_value': string },
  { '@_name': "TableUUID", '@_type': "GuidTableFieldDefinition", '@_value': string },
  { '@_name': "FSName", '@_type': "StringTableFieldDefinition", '@_value': string },
  { '@_name': "Boosts", '@_type': "StringTableFieldDefinition", '@_value': string },
  { '@_name': "Selectors", '@_type': "StringTableFieldDefinition", '@_value': string },
]>

export class Progressions {

  constructor(private data: ProgressionsData = createDefaultData()) {
  }


  build() {
    const metaData = cloneDeep(this.data);

    return [
      ['Progressions/Progressions.tbl', metaData]
    ];
  }
}

const createDefaultData = (): ProgressionsData => {
  return {
    '?xml': {
      "@_version": '1.0',
      "@_encoding": 'UTF-8'
    },
    stats: {
      '@_stat_object_definition_id': uuidv4(),
      stat_objects: {
          stat_object: [],
        }
      }
    }
}