from flask import Flask, render_template, request, jsonify
import python_weather
import asyncio
import os
import pyttsx3

app = Flask(__name__)

async def get_weather(city):
    async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
        weather = await client.get(city)
        return weather

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/fetchReport', methods=['GET', 'POST'])
def weather():
    if request.method == 'POST':
        city = request.get_json()['city']
        print(city)
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        weather = loop.run_until_complete(get_weather(city))
        loop.close()

        if weather:
            temperature = f"{weather.current.temperature}°F"
            description = f"{weather.current.description}"
            uv_index = f"{weather.current.ultraviolet}UV"
            humidity = f"{weather.current.humidity} g/kg"
            feelslike = f"{weather.current.feels_like}"
            wind_speed_ = f"{weather.current.wind_speed} km/h"
            res = {"city": city, "temperature":temperature, "description":description, "uv_index": uv_index, "humidity":humidity, "feelslike":feelslike, "wind_speed_":wind_speed_}
            print(res)
            return jsonify(res)

        else:
            return render_template('weather.html', city=city, error=True)


if __name__ == '__main__':
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    app.run(debug=True)
