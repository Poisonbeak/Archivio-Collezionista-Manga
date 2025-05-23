const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.static(__dirname));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set("view engine", "html");

const dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 5000;

// account
// DaniD - 84>Uy4-,

const mysql = require("mysql2");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collezione manga',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

const nunjucks = require('nunjucks');
app.set("view engine", "html");
nunjucks.configure(__dirname + "/views", {
    autoescape: true,
    express: app
});

app.use((req, res, next) => {
    console.log(`→ ${req.method} ${req.url}`);
    
    res.on('finish', () => {
      console.log(`← Response sent for ${req.method} ${req.url} with status ${res.statusCode}\n`);
    });
  
    next();
});

app.get("/", (req, res) => {
    const user = req.cookies.nickname;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT M.Nome Nome_Manga, C.NomeFile, C.Path
                    FROM manga M
                    LEFT JOIN copertina C ON M.Copertina = C.NomeFile
                    WHERE M.Nome IN('Naruto', 'Bleach', 'One Piece');`,
            (error, results) => {
                if (error) throw error;
                // console.log(results);

                res.status(200).render("home.html", {
                    bigThreeImages: results,
                    logged: (!user) ? 0 : 1,
                });

                console.log('Connessione rilasciata:', conn.threadId);
                conn.release();
            })
    })
})

app.get("/login", (req, res) => {
    res.status(200).render("login.html");
})

app.post("/login", (req, res) => {
    const nickname = req.body.nickname;
    const insertedPassword = req.body.password;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT Password FROM utente WHERE Nickname = ?`,
            [nickname],
            async (error, results) => {
                if (error) throw error;
                // console.log(results);
                
                if (results.length > 0) {
                    const savedPassword = results[0].Password;
                    // console.log(savedPassword);
    
                    if (await bcrypt.compare(insertedPassword, savedPassword)) {
                        conn.query(`UPDATE utente SET AccessoEffettuato = true WHERE Nickname = ?`,
                            [nickname],
                            (error, results) => {
                                // console.log(results);
    
                                res.cookie("nickname", nickname, {httpOnly: false});

                                res.status(200).send(JSON.stringify("Accesso effettuato con successo!"));
                            }
                        )
                    } else {
                        res.status(400).send(JSON.stringify("Credenziali errate. Riprova."));
                    }
                } else {
                    res.status(400).send(JSON.stringify("Credenziali errate. Riprova."));
                }
    
                console.log('Connessione rilasciata:', conn.threadId);
                conn.release();
            })
    })
})

app.get("/logout", (req, res) => {
    const user = req.cookies.nickname;

    res.status(200).render("logout.html", {
        logged: (!user) ? 0 : 1,
    });
})

app.put("/logout", (req, res) => {
    const nickname = req.cookies.nickname;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`UPDATE utente
                    SET AccessoEffettuato = false
                    WHERE Nickname = ?`, [nickname],
        (error, results) => {
            if (error) throw error;

            res.clearCookie("nickname");
            res.status(200).send(JSON.stringify("Log-out effettuato!"));

            console.log('Connessione rilasciata:', conn.threadId);
            conn.release();
            }
        )
    })
})

app.get("/registrazione", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        const cittàPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT comune FROM database_comuni.italy_cities`,
                (error, results) => {
                    if (error) {
                        reject(error); // In caso di errore, rifiutiamo la promessa
                    } else {
                        resolve(results); // Se la query va a buon fine, risolviamo la promessa
                    }
                }
            );
        });

        const regioniPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT regione FROM database_comuni.italy_regions`,
                (error, results) => {
                    if (error) {
                        reject(error); // In caso di errore, rifiutiamo la promessa
                    } else {
                        resolve(results); // Risolviamo la promessa con i dati dei rivenditori
                    }
                }
            );
        });

        Promise.all([cittàPromise, regioniPromise])
            .then((results) => {
                const città = results[0];
                const regioni = results[1];

                res.status(200).render("registrazione.html", {
                    città: città,
                    regioni: regioni,
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Errore nel recupero dei dati.");
            })
            .finally(() => {
                console.log('Connessione rilasciata:', conn.threadId);
                conn.release();
            });
    });
})

