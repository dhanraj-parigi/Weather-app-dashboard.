import { Sun, Car, Flower, Umbrella } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LifestyleTips = () => {
  const tips = [
    {
      icon: <Sun className="w-6 h-6 text-accent" />,
      title: "UV Index",
      value: "High",
      description: "Wear sunscreen and protective clothing",
    },
    {
      icon: <Car className="w-6 h-6 text-primary" />,
      title: "Car Wash",
      value: "Good day",
      description: "Weather conditions are favorable",
    },
    {
      icon: <Flower className="w-6 h-6 text-green-600" />,
      title: "Pollen Count",
      value: "Moderate",
      description: "May affect sensitive individuals",
    },
    {
      icon: <Umbrella className="w-6 h-6 text-blue-600" />,
      title: "Rain Probability",
      value: "Low",
      description: "Enjoy outdoor activities",
    },
  ];

  return (
    <Card className="shadow-lg border-border rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle>Lifestyle Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                {tip.icon}
                <span className="font-semibold text-foreground">{tip.title}</span>
              </div>
              <p className="text-lg font-bold text-primary">{tip.value}</p>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LifestyleTips;
