import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherCardProps {
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
}

const WeatherCard = ({ temp, feelsLike, condition, icon }: WeatherCardProps) => {
  const getWeatherIcon = () => {
    if (icon.includes("01")) return <Sun className="w-32 h-32 text-accent" />;
    if (icon.includes("09") || icon.includes("10")) return <CloudRain className="w-32 h-32 text-primary" />;
    if (icon.includes("13")) return <CloudSnow className="w-32 h-32 text-primary" />;
    return <Cloud className="w-32 h-32 text-primary" />;
  };

  return (
    <Card className="shadow-xl border-border rounded-3xl overflow-hidden bg-gradient-to-br from-card to-secondary/30">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-7xl font-bold text-foreground">{temp}°</div>
            <p className="text-xl text-muted-foreground">Feels like {feelsLike}°</p>
            <p className="text-2xl font-medium text-foreground capitalize">{condition}</p>
          </div>
          <div className="flex-shrink-0">
            {getWeatherIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
