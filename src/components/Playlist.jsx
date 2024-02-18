import ListItem from "./ListItem";

export default function Playlist({ videos, onSelectVideo }) {
  return (
    <div>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
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
