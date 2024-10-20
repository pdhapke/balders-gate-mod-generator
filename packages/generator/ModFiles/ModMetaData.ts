import {BaldursGateModLsx} from "../xml";
import {v4 as uuidv4} from 'uuid';
import {version} from "../utils";
import cloneDeep from 'lodash/cloneDeep'
import {Node} from "../xml";

export interface ConflictNode {
  '@_id': 'Conflicts',
}

export interface DependencyNode {
  '@_id': 'Dependencies',
  children?: {
    node: (Node & Dependency) | Array<Node & Dependency>
  }
}

interface Dependency {
  '@_id': 'ModuleShortDesc',
  attribute: [
    { '@_id': 'Folder', '@_type': 'LSString', '@_value': string },
    { '@_id': 'MD5', '@_type': 'LSString', '@_value': string },
    { '@_id': 'Name', '@_type': 'LSString', '@_value': string },
    { '@_id': 'PublishHandle', '@_type': 'uint64', '@_value': number },
    { '@_id': 'UUID', '@_type': 'guid', '@_value': string },
    { '@_id': 'Version64', '@_type': 'int64', '@_value': number }
  ],
}

export interface ModuleInfoNode {
  '@_id': 'ModuleInfo',
  attribute: [
    { '@_id': 'Author', '@_type': 'LSString', '@_value': string },
    { '@_id': 'CharacterCreationLevelName', '@_type': 'FixedString', '@_value': string },
    { '@_id': 'Description', '@_type': 'LSString', '@_value': string },
    { '@_id': 'FileSize', '@_type': 'uint64', '@_value': number },
    { '@_id': 'Folder', '@_type': 'LSString', '@_value': string },
    { '@_id': 'LobbyLevelName', '@_type': 'FixedString', '@_value': string },
    { '@_id': 'MD5', '@_type': 'LSString', '@_value': string },
    { '@_id': 'MenuLevelName', '@_type': 'FixedString', '@_value': string },
    { '@_id': 'Name', '@_type': 'LSString', '@_value': string },
    { '@_id': 'NumPlayers', '@_type': 'uint8', '@_value': number },
    { '@_id': 'PhotoBooth', '@_type': 'FixedString', '@_value': string },
    { '@_id': 'PublishHandle', '@_type': 'uint64', '@_value': number },
    { '@_id': 'StartupLevelName', '@_type': 'FixedString', '@_value': string },
    { '@_id': 'UUID', '@_type': 'FixedString', '@_value': string },
    { '@_id': 'Version64', '@_type': 'int64', '@_value': number }
  ],
  children: {
    node: [
        Node & PublishVersion,
        Node & Scripts
    ]
  }
}

interface PublishVersion {
  '@_id': 'PublishVersion',
  attribute: { '@_id': 'Version64', '@_type': 'int64', '@_value': number }
}
interface Scripts {
  '@_id': 'Scripts',
}


export type ModMetadata = BaldursGateModLsx<'Config', {
  children: {
    node: Array<Node | ConflictNode | DependencyNode | ModuleInfoNode>
  }
}>

export class ModMetaData {
  constructor(private modName: string, private modId: string, private projectFolderName: string,  private data: ModMetadata = createDefaultMetaData(modName, modId, projectFolderName)) {

  }

  build() {
    const metaData = cloneDeep(this.data);

    return [['meta.lsx', metaData]];
  }
}

const createDefaultMetaData = (projectName: string, projectId: string, projectFolderName: string): ModMetadata => {
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
        '@_id': 'Config',
        node: {
          '@_id': 'root',
          children: {
            node: [
              {
                '@_id': 'Conflicts',
              },
              {
                '@_id': 'Dependencies',
              },
              {
                '@_id': 'ModuleInfo',
                attribute: [
                  { '@_id': 'Author', '@_type': 'LSString', '@_value': '' },
                  { '@_id': 'CharacterCreationLevelName', '@_type': 'FixedString', '@_value': '' },
                  { '@_id': 'Description', '@_type': 'LSString', '@_value': '' },
                  { '@_id': 'FileSize', '@_type': 'uint64', '@_value': 0 },
                  { '@_id': 'Folder', '@_type': 'LSString', '@_value': projectFolderName },
                  { '@_id': 'LobbyLevelName', '@_type': 'FixedString', '@_value': '' },
                  { '@_id': 'MD5', '@_type': 'LSString', '@_value': '' },
                  { '@_id': 'MenuLevelName', '@_type': 'FixedString', '@_value': '' },
                  { '@_id': 'Name', '@_type': 'LSString', '@_value': projectName },
                  { '@_id': 'NumPlayers', '@_type': 'uint8', '@_value': 4 },
                  { '@_id': 'PhotoBooth', '@_type': 'FixedString', '@_value': '' },
                  { '@_id': 'PublishHandle', '@_type': 'uint64', '@_value': 0 },
                  { '@_id': 'StartupLevelName', '@_type': 'FixedString', '@_value': "" },
                  { '@_id': 'UUID', '@_type': 'FixedString', '@_value': projectId },
                  { '@_id': 'Version64', '@_type': 'int64', '@_value': 0 }
                ],
                children: {
                  node: [
                    {
                      '@_id': 'PublishVersion',
                      attribute: { '@_id': 'Version64', '@_type': 'int64', '@_value': 0 }
                    },
                    {
                      '@_id': 'Scripts',
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  }
}