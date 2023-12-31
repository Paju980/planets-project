const {parse} = require('csv-parse');
const fs = require('fs');

const results = [];
const habitablePlanets = [];
var i = 1;
function isHabitablePlanet(planet){
  return planet['koi_disposition'] === 'CONFIRMED' 
  && planet['koi_insol']>0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
.pipe(parse({
  comment: '#',
  columns: true,
}))
.on('data',(data)=>{
  if(isHabitablePlanet(data)){
    habitablePlanets.push(data);
  }
}).on('error',(err)=>{
  console.log(err);
}).on('end',()=>{
  habitablePlanets.map((planet)=>{
    console.log(i++, planet['kepler_name']);
  })
  console.log(`${habitablePlanets.length} habitable planets are found`);
  console.log("done");
});

// aldsfjlas