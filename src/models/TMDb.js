import axios from 'axios'
import tmdbKey from '../settings'

const defaultUrl = 'https://api.themoviedb.org/3/discover/movie'
const imgsUrl = 'https://image.tmdb.org/t/p/w500/'

class TMDb {
    constructor(){
        this.key = tmdbKey
        this.url = defaultUrl
        this.imgsUrl = imgsUrl
    }

    fetch({page = 1, sort = 'desc'} = {}){
        window.console.log(this.key)
        return axios.get(this.url, {
            crossdomain: true,
            params: {
                api_key: this.key,
                sort_by: `popularity.${sort}`,
                page
            },
        })
        .then( (response) => {
            return response.data
        } )
        .catch( err => {
            window.console.log(err)
        } )
    }

}

export default TMDb