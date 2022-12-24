const express = require('express');
const app = express();
const fetch = require("node-fetch");
const fetchJson = async (url, options) => new Promise(async (resolve, reject) => {
	fetch(url, options).then(response => response.json()).then(json => {
		resolve(json);
	}).catch(err => {
		resolve("err");
	});
});

app.set('view engine', 'ejs');

app.get('/style', async (req, res) => {
	res.sendFile('views/style/style.css', { root: __dirname });
});

app.get('/', async (req, res) => {
	let data = require('./views/database/ayat.json');
	let random = data[Math.floor(Math.random() * data.length)];
	res.render('pages/index', { random: random, path: '/' });
});

app.get('/surah', async (req, res) => {
	const search = req.query.search;
	const api = await fetchJson(`https://equran.id/api/surat`, { method: "get" });
	if (search) {
		result = {};
		const toLowerSearch = req.query.search.toLowerCase();
		api.find(v => {
			if([v.nama.toLowerCase(), v.nama_latin.toLowerCase(), v.arti.toLowerCase()].includes(toLowerSearch)) {
				return result = v
			}
		});
	} else {
		result = {};
		api.find(v => {
			if([v.nama.toLowerCase(), v.nama_latin.toLowerCase(), v.arti.toLowerCase()].includes(search)) {
				return result = v
			}
		});
	}
	res.render('pages/list_surah', { api: api, result: result, search: search, path: '/surah' });
});

app.get('/tafsir', async (req, res) => {
	const search = req.query.search;
	const api = await fetchJson(`https://equran.id/api/surat`, { method: "get" });
	if (search) {
		result = {};
		const toLowerSearch = req.query.search.toLowerCase();
		api.find(v => {
			if([v.nama.toLowerCase(), v.nama_latin.toLowerCase(), v.arti.toLowerCase()].includes(toLowerSearch)) {
				return result = v
			}
		});
	} else {
		result = {};
		api.find(v => {
			if([v.nama.toLowerCase(), v.nama_latin.toLowerCase(), v.arti.toLowerCase()].includes(search)) {
				return result = v
			}
		});
	}
	res.render('pages/list_tafsir', { api: api, result: result, search: search, path: '/tafsir' });
});

app.get('/404', async (req, res) => {
	res.render('pages/notfound', { path: '' });
});

app.get('/github', async (req, res) => {
	res.redirect('https://github.com/DrelezTM/Al-Quran');
});

app.get('/surah/:nomor', async (req, res) => {
	const nomor = req.params.nomor;
	let incl = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105","106", "107", "108", "109", "110", "111", "112", "113", "114" ];
	let datas_link = {
		"next": parseInt(nomor) + 1 < 115 || parseInt(nomor) + 1 < "115" ? `${parseInt(nomor) + 1}` : "/",
		"prev": nomor - 1 <= 0 || nomor - 1 <= "0" ? "/" :  `${parseInt(nomor) - 1}`,
	}
	if (incl.includes(nomor)) {
		const api = await fetchJson(`https://equran.id/api/surat/${nomor}`, { method: "get" });
		res.render('pages/surah', { api: api, ayat: api.ayat, data: datas_link, path: '' });
	} else {
		res.redirect('/404');
	}
});

app.get('/tafsir/:nomor', async (req, res) => {
	const nomor = req.params.nomor;
	let incl = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105","106", "107", "108", "109", "110", "111", "112", "113", "114" ];	
	if (incl.includes(nomor)) {
		const api = await fetchJson(`https://equran.id/api/tafsir/${nomor}`, { method: "get" });
		res.render('pages/tafsir', { api: api, tafsir: api.tafsir, path: '' });
	} else {
		res.redirect('/404');
	}
});


app.get('/assets/img/mekah.png', async (req, res) => {
	res.sendFile('views/assets/img/mekah.png', { root: __dirname });
});

app.get('/assets/img/madinah.png', async (req, res) => {
	res.sendFile('views/assets/img/madinah.png', { root: __dirname });
});

app.get('/assets/svg/github.svg', async (req, res) => {
	res.sendFile('views/assets/svg/github.svg', { root: __dirname });
});

app.get('/assets/svg/error.svg', async (req, res) => {
	res.sendFile('views/assets/svg/error.svg', { root: __dirname });
});

app.get('/assets/font/LPMQ_IsepMisbah.ttf', async (req, res) => {
	res.sendFile('views/assets/font/LPMQ_IsepMisbah.ttf', { root: __dirname });
});

app.get('*', async (req, res) => {
	res.redirect('/404');
});

module.exports = app;
