import {createContext}from 'react'


type Episode= {
    title : string,
    members : string,
    thumbnail: string,
    duration: number,
    url: string,


}

type PlayerContextData ={
    episodeList: Episode[],
    currentEpisodeIndex: number,
    play: (episode: Episode) => void
    togglePlay: () => void
    isPlaying: boolean
    setPlayingState: (state: boolean) => void
}

//Este valor passado geralmente so é utilizado para dixer o formato os dados  que vamos salvar no contexto
export const PlayerContext = createContext({} as PlayerContextData)