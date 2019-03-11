<div align="center">
WIP co-reference resolution using nlp-compromise
<br/>
by spencermountain and <a href="https://github.com/oaguy1">David N. Hughes-Robinson</a>
</div>


```js
const coreference = require('compromise-coreference')
const nlp=require('compromise')
let str=`what's with these homies dissin my girl? why do they gotta front?`
let doc=nlp(str)
console.log(coreference(doc))
/*

*/

```


to run:
```
npm install

npm watch

npm run test
```
