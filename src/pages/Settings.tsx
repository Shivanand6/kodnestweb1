import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  return (
    <div className="flex-1 px-s4 py-s4 max-w-2xl mx-auto w-full">
      <h1 className="mb-s1">Preferences</h1>
      <p className="text-muted-foreground mb-s4">
        Define what you're looking for. Matching logic will be added in the next step.
      </p>

      <div className="flex flex-col gap-s3">
        <Card>
          <CardHeader>
            <CardTitle>Role Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="keywords" className="sr-only">Role keywords</Label>
            <Input id="keywords" placeholder='e.g. "Frontend Engineer", "Product Designer"' />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferred Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="locations" className="sr-only">Locations</Label>
            <Input id="locations" placeholder='e.g. "Bangalore", "Remote — India"' />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="junior">Junior (0–2 yrs)</SelectItem>
                <SelectItem value="mid">Mid (2–5 yrs)</SelectItem>
                <SelectItem value="senior">Senior (5+ yrs)</SelectItem>
                <SelectItem value="lead">Lead / Staff</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
