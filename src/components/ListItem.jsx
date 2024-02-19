export default function ListItem({video, videos, onSelectVideo}) {
    return (
        <div className="grid grid-cols-2 gap-3 cursor-pointer items-center py-4" onClick={() => {
            const currVideoSelected = videos.filter(vid => vid.id === video.id)
            onSelectVideo(currVideoSelected[0])
        }}>
            <img src={video.thumbnailUrl} alt="" className="rounded-lg aspect-video object-cover"/>
            <div className="flex flex-col justify-between">
                <div className="font-bold text-sm">{video.title}</div>
                <div className="text-xs">{video.author}</div>
                <div className="text-xs">{video.views} views | {video.uploadTime}</div>
            </div>
        </div>
    )
}