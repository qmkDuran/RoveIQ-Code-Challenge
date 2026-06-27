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

type LocationListProps = {
  locations: Location[];
  setSelectedLocation: (location: Location) => void;
};

function LocationList({ locations, setSelectedLocation }: LocationListProps) {
  return (
    <div className="max-h-64 w-full overflow-y-scroll border-b border-slate-700 md:max-h-none md:w-1/4 md:border-b-0 md:border-r">
      <h2 className="p-3 text-lg font-bold">Locations</h2>
      {locations.map((location) => (
        <div
          key={location.id}
          onClick={() => setSelectedLocation(location)}
          className="border-b border-slate-800 p-3 hover:bg-slate-800"
        >
          {location.name}
        </div>
      ))}
    </div>
  );
}

export default LocationList;
