import { atom } from 'recoil'
import data from './assets/videos.json'

const videosAtom = atom({
    key:'videosAtom',
    default: data.videos
})

const selectedVideoAtom = atom({
    key: 'selectedVideo',
    default: data.videos[0]
})

export {videosAtom, selectedVideoAtom}