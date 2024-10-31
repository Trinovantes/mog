import { GearType } from '@/web/client/store/gameData'
import { run, bench, boxplot } from 'mitata'

const ITERATIONS = 100

const gearTypes = Object.values(GearType)
const gearTypesSet = new Set<string>(gearTypes)

boxplot(() => {
    bench('GearType [Array]', () => {
        for (const item of gearTypes) {
            for (let i = 0; i < ITERATIONS; i++) {
                gearTypes.includes(item)
            }
        }
    })

    bench('GearType [Set]', () => {
        for (const item of gearTypes) {
            for (let i = 0; i < ITERATIONS; i++) {
                gearTypesSet.has(item)
            }
        }
    })
})

await run()
