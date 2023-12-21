
## WeatherBot
WeatherBot is a Telegram bot that provides weather updates for specified locations. Users can subscribe to receive daily weather updates, manually check the weather for a specific location, and more.

## Commands
/start

Description: Welcomes the user and provides information about using the bot.
/subscribe

Description: Subscribes the user to receive daily weather updates.
/unsubscribe

Description: Unsubscribes the user from receiving weather updates.
/weather

Description: Retrieves the current weather based on the user's shared location.
Usage: Share your location, and the bot will provide the current weather information for that location.
Text Input

Description: If the user sends a text message, the bot will attempt to retrieve the weather information for the specified city.
Usage: Simply type the name of the city for which you want to check the weather.

## How to Use
* Start the bot by sending the /start command.
* Subscribe to daily weather updates using the /subscribe command.
* Optionally, use the /unsubscribe command to stop  receiving daily weather updates.
* Use the /weather command to get the current weather based on your shared location.
* Alternatively, send a text message with the name of the city to get the current weather for that location.

 ## Getting Started
Clone the repository.
Install dependencies using npm install.
Replace the placeholder for the WeatherStack API key (access_key) in the url variable.
Replace the placeholder for the Telegram Bot token (TOKEN variable).
Run the bot using npm start.