app.post("/registrazione", (req, res) => {
    const {nickname, password, nome, cognome, email, data_di_nascita, città, regione} = req.body;   // DEVONO AVERE LO STESSO NOME DELLE CHIAVI
    // console.log(req.body);

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT Nickname, Email FROM utente WHERE Nickname = ? OR Email = ?`, [nickname, email],
        async (error, results) => {
            if (error) throw error;
            
            if (results.length > 0) {
                messaggio = "Nickname o Email già in uso da un altro utente.";
                conn.release();
                return res.status(409).send(JSON.stringify(messaggio));
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            conn.query(`INSERT INTO utente (Nickname, Nome, Cognome, Data_Nascita, Città, Regione, Email, Password)
                        VALUES (?, ?, ?, ?,
                            (
                                SELECT istat FROM database_comuni.italy_cities
                                WHERE comune = ?
                            ),
                            (
                                SELECT id_regione FROM database_comuni.italy_regions
                                WHERE regione = ?
                            ),
                        ?, ?);`, [nickname, nome, cognome, data_di_nascita, città, regione, email, encryptedPassword],
            (error, results) => {
                if (error) throw error;
                // console.log(results);

                res.status(200).send(JSON.stringify("Registrazione avvenuta con successo!"));
                
                console.log('Connessione rilasciata:', conn.threadId);
                conn.release();
            })
        })
    })
})

app.get("/profilo", (req, res) => {     // possibilità di modificare i dati del profilo?
    const user = req.cookies.nickname;
    // console.log(user);
    
    if (!user) {
        res.status(401).render("login.html", {
            unauthorized: "Devi effettuare il login per visualizzare questa pagina."
        });
        return;
    }

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT U.Nickname, U.Nome, U.Cognome, U.Data_Nascita, C.comune, R.regione, U.Email
                    FROM utente U
                    INNER JOIN database_comuni.italy_cities C ON U.Città = C.istat 
                    INNER JOIN database_comuni.italy_regions R ON U.Regione = R.id_regione
                    WHERE U.Nickname = ?`, [user],
        (error, results) => {
            if (error) throw error;
            // console.log(results);

            res.status(200).render("profilo.html", {
                profilo: results,
                logged: (!user) ? 0 : 1,
            });
            console.log('Connessione rilasciata:', conn.threadId);
            conn.release();
        })
    })
})

