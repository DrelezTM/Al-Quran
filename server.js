const express = require("express");
const app = express();
const ejs = require("ejs");
const fetch = require("node-fetch");
const fetchJson = async ( url, options ) => new Promise( async( resolve, reject ) => {
  fetch( url, options ).then( response => response.json() ).then( json => {
    resolve( json );
  }).catch( err => {
    resolve( "err" );
  });
});

app.set('view engine', 'ejs');

app.get("/settings/css", (req, res) => {
	res.sendFile("views/style/style.css", {root: __dirname});
});

app.get("/", async (req, res) => {
	const api = await fetchJson(`https://api.countapi.xyz/hit/alquranid.herokuapp.com/visits`, { method: "get" });
	res.render('pages/index', {
		api: api
	});
});

app.get("/repository", async (req, res) => {
	res.redirect("https://github.com/DrelezTM/Al-Quran");
});

app.get("/surat", async (req, res) => {
	const api = await fetchJson(`https://equran.id/api/surat`, { method: "get" });	
  res.render('pages/surat', {
		api: api
	});
});

app.get("/surat/:nomor", async (req, res) => {
	const nomor = req.param("nomor");
	const api = await fetchJson(`https://equran.id/api/surat/${nomor}`, { method: "get" });
	res.render('pages/nomor', {
		api: api
	});
});

app.get("/surat/:nomor/tafsir", async (req, res) => {
	const nomor = req.param("nomor");
	const api = await fetchJson(`https://equran.id/api/tafsir/${nomor}`, { method: "get" });
	res.render('pages/tafsir', {
		api: api
	});
});

app.listen(process.env.PORT);
