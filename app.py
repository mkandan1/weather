from flask import Flask, render_template
import python_weather
import asyncio
import os

app = Flask(__name__)

async def get_weather(city):
    async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
        weather = await client.get(city)
        return weather

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather/<city>')
def weather(city):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    weather = loop.run_until_complete(get_weather(city))
    loop.close()

    if weather:
        temperature = f"Temperature: {weather.current.temperature}°F"
        description = f"Description: {weather.current.description}"
        uv_index = f"Ultra violet: {weather.current.ultraviolet}UV"
        return render_template('weather.html', city=city, temperature=temperature, description=description, uv_index=uv_index)
    else:
        return render_template('weather.html', city=city, error=True)

if __name__ == '__main__':
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    app.run(debug=True)
