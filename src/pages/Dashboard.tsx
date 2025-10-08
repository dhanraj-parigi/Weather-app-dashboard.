import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wind, Droplets, Eye, Gauge, Sunrise, Sunset, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import AirQualityCard from "@/components/AirQualityCard";
import LifestyleTips from "@/components/LifestyleTips";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      pm2_5: number;
      pm10: number;
      no2: number;
      o3: number;
    };
  }>;
}

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city");

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      navigate("/");
      return;
    }

    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current weather
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!weatherRes.ok) throw new Error("City not found");
        const weatherData = await weatherRes.json();
        setWeather(weatherData);

        // Fetch 5-day forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastRes.json();
        setForecast(forecastData);

        // Fetch air quality
        const { coord } = weatherData;
        const airRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
        );
        const airData = await airRes.json();
        setAirQuality(airData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-50 to-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-xl text-destructive">{error || "No weather data available"}</p>
          <Button onClick={() => navigate("/")} variant="default">
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-6 h-6 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              {weather.name}, {weather.sys.country}
            </h1>
          </div>
          <p className="text-muted-foreground capitalize">{weather.weather[0].description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Weather Card */}
          <div className="lg:col-span-2">
            <WeatherCard
              temp={Math.round(weather.main.temp)}
              feelsLike={Math.round(weather.main.feels_like)}
              condition={weather.weather[0].main}
              icon={weather.weather[0].icon}
            />
          </div>

          {/* Weather Details */}
          <div className="space-y-6">
            <Card className="shadow-lg border-border rounded-2xl overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Weather Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Droplets className="w-5 h-5" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-semibold">{weather.main.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wind className="w-5 h-5" />
                    <span>Wind</span>
                  </div>
                  <span className="font-semibold">
                    {weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="w-5 h-5" />
                    <span>Pressure</span>
                  </div>
                  <span className="font-semibold">{weather.main.pressure} hPa</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-5 h-5" />
                    <span>Visibility</span>
                  </div>
                  <span className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border rounded-2xl overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Sun Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sunrise className="w-5 h-5 text-accent" />
                    <span>Sunrise</span>
                  </div>
                  <span className="font-semibold">{formatTime(weather.sys.sunrise)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sunset className="w-5 h-5 text-primary" />
                    <span>Sunset</span>
                  </div>
                  <span className="font-semibold">{formatTime(weather.sys.sunset)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5-Day Forecast */}
        {forecast && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {forecast.list
                .filter((_, index) => index % 8 === 0)
                .slice(0, 5)
                .map((item, index) => (
                  <ForecastCard
                    key={index}
                    date={new Date(item.dt * 1000)}
                    temp={Math.round(item.main.temp)}
                    condition={item.weather[0].main}
                    icon={item.weather[0].icon}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Air Quality and Lifestyle Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {airQuality && <AirQualityCard aqi={airQuality.list[0].main.aqi} />}
          <LifestyleTips />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
