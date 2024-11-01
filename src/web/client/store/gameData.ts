import { Brand } from '@/@types/Brand'
import healerCsv from './csv/healer.csv' with { type: 'text' }
import tank1Csv from './csv/tank1.csv' with { type: 'text' }
import tank3Csv from './csv/tank2.csv' with { type: 'text' }
import tank2Csv from './csv/tank3.csv' with { type: 'text' }
import dps1Csv from './csv/dps1.csv' with { type: 'text' }
import dps2Csv from './csv/dps2.csv' with { type: 'text' }
import dps3Csv from './csv/dps3.csv' with { type: 'text' }
import dps4Csv from './csv/dps4.csv' with { type: 'text' }
import dps5Csv from './csv/dps5.csv' with { type: 'text' }
import dps6Csv from './csv/dps6.csv' with { type: 'text' }

// ----------------------------------------------------------------------------
// MARK: GearType
// ----------------------------------------------------------------------------

// Values must match columns in csv
export enum GearType {
    EARRINGS = 'earrings',
    NECK = 'neck',
    BRACELET = 'bracelet',
    RING = 'ring',
    BOOTS = 'boots',
    BELT = 'belt',
    CHEST = 'chest',
    SHIELD = 'shield',
    HELM = 'helm',
    BOW = 'bow',
    CLAW = 'claw',
    AXE = 'axe',
    STAFF = 'staff',
    SWORD = 'sword',
}

const gearTypes = Object.values(GearType)
const gearTypesSet = new Set<string>(gearTypes)

export function isGearType(gearType: string): gearType is GearType {
    return gearTypesSet.has(gearType)
}

export function isWeapon(gearType: GearType): boolean {
    switch (gearType) {
        case GearType.BOW:
        case GearType.CLAW:
        case GearType.AXE:
        case GearType.STAFF:
        case GearType.SWORD:
            return true
    }

    return false
}

export function getGearTypeLabel(gearType: string): string {
    if (!isGearType(gearType)) {
        return 'Unknown'
    }

    switch (gearType) {
        case GearType.EARRINGS : return 'Earrings'
        case GearType.NECK : return 'Neck'
        case GearType.BRACELET : return 'Bracelet'
        case GearType.RING : return 'Ring'
        case GearType.BOOTS : return 'Boots'
        case GearType.BELT : return 'Belt'
        case GearType.CHEST : return 'Chest'
        case GearType.HELM : return 'Helm'

        case GearType.SHIELD : return 'Shield'
        case GearType.BOW : return 'Bow'
        case GearType.CLAW : return 'Claw'
        case GearType.AXE : return 'Axe'
        case GearType.STAFF : return 'Staff'
        case GearType.SWORD : return 'Sword'
    }
}

// ----------------------------------------------------------------------------
// MARK: CharacterType
// ----------------------------------------------------------------------------

export enum CharacterType {
    HEALER = 'healer',
    TANK_1 = 'tank1',
    TANK_2 = 'tank2',
    TANK_3 = 'tank3',
    DPS_1 = 'dps1',
    DPS_2 = 'dps2',
    DPS_3 = 'dps3',
    DPS_4 = 'dps4',
    DPS_5 = 'dps5',
    DPS_6 = 'dps6',
}

const characterTypes = Object.values(CharacterType)
const characterTypesSet = new Set<string>(characterTypes)

export function isCharacterType(characterType: string): characterType is CharacterType {
    return characterTypesSet.has(characterType)
}

export function getCharacterTypeLabel(characterType: string): string {
    if (!isCharacterType(characterType)) {
        return 'Unknown'
    }

    switch (characterType) {
        case CharacterType.HEALER: return 'Healer'
        case CharacterType.TANK_1: return 'Tank 1'
        case CharacterType.TANK_2: return 'Tank 2'
        case CharacterType.TANK_3: return 'Tank 3'
        case CharacterType.DPS_1: return 'DPS 1'
        case CharacterType.DPS_2: return 'DPS 2'
        case CharacterType.DPS_3: return 'DPS 3'
        case CharacterType.DPS_4: return 'DPS 4'
        case CharacterType.DPS_5: return 'DPS 5'
        case CharacterType.DPS_6: return 'DPS 6'
    }
}

// ----------------------------------------------------------------------------
// MARK: GearRank
// ----------------------------------------------------------------------------

export type GearRank = Brand<number, 'GearRank'>

