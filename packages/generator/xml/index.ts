interface Attribute {
  '@_id': string;
  '@_type': string;
  '@_value': string | number;
}

export interface Node {
  '@_id': string,
  attribute?: Attribute | Array<Attribute>
  children?: {
    [key: string]: Node | Array<Node>
  }
}

export interface BaldursGateModLsx<Name extends string, TypedNode = {}> {
  '?xml': {
    "@_version": `${number}.${number}`
    "@_encoding": 'UTF-8'
  },
  save: {
    version: {
      '@_major': number
      '@_minor': number
      '@_revision': number
      '@_build': number
    },
    region: {
      '@_id': Name,
      node: Node & {
        '@_id': 'root'
      } & TypedNode
    }
  }
}

export interface BaldursGateModTbl<Fields extends Array<unknown>> {
  '?xml': {
    "@_version": `${number}.${number}`
    "@_encoding": 'UTF-8'
  },
  stats: {
    '@_stat_object_definition_id': string,
    stat_objects: {
      stat_object: StatObject<Fields> | Array<StatObject<Fields>>
    }
  }
}

interface StatObject<Fields extends Array<unknown>> {
  '@_is_substat': boolean,
  fields: Array<Field> & Fields
}

interface Field {
  '@_name': string,
  '@_type': string,
  '@_value': string,
}

export * from './xmlOperations'