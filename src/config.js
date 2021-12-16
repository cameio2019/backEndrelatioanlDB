import knex from 'knex';
import __dirname from './utils.js';

export const sqlite = knex({
    client:'sqlite3',
    connection:{filename:__dirname+'/db/backend.sqlite'}
})
