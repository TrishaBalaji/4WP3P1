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

    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?)", ['Sbsss','neelamas','Sirisha', 'Neelamaygam','sirisha@gmail.com', 'Food Basics', '1500']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?)", ['Tbsss','balajt','Trisha', 'Balaji','trisha@gmail.com', 'Food Basics', '2300']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?)", ['Poppy','yeelamap','Prisha', 'Neelaman','poppy@gmail.com', 'No Frills', '900']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?)", ['Dolly','castlesss','Deanna', 'Goldberg','goldberg@gmail.com', 'Food Basics', '1800']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?)", ['David','hemsworth','David', 'Smith','davidisthebest@gmail.com', 'No Frills', '1500']);
    await db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?)", ['Erica','uniteduk','Erica', 'Lee','eric.17.sha@gmail.com', 'Sobeys', '3000']);

    let results = await db.all("SELECT rowid as id, * FROM Users");
    console.log(results);

}

table1()

async function table2()
{
    const db = await sqlite.open({
        filename: "table2.db",
        driver: sqlite3.Database
    });

    await db.exec("DROP TABLE IF EXISTS Products");
    await db.exec("CREATE TABLE Products (item TEXT, price REAL, amount_sold INT, amount_stocked INT, discounts TEXT, popularity TEXT, competitors TEXT)");

    await db.run("INSERT INTO Products VALUES (?,?,?,?,?,?,?)", ['Pringles','5.99','650', '700','0.50', 'med', 'Lays']);
    await db.run("INSERT INTO Products VALUES (?,?,?,?,?,?,?)", ['Lays','3.99','900', '985','0.60', 'high', 'Pringles']);
    await db.run("INSERT INTO Products VALUES (?,?,?,?,?,?,?)", ['Doritos','4.50','850', '900','0.30', 'high', 'Pringles']);
    await db.run("INSERT INTO Products VALUES (?,?,?,?,?,?,?)", ['Cheetos','6.25','780', '878','0.00', 'low', 'Lays']);
    await db.run("INSERT INTO Products VALUES (?,?,?,?,?,?,?)", ['Ms.Vickies','4.99','667', '770','0.00', 'med', 'Lays']);
    await db.run("INSERT INTO Products VALUES (?,?,?,?,?,?,?)", ['Ruffles','3.99','489', '600','0.20', 'low', 'Ms.Vickies']);

    let results = await db.all("SELECT rowid as id, * FROM Users");
    console.log(results);
}

table2()
