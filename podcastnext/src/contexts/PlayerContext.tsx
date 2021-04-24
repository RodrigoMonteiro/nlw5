import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string,


}

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    play: (episode: Episode) => void
    togglePlay: () => void
    playList: (list: Episode[], index) => void
    isPlaying: boolean
    setPlayingState: (state: boolean) => void
    playNext: () => void
    playPrevious: () => void
    hasNext: boolean
    hasPrevious: boolean
    toggleLoop: () => void,
    isLooping: boolean,
    toggleShuffling: () => void
    isShuffling: boolean
    clearPlayerState: () => void
}

//Este valor passado geralmente so é utilizado para dixer o formato os dados  que vamos salvar no contexto
export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)


    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }
    function toggleLoop() {
        setIsLooping(!isLooping)
    }
    function toggleShuffling() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)

    }

    function playNext() {

        if (isShuffling) {

            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        }


        else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)

        }
    }

    function playPrevious() {

        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    function clearPlayerState(){
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling ||  (currentEpisodeIndex + 1) < episodeList.length

    return (

        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            playList,
            play,
            isPlaying,
            playNext,
            playPrevious,
            togglePlay,
            setPlayingState,
            hasNext,
            hasPrevious,
            isLooping,
            toggleLoop,
            toggleShuffling,
            isShuffling,
            clearPlayerState
        }}>
            {children}

        </PlayerContext.Provider>
    )
}
export const usePlayer = () => {
    return useContext(PlayerContext)
}