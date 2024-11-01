<script lang="ts" setup>
import { useCharacterStore } from '@/web/client/store/useCharacterStore'
import { computed } from 'vue'
import { getGearTypeLabel, getGearRankLabel } from './store/gameData'

const characterStore = useCharacterStore()
const totalCost = computed(() => characterStore.totalCost)

const getAmountCssClass = (amount: number): string => {
    if (!characterStore.highlightAmounts) {
        return ''
    }
    if (amount == 0) {
        return ''
    }

    if (characterStore.convertToShards) {
        if (amount < 40) {
            return 'low'
        } else if (amount < 80) {
            return 'medium'
        } else {
            return 'high'
        }
    } else {
        if (amount <= 2) {
            return 'low'
        } else if (amount <= 4) {
            return 'medium'
        } else {
            return 'high'
        }
    }
}
</script>

<template>
    <article>
        <div
            v-for="[gearRank, shardCosts] of Object.entries(totalCost).toReversed()"
            :key="gearRank"
            class="gear-rank"
        >
            <div
                class="rank"
            >
                <strong>
                    Rank {{ gearRank }}
                </strong>
                <span>
                    {{ getGearRankLabel(parseInt(gearRank)) }}
                </span>
            </div>

            <div
                class="shard-cost-container"
            >
                <div
                    v-for="[gearType, numShards] of Object.entries(shardCosts ?? {})"
                    :key="gearType"
                    class="shard-cost"
                >
                    <strong>
                        {{ getGearTypeLabel(gearType) }}
                    </strong>
                    <span
                        :class="getAmountCssClass(numShards)"
                    >
                        {{ numShards }}
                    </span>
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
strong{
    font-weight: bold;
}

.gear-rank{
    display: grid;
    grid-template-columns: 100px auto;
    gap: $padding;
    padding: $padding;

    &:not(:first-child) {
        border-top: 1px solid $dark;
    }

    .rank{
        display: grid;
        align-content: center;
        text-align: center;
    }

    .shard-cost-container{
        display: flex;
        flex-wrap: wrap;
        gap: math.div($padding, 2);

        .shard-cost{
            display: grid;
            align-content: center;
            text-align: center;
            width: 80px;

            span{
                &.low{
                    background: yellow;
                }
                &.medium{
                    background: orange;
                }
                &.high{
                    background: orangered;
                    color: white;
                }
            }
        }
    }
}
</style>
