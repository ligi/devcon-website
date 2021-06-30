import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import IconWatch from 'src/assets/icons/watch.svg'
import { Playlist } from 'src/types/Playlist'
import css from './header.module.scss'

type Props = {
  playlist: Playlist
  className?: string
}

export function PlaylistHeader(props: Props) {
  let className = css['container']
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <div className={css['content-section']}>
        <div className="label">{props.playlist.videoCount ?? 0} talks</div>
        <h2 className="title font-xxl">{props.playlist.title}</h2>
        <p className={css['description']}>{props.playlist.description}</p>
        <p className={css['controls']}>
          <IconWatch /> <span className="bold font-xs">WATCH PLAYLIST</span>
        </p>
        {props.playlist.curators && props.playlist.curators.length > 0 && (
          <>
          <p className="bold font-xs">
            <span className={css['opaque']}>CURATED BY:</span>
          </p>
          <p className="bold font-xs">{props.playlist.curators.map(i => i.name).join(', ').toUpperCase()}</p>
          </>
        )}
      </div>
      <div className={css['image-section']}>
        <img
          src={props.playlist.imageUrl}
          alt={`${props.playlist.title} Devcon playlist`}
          placeholder="blurred"
        />
      </div>
    </div>
  )
}

