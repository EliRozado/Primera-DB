import knex from "knex";
import MySQLCon from '../config/MySQLconn.js';

const Knex = knex(MySQLCon);

Knex.schema.dropTableIfExists('productos')

Knex.schema.createTableIfNotExists('productos', table => {
    table.increments('id');
    table.string('title');
    table.integer('price');
    table.string('thumbnail');
}).then( () => { console.log('creada') })
.catch(  (e) => console.log(e) )
.finally( () => Knex.destroy() );