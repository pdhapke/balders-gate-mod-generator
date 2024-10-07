#!/usr/bin/env ./node_modules/.bin/ts-node

import 'dotenv/config'
import {Mod} from "generator";
import path from "node:path";

const SummonerMod = new Mod('Summoner', {
  baldursGatePath: process.argv.includes('deploy') ? process.env.BALDURS_GATE_PATH ?? '' : path.join(__dirname, './build'),
});

SummonerMod.build();
