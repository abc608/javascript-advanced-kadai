// const weatherSection = document.querySelector('.weather-data');
// const apiKey = 'cd3609c2c55054769bce3cfbc013789c'; 

// const cities = [
//   { name: 'Tokyo', id: 'tokyo' },
//   { name: 'Sapporo', id: 'sapporo' },
//   { name: 'Osaka', id: 'osaka' },
//   { name: 'Fukuoka', id: 'fukuoka' }
// ];

// async function fetchWeather(cityName,elementId) {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&units=metric&appid=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     const description = data.weather[0].description;
//     const icon = data.weather[0].icon;
//     const temp = data.main.temp;
//     const wind = data.wind.speed;

//     const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

//     weatherSection.innerHTML = `
//       <div>天気</div><div>${description}</div>
//       <div>アイコン</div><div><img src="${iconUrl}" alt="天気アイコン"></div>
//       <div>気温</div><div>${temp}℃</div>
//       <div>風速</div><div>${wind} (m/s)</div>
//     `;
//   } catch (error) {
//     console.error('天気情報の取得に失敗しました:', error);
//     // weatherSection.innerHTML = `<div>天気情報の取得に失敗しました。</div>`;
//   }
// }

// cities.forEach(city => {
//   fetchWeather(city.name, city.id);
// });
const apiKey =  'cd3609c2c55054769bce3cfbc013789c'; // ← 有効なAPIキーをここに入れてください

const cities = [
  { name: 'Tokyo', id: 'tokyo' },
  { name: 'Sapporo', id: 'sapporo' },
  { name: 'Osaka', id: 'osaka' },
  { name: 'Fukuoka', id: 'fukuoka' }
];

async function fetchWeather(cityName, elementId) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ja&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const data = await response.json();

    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const section = document.getElementById(elementId);
    section.innerHTML = `
      <div><strong>天気:</strong> ${description}</div>
      <div><img src="${iconUrl}" alt="天気アイコン"></div>
      <div><strong>気温:</strong> ${temp}℃</div>
      <div><strong>風速:</strong> ${wind} m/s</div>
    `;
  } catch (error) {
    console.error(`${cityName}の天気取得エラー:`, error);
    const section = document.getElementById(elementId);
    section.innerHTML = `<div style="color:red;">${cityName}の天気情報を取得できませんでした。</div>`;
  }
}

// ページ読み込み後に実行
window.addEventListener('DOMContentLoaded', () => {
  cities.forEach(city => {
    fetchWeather(city.name, city.id);
  });
});