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

type LocationDetailsProps = {
  selectedLocation: Location | null;
};

function LocationDetails({ selectedLocation }: LocationDetailsProps) {
  if (!selectedLocation) {
    return (
      <div className="w-full overflow-y-auto p-6 md:w-1/2">
        <p>Select a location</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto p-6 md:w-1/2">
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

      <div className="rounded-lg border border-slate-700 p-4 text-center">
        <p>{selectedLocation.description}</p>
        <br />
        <p>{`${selectedLocation.address1}, ${selectedLocation.city}, ${selectedLocation.state}`}</p>
        <br />
        <p>{selectedLocation.hours}</p>
        <br />
        <p>{selectedLocation.url}</p>
      </div>
    </div>
  );
}

export default LocationDetails;
