import {BaldursGateModLsx} from "../xml";
import {v4 as uuidv4} from 'uuid';
import {version} from "../utils";
import cloneDeep from 'lodash/cloneDeep'

export type ProjectMetadata = BaldursGateModLsx<'MetaData', {
  attribute: [
    { '@_id': "GameProject", '@_type': "LSString", '@_value': '' },
    { '@_id': "Module", '@_type': "LSString", '@_value': string },
    { '@_id': "Name", '@_type': "LSString", '@_value': string },
    { '@_id': "UUID", '@_type': "LSString", '@_value': string }
  ]
}>

export class ProjectMetaData {

  constructor(private modName: string, private modId: string, private data: ProjectMetadata = createDefaultMetaData(modName, modId)) {
  }

  get id() {
    return this.data.save.region.node.attribute.find(node => node["@_id"] === 'UUID')?.["@_value"];
  }

  build() {
    const metaData = cloneDeep(this.data);

    return [['meta.lsx', metaData]];
  }
}

const createDefaultMetaData = (projectName: string, projectId: string): ProjectMetadata => {
  return {
    '?xml': {
      "@_version": '1.0',
      "@_encoding": 'UTF-8'
    },
    save: {
      version: {
        '@_major': version.major,
        '@_minor': version.minor,
        '@_revision': version.revision,
        '@_build': version.build
      },
      region: {
        '@_id': 'MetaData',
        node: {
          '@_id': 'root',
          attribute: [
            {'@_id': 'GameProject', '@_type': 'LSString', '@_value': ''},
            {'@_id': 'Module', '@_type': 'LSString', '@_value': projectId},
            {'@_id': 'Name', '@_type': 'LSString', '@_value': projectName},
            {'@_id': 'UUID', '@_type': 'LSString', '@_value': uuidv4()}
          ],
          children: {
            node: {
              '@_id': 'Categories',
            }
          }
        }
      }
    }
  }
}