<script setup lang="ts">
import CharacterList from './CharacterList.vue'
import GearList from './GearList.vue'
</script>

<template>
    <main>
        <CharacterList class="character-list" />
        <GearList />
    </main>
</template>

<style lang="scss" scoped>
main{
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 2fr;
    grid-template-rows: 100%;
    min-height: 100%;

    .character-list{
        border-right: 1px solid $dark;
        position: sticky;
        top: 0;
    }
}
</style>
