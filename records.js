const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function table1()
{
    const db = await sqlite.open({
        filename: ,
        driver: sqlite3.Database
    });
    
    await db.exec("DROP TABLE IF EXISTS Users");
    await db.exec("CREATE TABLE Users (username TEXT, password TEXT, firstname TEXT, lastname TEXT, email TEXT, associated_store TEXT, products_to_manage REAL)");

    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?)", ['Sbsss','neelamas','Sirisha', 'Neelamaygam','sirisha@gmail.com', 'Food Basics', '1500']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?)", ['Tbsss','balajt','Trisha', 'Balaji','trisha@gmail.com', 'Food Basics', '2300']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?)", ['Poppy','yeelamap','Prisha', 'Neelaman','poppy@gmail.com', 'No Frills', '900']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?)", ['Dolly','castlesss','Deanna', 'Goldberg','goldberg@gmail.com', 'Food Basics', '1800']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?)", ['David','hemsworth','David', 'Smith','davidisthebest@gmail.com', 'No Frills', '1500']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?)", ['Erica','uniteduk','Erica', 'Lee','eric.17.sha@gmail.com', 'Sobeys', '3000']);

    let results = await db.all("SELECT rowid as id, * FROM Users");
    console.log(results);

}

table1()
