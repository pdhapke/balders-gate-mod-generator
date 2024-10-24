import {BaldursGateModTbl} from "../xml";
import {v4 as uuidv4} from 'uuid';
import cloneDeep from 'lodash/cloneDeep'


export enum ProgressionType {
 Normal,
 Subclass
}

export type ProgressionsData = BaldursGateModTbl<[
  { '@_name': "Name", '@_type': "NameTableFieldDefinition", '@_value': string }, //This is a table value and not the class name
  { '@_name': "UUID", '@_type': "IdTableFieldDefinition", '@_value': string },
  { '@_name': "TableUUID", '@_type': "GuidTableFieldDefinition", '@_value': string },
  { '@_name': "FSName", '@_type': "StringTableFieldDefinition", '@_value': string },
  { '@_name': "Boosts", '@_type': "StringTableFieldDefinition", '@_value': string },
  { '@_name': "Selectors", '@_type': "StringTableFieldDefinition", '@_value': string },
  { '@_name': "Level", '@_type': "ByteTableFieldDefinition", '@_value': number },
  { '@_name': "ProgressionType", '@_type': "ByteTableFieldDefinition", '@_value': ProgressionType },
  { '@_name': "PassivesAdded", '@_type': "StringTableFieldDefinition", '@_value': string },
  { '@_name': "PassivesRemoved", '@_type': "StringTableFieldDefinition", '@_value': string },
  { '@_name': "SubClasses", '@_type': "GuidObjectListTableFieldDefinition", '@_value': string },
  { '@_name': "AllowImprovement", '@_type': "BoolTableFieldDefinition", '@_value': "True" | "False"  },
  { '@_name': "IsMulticlass", '@_type': "BoolTableFieldDefinition", '@_value': "True" | "False" },
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