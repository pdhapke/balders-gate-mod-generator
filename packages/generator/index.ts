import {v4 as uuidv4} from 'uuid';
import {loadFile, makeDirectory, saveFile} from "./utils";
import {readdirSync} from "node:fs";
import {ProjectMetadata, ProjectMetaData} from "./ModFiles/ProjectMetaData";
import {ModMetaData} from "./ModFiles/ModMetaData";
import {EditorData} from "./ModFiles/EditorData";

interface ModConfiguration {
  baldursGatePath: string;
  nameIncludesUuid?: boolean;
}

export class Mod {
  private readonly baldursGatePath: string;
  private nameIncludesUuid: boolean = true;
  private projectMetaData: ProjectMetaData;
  private modMetaData: ModMetaData;
  private editorData: EditorData;

  private modUUID: string = uuidv4();

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

  constructor(public name: string, private configuration: ModConfiguration) {
    this.baldursGatePath = configuration.baldursGatePath;
    this.loadExistingProjectId();

    this.projectMetaData = new ProjectMetaData(this.name, this.modUUID, loadFile<ProjectMetadata>(`${this.ProjectFolder}/meta.lsx`) );
    this.modMetaData =  new ModMetaData(this.name, this.modUUID, this.uniqueName, loadFile(`${this.ModsFolder}/meta.lsx`));
    this.editorData =  new EditorData({
      spellListData: loadFile(`${this.EditorFolder}/Lists/SpellLists.tbl`),
      progressionsData: loadFile(`${this.EditorFolder}/Progressions/Progressions.tbl`),
    });
  }

  build() {
    //todo build all the sub objects in order
    this.buildProjectMetaDataFile();
    this.buildModMetaDataFile()
    this.buildEditorTableFiles()
    makeDirectory(this.PublicFolder);
  }

  private loadExistingProjectId() {
    makeDirectory(`${this.baldursGatePath}/Data/Project`)
    const [modDefinitionDirectory] = readdirSync(`${this.baldursGatePath}/Data/Project`, {withFileTypes: true})
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(directoryName => directoryName.startsWith(this.name))

    if (modDefinitionDirectory) {
      const metaData = loadFile<ProjectMetadata>(`${modDefinitionDirectory}/meta.lsx`)
      const uuidFromFile = metaData?.save.region.node.attribute.find(node => node["@_id"] === 'Module')?.["@_value"] as string;
      const [, uuidFromDirectory] = modDefinitionDirectory.split('_')
      this.modUUID = uuidFromFile ?? uuidFromDirectory;
      this.nameIncludesUuid = !!uuidFromDirectory
    }
  }

  private buildProjectMetaDataFile() {
    makeDirectory(this.ProjectFolder);
    for (const [fileName, fileData] of this.projectMetaData.build()) {
      saveFile(`${this.ProjectFolder}/${fileName}`, fileData);
    }
  }

  private buildModMetaDataFile() {
    makeDirectory(this.ModsFolder);
    for (const [fileName, fileData] of this.modMetaData.build()) {
      saveFile(`${this.ModsFolder}/${fileName}`, fileData);
    }
  }

  private buildEditorTableFiles() {
    makeDirectory(this.EditorFolder);
    for (const [fileName, fileData] of this.editorData.build()) {
      saveFile(`${this.EditorFolder}/${fileName}`, fileData);
    }
  }
}

