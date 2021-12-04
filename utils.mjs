export function test(result,expect){
    console.log('Result',result,'expect',expect, JSON.stringify(result)===JSON.stringify(expect))
    console.assert(JSON.stringify(result)===JSON.stringify(expect))
}