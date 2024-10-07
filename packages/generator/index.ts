import {v4 as uuidv4} from 'uuid';
import {makeDirectory} from "./utils";
import {readdirSync} from "node:fs";
import {loadMetadataFile} from "./xml";

interface ModConfiguration {
  baldursGatePath: string;
  nameIncludesUuid?: boolean;
}

export class Mod {
  private nameIncludesUuid: boolean = true;
  private baldursGatePath: string;

  name: string;
  modUUID: string = uuidv4();

  private get uniqueName() {
    return this.nameIncludesUuid ? `${this.name}_${this.modUUID}` : this.name;
  }

  private get ModsFolder() {
    return `${this.baldursGatePath}/Data/Mods/${this.uniqueName}`
  }

  private get ProjectFolder() {
    return `${this.baldursGatePath}/Data/Project/${this.uniqueName}`
  }

  private get PublicFolder() {
    return `${this.baldursGatePath}/Data/Public/${this.uniqueName}`
  }

  private get EditorFolder() {
    return `${this.baldursGatePath}/Data/Editor/Mods/${this.uniqueName}`
  }

  constructor(name: string, configuration: ModConfiguration) {
    this.name = name;
    this.baldursGatePath = configuration.baldursGatePath;
    this.#loadExisting()
  }

  #loadExisting() {
    makeDirectory(`${this.baldursGatePath}/Data/Project`)
    const [modDefinitionDirectory] = readdirSync(`${this.baldursGatePath}/Data/Project`, {withFileTypes: true})
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(directoryName => directoryName.startsWith(this.name))

    if (modDefinitionDirectory) {
      const moduleNode = loadMetadataFile(`${modDefinitionDirectory}/meta.lsx`)?.save.region.node.attribute.find(node => node["@_id"] === 'Module');
      const uuidFromFile = moduleNode?.["@_value"];
      const [, uuidFromDirectory] = modDefinitionDirectory.split('_')

      this.modUUID = uuidFromFile ?? uuidFromDirectory;
      this.nameIncludesUuid = !!uuidFromDirectory
    }
  }

  build() {
    makeDirectory(this.ModsFolder);
    makeDirectory(this.ProjectFolder);
    makeDirectory(this.PublicFolder);
    makeDirectory(this.EditorFolder);

    //todo build all the sub objects in order
  }
}