app.get("/profilo/modifica", (req, res) => {
    const user = req.cookies.nickname;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        const cittàPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT comune FROM database_comuni.italy_cities`,
                (error, results) => {
                    if (error) {
                        reject(error); // In caso di errore, rifiutiamo la promessa
                    } else {
                        resolve(results); // Se la query va a buon fine, risolviamo la promessa
                    }
                }
            );
        });

        const regioniPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT regione FROM database_comuni.italy_regions`,
                (error, results) => {
                    if (error) {
                        reject(error); // In caso di errore, rifiutiamo la promessa
                    } else {
                        resolve(results); // Risolviamo la promessa con i dati dei rivenditori
                    }
                }
            );
        });

        const profiloPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT U.Nickname, U.Password, U.Nome, U.Cognome, U.Data_Nascita, C.comune, R.regione, U.Email
                        FROM utente U
                        INNER JOIN database_comuni.italy_cities C ON U.Città = C.istat 
                        INNER JOIN database_comuni.italy_regions R ON U.Regione = R.id_regione
                        WHERE U.Nickname = ?`, [user],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (!results || results.length === 0) {
                            conn.release();
                            return res.status(404).send("Utente non trovato.");
                        }
    
                        const data = new Date(results[0].Data_Nascita);
    
                        const anno = data.getFullYear();                            // formatta a yyyy-mm-dd richesto dall'input lato client
                        const mese = String(data.getMonth() + 1).padStart(2, '0');
                        const giorno = String(data.getDate()).padStart(2, '0'); 
    
                        results[0].Data_Nascita = `${anno}-${mese}-${giorno}`;

                        resolve(results);
                    }
                })
        });

        Promise.all([cittàPromise, regioniPromise, profiloPromise])
            .then((results) => {
                const città = results[0];
                const regioni = results[1];
                const profilo = results[2];

                res.status(200).render("modifica_profilo.html", {
                    città: città,
                    regioni: regioni,
                    profilo: profilo,
                    logged: (!user) ? 0 : 1,
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Errore nel recupero dei dati.");
            })
            .finally(() => {
                console.log('Connessione rilasciata:', conn.threadId);
                conn.release();
            });
    });
})

app.post("/profilo/modifica", (req, res) => {
    const {nickname, nome, cognome, email, data_di_nascita, città, regione, nicknameOriginale, emailOriginale} = req.body;
    
    pool.getConnection((err, conn) => {
        if (err) {
          return res.status(500).send("Errore nella connessione al database.");
        }
      
        conn.query(`SELECT * FROM utente
                    WHERE (Nickname = ? OR Email = ?)
                    AND Nickname != ?;`, [nickname, email, nicknameOriginale],
            (err, results) => {
                if (err) throw err;
            
                if (results.length > 0) {
                    messaggio = "Nickname o Email già in uso da un altro utente.";
                    conn.release();
                    res.status(409).send(JSON.stringify(messaggio));
                }
            });
        
        conn.query(`UPDATE utente
                    SET Nickname = ?,
                        Nome = ?,
                        Cognome = ?,
                        Data_Nascita = ?,
                        Città = (
                        SELECT istat FROM database_comuni.italy_cities WHERE comune = ? LIMIT 1
                        ),
                        Regione = (
                        SELECT id_regione FROM database_comuni.italy_regions WHERE regione = ? LIMIT 1
                        ),
                        Email = ?
                    WHERE Nickname = ?;`,
                    [nickname, nome, cognome, data_di_nascita, città, regione, email, nicknameOriginale],
            (err, result) => {
            conn.release();
    
            if (err) throw err;
    
            if (result.affectedRows === 0) {
                messaggio = "Nessuna modifica effettuata";
                res.status(200).send(JSON.stringify(messaggio));
            }

            res.cookie("nickname", nickname, {httpOnly: false});
    
            messaggio = "Modifiche salvate con successo!";
            return res.status(200).send(JSON.stringify(messaggio));
        });
    });  
})

app.get("/archivio/volumi", (req, res) => {
    const user = req.cookies.nickname;
    // console.log(user);
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT V.Titolo, V.N_Pagine, M.Nome, M.Edizione
                    FROM volume V INNER JOIN manga M
                    ON V.ID_Manga = M.ID_Manga`,
        (error, results) => {
            // console.log(results);
            if (error) throw error;

            res.status(200).render("archivio_volumi.html", {
                rows: results,
                logged: (!user) ? 0 : 1,
            });
            console.log('Connessione rilasciata:', conn.threadId);
            conn.release();
        })
    })
});

