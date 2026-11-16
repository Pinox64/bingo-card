const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
function harness(entries,mode='pool'){
  const elements=Object.fromEntries(['mode','bulk','upload-status'].map(id=>[id,{value:id==='mode'?mode:'',disabled:false}]));
  const context=vm.createContext({entries,busy:false,$:id=>elements[id],document:{querySelectorAll:()=>Object.values(elements)},readImage:async file=>{if(file.bad)throw Error('Unreadable');return {name:file.name};},rebuild(){},makePreview(){},message(){}});
  vm.runInContext(source.slice(source.indexOf('let uploading=false;'),source.indexOf("$('bulk-pick').onclick")),context);
  return {context,elements,upload:files=>context.uploadImages(files)};
}
test('bulk upload sorts naturally, fills holes, and preserves existing pictures',async()=>{
  const existing={name:'keep.png'},h=harness([existing,null,null]);
  await h.upload([{name:'10.png'},{name:'2.png'},{name:'1.png'}]);
  assert.equal(h.context.entries[0],existing);
  assert.deepEqual(Array.from(h.context.entries,e=>e.name),['keep.png','1.png','2.png','10.png']);
  assert.match(h.elements['upload-status'].textContent,/3 pictures added/);
  assert.equal(h.elements.bulk.disabled,false);
});
test('bulk upload skips unreadable files and continues',async()=>{
  const h=harness([null,null]);
  await h.upload([{name:'1.png',bad:true},{name:'2.png'}]);
  assert.equal(h.context.entries[0].name,'2.png');
  assert.equal(h.context.entries[1],null);
  assert.match(h.elements['upload-status'].textContent,/1 unsupported or unreadable/);
});
test('classic bulk upload stops at entry 75 even when extra entries are retained',async()=>{
  const entries=Array.from({length:80},(_,i)=>i===74||i>=75?null:{name:String(i)}),h=harness(entries,'classic');
  await h.upload([{name:'1.png'},{name:'2.png'}]);
  assert.equal(entries[74].name,'1.png');
  assert.equal(entries[75],null);
  assert.match(h.elements['upload-status'].textContent,/1 files not added/);
});
