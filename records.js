const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function table1()
{
    const db = await sqlite.open({
        filename: ,
        driver: sqlite3.Database
    });
}

table1()