app.get("/archivio/manga", (req, res) => {
    const user = req.cookies.nickname;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT M.Nome Nome_Manga, M.Edizione, AU.Nome Nome_Autore, AU.Cognome Cognome_Autore
                    FROM Manga M LEFT JOIN autore_manga J1 ON M.ID_Manga = J1.ID_Manga
                    LEFT JOIN autore AU ON J1.ID_Autore = AU.ID_Autore;`,
        (error, results) => {
            // console.log(results);
            if (error) throw error;

            res.status(200).render("archivio_manga.html", {
                rows: results,
                logged: (!user) ? 0 : 1,
            })

            console.log('Connessione rilasciata:', conn.threadId);
            conn.release();
        });
    })
});

app.get("/archivio/volumi/:titolovolume", (req, res) => {
    const user = req.cookies.nickname;
    
    const titoloVolume = req.params.titolovolume;
    let queryVolume;
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        // Creiamo due promesse per le due query
        const volumePromise = new Promise((resolve, reject) => {
            conn.query(`SELECT V.ISBN, V.Titolo, Cop.NomeFile, Cop.Path, V.N_Pagine, V.N_Volume, M.Nome Nome_Manga, M.Edizione
                        FROM volume V 
                        INNER JOIN manga M ON V.ID_Manga = M.ID_Manga
                        LEFT JOIN copertina Cop ON V.Copertina = Cop.NomeFile
                        WHERE V.Titolo = ?;`, [titoloVolume],
                (error, results) => {
                    if (error) {
                        reject(error); // In caso di errore, rifiutiamo la promessa
                    } else {
                        queryVolume = results;
                        resolve(); // Se la query va a buon fine, risolviamo la promessa
                    }
                }
            );
        });

        const rivenditoriPromise = new Promise((resolve, reject) => {
            conn.query(
                `SELECT Riv.Nome Nome_Rivenditore, Riv.Telefono, Riv.Sito_Web, RV.Prezzo, RV.Usato, RV.Qualità
                 FROM volume V
                 INNER JOIN volumi_rivenditore RV ON V.ISBN = RV.ISBN_Volume
                 INNER JOIN rivenditore Riv ON RV.ID_Rivenditore = Riv.ID_Rivenditore
                 WHERE V.Titolo = ?;`, [titoloVolume],
                (error, results) => {
                    if (error) {
                        reject(error); // In caso di errore, rifiutiamo la promessa
                    } else {
                        resolve(results); // Risolviamo la promessa con i dati dei rivenditori
                    }
                }
            );
        });

        // Attendiamo entrambe le promesse (le due query) prima di procedere
        Promise.all([volumePromise, rivenditoriPromise])
            .then((results) => {
                // La prima promessa ha risolto `queryVolume`
                // La seconda promessa ha risolto `rivenditori`
                res.status(200).render("volume.html", {
                    campiVolume: queryVolume,
                    rivenditori: results[1], // `results[1]` è il risultato della seconda query
                    logged: (!user) ? 0 : 1,
                });
            })
            .catch((error) => {
                // Gestiamo eventuali errori delle promesse
                console.error(error);
                res.status(500).send("Errore nel recupero dei dati.");
            })
            .finally(() => {
                console.log('Connessione rilasciata:', conn.threadId);
                conn.release(); // Rilasciamo la connessione solo dopo aver completato tutto
            });
    });
});

app.get("/archivio/manga/:nomemanga", (req, res) => {
    const user = req.cookies.nickname;
    
    const nomeManga = req.params.nomemanga;
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        const mangaPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT M.ID_Manga, M.Nome Nome_Manga, M.Edizione, G.Nome Genere, M.A_Colori, M.Contenuti_Extra,
                        AU.Nome Nome_Autore, AU.Cognome Cognome_Autore, AU.Pseudonimo Pseudonimo_Autore,
                        AR.Nome Nome_Artista, AR.Cognome Cognome_Artista, AR.Pseudonimo Pseudonimo_Artista,
                        E.Nome Nome_Editore, C.NomeFile, C.Path
                        FROM manga M
                        LEFT JOIN artista_manga J1 ON M.ID_Manga = J1.ID_Manga
                        LEFT JOIN artista AR ON J1.ID_Artista = AR.ID_Artista
                        LEFT JOIN autore_manga J2 ON M.ID_Manga = J2.ID_Manga
                        LEFT JOIN autore AU ON J2.ID_Autore = AU.ID_Autore
                        LEFT JOIN genere_manga J3 ON M.ID_Manga = J3.ID_Manga
                        LEFT JOIN genere G ON J3.ID_Genere = G.ID_Genere
                        LEFT JOIN editore E ON M.Cod_Editore = E.Cod_Editore
                        LEFT JOIN copertina C ON M.Copertina = C.NomeFile
                        WHERE M.Nome = ?;`,
                        [nomeManga],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        const volumiPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT V.Titolo Titolo_Volume, V.N_Volume, Cop.NomeFile, Cop.Path
                        FROM volume V LEFT JOIN copertina Cop ON V.Copertina = Cop.NomeFile
                        INNER JOIN manga M ON V.ID_Manga = M.ID_Manga
                        WHERE M.Nome = ?;`,
                        [nomeManga],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        Promise.all([mangaPromise, volumiPromise])
            .then((results) => {
                const manga = results[0];
                const volumi = results[1];

                res.status(200).render("manga.html", {
                    manga: manga,
                    volumi: volumi,
                    logged: (!user) ? 0 : 1,
                })
            })
            .catch((error) => {
                console.error('Errore nelle query:', error);
                res.status(500).send("Errore nel recupero dei dati.");
            })
            .finally(() => {
                console.log('Connessione rilasciata:', conn.threadId);
                conn.release();
            })
    })
})

app.get("/controlloVolumiPosseduti", (req, res) => {
    const user = req.cookies.nickname;
    // console.log(user);

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT V.Titolo
                    FROM volumi_utente VU INNER JOIN volume V ON VU.ISBN_Volume = V.ISBN
                    WHERE VU.Nickname_Utente = ?`, [user],
        (error, results) => {
            if (error) throw error;
            // console.log(results);

            res.status(200).send(results);

            console.log('Connessione rilasciata:', conn.threadId);
            conn.release();
        })
    })
})

