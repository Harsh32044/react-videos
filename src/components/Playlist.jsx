import ListItem from "./ListItem";

export default function Playlist({ videos, onSelectVideo, onChangeOrder }) {
  return (
    <div>
      <ul>
        {videos.map((video) => (
          <li key={video.id} className=" transition-all duration-150 ease-in-out hover:shadow-slate-400 hover:shadow-2xl rounded-lg">
            <ListItem
              video={video}
              videos={videos}
              onSelectVideo={onSelectVideo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
