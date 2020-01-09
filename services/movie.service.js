const axios = require('../helpers/axios')
const { getAsync, client } = require('../helpers/redis');

exports.getCharacters = async (query) => {
  try {
    let { order, sort, filter } = query
    filter = filter ? `gender=${filter}` : ''
    sort = sort ? sort : 'name'
    order = order ? order : 'acs'

    const url = `https://swapi.co/api/people/?${filter}`
    const total_results = await this.getExternalData(url)

    // Sort movies
    const characters = total_results.map((character) => {
      const { homeworld, films, starships, vehicles, species, url, ...newCharacters } = character;
      return newCharacters;
    }).sort(function(a, b){
      if (order && order.toLowerCase() == 'asc' || order.toLowerCase() == 'ascending') {
        if (b[sort] < a[sort]) return -1
        return b[sort] > a[sort] ? 1 : 0
      }
      if (a[sort] < b[sort]) return -1
      return a[sort] > b[sort] ? 1 : 0
      
    });

    const result = this.addMetadata(characters)
    return result;
  } catch (error) {
    throw error;
  }
};

exports.addMetadata = async (characters) => {
  const total_height = characters.reduce((height, character) => {
    let charHeight = character.height != 'unknown' ? Number(character.height) : 0
    return height + charHeight
  }, 0)

  const result = {characters, metadata: {
    number: characters.length,
    height: toFeet(total_height)
  }}
  return result;
}

exports.getFilms = async () => {
  try {
    let commentPromises = []
    const url = 'https://swapi.co/api/films/'
    const total_results = await this.getExternalData(url)
    // Sort movies
    const movies = total_results.map((movie) => {
      commentPromises.push(CommentModel.count({
        where: {
          episode_id: movie.episode_id
        }
      }))
      const { characters, planets, starships, vehicles, species, url, ...newMovie } = movie;
      return newMovie;
    }).sort(function(a, b){
      return new Date(a.release_date) - new Date(b.release_date);
    });
    const comments = await Promise.all(commentPromises)
    // Add comments
    movies.map((movie, i) => {
      movie.comment = comments[i]
      return movie
    });
  } catch (error) {
    throw error;
  }
};

exports.getExternalData = async (url) => {
  try {
    let total_results = []
    let response = await axios.get(url);
    total_results = [ ...total_results, ...response.data.results ]
    while (response.data.next != null) {
      console.log("Next page found, downloading %o", response.data.next)
      response = await axios.get(response.data.next);
      total_results = [ ...total_results, ...response.data.results ]
    }
    return total_results;
  } catch (error) {
    throw error;
  }
};

/**
   * Redis Cache User
   * @description Add or Update redis user caching
   * @param user User object
   */
 exports.addToCache = async(objects, key) => {
    try {
      await client.set(key, JSON.stringify(objects));
    } catch (err) {
      throw err;
    }
  },

function toFeet(n) {
  let realFeet = ((n*0.393700) / 12);
  let feet = Math.floor(realFeet);
  let inches = (realFeet - feet) * 12;
  inches = Math.round( ( inches * 100 + Number.EPSILON ) / 100 )
  return `${feet}ft and ${inches}inches`;
}

