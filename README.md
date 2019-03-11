<div align="center">
WIP co-reference resolution using nlp-compromise
<br/>
by spencermountain and [David N. Hughes-Robinson](https://github.com/oaguy1)
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
