import {test} from './utils.mjs'
import {data} from './data3.mjs'
// (\d+)\n ---> '$1',\n
const example = [
'00100',
'11110',
'10110',
'10111',
'10101',
'01111',
'00111',
'11100',
'10000',
'11001',
'00010',
'01010',
]

 test(getOxygenGeneratorRating(data),4996233)
 test(getOxygenGeneratorRating(example),230)


function getOxygenGeneratorRating(data){
    // We suppose every item has the same 
    const itemLength = data[0].length
    let c02ScrubberRating = data
    let oxygenGeneratorRating = data
     for (let i = 0; i < itemLength; i++) {
         if(c02ScrubberRating.length > 1){

             const columnLessCommonBit = c02ScrubberRating.map(item => item[i])
             const [mcb,lessCommonBit] = getMostAndLessCommon(columnLessCommonBit)
             const newC02 = c02ScrubberRating.filter(item => item[i] === lessCommonBit)
             c02ScrubberRating = newC02.length > 0 ? newC02 : c02ScrubberRating

            }
            if(oxygenGeneratorRating.length > 1){

            const columnMostCommonBit = oxygenGeneratorRating.map(item => item[i])
            const [mostCommonbit,lscb] = getMostAndLessCommon(columnMostCommonBit)
            const newOxygen =oxygenGeneratorRating.filter(item => item[i] === mostCommonbit)
            oxygenGeneratorRating = newOxygen.length > 0 ?  newOxygen : oxygenGeneratorRating
         }
     }

     return stringBinaryToDecimal(oxygenGeneratorRating[0]) * stringBinaryToDecimal(c02ScrubberRating[0])
}   


function getResultPowerConsumption(items){
    // We suppose every item has the same length
    const itemsLength = items.length
    const itemLength = items[0].length
     const mostCommons = []
     const lessCommons = []
     for (let i = 0; i < itemLength; i++) {
        const column = items.map(item =>item[i]) 
        const [mostCommon,lessCommon] = getMostAndLessCommon(column)
        mostCommons.push(mostCommon)
        lessCommons.push(lessCommon)
    }
    return stringBinaryToDecimal(mostCommons.join('')) * stringBinaryToDecimal(lessCommons.join(''))
}


function getMostAndLessCommon(data){
    const map = new Map()
    for (let index = 0; index < data.length; index++) {
        const item = data[index]
            if(map.has(item)){
                const prev = map.get(item)
                const updated = prev + 1
                map.set(item,updated)
            } else {
                map.set(item,1)
            }
    }
    const entries = map.entries()
    let mostCommon 
    let lessCommon 
    let index = 0
    for (let entry of entries) {
        const [_,currentValue] = entry
        if(index === 0){
            mostCommon = entry
            lessCommon = entry
        } else {
            const [mk,mostCommonValue] = mostCommon
            const [lk,lessCommonValue] = lessCommon
            lessCommon = lessCommonValue < currentValue ? lessCommon : entry
            mostCommon = mostCommonValue > currentValue ? mostCommon : entry
        }
        index++
    }
    const [mostCommonKey,mostCommonValue] = mostCommon
    const [lessCommonKey,lessCommonValue] = lessCommon
    return  [ mostCommonValue === lessCommonValue ? '1': mostCommonKey,mostCommonValue === lessCommonValue?'0':lessCommonKey]
}


function stringBinaryToDecimal(string){
    return parseInt(string,2)
}