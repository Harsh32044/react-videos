import ListItem from "./ListItem";

export default function Playlist({ videos, onSelectVideo, onChangeOrder }) {
  return (
    <>
    <header className="font-semibold text-lg">Current Queue</header>
    <div className="max-h-[30rem] overflow-y-scroll scroll-smooth scroll-my-2">        
      <ul>
        {videos.map((video) => (
          <li key={video.id} className=" transition-all duration-150 ease-in-out rounded-lg">
            <ListItem
              video={video}
              videos={videos}
              onSelectVideo={onSelectVideo}
            />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
