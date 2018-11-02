//https://swapi.co/
const request = require('request');
const argv = require('yargs').argv;
let perplanav = argv.p || 'people';
/*{
    "people": "https://swapi.co/api/people/",
    "planets": "https://swapi.co/api/planets/",
    "films": "https://swapi.co/api/films/",
    "species": "https://swapi.co/api/species/",
    "vehicles": "https://swapi.co/api/vehicles/",
    "starships": "https://swapi.co/api/starships/"
}*/
let numero = argv.n || '1';
let url = `https://swapi.co/api/${perplanav}/${numero}/`
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let swapi = JSON.parse(body);
    let message = "";
    switch (perplanav) {
      case 'people':
        message = `\nNombre:${swapi.name}\nGénero:${swapi.gender}\nAltura:${swapi.height}\nPeso:${swapi.mass}\nAño nacimiento:${swapi.birth_year}\n`;
      break;
      case 'planets':
        message = `\nNombre:${swapi.name}\nPeríodo de rotación:${swapi.rotation_period}\nPeríodo orbital:${swapi.orbital_period}\nDiámetro:${swapi.diameter}\nClima:${swapi.climate}\nGravedad:${swapi.gravity}\nTerreno:${swapi.terrain}\nAgua superficial:${swapi.surface_water}\nPoblación:${swapi.population}\n`;
      break;
      case 'films':
        message = `\nTitulo:${swapi.title}\nDirector:${swapi.director}\nProductor:${swapi.producer}\nFecha lanzamiento:${swapi.release_date}\n`;
      break;
      case 'species':
        message = `\nNombre:${swapi.title}\nClasificación:${swapi.title}\nDesignación:${swapi.title}\nAltura media:${swapi.title}\nLenguaje:${swapi.title}\n`;
      break;
      case 'vehicles':
        message = `\nNombre:${swapi.name}\nModelo:${swapi.model}\nFabricante:${swapi.manufacturer}\nCosto en creditos:${swapi.cost_in_credits}\nLongitud:${swapi.length}\nVelocidad máxima de la atmósfera:${swapi.max_atmosphering_speed}\nTripulación:${swapi.crew}\nPasajeros:${swapi.passengers}\nCapasidad de carga:${swapi.cargo_capacity}\nConsumibles:${swapi.consumables}\nClase de vehículo:${swapi.vehicle_class}\n`;
      break;
      case 'starships':
        message = `\nNombre:${swapi.name}\nModelo:${swapi.model}\nFabricante:${swapi.manufacturer}\nCosto en creditos:${swapi.cost_in_credits}\nLongitud:${swapi.length}\nVelocidad máxima de la atmósfera:${swapi.max_atmosphering_speed}\nTripulación:${swapi.crew}\nPasajeros:${swapi.passengers}\nCapasidad de carga:${swapi.cargo_capacity}\nConsumibles:${swapi.consumables}\nCalificación de hiperimpulsión:${swapi.hyperdrive_rating}\nMGLT:${swapi.MGLT}\nClase de nave estelar:${swapi.starship_class}\n`;
      break;
      default:
        message = "\nParametro no exixtenete\n";
    }
    console.log(message);
  }
});
