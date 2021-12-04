import { test } from "./utils.mjs"
import {data} from "./data2.mjs"
// Regex (\w+)\s(\d+)\n ---> ['$1',$2],\n
const example = [
    ['forward',5],
    ['down',5],
    ['forward',8],
    ['up',3],
    ['down',8],
    ['forward',2],
]

test(getDestinationWithAim(data),900)

function getDestinationWithAim(data){
    const finalPosition = data.reduce((acc,command)=>{
        const [direction,value] = command
        switch (direction) {
                case 'forward':
                    acc.x = acc.x + value
                    acc.y = acc.y + (acc.aim * value)
                    break;

                case 'up':
                    // acc.y = acc.y - value
                    acc.aim = acc.aim - value
                    break;

                case 'down':
                    // acc.y = acc.y + value
                    acc.aim = acc.aim + value
                    break;
                    
                    default:
                        break;
                    }
                    return acc
                },{x:0,y:0,aim:0})
    console.log('Final postion','x',finalPosition.x,'y',finalPosition.y,'aim',finalPosition.aim)
    return finalPosition.x * finalPosition.y
}


function getDestinationProduct(data){
    const finalPosition = data.reduce((acc,command)=>{
        const [direction,value] = command
        switch (direction) {
                case 'forward':
                    acc.x = acc.x + value
                    break;

                case 'up':
                    acc.y = acc.y - value
                    break;

                case 'down':
                    acc.y = acc.y + value
                    break;

            default:
                break;
        }
        return acc
    },{x:0,y:0})
    console.log('Final postion','x',finalPosition.x,'y',finalPosition.y,'aim',finalPosition.aim)
    return finalPosition.x * finalPosition.y
}