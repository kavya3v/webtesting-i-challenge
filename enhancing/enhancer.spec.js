const enhancer = require('./enhancer.js');
// test away!
//Items have name, durability and enhancement.
// The item's enhancement it's a number from 0 to 20.
// The item's durability it's a number from 0 to 100.
const repairItem1={
name:"Resistance Bands",
enhancement:10,
durability:80}

const repairItem2={
    name:"Resistance Bands",
    enhancement:10,
    durability:100}

const repairItem3={
  name:"Resistance Bands",
  enhancement:10,
  durability:0}

//without durability property
const repairItem4={
    name:"Resistance Bands",
    enhancement:10,
    }
const successItem1={
    name:"FlexBow",
    enhancement:10,
    durability:0}

const successItem2={
    name:"FlexBow",
    enhancement:20,
    durability:90}

const successItem3={
        name:"FlexBow",
        enhancement:21,
        durability:90}

const failItem1={
    name:"Towel",
    enhancement:10,
    durability:90}

const failItem2={
    name:"Towel",
    enhancement:18,
    durability:90}

const failItem3={
        name:"Towel",
        enhancement:16,
        durability:90}

const failItem4={
    name:"Towel",
    enhancement:15,
    durability:60}

const getItem1={
        name:"Bell",
        enhancement:0,
        durability:60}
        
const getItem2={
            name:"Bell",
            enhancement:15,
            durability:90}

  test('repair function!',()=>{
    //returns a new item with the durability restored to 100.
    expect(enhancer.repair(repairItem1)).toEqual({
        name:"Resistance Bands",
        enhancement:10,
        durability:100
    })
})

  


describe("testing enhancer functions",()=>{
    test('repair function!',()=>{
        //returns a new item with the durability restored to 100.
        expect(enhancer.repair(repairItem1)).toEqual({
            name:"Resistance Bands",
            enhancement:10,
            durability:100
        })
        expect(enhancer.repair(repairItem2)).toEqual({
            name:"Resistance Bands",
            enhancement:10,
            durability:100
        })
        expect(enhancer.repair(repairItem3)).toEqual({
            name:"Resistance Bands",
            enhancement:10,
            durability:100
        })
        expect(enhancer.repair(repairItem4)).toEqual({
            name:"Resistance Bands",
            enhancement:10,
            durability:100
        })
        //empty obj - just restore ? or thru error
        expect(()=> enhancer.repair()).toThrow()
    })

    test('success function!',()=>{
        //returns a new item with enhancement increased by 1.
        expect(enhancer.success(successItem1)).toEqual({
            name:"FlexBow",
            enhancement:11,
            durability:0
        })
        //when enhancement is 20 - doesnt change, durability remains untouched
        expect(enhancer.success(successItem2)).toEqual({
            name:"FlexBow",
            enhancement:20,
            durability:90
        })
        //when enhancement is 21 - doesnt change, durability remains untouched
        expect(()=> enhancer.success(successItem3)).toThrow()
        //when no param is passed or obj without required property
        expect(()=>enhancer.success({})).toThrow()
    
    })

    test('test fail function!',()=>{
        //enhancement is <15, the durability of the item is decreased by 5.
        expect(enhancer.fail(failItem1)).toEqual({
            name:"Towel",
            enhancement:10,
            durability:85
        })
        //enhancement is >15, the durability of the item is decreased by 10.
        // enhancement level is >16, the enhancement level decreases by 1
        expect(enhancer.fail(failItem2)).toEqual({
            name:"Towel",
            enhancement:17,
            durability:80
        })
        //enhancement level is >16, the enhancement level untouched, but durability wl still be -10
        expect(enhancer.fail(failItem3)).toEqual({
            name:"Towel",
            enhancement:16,
            durability:80
        })

        //enhancement level is 15, the enhancement level untouched, but durability wl still be -10
        expect(enhancer.fail(failItem4)).toEqual({
            name:"Towel",
            enhancement:15,
            durability:50
        })
    })
        test('test get function!',()=>{
            //enhancement is zero - name not modified 
            expect(enhancer.get(getItem1)).toEqual({
                name:"Bell",
                enhancement:0,
                durability:60
            })
             //enhancement is >0 - name modified 
             expect(enhancer.get(getItem2)).toEqual({
                name:"[+] Bell",
                enhancement:15,
                durability:90
            })
    })
})
