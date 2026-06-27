import { useEffect, useState } from "react";
import AdDisplay from "./components/AdDisplay";
import LocationDetails from "./components/LocationDetails";
import LocationList from "./components/LocationList";

type Location = {
  id: number;
  name: string;
  description: string;
  address1: string;
  city: string;
  state: string;
  hours: string;
  phone: number;
  url: string;
  banner_img: string;
  logo_img: string;
};

type Ad = {
  id: number;
  img_url: string;
};

function App() {
  const [locations, setLocations] = useState<Location[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>( null );

  const [ads, setAds] = useState<Ad[]>([]);

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const apiUrl = "https://testapi.io/api/ndenlinger/roveiq";

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        setLocations(data.data.locations);
        const allAds = data.data.schedules.flatMap(
          (schedule: { ads: Ad[] }) => {
            return schedule.ads;
          },
        );
        setAds(allAds);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    const adTimer = setInterval(() => {
      if (currentAdIndex === ads.length - 1) {
        setCurrentAdIndex(0);
      } else {
        setCurrentAdIndex(currentAdIndex + 1);
      }
    }, 10000);

    return () => clearInterval(adTimer);
  }, [currentAdIndex, ads]);

  const currentAd = ads[currentAdIndex];

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white md:h-screen md:flex-row">
      <LocationList
        locations={locations}
        setSelectedLocation={setSelectedLocation}
      />
      <LocationDetails selectedLocation={selectedLocation} />
      <AdDisplay currentAd={currentAd} />
    </div>
  );
}

export default App;