export const MIN_GEAR_RANK = 1 as GearRank
export const MAX_GEAR_RANK = 19 as GearRank

export function parseGearRank(gearRank: string): GearRank {
    const val = parseInt(gearRank)
    if (!isGearRank(val)) {
        throw new Error(`Invalid gearRank:${gearRank}`)
    }

    return val
}

export function isGearRank(gearRank: number): gearRank is GearRank {
    return !isNaN(gearRank) && gearRank >= MIN_GEAR_RANK && gearRank <= MAX_GEAR_RANK
}

export function getGearRankLabel(gearRank: number): string {
    switch (gearRank) {
        case 1: return 'Wood'
        case 2: return 'Stone'
        case 3: return 'Iron'
        case 4: return 'Bronze'
        case 5: return 'Silver'
        case 6: return 'Gold'
        case 7: return 'Mithril'
        case 8: return 'Amber'
        case 9: return 'Amethyst'
        case 10: return 'Onyx'
        case 11: return 'Sapphire'
        case 12: return 'Ruby'
        case 13: return 'Emerald'
        case 14: return 'Diamond'
        case 15: return 'Phantom Bird'
        case 16: return 'Boar'
        case 17: return 'Wolf'
        case 18: return 'Shark'
        case 19: return 'Spirit'
    }

    return 'Unknown'
}

// ----------------------------------------------------------------------------
// MARK: GearTypesForCharacterType
// ----------------------------------------------------------------------------

export type GearTypesForCharacterType = {
    [key in CharacterType]: Partial<{
        [key in GearRank]: {
            currRankGear: Array<GearType>
            prevRankGear: Array<GearType>
        }
    }>
}

export function parseCharacterGearType(csv: string): GearTypesForCharacterType[CharacterType] {
    const output: GearTypesForCharacterType[CharacterType] = []

    let prevRank: number = MIN_GEAR_RANK - 1
    let currRank: number = MIN_GEAR_RANK

    const rows = csv
        .trim().split('\n')
        .map((row) => {
            const cols = row.trim().split(',')
            return cols.map((col) => col.trim())
        })

    for (let i = 1; i < rows.length; i++) {
        const rankGears: GearTypesForCharacterType[CharacterType][GearRank] = {
            currRankGear: [],
            prevRankGear: [],
        }

        const cols = rows[i]
        const gearRank = parseGearRank(cols[0])
        output[gearRank] = rankGears

        for (let j = 1; j < cols.length; j++) {
            const col = cols[j]
            if (!col) {
                continue // Skip empty cell
            }

            const gearType = rows[0][j]
            if (!isGearType(gearType)) {
                throw new Error(`Invalid gearType:${gearType}`)
            }

            if (col === '*') {
                if (currRank === MIN_GEAR_RANK) {
                    rankGears.currRankGear.push(gearType)
                    rankGears.currRankGear.push(gearType)
                } else {
                    rankGears.currRankGear.push(gearType)
                    rankGears.prevRankGear.push(gearType)
                }
            } else {
                const rank = parseGearRank(col)
                if (rank === currRank) {
                    rankGears.currRankGear.push(gearType)
                } else if (rank === prevRank) {
                    rankGears.prevRankGear.push(gearType)
                } else {
                    throw new Error(`Invalid rank:${col}`)
                }
            }
        }

        // Sanity checks
        if (!(
            (rankGears.currRankGear.length == 3 && rankGears.prevRankGear.length == 3) ||
            (rankGears.currRankGear.length == 6 && rankGears.prevRankGear.length == 0)
        )) {
            console.error(rankGears)
            throw new Error(`rank:${currRank} has invalid number of gears`)
        }

        prevRank = currRank
        currRank = currRank + 1
    }

    return output
}

export const characterTypeToGearType: GearTypesForCharacterType = {
    [CharacterType.HEALER]: parseCharacterGearType(healerCsv),
    [CharacterType.TANK_1]: parseCharacterGearType(tank1Csv),
    [CharacterType.TANK_2]: parseCharacterGearType(tank2Csv),
    [CharacterType.TANK_3]: parseCharacterGearType(tank3Csv),
    [CharacterType.DPS_1]: parseCharacterGearType(dps1Csv),
    [CharacterType.DPS_2]: parseCharacterGearType(dps2Csv),
    [CharacterType.DPS_3]: parseCharacterGearType(dps3Csv),
    [CharacterType.DPS_4]: parseCharacterGearType(dps4Csv),
    [CharacterType.DPS_5]: parseCharacterGearType(dps5Csv),
    [CharacterType.DPS_6]: parseCharacterGearType(dps6Csv),
}

