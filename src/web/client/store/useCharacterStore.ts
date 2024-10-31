import { defineStore } from 'pinia'
import { CharacterType, GearRank, MIN_GEAR_RANK, MAX_GEAR_RANK, calculateCharacterUpgradeCost, CharacterUpgradeCost, addCharacterUpgradeCost } from './gameData'
import { useLocalStorage } from '@vueuse/core'

export type CharacterGoal = {
    characterType: CharacterType
    characterName: string | null
    startRank: GearRank
    endRank: GearRank
}

export type CharacterStore = {
    goals: Array<CharacterGoal>
}

const STORE_NAME = 'CharacterStore'

export const useCharacterStore = defineStore(STORE_NAME, {
    state: () => {
        return {
            goals: useLocalStorage(`${STORE_NAME}/goals`, new Array<CharacterGoal>()),
        }
    },

    getters: {
        totalCost: (state) => {
            let totalCost: CharacterUpgradeCost = {}

            for (const goal of state.goals) {
                const goalCost = calculateCharacterUpgradeCost(goal.characterType, goal.startRank, goal.endRank)
                totalCost = addCharacterUpgradeCost(totalCost, goalCost)
            }

            return totalCost
        },
    },

    actions: {
        addGoal(characterType: CharacterType) {
            this.goals.push({
                characterType,
                characterName: null,
                startRank: MIN_GEAR_RANK,
                endRank: MAX_GEAR_RANK,
            })
        },

        deleteGoal(idx: number) {
            this.goals.splice(idx, 1)
        },

        updateGoalRanks(idx: number, startRank: GearRank, endRank: GearRank) {
            this.goals[idx].startRank = startRank
            this.goals[idx].endRank = endRank
        },
    },
})
