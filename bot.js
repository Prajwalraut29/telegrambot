
const axios = require("axios");
const {Telegraf} = require("telegraf");
const TOKEN = '6719942981:AAFx5qHHv949CEjP-5TD8SbMgOmqJiEGSjc';
const bot = new Telegraf(TOKEN);
const url = 'http://api.weatherstack.com/current?access_key=34a98540c8d22823b6955ddc500e6dbe&query="'


// In-memory storage for subscribers
const subscribers = new Set();

const fetchData = async(cityName) => {
    const res = await axios.get(`${url + cityName}`)
    return res;
}

fetchData('New York')


// for start
bot.start((ctx)=>{
    ctx.reply("Welcome! Use /subscribe to receive weather updates.");
});

// for subscribe
bot.command('subscribe', (ctx) => {
    const chatId = ctx.chat.id;
    subscribers.add(chatId);
    ctx.reply('You are now subscribed for weather updates.');
  });

// for  unsubscribe
bot.command('unsubscribe', (ctx) => {
    const chatId = ctx.chat.id;
    subscribers.delete(chatId);
    ctx.reply('You are now unsubscribed from weather updates.');
  });

//   to get current weather based on location 

bot.command('weather', async(ctx) =>{
    const chatId = ctx.chat.id;
    const location = ctx.message.location;
    if(!location){
        ctx.reply("Please share your location to get weather updates.");
        return;
    }
    const { latitude, longitude } = location;
   const weatherInfo = await getWeatherInfo(latitude, longitude);
   if(weatherInfo){
    ctx.reply(`Current weather at your location:\n${weatherInfo}`)
   }
   else{
    ctx.reply('Failed to retrieve weather information');
   }
})

bot.on('text', async (ctx) =>{
    const {message} = ctx;
    const {data} = await fetchData(message.text);
    if(data.success == false){
        ctx.reply("Enter a valid city name : ")
    }else{
        const {current,location} = data;
        const weatherStatus = current.weather_descriptions[0];
        ctx.reply(`🌆City : ${location.name}\n 🌡Temperature : ${current.temperature}°\n-\n❓ Weather status: ${
            (weatherStatus.toLowerCase().includes("clear") === true && "☀️") ||
            (weatherStatus.toLowerCase().includes("sunny") === true && "☀️") ||
            (weatherStatus.toLowerCase().includes("cloud") === true && "☁️") ||
            (weatherStatus.toLowerCase().includes("overcast") === true && "☁️") ||
            (weatherStatus.toLowerCase().includes("rain") === true && "🌧") ||
            (weatherStatus.toLowerCase().includes("snow") === true && "❄️")
        } ${current.weather_descriptions[0]} `);
        

    }

})

setInterval(() => {
    subscribers.forEach(async (chatId) => {
      const weatherInfo = await getWeatherInfo(37.7749, -122.4194); // ex loc
      if (weatherInfo) {
        bot.telegram.sendMessage(chatId, `Weather Update:\n${weatherInfo}`);
      }
    });
  }, 24 * 60 * 60 * 1000);

  bot.launch().then(() => {
    console.log('Bot started');
  });