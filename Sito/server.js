const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(__dirname));

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "html");

const dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 5000;

const mysql = require("mysql2");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collezione manga',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database(__dirname + "/test.db");

const nunjucks = require('nunjucks');
app.set("view engine", "html");
nunjucks.configure(__dirname + "/views", {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    res.status(200).render("home.html");
})

app.get("/archivio/volumi", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT V.Titolo, V.N_Pagine, M.Nome, M.Edizione
                    FROM volume V INNER JOIN manga M
                    ON V.ID_Manga = M.ID_Manga`,
        (error, results, fields) => {
            // console.log(results);

            res.status(200).render("archivio_volumi.html", {
                rows: results,
            });

            conn.release();
            if (error) throw error;
        })
    })
});

app.get("/archivio/manga", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT M.Nome Nome_Manga, M.Edizione, AU.Nome Nome_Autore, AU.Cognome Cognome_Autore
                    FROM Manga M INNER JOIN autore_manga J1 ON M.ID_Manga = J1.ID_Manga
                    INNER JOIN autore AU ON J1.ID_Autore = AU.ID_Autore;`,
        (error, results, fields) => {
            // console.log(results);

            res.status(200).render("archivio_manga.html", {
                rows: results,
            })

            conn.release();
            if (error) throw error;
        });
    })
});

app.get("/archivio/volumi/:titolovolume", (req, res) => {
    const titoloVolume = req.params.titolovolume;
    console.log(titoloVolume);
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT V.ISBN, V.Titolo, Cop.NomeFile, Cop.Path, V.N_Pagine, V.N_Volume, M.Nome, M.Edizione
                    FROM copertina_volume Cop INNER JOIN volume V
                    ON Cop.NomeFile = V.Copertina
                    INNER JOIN manga M ON V.ID_Manga = M.ID_Manga
                    WHERE V.Titolo = '${titoloVolume}'`,
        (error, results, fields) => {
            console.log(results);

            res.status(200).render("volume.html", {
                rows: results,
            })

            conn.release();
            if (error) throw error;
        });
    })
})

app.get("/archivio/manga/:titolomanga", (req, res) => {
    const titoloManga = req.params.titolomanga;
    console.log(titoloManga);
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT M.ID_Manga, M.Nome Nome_Manga, M.Edizione, M.A_Colori, M.Contenuti_Extra,
                    AU.Nome Nome_Autore, AU.Cognome Cognome_Autore, AU.Pseudonimo Pseudonimo_Autore, AR.Nome Nome_Artista, AR.Cognome Cognome_Artista, AR.Pseudonimo Pseudonimo_Artista, E.Nome Nome_Editore
                    FROM manga M INNER JOIN artista_manga J1
                    ON M.ID_Manga = J1.ID_Manga
                    INNER JOIN artista AR ON J1.ID_Artista = AR.ID_Artista
                    INNER JOIN autore_manga J2 ON M.ID_Manga = J2.ID_Manga
                    INNER JOIN autore AU ON J2.ID_Autore = AU.ID_Autore
                    INNER JOIN editore E ON M.Cod_Editore = E.Cod_Editore
                    WHERE M.Nome = '${titoloManga}';`,
        (error, results, fields) => {
            console.log(results);

            res.status(200).render("manga.html", {
                rows: results,
            })

            conn.release();
            if (error) throw error;
        });
    })
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});