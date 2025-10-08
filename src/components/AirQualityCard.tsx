import { Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AirQualityCardProps {
  aqi: number;
}

const AirQualityCard = ({ aqi }: AirQualityCardProps) => {
  const getAQIDetails = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { label: "Good", color: "text-green-600", bgColor: "bg-green-100" };
      case 2:
        return { label: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100" };
      case 3:
        return { label: "Moderate", color: "text-orange-600", bgColor: "bg-orange-100" };
      case 4:
        return { label: "Poor", color: "text-red-600", bgColor: "bg-red-100" };
      case 5:
        return { label: "Very Poor", color: "text-purple-600", bgColor: "bg-purple-100" };
      default:
        return { label: "Unknown", color: "text-gray-600", bgColor: "bg-gray-100" };
    }
  };

  const aqiDetails = getAQIDetails(aqi);

  return (
    <Card className="shadow-lg border-border rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="w-6 h-6 text-primary" />
          Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={`${aqiDetails.bgColor} ${aqiDetails.color} text-5xl font-bold px-6 py-4 rounded-xl`}>
            {aqi}
          </div>
          <div>
            <p className={`text-2xl font-semibold ${aqiDetails.color}`}>{aqiDetails.label}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {aqi === 1 && "Air quality is satisfactory, and air pollution poses little or no risk."}
              {aqi === 2 && "Air quality is acceptable. However, there may be a risk for some people."}
              {aqi === 3 && "Members of sensitive groups may experience health effects."}
              {aqi === 4 && "Everyone may begin to experience health effects."}
              {aqi === 5 && "Health alert: The risk of health effects is increased for everyone."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
