const axios = require('axios');

async function getFilmSwapi(id) {

    const resp = await axios.get(`https://swapi.dev/api/films/${id}`);
    const { title, created, director, episode_id, opening_crawl, planets, producer } = await resp.data;

    return {
        titulo: title,
        fecha_creacion: created,
        director: director,
        episodio_id: episode_id,
        apertura: opening_crawl,
        planetas: planets,
        productor: producer
    };

}

module.exports = getFilmSwapi;
