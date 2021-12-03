export function test(result,expect){
    console.log('Result',result,'expect',expect,result===expect)
    console.assert(result===expect)
}