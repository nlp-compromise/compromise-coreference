const coreference=require('./src')
const nlp=require('compromise')

let str=`what's with these homies dissing my girl? why do they gotta front? What did we ever do to these guys, that made them so violent?`
let doc=nlp(str)
console.log(coreference.find(doc))
