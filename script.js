/*pegando o evento de submit de busca*/
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

/*Utilizando a Api openweathermap para pegar as informações de um lugar específico  */
    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');


        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1da2df012c47e1f67950792580187f13&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    }else{
        clearInfo();
    }
});

/*alterando o html com as informações adquirida na Api */
function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
};

/* deixar em branco quando for buscar e nao tiver nada */
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
};
/* exibir msg de erro quando nao localizar uma posição válida */
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
};
