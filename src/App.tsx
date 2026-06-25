import { useEffect, useState } from "react";

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

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const [ads, setAds] = useState<Ad[]>([]);

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Fetch data and added error handlers
  useEffect(() => {
    async function getRoveIQData() {
      const url = "https://testapi.io/api/ndenlinger/roveiq";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        setLocations(result.data.locations);

        const allAds = result.data.schedules.flatMap(
          (schedule: { ads: Ad[] }) => schedule.ads,
        );
        setAds(allAds);
      } catch (error) {
        console.error(error);
      }
    }

    getRoveIQData();
  }, []);

  // Timer for slideshow
  useEffect(() => {
    if (ads.length === 0) return;

    const intervalId = setInterval(() => {
      if (currentAdIndex === ads.length - 1) {
        setCurrentAdIndex(0);
      } else {
        setCurrentAdIndex(currentAdIndex + 1);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentAdIndex, ads]);

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <div className="w-1/4 border-r border-slate-700 overflow-y-auto">
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

      <div className="w-1/2 p-6 overflow-y-auto">
        <div className="pb-5">
          {selectedLocation ? (
            <div>
              <img
                className="w-full rounded-lg"
                src={selectedLocation.banner_img}
              />
            </div>
          ) : null}
        </div>
        <div className="pb-5">
          {selectedLocation ? (
            <div className="grid grid-cols-2 items-center">
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
          ) : null}
        </div>
        <div>
          {selectedLocation ? (
            <div className="rounded-lg border border-slate-700 p-4">
              <p>{selectedLocation.description}</p>
              <br />
              <p>
                {`${selectedLocation.address1}, ${selectedLocation.city}, ${selectedLocation.state}`}
              </p>
              <br />
              <p>{selectedLocation.hours}</p>
              <br />
              <p>{selectedLocation.url}</p>
            </div>
          ) : (
            <p>Select a location</p>
          )}
        </div>
      </div>

      <div className="w-1/4 border-l border-slate-700 bg-black">
        {ads.length > 0 &&
          (ads[currentAdIndex].img_url.endsWith(".mp4") ? (
            <video
              src={ads[currentAdIndex].img_url}
              autoPlay
              muted
              loop
              className="w-full"
            />
          ) : (
            <img
              src={ads[currentAdIndex].img_url}
              alt="Advertisement"
              className="w-full"
            />
          ))}
      </div>
    </div>
  );
}

export default App;
