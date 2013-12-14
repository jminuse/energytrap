
var difficulty_modes = ['world government', 'national government', 'billionaire', 'celebrity', 'journalist', 'activist', 'apathetic person'];
function World() {
  this.gdp = 100e12; //USD
  this.population = 8e9;
  
  this.electricity_demand_per_capita = 0; // W
  this.transportation_demand_per_capita = 0; //W
  
  this.oil_reserves = 300e9; //barrels
  this.oil_deposits = this.oil_reserves*2;
  this.oil_wells = 1e6;
  this.oil_well_tech = 1/2e8; //Each oil well produces this fraction of world reserves per month. 
  
  this.gas_reserves = 187.3e12; //m^3
  this.gas_deposits = this.gas_reserves*4;
  this.gas_wells = 1e6;
  this.gas_well_tech = 1/2e8;
  
  this.solar_gen = 0.01; //TW
  this.wind_gen = 0.1; //TW
  this.gas_gen = 1.0; //TW
  this.coal_gen = 2.0; //TW
  this.nuclear_gen = 1.0; //TW
  this.hydro_gen = 1.0; //TW
  
  this.month = 0;
}

var world = new World();
var table=document.createElement('table');
var row = document.createElement('tr');
for(var key in world) {
  var td = document.createElement('td');
  td.innerHTML = key;
  row.appendChild(td);
}
table.appendChild(row);

function new_row() {
  var row = document.createElement('tr');
  for(var key in world) {
    var td = document.createElement('td');
    td.innerHTML = world[key]<1000 ? world[key] : world[key].toExponential(2).replace('e+', 'e');
    row.appendChild(td);
  }
  table.appendChild(row);
}
new_row();
table.border = 1;
document.body.appendChild(table);

function timestep() {
  world.month++;
  world.population *= 1.002;
  world.oil_reserves -= world.oil_reserves*world.oil_wells*world.oil_well_tech;
  world.gas_reserves -= world.gas_reserves*world.gas_wells*world.gas_well_tech;
  
}
function advance_time() {
  timestep();
  new_row();
}
var button=document.createElement("button");
button.innerHTML = 'Month++';
button.onclick = advance_time;
document.body.appendChild(button);
document.onkeydown = function(k) {
  if(k.which==32) {//space
    advance_time();
  }
}
