import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ForecastCardProps {
  date: Date;
  temp: number;
  condition: string;
  icon: string;
}

const ForecastCard = ({ date, temp, condition, icon }: ForecastCardProps) => {
  const getWeatherIcon = () => {
    if (icon.includes("01")) return <Sun className="w-12 h-12 text-accent" />;
    if (icon.includes("09") || icon.includes("10")) return <CloudRain className="w-12 h-12 text-primary" />;
    if (icon.includes("13")) return <CloudSnow className="w-12 h-12 text-primary" />;
    return <Cloud className="w-12 h-12 text-primary" />;
  };

  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <Card className="shadow-lg border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
      <CardContent className="p-6 text-center space-y-3">
        <div>
          <p className="font-semibold text-foreground">{dayName}</p>
          <p className="text-sm text-muted-foreground">{dayDate}</p>
        </div>
        <div className="flex justify-center py-2">
          {getWeatherIcon()}
        </div>
        <div className="text-3xl font-bold text-foreground">{temp}°</div>
        <p className="text-sm text-muted-foreground capitalize">{condition}</p>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
