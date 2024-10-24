export type Passive = 'passive'
export type Boost = 'boost'
export type Selector = 'selector'

export interface Ability {
  type: Passive | Boost | Selector,
  value: string
}

export const Boosts = {
  LevelOneSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,1)'},
  LevelTwoSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,2)'},
  LevelThreeSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,3)'},
  LevelFourSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,4)'},
  LevelFiveSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,5)'},
  LevelSixSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,6)'},
  LevelSevenSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,7)'},
  LevelEightSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,8)'},
  LevelNineSpell: {type: 'boost', value: 'ActionResource(SpellSlot,1,9)'},
  Proficency: {
    LightArmor: {type: 'boost', value: 'Proficiency(LightArmor)'},
    MediumArmor: {type: 'boost', value: 'Proficiency(MediumArmor)'},
    HeavyArmor: {type: 'boost', value: 'Proficiency(HeavyArmor)'},
    Shields: {type: 'boost', value: 'Proficiency(Shields)'},
    SimpleWeapons: {type: 'boost', value: 'Proficiency(SimpleWeapons)'},
  }
}