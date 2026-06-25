type Ad = {
  img_url: string;
};

type AdDisplayProps = {
  ad: Ad | undefined;
};

function AdDisplay({ ad }: AdDisplayProps) {
  if (!ad) {
    return null;
  }

  const isVideo = ad.img_url.endsWith(".mp4");

  return (
    <div className="w-full border-t border-slate-700 bg-black md:w-1/4 md:border-l md:border-t-0">
      {isVideo ? (
        <video src={ad.img_url} autoPlay muted loop className="w-full" />
      ) : (
        <img src={ad.img_url} alt="Advertisement" className="w-full" />
      )}
    </div>
  );
}

export default AdDisplay;
