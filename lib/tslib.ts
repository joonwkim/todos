const characters = [
    {
        name: 'Luke Skywalker',
        height: 172,
        mass: 77,
        eye_color: 'blue',
        gender: 'male',
    },
    {
        name: 'Darth Vader',
        height: 202,
        mass: 136,
        eye_color: 'yellow',
        gender: 'male',
    },
    {
        name: 'Leia Organa',
        height: 150,
        mass: 49,
        eye_color: 'brown',
        gender: 'female',
    },
    {
        name: 'Anakin Skywalker',
        height: 188,
        mass: 84,
        eye_color: 'blue',
        gender: 'male',
    },
];


type myType<T> = {
    [K in keyof T]?: T[K] extends (Array<any> | undefined) ? 0 : (T[K] extends ({ [k: string]: any } | undefined) ? T[K] : 0)
  }
  
//***MAP***
//1. Get array of all names
const names = characters.map(c => c.name);
console.log(names)
//2. Get array of all heights
const heights = characters.map(c => c.height)
//3. Get array of objects with just name and height properties
const minifiedRecords = characters.map(c => ({
    name: c.name, 
    height: c.height 
   }));
//4. Get array of all first names
const firstNames = characters.map(c=>c.name.split(" "[0]))

//***REDUCE***
//1. Get total mass of all characters
const totalMass = characters.reduce((acc,cur) => acc + cur.mass, 0);

//2. Get total height of all characters
const totalHeight = characters.reduce((acc,cur) => acc + cur.height, 0);
//3. Get total number of characters by eye color
const totalNumber = characters.reduce((acc:any,cur)=> {
    const color = cur.eye_color;
    if(acc[color]){
        acc[color] = acc[color] ++;
    }else{
        acc[color] = 1;
    }
    return acc;
},{})

//4. Get total number of characters in all the character names
const totalNumberCns = characters.reduce((acc:any,cur)=> acc + cur.name.length, 0);

//***FILTER***
//1. Get characters with mass greater than 100
const gt100 = characters.filter(c=>c.mass > 100)
//2. Get characters with height less than 200
const ht20 = characters.filter(c=>c.height > 200)
//3. Get all male characters
const mc = characters.filter(c=>c.gender === 'male')
//4. Get all female characters
const fcs = characters.filter(c=>c.gender ==='female')

//***SORT***
//1. Sort by mass
const sbm = characters.sort((a,b)=>a.mass - b.mass);
//2. Sort by height
const sbheight = characters.sort((a,b)=> a.height - b.height);
//3. Sort by name
const sbh = characters.sort((a,b)=> {
    if(a.name < b.name) return 1;
    return -1;
});
//4. Sort by gender
const sbg = characters.sort((a,b)=> {
    if(a.gender === 'female') return 1;
    return -1;
});

//***EVERY***
//1. Does every character have blue eyes?
const ecbes = characters.every(c=>c.eye_color ==='blue')
//2. Does every character have mass more than 40?
const emo40 = characters.every(c=>c.mass > 40)
//3. Is every character shorter than 200?
const esh30040 = characters.every(c=>c.height < 200)
//4. Is every character male?
const emale = characters.every(c=>c.gender ==='male')
//***SOME***
//1. Is there at least one male character?
const oneMale = characters.some(c=>c.gender ==='male')

//2. Is there at least one character with blue eyes?
const oneBlue = characters.some(c=>c.eye_color ==='blue')
//3. Is there at least one character taller than 210?
const oneTaller = characters.some(c=>c.height > 210)
//4. Is there at least one character that has mass less than 50?
const oneMass = characters.some(c=>c.mass < 50)


//