<script lang="ts" setup>
import { ref } from 'vue'
import { getCharacterTypeLabel, MAX_GEAR_RANK, MIN_GEAR_RANK } from './store/gameData'
import { watch } from 'vue'
import { useCharacterStore } from './store/useCharacterStore'
import { computed } from 'vue'

const props = defineProps<{
    goalIdx: number
}>()

defineEmits([
    'delete',
])

const characterStore = useCharacterStore()
const goal = computed(() => characterStore.goals[props.goalIdx])

const goalRanks = ref({
    min: goal.value.startRank ?? MIN_GEAR_RANK,
    max: goal.value.endRank ?? MAX_GEAR_RANK,
})
watch(goalRanks, (goalRanks) => {
    goal.value.startRank = goalRanks.min
    goal.value.endRank = goalRanks.max
})
</script>

<template>
    <div class="goal">
        <h3>
            <q-input
                :label="getCharacterTypeLabel(goal.characterType)"
                v-model="goal.characterName"
                clearable
                outlined
            />

            <q-btn
                flat
                round
                icon="close"
                @click="$emit('delete')"
            />
        </h3>

        <q-range
            v-model="goalRanks"
            :min="MIN_GEAR_RANK"
            :max="MAX_GEAR_RANK"
            :left-label-value="`Rank ${goalRanks.min}`"
            :right-label-value="`Rank ${goalRanks.max}`"
            label
        />
    </div>
</template>

<style lang="scss" scoped>
.goal{
    border: 1px solid $dark;
    display: grid;
    gap: $padding;
    padding: $padding;

    h3{
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;

        font-weight: bold;
        font-size: 1.5rem;
    }

    .q-range{
        padding: 0 $padding;
    }
}
</style>
