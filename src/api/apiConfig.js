const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '5a917d25f7c40ac92b4317c99a46600d',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;