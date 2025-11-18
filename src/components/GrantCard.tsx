import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import { computeApplicationFee, formatCurrency } from "@/lib/fees";
import { Link } from "react-router-dom";

interface GrantCardProps {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  location: string;
  category: string;
  description: string;
}

const GrantCard = ({ id, title, organization, amount, deadline, location, category, description }: GrantCardProps) => {
  const fee = computeApplicationFee(amount);

  return (
    <Card className="gradient-card shadow-custom-md hover:shadow-custom-lg transition-smooth group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-secondary text-secondary-foreground">{category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            {deadline}
          </div>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription>{organization}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-sm">
            <DollarSign className="mr-1 h-4 w-4 text-secondary" />
            <span className="font-semibold">{amount}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-1">Application fee:</span>
            <span className="font-medium">{formatCurrency(fee)}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-1 h-4 w-4 text-accent" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="default" className="flex-1">
          <Link to={`/grants/${id}`}>View Details</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/apply/${id}`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GrantCard;