app.get("/collezione", (req, res) => {
    const user = req.cookies.nickname;
    // console.log(user);
    
    if (!user) {
        res.status(401).render("login.html", {
            unauthorized: "Devi effettuare il login per visualizzare questa pagina."
        });
        return;
    }

    pool.getConnection((err, conn) => {
        if (err) throw err;

        const volumiPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT V.Titolo, M.Nome Nome_Manga, V.N_Volume, C.NomeFile, C.Path
                        FROM manga M
                        INNER JOIN volume V ON M.ID_Manga = V.ID_Manga
                        LEFT JOIN copertina C ON V.Copertina = C.NomeFile
                        INNER JOIN volumi_utente VU ON V.ISBN = VU.ISBN_Volume
                        WHERE VU.Nickname_Utente = ?
                        ORDER BY M.Nome ASC, V.N_Volume ASC`, [user],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results)
                }
            })
        });

        const mangaPromise = new Promise((resolve, reject) => {
            conn.query(`SELECT DISTINCT M.Nome, C.NomeFile, C.Path
                        FROM manga M
                        INNER JOIN volume V ON M.ID_Manga = V.ID_Manga
                        INNER JOIN volumi_utente VU ON V.ISBN = VU.ISBN_Volume
                        LEFT JOIN copertina C ON M.Copertina = C.NomeFile
                        WHERE VU.Nickname_Utente = ?
                        ORDER BY M.Nome ASC`, [user],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
        });

        Promise.all([volumiPromise, mangaPromise])
            .then((results) => {
                const volumi = results[0];
                const manga = results[1];

                res.status(200).render("collezione.html", {
                    volumiPosseduti: volumi,
                    mangaPosseduti: manga,
                    logged: (!user) ? 0 : 1,
                })
            })
            .catch((error) => {
                console.error('Errore nelle query:', error);
                res.status(500).send("Errore nel recupero dei dati.");
            })
            .finally(() => {
                console.log('Connessione rilasciata:', conn.threadId);
                conn.release();
            })
    })
})

app.post("/volume", (req, res) => {
    const nicknameUtente = req.body.nickname;
    const titoloVolume = req.body.volume;

    // console.log(`${nicknameUtente} ${titoloVolume}`);
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`INSERT INTO volumi_utente (Nickname_Utente, ISBN_Volume)
                    VALUES (?, (
                        SELECT ISBN
                        FROM volume
                        WHERE Titolo = ?
                        )
                    );`,
                    [nicknameUtente, titoloVolume],
        (error, results) => {
            if (error) throw error;
            // console.log(results);

            res.status(201).send("Aggiunto con successo!");
            console.log('Connessione rilasciata:', conn.threadId);
            conn.release();
        });
    })
})

app.delete("/volume", (req, res) => {
    const nicknameUtente = req.body.nickname;
    const titoloVolume = req.body.volume;

    // console.log(`${nicknameUtente} ${titoloVolume}`);
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`DELETE FROM volumi_utente
                    WHERE Nickname_Utente = ? AND ISBN_Volume = (
                        SELECT ISBN
                        FROM volume
                        WHERE Titolo = ?
                        )`,
                    [nicknameUtente, titoloVolume],
        (error, results) => {
            if (error) throw error;
            // console.log(results);

            res.status(200).send(JSON.stringify("Rimosso con successo!"));
            console.log('Connessione rilasciata:', conn.threadId);
            conn.release();
        });
    })
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});