type Ad = {
  img_url: string;
};

type AdDisplayProps = {
  currentAd: Ad | undefined;
};

function AdDisplay({ currentAd }: AdDisplayProps) {
  if (!currentAd) {
    return null;
  }

  const isVideo = currentAd.img_url.includes(".mp4");

  return (
    <div className="w-full border-t border-slate-700 bg-black md:w-1/4 md:border-l md:border-t-0">
      {isVideo ? (
        <video
          key={currentAd.img_url}
          src={currentAd.img_url}
          autoPlay
          muted
          className="w-full"
        />
      ) : (
        <img src={currentAd.img_url} className="w-full" />
      )}
    </div>
  );
}

export default AdDisplay;
