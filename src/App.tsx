import { useEffect, useState } from "react";
import AdDisplay from "./components/AdDisplay";

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
      <div className="max-h-64 w-full overflow-y-scroll border-b border-slate-700 md:max-h-none md:w-1/4 md:border-b-0 md:border-r">
        <h2 className="p-3 text-lg font-bold">Locations</h2>
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => setSelectedLocation(location)}
            className="cursor-pointer border-b border-slate-800 p-3 hover:bg-slate-800"
          >
            {location.name}
          </div>
        ))}
      </div>

      <div className="w-full overflow-y-auto p-6 md:w-1/2">
        {selectedLocation ? (
          <>
            <div className="pb-5">
              <div>
                <img
                  className="w-full rounded-lg"
                  src={selectedLocation.banner_img}
                  alt={selectedLocation.name}
                />
              </div>
            </div>

            <div className="pb-5">
              <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
                <div className="flex justify-center">
                  <img
                    className="w-24"
                    src={selectedLocation.logo_img}
                    alt={selectedLocation.name}
                  />
                </div>

                <div className="flex justify-center">
                  <h2>{selectedLocation.name}</h2>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 p-4">
              <p>{selectedLocation.description}</p>
              <br />
              <p>{`${selectedLocation.address1}, ${selectedLocation.city}, ${selectedLocation.state}`}</p>
              <br />
              <p>{selectedLocation.hours}</p>
              <br />
              <p>{selectedLocation.url}</p>
            </div>
          </>
        ) : (
          <p>Select a location</p>
        )}
      </div>
      <AdDisplay ad={currentAd} />
    </div>
  );
}

export default App;
