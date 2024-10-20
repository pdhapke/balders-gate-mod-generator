import {SpellList, SpellListData} from "./SpellList";
import {Progressions, ProgressionsData} from "./Progressions";
import {PlayerClass} from "../builders/PlayerClass";
import {isString} from "lodash";

export class EditorData {
  private classDictionary: Record<string, PlayerClass> = {}
  private spellList: SpellList
  private progressions: Progressions

  constructor(data?: {
    progressionsData?: ProgressionsData,
    spellListData?: SpellListData,
  }) {
    this.progressions = new Progressions(data?.progressionsData)
    this.spellList = new SpellList(data?.spellListData)

    //load current classes
    //some loop that loads all of the classes that are currently defined.
  }

  class(playerClass: string | PlayerClass) {
    if(!isString(playerClass)){
      this.classDictionary[playerClass.name] = playerClass
      return playerClass;
    }

    if (!this.classDictionary[playerClass]) {
      this.classDictionary[playerClass] = new PlayerClass(playerClass)
    }
    return this.classDictionary[playerClass]
  }

  build() {
    //some complicated building logic needs to happen to shuffle classes into place.

    return [
      ...this.spellList.build(),
      ...this.progressions.build()
    ];
  }
}
