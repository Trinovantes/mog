<script lang="ts" setup>
import { useCharacterStore } from '@/web/client/store/useCharacterStore'
import { CharacterType, getCharacterTypeLabel } from './store/gameData'
import { ref } from 'vue'
import CharacterListItem from './CharacterListItem.vue'

const characterTypeOptions = Object.values(CharacterType).map((characterType) => ({ value: characterType, label: getCharacterTypeLabel(characterType) }))
const newCharacterType = ref<CharacterType | null>(null)
const characterStore = useCharacterStore()
const addCharacterType = () => {
    if (newCharacterType.value === null || newCharacterType.value === undefined) {
        return
    }

    characterStore.addGoal(newCharacterType.value)
}

const getCharacterTypeInfoImg = (characterType: string) => {
    const url = new URL(`./assets/img/${characterType}.png`, import.meta.url)
    return url.href
}
</script>

<template>
    <aside>
        <h2>
            Characters
        </h2>

        <div class="form">
            <q-select
                v-model="newCharacterType"
                :options="characterTypeOptions"
                outlined
                clearable
                emit-value
                map-options
                label="Character Type"
            >
                <template #option="{ opt, itemProps }">
                    <q-item
                        v-bind="itemProps"
                    >
                        <q-item-section>
                            {{ opt.label }}

                            <q-tooltip anchor="top right" self="top left">
                                <img
                                    :src="getCharacterTypeInfoImg(opt.value)"
                                    class="character-type-preview"
                                >
                            </q-tooltip>
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>

            <q-btn
                color="positive"
                round
                icon="add"
                @click="addCharacterType"
            />
        </div>

        <div class="list">
            <CharacterListItem
                v-for="(_, idx) in characterStore.goals"
                :key="idx"
                :goal-idx="idx"
                @delete="characterStore.deleteGoal(idx)"
            />
        </div>
    </aside>
</template>

<style lang="scss" scoped>
aside{
    background-color: $light-on-light;
    padding: $padding;

    display: grid;
    gap: $padding;
    align-content: start;

    h2{
        font-size: 2rem;
        font-weight: bold;
    }

    .form{
        display: grid;
        grid-template-columns: 1fr auto;
        gap: $padding;
        align-items: center;
    }

    .list{
        display: grid;
        gap: $padding;
    }
}

// tooltip teleported to doc root
img.character-type-preview{
    max-height: 600px;
}
</style>