// ----------------------------------------------------------------------------
// MARK: GearCost
// ----------------------------------------------------------------------------

export type ShardCost = Partial<Record<GearRank, number>>

export function addShardCost(a: ShardCost, b: ShardCost): ShardCost {
    const sum: ShardCost = {}

    for (let rank = MIN_GEAR_RANK; rank <= MAX_GEAR_RANK; rank++) {
        if (rank in a) {
            sum[rank] = (sum[rank] ?? 0) + (a[rank] ?? 0)
        }
        if (rank in b) {
            sum[rank] = (sum[rank] ?? 0) + (b[rank] ?? 0)
        }
    }

    return sum
}

export function getGearRankShardCost(gearRank: GearRank, isWeapon: boolean): ShardCost {
    const prevRank = gearRank - 1 as GearRank

    switch (gearRank) {
        case 1: return { [gearRank]: 1 }
        case 2: return { [gearRank]: 1 }
        case 3: {
            const cost = isWeapon ? 3 : 3
            return addShardCost({ [gearRank]: cost }, getGearRankShardCost(prevRank, isWeapon))
        }
        case 4: {
            const cost = isWeapon ? 5 : 3
            return addShardCost({ [gearRank]: cost }, getGearRankShardCost(prevRank, isWeapon))
        }
        case 5: {
            const cost = isWeapon ? 7 : 5
            return addShardCost({ [gearRank]: cost }, getGearRankShardCost(prevRank, isWeapon))
        }
        case 6: {
            const cost = isWeapon ? 7 : 7
            return addShardCost({ [gearRank]: cost }, getGearRankShardCost(prevRank, isWeapon))
        }
        case 7: return isWeapon
            ? { [gearRank]: 10, [prevRank]: 7 }
            : { [gearRank]: 10, [prevRank]: 7 }
        case 8: return isWeapon
            ? { [gearRank]: 15, [prevRank]: 10 }
            : { [gearRank]: 15, [prevRank]: 7 }
        case 9: return isWeapon
            ? { [gearRank]: 20, [prevRank]: 15 }
            : { [gearRank]: 20, [prevRank]: 10 }
    }

    if (gearRank <= 18) {
        return isWeapon
            ? { [gearRank]: 30, [prevRank]: 20 }
            : { [gearRank]: 30, [prevRank]: 15 }
    } else {
        return isWeapon
            ? { [gearRank]: 40, [prevRank]: 30 }
            : { [gearRank]: 40, [prevRank]: 25 }
    }
}

export const weaponShardCost: Record<GearRank, ShardCost> = (() => {
    const costs: Record<GearRank, ShardCost> = {}

    for (let rank = MIN_GEAR_RANK; rank <= MAX_GEAR_RANK; rank++) {
        costs[rank] = getGearRankShardCost(rank, true)
    }

    return costs
})()

export const armorShardCost: Record<GearRank, ShardCost> = (() => {
    const costs: Record<GearRank, ShardCost> = {}

    for (let rank = MIN_GEAR_RANK; rank <= MAX_GEAR_RANK; rank++) {
        costs[rank] = getGearRankShardCost(rank, false)
    }

    return costs
})()

export function getShardCost(gearRank: number, gearType: GearType): ShardCost {
    if (!isGearRank(gearRank)) {
        throw new Error(`Invalid gearRank:${gearRank}`)
    }

    if (isWeapon(gearType)) {
        return weaponShardCost[gearRank]
    } else {
        return armorShardCost[gearRank]
    }
}

// ----------------------------------------------------------------------------
// MARK: CharacterUpgradeCost
// ----------------------------------------------------------------------------

export type GearRankUpgradeCost = {
    [key in GearType]: number
}

const initGearRankUpgradeCost = () => Object.fromEntries(gearTypes.map((gearType) => [gearType, 0])) as GearRankUpgradeCost

export type CharacterUpgradeCost = Partial<Record<GearRank, GearRankUpgradeCost>>

