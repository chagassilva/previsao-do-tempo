async function Buscarcidade(cidade) {
  let apikey = "93bdf8159ec7dfbc6a0bb1a9b000ff17";

  try {
    // Primeiro, busca pelo nome da cidade
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}&units=metric&lang=pt_br`
    );

    if (!response.ok) {
      throw new Error("Cidade não encontrada!");
    }

    let dados = await response.json();
    let velocidadeMS = dados.wind.speed;
    let velocidadeKMH = (velocidadeMS * 3.6).toFixed(1);
    

    let cidades = dados.name;
    let estado = cidades[cidade] || "";
    let nomeCompleto = estado ? `${cidade}/${estado}` : cidade;
    

    
    console.log(nomeCompleto)
    console.log(estado)
    console.log(dados); // Mostra os dados no console

   
    document.querySelector("h1").innerText = `Previsão em ${dados.name}`;
    document.querySelector(".tempo").innerText = ` ${Math.round(dados.main.temp )} °C`;
    document.querySelector(".descricao").innerText = dados.weather[0].description;
    document.querySelector(".umidade").innerText = `Umidade: ${dados.main.humidity}%`;
    document.querySelector(".icon-desc").src ="https://openweathermap.org/img/wn/" + `${dados.weather[0].icon}` + "@4x.png";
    document.querySelector(".min").innerText = `Min: ${dados.main.temp_min}°C`;
    document.querySelector(".max").innerText = `Max: ${dados.main.temp_max}°C`;
    document.querySelector(".speed").innerText = `Vento: ${velocidadeKMH} km/h`;
    document.querySelector(".deg").innerText = `Direção do vento: ${converterDirecaoParaCardeal(dados.wind.deg)}(${dados.wind.deg}°)`;

    if (dados.rain && dados.rain["1h"]) {
      document.querySelector(".rain").innerText = `Chuva (última 1h): ${dados.rain["1h"]} mm`;
    } else if (dados.rain && dados.rain["3h"]) {
      document.querySelector(".rain").innerText = `Chuva (últimas 3h): ${dados.rain["3h"]} mm`;
    } else {
      document.querySelector(".rain").innerText = "Chuva: sem registro";
    }

    
   
  } catch (erro) {
    alert(erro.message);
  }
}

function Cliquenobotao() {
  let cidade = document.querySelector(".input-cidade").value;
  Buscarcidade(cidade);
}

function converterDirecaoParaCardeal(deg) {
  const direcoes = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return direcoes[index];
}
