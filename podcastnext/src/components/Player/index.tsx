import { useRef, useEffect, useState } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../utils/convetDurationToTimeString'



export default function Player() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0) // Vai armazenar em segundos



    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        toggleShuffling,
        toggleLoop,
        clearPlayerState
    } = usePlayer()


    const episode = episodeList[currentEpisodeIndex]

    useEffect(() => {
        if (!audioRef.current) {
            return
        }
        if (isPlaying) {
            audioRef.current.play()
        }
        else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    function setupProgressListenner() {
        audioRef.current.currentTime = 0

        audioRef.current.addEventListener('timeupdate', () => {  // // Vai disparar varias vezes em quanto nosso aufio estiver tocando
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function HandleSeek(amount: number) {
        audioRef.current.currentTime = amount
        setProgress(amount)

    }

    function handleEpisodeEnded (){
        if (hasNext){
            playNext()
        } else {
            clearPlayerState()
        }
    }
    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/assets/images/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>

            {episode ?
                (
                    <div className={styles.currentEpisode}>
                        <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
                        <strong>{episode.title}</strong>
                        <span>{episode.members}</span>
                    </div>

                ) : (

                    <div className={styles.emptyPlayer}>
                        <strong>Selecione um podcast para ouvir!</strong>

                    </div>

                )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ?
                            (<Slider
                                max={episode.duration}
                                value={progress}
                                onChange={HandleSeek}
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                            ) : (
                                <div className={styles.slider} />
                            )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>


                {episode && (
                    <audio src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        loop={isLooping}
                        onLoadedMetadata={setupProgressListenner} // Dispara assim quando o player conseguiu carregar os dadosdo episodio
                        onEnded={handleEpisodeEnded}
                    />
                )}
                <div className={styles.buttons}>
                    <button type="button"
                        disabled={!episode || episodeList.length === 1}
                        onClick={toggleShuffling}
                        className={isShuffling ? styles.isActive : ''}>
                        <img src="/assets/images/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/assets/images/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} disabled={!episode} onClick={togglePlay}>
                        {isPlaying
                            ?
                            <img src="/assets/images/pause.svg" alt="Pausar" /> :
                            <img src="/assets/images/play.svg" alt="Tocar" />
                        }
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/assets/images/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button type="button" disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? styles.isActive : ''}
                    >
                        <img src="/assets/images/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>

        </div>
    )

}