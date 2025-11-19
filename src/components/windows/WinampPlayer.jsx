import { useState, useEffect, useRef } from 'react'

export function WinampPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [balance, setBalance] = useState(50)
  const [showPlaylist, setShowPlaylist] = useState(true)
  const [showEqualizer, setShowEqualizer] = useState(true)
  const [playMode, setPlayMode] = useState('shuffle') // normal, repeat, shuffle
  const [eqEnabled, setEqEnabled] = useState(true)
  const [eqAuto, setEqAuto] = useState(false)
  const audioRef = useRef(null)

  // Демо-треки
  const [playlist] = useState([
    { id: 1, title: "Llama Whippin' Intro", artist: 'DJ Mike Llama', duration: 5 },
    { id: 2, title: 'Heroines', artist: 'Diablo Swing Orchestra', duration: 322 },
    { id: 3, title: 'We Are Going To Eclecfunk Your...', artist: 'Eclectek', duration: 190 },
    { id: 4, title: 'Seventeen', artist: 'Auto-Pilot', duration: 214 },
  ])

  const [equalizerBands, setEqualizerBands] = useState([
    { freq: '60', value: 0 },
    { freq: '170', value: 0 },
    { freq: '310', value: 0 },
    { freq: '600', value: 0 },
    { freq: '1K', value: 0 },
    { freq: '3K', value: 0 },
    { freq: '6K', value: 0 },
    { freq: '12K', value: 0 },
    { freq: '14K', value: 0 },
    { freq: '16K', value: 0 },
  ])

  const [preamp, setPreamp] = useState(0)

  const currentTrack = playlist[currentTrackIndex] || playlist[0]
  const totalPlaylistTime = playlist.reduce((sum, track) => sum + track.duration, 0)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handleNext = () => {
    let newIndex
    if (playMode === 'shuffle') {
      newIndex = Math.floor(Math.random() * playlist.length)
    } else {
      newIndex = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0
    }
    setCurrentTrackIndex(newIndex)
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play()
      }, 100)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration || 0)
      const handleEnded = () => {
        setIsPlaying(false)
        if (playMode === 'repeat') {
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            setIsPlaying(true)
          }
        } else {
          handleNext()
        }
      }

      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', updateDuration)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
        audio.removeEventListener('ended', handleEnded)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, playMode])

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimeLong = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  const handlePrev = () => {
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1
    setCurrentTrackIndex(newIndex)
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play()
      }, 100)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    const newTime = percent * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, x / rect.width))
    setVolume(Math.round(percent * 100))
  }

  const handleBalanceChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, x / rect.width))
    setBalance(Math.round(percent * 100))
  }

  const handleEqualizerChange = (index, value) => {
    setEqualizerBands(prev => {
      const newBands = [...prev]
      newBands[index] = { ...newBands[index], value: Math.max(-12, Math.min(12, value)) }
      return newBands
    })
  }

  const handlePreampChange = (value) => {
    setPreamp(Math.max(-12, Math.min(12, value)))
  }

  const togglePlayMode = () => {
    const modes = ['normal', 'repeat', 'shuffle']
    const currentModeIndex = modes.indexOf(playMode)
    const nextMode = modes[(currentModeIndex + 1) % modes.length]
    setPlayMode(nextMode)
  }

  // Winamp цветовая схема
  const winampBg = '#1A1A3E' // Темно-фиолетово-синий
  const winampDark = '#0F0F2A'
  const winampGreen = '#00FF00'
  const winampGrey = '#808080'
  const winampButton = '#C0C0C0'
  const winampButtonActive = '#808080'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#ECE9D8',
      fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
      fontSize: 'var(--font-size, 8pt)',
      color: '#000000',
    }}>
      {/* Главное окно Winamp */}
      <div style={{
        width: '275px',
        background: winampBg,
        border: '2px solid',
        borderTopColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderRightColor: '#424142',
        borderBottomColor: '#424142',
        padding: '0',
      }}>
        {/* Заголовок */}
        <div style={{
          height: '14px',
          background: winampDark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: winampGreen,
          fontSize: '9px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          borderBottom: '1px solid #000000',
        }}>
          WINAMP
        </div>

        {/* Основная область */}
        <div style={{
          padding: '4px',
          background: winampBg,
        }}>
          {/* Дисплей и информация */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '4px',
          }}>
            {/* Цифровой дисплей времени */}
            <div style={{
              width: '50px',
              height: '13px',
              background: '#000000',
              border: '1px solid #333333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: winampGreen,
              fontSize: '10px',
              fontFamily: 'monospace',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {formatTimeLong(currentTime)}
            </div>

            {/* Информация о треке */}
            <div style={{
              flex: 1,
              height: '13px',
              background: '#000000',
              border: '1px solid #333333',
              padding: '0 4px',
              display: 'flex',
              alignItems: 'center',
              color: winampGreen,
              fontSize: '8px',
              fontFamily: 'monospace',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}>
              {currentTrack ? `${currentTrack.artist} <${formatTime(currentTrack.duration)}> *** ${currentTrackIndex + 1}. ${currentTrack.title}` : 'No track'}
            </div>
          </div>

          {/* Битрейт и частота */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '4px',
            fontSize: '7px',
            fontFamily: 'monospace',
            color: winampGreen,
          }}>
            <span>192 kbps</span>
            <span>44 kHz</span>
            <span style={{ color: winampGrey }}>mono</span>
            <span style={{ color: winampGreen }}>stereo</span>
          </div>

          {/* Полоса прогресса */}
          <div
            style={{
              height: '9px',
              background: '#000000',
              border: '1px solid #333333',
              position: 'relative',
              cursor: 'pointer',
              marginBottom: '4px',
            }}
            onClick={handleSeek}
          >
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${(currentTime / duration) * 100 || 0}%`,
              background: winampGreen,
            }} />
          </div>

          {/* Слайдеры громкости и баланса */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '4px',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '7px',
                color: winampGreen,
                fontFamily: 'monospace',
                marginBottom: '2px',
              }}>VOL</div>
              <div
                style={{
                  height: '12px',
                  background: '#000000',
                  border: '1px solid #333333',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={handleVolumeChange}
              >
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${volume}%`,
                  background: winampGreen,
                }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '7px',
                color: winampGreen,
                fontFamily: 'monospace',
                marginBottom: '2px',
              }}>BAL</div>
              <div
                style={{
                  height: '12px',
                  background: '#000000',
                  border: '1px solid #333333',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={handleBalanceChange}
              >
                <div style={{
                  position: 'absolute',
                  left: `${balance}%`,
                  top: 0,
                  width: '2px',
                  height: '100%',
                  background: winampGrey,
                }} />
              </div>
            </div>
          </div>

          {/* Кнопки управления */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            marginBottom: '4px',
          }}>
            <button
              onClick={handlePrev}
              style={{
                width: '23px',
                height: '23px',
                background: winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '9px',
                padding: 0,
                fontFamily: 'monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              |◄◄
            </button>
            <button
              onClick={handlePlayPause}
              style={{
                width: '23px',
                height: '23px',
                background: winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '9px',
                padding: 0,
                fontFamily: 'monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              {isPlaying ? '||' : '▶'}
            </button>
            <button
              onClick={handleStop}
              style={{
                width: '23px',
                height: '23px',
                background: winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '9px',
                padding: 0,
                fontFamily: 'monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              ■
            </button>
            <button
              onClick={handleNext}
              style={{
                width: '23px',
                height: '23px',
                background: winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '9px',
                padding: 0,
                fontFamily: 'monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              ►►|
            </button>
            <button
              style={{
                width: '23px',
                height: '23px',
                background: winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '9px',
                padding: 0,
                fontFamily: 'monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              ⏏
            </button>
            <button
              onClick={togglePlayMode}
              style={{
                width: '50px',
                height: '23px',
                background: playMode === 'shuffle' ? winampButtonActive : winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '7px',
                padding: 0,
                fontFamily: 'monospace',
                color: playMode === 'shuffle' ? '#FFFFFF' : '#000000',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              {playMode === 'shuffle' ? 'SHUFFLE' : playMode === 'repeat' ? 'REPEAT' : 'NORMAL'}
            </button>
            <button
              onClick={() => setPlayMode(playMode === 'repeat' ? 'normal' : 'repeat')}
              style={{
                width: '23px',
                height: '23px',
                background: playMode === 'repeat' ? winampButtonActive : winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '9px',
                padding: 0,
                fontFamily: 'monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              ↻
            </button>
          </div>

          {/* Кнопки EQ и PL */}
          <div style={{
            display: 'flex',
            gap: '2px',
          }}>
            <button
              onClick={() => setShowEqualizer(!showEqualizer)}
              style={{
                flex: 1,
                height: '18px',
                background: showEqualizer ? winampButtonActive : winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '8px',
                padding: 0,
                fontFamily: 'monospace',
                color: showEqualizer ? winampGreen : '#000000',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              EQ
            </button>
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              style={{
                flex: 1,
                height: '18px',
                background: showPlaylist ? winampButtonActive : winampButton,
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#424142',
                borderBottomColor: '#424142',
                cursor: 'pointer',
                fontSize: '8px',
                padding: 0,
                fontFamily: 'monospace',
                color: showPlaylist ? winampGreen : '#000000',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderTopColor = '#424142'
                e.currentTarget.style.borderLeftColor = '#424142'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderTopColor = '#FFFFFF'
                e.currentTarget.style.borderLeftColor = '#FFFFFF'
                e.currentTarget.style.borderRightColor = '#424142'
                e.currentTarget.style.borderBottomColor = '#424142'
              }}
            >
              PL
            </button>
          </div>
        </div>
      </div>

      {/* Скрытый аудио элемент */}
      <audio
        ref={audioRef}
        src={currentTrack ? `/music/${currentTrack.id}.mp3` : undefined}
        onError={() => {
          console.log('Audio file not found, using demo mode')
        }}
      />

      {/* Эквалайзер */}
      {showEqualizer && (
        <div style={{
          width: '275px',
          background: winampBg,
          border: '2px solid',
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#FFFFFF',
          borderBottomColor: '#FFFFFF',
          marginTop: '2px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            height: '14px',
            background: winampDark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: winampGreen,
            fontSize: '9px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            borderBottom: '1px solid #000000',
          }}>
            WINAMP EQUALIZER
          </div>
          <div style={{
            padding: '4px',
            background: winampBg,
          }}>
            {/* Кнопки управления */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                <button
                  onClick={() => setEqEnabled(!eqEnabled)}
                  style={{
                    width: '30px',
                    height: '18px',
                    background: eqEnabled ? winampButtonActive : winampButton,
                    border: '1px solid',
                    borderTopColor: '#FFFFFF',
                    borderLeftColor: '#FFFFFF',
                    borderRightColor: '#424142',
                    borderBottomColor: '#424142',
                    cursor: 'pointer',
                    fontSize: '7px',
                    padding: 0,
                    fontFamily: 'monospace',
                    color: eqEnabled ? winampGreen : '#000000',
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderTopColor = '#424142'
                    e.currentTarget.style.borderLeftColor = '#424142'
                    e.currentTarget.style.borderRightColor = '#FFFFFF'
                    e.currentTarget.style.borderBottomColor = '#FFFFFF'
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderTopColor = '#FFFFFF'
                    e.currentTarget.style.borderLeftColor = '#FFFFFF'
                    e.currentTarget.style.borderRightColor = '#424142'
                    e.currentTarget.style.borderBottomColor = '#424142'
                  }}
                >
                  ON
                </button>
                <button
                  onClick={() => setEqAuto(!eqAuto)}
                  style={{
                    width: '30px',
                    height: '18px',
                    background: eqAuto ? winampButtonActive : winampButton,
                    border: '1px solid',
                    borderTopColor: '#FFFFFF',
                    borderLeftColor: '#FFFFFF',
                    borderRightColor: '#424142',
                    borderBottomColor: '#424142',
                    cursor: 'pointer',
                    fontSize: '7px',
                    padding: 0,
                    fontFamily: 'monospace',
                    color: eqAuto ? winampGreen : '#000000',
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderTopColor = '#424142'
                    e.currentTarget.style.borderLeftColor = '#424142'
                    e.currentTarget.style.borderRightColor = '#FFFFFF'
                    e.currentTarget.style.borderBottomColor = '#FFFFFF'
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderTopColor = '#FFFFFF'
                    e.currentTarget.style.borderLeftColor = '#FFFFFF'
                    e.currentTarget.style.borderRightColor = '#424142'
                    e.currentTarget.style.borderBottomColor = '#424142'
                  }}
                >
                  AUTO
                </button>
              </div>
              <button
                style={{
                  width: '50px',
                  height: '18px',
                  background: winampButton,
                  border: '1px solid',
                  borderTopColor: '#FFFFFF',
                  borderLeftColor: '#FFFFFF',
                  borderRightColor: '#424142',
                  borderBottomColor: '#424142',
                  cursor: 'pointer',
                  fontSize: '7px',
                  padding: 0,
                  fontFamily: 'monospace',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.borderTopColor = '#424142'
                  e.currentTarget.style.borderLeftColor = '#424142'
                  e.currentTarget.style.borderRightColor = '#FFFFFF'
                  e.currentTarget.style.borderBottomColor = '#FFFFFF'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.borderTopColor = '#FFFFFF'
                  e.currentTarget.style.borderLeftColor = '#FFFFFF'
                  e.currentTarget.style.borderRightColor = '#424142'
                  e.currentTarget.style.borderBottomColor = '#424142'
                }}
              >
                PRESETS
              </button>
            </div>

            {/* Слайдеры эквалайзера */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              gap: '2px',
              background: '#000000',
              padding: '4px',
              position: 'relative',
            }}>
              {/* Шкала децибел */}
              <div style={{
                position: 'absolute',
                left: '4px',
                top: '4px',
                fontSize: '6px',
                color: winampGreen,
                fontFamily: 'monospace',
                display: 'flex',
                flexDirection: 'column',
                height: '60px',
                justifyContent: 'space-between',
              }}>
                <span>+12</span>
                <span>+0</span>
                <span>-12</span>
              </div>

              {/* PREAMP */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', marginLeft: '20px' }}>
                <div style={{
                  width: '16px',
                  height: '60px',
                  background: '#000000',
                  border: '1px solid #333333',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const y = e.clientY - rect.top
                  const percent = 1 - (y / rect.height)
                  const value = Math.round((percent - 0.5) * 24)
                  handlePreampChange(value)
                }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: '50%',
                    left: 0,
                    right: 0,
                    height: `${Math.max(0, 50 + (preamp * 2.08))}%`,
                    background: preamp > 0 ? winampGreen : preamp < 0 ? '#FF0000' : '#808080',
                    minHeight: preamp !== 0 ? '2px' : '0',
                  }} />
                  {preamp !== 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '2px',
                      height: '2px',
                      background: '#FFFFFF',
                      border: '1px solid #000000',
                    }} />
                  )}
                </div>
                <span style={{ fontSize: '6px', color: winampGreen, fontFamily: 'monospace' }}>PRE</span>
              </div>

              {/* Полосы частот */}
              {equalizerBands.map((band, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <div style={{
                    width: '16px',
                    height: '60px',
                    background: '#000000',
                    border: '1px solid #333333',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const y = e.clientY - rect.top
                    const percent = 1 - (y / rect.height)
                    const value = Math.round((percent - 0.5) * 24)
                    handleEqualizerChange(index, value)
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      bottom: '50%',
                      left: 0,
                      right: 0,
                      height: `${Math.max(0, 50 + (band.value * 2.08))}%`,
                      background: band.value > 0 ? winampGreen : band.value < 0 ? '#FF0000' : '#808080',
                      minHeight: band.value !== 0 ? '2px' : '0',
                    }} />
                    {band.value !== 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '2px',
                        height: '2px',
                        background: '#FFFFFF',
                        border: '1px solid #000000',
                      }} />
                    )}
                  </div>
                  <span style={{ fontSize: '6px', color: winampGreen, fontFamily: 'monospace' }}>{band.freq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Плейлист */}
      {showPlaylist && (
        <div style={{
          width: '275px',
          height: '200px',
          background: winampBg,
          border: '2px solid',
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#FFFFFF',
          borderBottomColor: '#FFFFFF',
          marginTop: '2px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            height: '14px',
            background: winampDark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: winampGreen,
            fontSize: '9px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            borderBottom: '1px solid #000000',
          }}>
            WINAMP PLAYLIST
          </div>
          <div style={{
            flex: 1,
            overflow: 'auto',
            background: '#000000',
            padding: '2px',
            color: winampGreen,
            fontSize: '8px',
            fontFamily: 'monospace',
          }}>
            {playlist.map((track, index) => (
              <div
                key={track.id}
                onClick={() => {
                  setCurrentTrackIndex(index)
                  if (isPlaying && audioRef.current) {
                    audioRef.current.load()
                    audioRef.current.play()
                  }
                }}
                style={{
                  padding: '2px 4px',
                  cursor: 'pointer',
                  background: index === currentTrackIndex ? '#000080' : 'transparent',
                  color: index === currentTrackIndex ? '#FFFFFF' : winampGreen,
                }}
                onMouseEnter={(e) => {
                  if (index !== currentTrackIndex) {
                    e.currentTarget.style.background = '#333333'
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentTrackIndex) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {index + 1}. {track.artist} - {track.title} ({formatTime(track.duration)})
              </div>
            ))}
          </div>
          {/* Нижняя панель плейлиста */}
          <div style={{
            height: '50px',
            background: winampBg,
            borderTop: '1px solid #000000',
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {['ADD', 'REM', 'SEL', 'MISC'].map((label) => (
                  <button
                    key={label}
                    style={{
                      width: '35px',
                      height: '16px',
                      background: winampButton,
                      border: '1px solid',
                      borderTopColor: '#FFFFFF',
                      borderLeftColor: '#FFFFFF',
                      borderRightColor: '#424142',
                      borderBottomColor: '#424142',
                      cursor: 'pointer',
                      fontSize: '7px',
                      padding: 0,
                      fontFamily: 'monospace',
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.borderTopColor = '#424142'
                      e.currentTarget.style.borderLeftColor = '#424142'
                      e.currentTarget.style.borderRightColor = '#FFFFFF'
                      e.currentTarget.style.borderBottomColor = '#FFFFFF'
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.borderTopColor = '#FFFFFF'
                      e.currentTarget.style.borderLeftColor = '#FFFFFF'
                      e.currentTarget.style.borderRightColor = '#424142'
                      e.currentTarget.style.borderBottomColor = '#424142'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div style={{
                fontSize: '7px',
                color: winampGreen,
                fontFamily: 'monospace',
              }}>
                {formatTime(currentTime)}/{formatTime(totalPlaylistTime)}
              </div>
              <div style={{
                fontSize: '7px',
                color: winampGreen,
                fontFamily: 'monospace',
              }}>
                {formatTimeLong(currentTime)}
              </div>
              <button
                style={{
                  width: '50px',
                  height: '16px',
                  background: winampButton,
                  border: '1px solid',
                  borderTopColor: '#FFFFFF',
                  borderLeftColor: '#FFFFFF',
                  borderRightColor: '#424142',
                  borderBottomColor: '#424142',
                  cursor: 'pointer',
                  fontSize: '7px',
                  padding: 0,
                  fontFamily: 'monospace',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.borderTopColor = '#424142'
                  e.currentTarget.style.borderLeftColor = '#424142'
                  e.currentTarget.style.borderRightColor = '#FFFFFF'
                  e.currentTarget.style.borderBottomColor = '#FFFFFF'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.borderTopColor = '#FFFFFF'
                  e.currentTarget.style.borderLeftColor = '#FFFFFF'
                  e.currentTarget.style.borderRightColor = '#424142'
                  e.currentTarget.style.borderBottomColor = '#424142'
                }}
              >
                LIST OPTS
              </button>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2px',
            }}>
              {['|◄◄', '▶', '||', '■', '►►|'].map((symbol, idx) => (
                <button
                  key={idx}
                  onClick={idx === 0 ? handlePrev : idx === 1 ? handlePlayPause : idx === 2 ? handlePlayPause : idx === 3 ? handleStop : handleNext}
                  style={{
                    width: '23px',
                    height: '16px',
                    background: winampButton,
                    border: '1px solid',
                    borderTopColor: '#FFFFFF',
                    borderLeftColor: '#FFFFFF',
                    borderRightColor: '#424142',
                    borderBottomColor: '#424142',
                    cursor: 'pointer',
                    fontSize: '8px',
                    padding: 0,
                    fontFamily: 'monospace',
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderTopColor = '#424142'
                    e.currentTarget.style.borderLeftColor = '#424142'
                    e.currentTarget.style.borderRightColor = '#FFFFFF'
                    e.currentTarget.style.borderBottomColor = '#FFFFFF'
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderTopColor = '#FFFFFF'
                    e.currentTarget.style.borderLeftColor = '#FFFFFF'
                    e.currentTarget.style.borderRightColor = '#424142'
                    e.currentTarget.style.borderBottomColor = '#424142'
                  }}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
