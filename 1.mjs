import {data} from "./data1.mjs"
import { test } from "./utils.mjs"
const example = [
199,
200,
208,
210,
200,
207,
240,
269,
260,
263,
]


function threeMeasurements(data){
    return data.reduce((acc,m,i,measurements)=>{
        if(getLeftData(measurements,i)<3){
            return acc
        }
        const currentThreeSum = sum(...measurements.slice(i,i+3))
        const nextThreeSum = sum(...measurements.slice(i+1,i+4))
        if(currentThreeSum < nextThreeSum){
            return ++acc
        }
        return acc
    },0)
}
function getLeftData(array,index){
    return array.length - 1 - index
}
function sum(...args){
    return args.reduce((acc,current)=>{
        return acc +current
    },0)
}



function findLargerMeasurements(data){
    return data.reduce((acc,m,i,measurements)=>{
        const prev = measurements[i-1]
        if(!prev || prev >= m ){
            return acc
        }
        return ++acc
    },0)
}

test(threeMeasurements(data),5)

