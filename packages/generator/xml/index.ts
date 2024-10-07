export * from './metaData'


interface Attribute {
  '@_id': string;
  '@_type': string;
  '@_value': string;
}

export interface Node {
  '@_id': string,
  attribute: Attribute | Array<Attribute>
  children: Node | Array<Node>
}

export interface BaldursGateModLsx<Name extends string, TypedNode = {}> {
  '?xml': {
    "@_version": `${number}.${number}`
  },
  save: {
    version: {
      '@_major': `${number}`
      '@_minor': `${number}`
      '@_revision': `${number}`
      '@_build': `${number}`
    },
    region: {
      '@_id': Name,
      node: Node & {
        '@_id': 'root'
      } & TypedNode
    }
  }
}