from flask import Flask, render_template, request
import python_weather
import asyncio
import os
import pyttsx3

app = Flask(__name__)
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

async def get_weather(city):
    async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
        weather = await client.get(city)
        return weather

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather.html')
def weather():
    city = request.args.get('city')
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    weather = loop.run_until_complete(get_weather(city))
    loop.close()

    if weather:
        temperature = f"Temperature: {weather.current.temperature}°F"
        description = f"Description: {weather.current.description}"
        uv_index = f"Ultra violet: {weather.current.ultraviolet}UV"
        humidity = f"Humidity: {weather.current.humidity} g/kg"
        feelslike = f"Feels Like: {weather.current.feels_like}"
        wind_speed_ = f"Wind Speed: {weather.current.wind_speed} km/h"
        
        # Say the weather conditions
        engine.say(f"Searching weather conditions in {city}")
        engine.say(temperature)
        engine.say(description)
        engine.say(humidity)
        engine.runAndWait()
        
        return render_template('weather.html', city=city, temperature=temperature, description=description, uv_index=uv_index, humidity=humidity, feelslike=feelslike, wind_speed_=wind_speed_)

    else:
        return render_template('weather.html', city=city, error=True)


if __name__ == '__main__':
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    app.run(debug=True)
