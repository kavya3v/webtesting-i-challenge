module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  if(!item.name || !item.enhancement){
    throw new Error('cannot invoke success without valid obj/property')
  }else if(item.enhancement > 20){
    throw new Error('Enhancement cant be > 20')
  }

  return { ...item,
    enhancement: item.enhancement <20 ? item.enhancement+1 : item.enhancement
   }
}

// The item's enhancement it's a number from 0 to 20.
// The item's durability it's a number from 0 to 100.
function fail(item) {
  return { ...item,
  durability: (item.enhancement < 15 && item.durability >=5)  ? 
  item.durability -5 : (item.enhancement >= 15 && item.durability >=10) ? item.durability-10 : item.durability,
  enhancement: item.enhancement > 16 ? item.enhancement-1 : item.enhancement >20 ? 20 : item.enhancement};
}

// repair(item) method that accepts an item object and returns a new item with the durability restored to 100.
function repair(item) {
  //empty obj received
  if(!item.name || !item.enhancement){
    throw new Error('cannot perform repair for invalid obj')
  }
  return { ...item,durability:100 }
}

//update name property accordingly:
// if the enhancement level is 0, the the name is not modified.
// if the enhancement level is greater than 0, change the name to include the enhancement level, preceded by a plus sign ( + ), between square brackets before the item's name. Example: the name of a "Iron Sword" enhanced to 7 would be "[+7] Iron Sword".
function get(item) {
  return { ...item ,
  name: item.enhancement === 0 ? item.name : item.enhancement >0 ? `[+] ${item.name}`: item.name};
}

const newItem={
  name:'Jump rope',
  enhancement:10,
  durability:75
}

const sucItem={
  name:'Jump rope',
  enhancement:20,
  durability:75
}

const failItem={
  name:'Jump rope',
  enhancement:15,
  durability:100
}
//call repair
let outputRepair= repair(newItem);
console.log('outputRepair',outputRepair); //get the durability to 100 and rest untouched

//call success
let outputSuccess= success(newItem);
let output2Success=success(sucItem); // enhance is 20
console.log('outputSuccess',outputSuccess);// enhance +1 unless 20, 11
console.log('output2Success',output2Success);// leave enhance as 20

//call fail
let outputFail=fail(newItem);//enh <15 dur75
console.log('outputFail',outputFail);// durability -5

let output2Fail=fail(sucItem);//enh >15 dur75
console.log('output2Fail',output2Fail);// dur -10 , en -1 (e19,d65)

let output3Fail=fail(failItem);//enh =15 dur100
console.log('output3Fail',output3Fail);// durability -10,e15,d90

//call get
let outputGet=get(newItem); //enh >0
console.log('outputGet',outputGet); //name modified