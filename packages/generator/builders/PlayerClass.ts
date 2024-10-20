import {v4 as uuidv4} from 'uuid';


const NormalAbilityScoreIncreaseLevels: number[] = [4, 8, 12, 16, 19];

export class PlayerClass {
  private levels: Record<number | 'multiclass', ClassLevel> = {
    'multiclass': new ClassLevel('multiclass', this)
  }
  private hitDie: 'd6' | 'd8' | 'd10' | 'd12' = 'd6';
  public name: string;

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


  constructor(name: string) {
    this.name = name;
  }

  /*abilityScoreIncreaseAtLevels(...levels: number[]){

    return this;
  }

  addAbility(){

    return this;
  }*/

  atLevel(level: number | 'multiclass') {
    if (!this.levels[level]) {
      this.levels[level] = new ClassLevel(level, this);
    }

    return this.levels[level];
  }


}

class ClassLevel {
  public id: string = uuidv4();
  private hasAbilityScoreIncrease: boolean = false;


  constructor(private level: number | 'multiclass', private playerClass: PlayerClass) {
  }

  //back to parent
  atLevel(level: number) {
    return this.playerClass.atLevel(level);
  }

  //add class information

}

/*
      <fields>
        <field name="Name" type="NameTableFieldDefinition" value="New_Stat_0" />   //name
        <field name="UUID" type="IdTableFieldDefinition" value="96247c14-8464-411d-80b1-5a26dd8e1566" />
        <field name="TableUUID" type="GuidTableFieldDefinition" value="6026ebe1-a150-4f4a-8080-b5e6aa4cefbe" />
        <field name="FSName" type="StringTableFieldDefinition" value="Summoner" />
        <field name="Boosts" type="StringTableFieldDefinition" value="ActionResource(SpellSlot,2,1);Proficiency(LightArmor);Proficiency(MediumArmor);Proficiency(HeavyArmor);Proficiency(Shields);Proficiency(SimpleWeapons);" />
        <field name="Selectors" type="StringTableFieldDefinition" value="AddSpells(714d1e3d-b436-4af7-9b40-107383e25a5d);SelectSpells(8fd1fe1e-ad9f-4d2c-a4c7-dcc687fc5ae6,1,0)" />
      </fields>
 */












