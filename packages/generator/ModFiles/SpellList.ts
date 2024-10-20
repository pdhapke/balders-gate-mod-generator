import {BaldursGateModTbl} from "../xml";
import {v4 as uuidv4} from 'uuid';
import cloneDeep from 'lodash/cloneDeep'

export type SpellListData = BaldursGateModTbl<[
  { '@_name': "UUID", '@_type': "IdTableFieldDefinition", '@_value': string },
  { '@_name': "Name", '@_type': "NameTableFieldDefinition", '@_value': string },
  { '@_name': "Spells", '@_type': "StringTableFieldDefinition", '@_value': string },
]>

export class SpellList {

  constructor(private data: SpellListData = createDefaultData()) {
  }

  build() {
    const metaData = cloneDeep(this.data);

    return [
      ['Lists/SpellList.tbl', metaData]
    ];
  }
}

const createDefaultData = (): SpellListData => {
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