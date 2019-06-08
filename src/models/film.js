export default class Film {
    constructor(
        id: Number,
        nameVi: String,
        nameEng: String,
        url: String,
        thumnail: String,
        banner: String,
        content: String,
        time: String,
        genres: String,
        country: String,
        writers: String,
        directors: String,
        date: String,
        imbd: Number,
        trailerImg: String,
        trailerUrl: String,
        subVi: String,
        subEng: String,
        cast: Object,
        comment: Array
    ) {
        this.id = id || -1
        this.nameVi = nameVi || ''
        this.nameEng = nameEng || ''
        this.url = url || ''
        this.thumnail = thumnail || ''
        this.banner = banner || ''
        this.content = content || ''
        this.time = time || ''
        this.genres = genres || ''
        this.country = country || ''
        this.writers = writers || ''
        this.directors = directors || ''
        this.date = date || ''
        this.imbd = imbd || -1
        this.trailerImg = trailerImg || ''
        this.trailerUrl = trailerUrl || ''
        this.subVi = subVi || ''
        this.subEng = subEng || ''
        this.cast = cast || {}
        this.comment = comment || []
    }
}