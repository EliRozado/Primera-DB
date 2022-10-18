import knex from "knex";
import SQLiteCon from '../config/sqliteConfig.js';

const Knex = knex(SQLiteCon);

Knex.schema.dropTable('mensajes')
    .then( () => console.log('deleted') )
    .catch( (e) => console.log(e) );

Knex.schema.createTable('mensajes', table => {
    table.increments('id');
    table.string('email');
    table.string('date');
    table.string('message');
}).then( () => { console.log('creada') })
.catch(  (e) => console.log(e) )
.finally( () => Knex.destroy() );