export function addCharacterUpgradeCost(a: CharacterUpgradeCost, b: CharacterUpgradeCost): CharacterUpgradeCost {
    const sum: CharacterUpgradeCost = {}

    for (let rank = MIN_GEAR_RANK; rank <= MAX_GEAR_RANK; rank++) {
        const rankSum = initGearRankUpgradeCost()
        sum[rank] = rankSum

        for (const gearType of gearTypes) {
            rankSum[gearType] = (a[rank]?.[gearType] ?? 0) + (b[rank]?.[gearType] ?? 0)
        }
    }

    return sum
}

export function calculateCharacterUpgradeCost(characterType: CharacterType, startRank: GearRank, endRank: GearRank): CharacterUpgradeCost {
    const upgradeCost: CharacterUpgradeCost = {}
    const addGearCount = (gearType: GearType, rank: GearRank, numGear: number) => {
        const rankCosts = upgradeCost[rank]
        if (!rankCosts) {
            throw new Error(`Invalid rank:${rank}`)
        }

        rankCosts[gearType] = (rankCosts[gearType] ?? 0) + numGear
    }

    for (let rank = MIN_GEAR_RANK; rank <= MAX_GEAR_RANK; rank++) {
        upgradeCost[rank] = initGearRankUpgradeCost()
    }

    for (let rank = startRank; rank <= endRank; rank++) {
        const gearRequiredForRank = characterTypeToGearType[characterType][rank]
        if (!gearRequiredForRank) {
            console.warn(`Missing data characterType:${characterType} rank:${rank}`)
            continue
        }

        for (const gearType of gearRequiredForRank.currRankGear) {
            addGearCount(gearType, rank, 1)
        }
        for (const gearType of gearRequiredForRank.prevRankGear) {
            addGearCount(gearType, rank - 1 as GearRank, 1)
        }
    }

    return upgradeCost
}

export function subtractAnniversaryShop(upgradeCostBefore: CharacterUpgradeCost): CharacterUpgradeCost {
    const TEN_GEAR_RANK_START = MIN_GEAR_RANK
    const TEN_GEAR_RANK_END = 12 as GearRank
    const FIVE_GEAR_RANK_START = 13 as GearRank
    const FIVE_GEAR_RANK_END = MAX_GEAR_RANK

    const upgradeCostAfter = structuredClone(upgradeCostBefore)
    const subtractGearCount = (gearType: GearType, rank: GearRank, numGear: number) => {
        const rankCostsBefore = upgradeCostBefore[rank]
        if (!rankCostsBefore) {
            return // Ignore cases where there is no "before" cost
        }

        const rankCostsAfter = upgradeCostAfter[rank]
        if (!rankCostsAfter) {
            throw new Error(`Invalid rank:${rank}`)
        }

        const newCost = (rankCostsBefore[gearType] ?? 0) - numGear
        rankCostsAfter[gearType] = Math.max(0, newCost)
    }

    for (let rank = TEN_GEAR_RANK_START; rank <= TEN_GEAR_RANK_END; rank++) {
        for (const gearType of gearTypes) {
            subtractGearCount(gearType, rank, 10)
        }
    }
    for (let rank = FIVE_GEAR_RANK_START; rank <= FIVE_GEAR_RANK_END; rank++) {
        for (const gearType of gearTypes) {
            subtractGearCount(gearType, rank - 1 as GearRank, 5)
        }
    }

    return upgradeCostAfter
}

export function convertToShards(upgradeCostBefore: CharacterUpgradeCost): CharacterUpgradeCost {
    const upgradeCostAfter: CharacterUpgradeCost = {}
    const addShardCost = (gearType: GearType, rank: GearRank, shardCost: ShardCost, multiplier: number) => {
        for (const [gearRank, numShards] of Object.entries(shardCost)) {
            const rank = parseGearRank(gearRank)
            const rankCostsAfter = upgradeCostAfter[rank]
            if (!rankCostsAfter) {
                throw new Error(`Invalid rank:${rank}`)
            }

            rankCostsAfter[gearType] = (rankCostsAfter[gearType] ?? 0) + (numShards ?? 0) * multiplier
        }
    }

    for (let rank = MIN_GEAR_RANK; rank <= MAX_GEAR_RANK; rank++) {
        upgradeCostAfter[rank] = initGearRankUpgradeCost()

        for (const gearType of gearTypes) {
            const numGear = upgradeCostBefore[rank]?.[gearType] ?? 0
            if (numGear <= 0) {
                continue
            }

            const shardCost = getShardCost(rank, gearType)
            addShardCost(gearType, rank, shardCost, numGear)
        }
    }

    return upgradeCostAfter
}
