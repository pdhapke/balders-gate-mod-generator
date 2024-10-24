import {v4 as uuidv4} from 'uuid';
import {ProgressionType} from "../ModFiles/Progressions";
import {Ability} from "../abilities";


const NormalAbilityScoreIncreaseLevels: number[] = [4, 8, 12, 16, 19];

export class PlayerClass {
  private levels: Record<number | 'multiclass', ClassLevel> = {
    'multiclass': new ClassLevel('multiclass', this)
  }
  private hitDie: 'd6' | 'd8' | 'd10' | 'd12' = 'd6';


  //A class will need to have
  //x1. A name
  //x2. levels that grant ASI
  //3. abilities per level
  //4. Spell slots
  //5. Spells / Spell choices
  //6. Subclasses
  //7. Hit die
  //8. abilities granted for multi classing


  //Subclass
  //1. A name
  //2. levels that grant ASI
  //3. abilities per level
  //4. Spell slots
  //5. Spells / Spell choices


  constructor(public name: string, public id: string = uuidv4()) {
  }

  /*abilityScoreIncreaseAtLevels(...levels: number[]){

    return this;
  }

  addAbility(){

    return this;
  }*/

  //addFullSpellProgression
  //addHalfSpellProgression

  atLevel(level: number | 'multiclass') {
    if (!this.levels[level]) {
      this.levels[level] = new ClassLevel(level, this);
    }

    return this.levels[level];
  }


}

class ClassLevel {
  public id: string = uuidv4();
  public hasAbilityScoreIncrease: boolean = false;
  public boosts: Array<string> = [];
  public selectors: Array<string> = [];
  public passives: Array<string> = [];
  public subclassSelections: Array<string> = [];

  get isMultiClass() {
    return this.level === 'multiclass' ? 'True' : 'False';
  }
  get Level() {
    return this.level === 'multiclass' ? 1 : this.level;
  }

  constructor(private level: number | 'multiclass', private playerClass: PlayerClass, public progressionType: ProgressionType = ProgressionType.Normal) {
  }

  addAbility(...abilities: Ability[]){
    for (let ability of abilities) {
      if(ability.type === 'passive') {
        this.passives.push(ability.value)
      }
      if(ability.type === 'boost') {
        this.boosts.push(ability.value)
      }
      if(ability.type === 'selector') {
        this.selectors.push(ability.value)
      }
    }
    return this;
  }

  addAbilityScoreIncrease(hasAbilityScoreIncrease = true){
    this.hasAbilityScoreIncrease = hasAbilityScoreIncrease;
    return this;
  }

  addSubClassSelection(subclassName: string){
    this.subclassSelections.push(subclassName);
    return this;
  }

  //back to parent
  atLevel(level: number) {
    return this.playerClass.atLevel(level);
  }
  nextLevel() {
    return this.playerClass.atLevel(this.Level + 1);
  }

  //add class information

}










