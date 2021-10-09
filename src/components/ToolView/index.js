import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { appStates } from '../../services/appStates'
import styled from 'styled-components'
import Upload from '../Upload'
import Recorder from '../Recorder'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Image = styled.img`
  width: initial;
  height: initial;
  position: absolute;
  opacity: 0;
  pointer-events: none;
`

const ImagePlacer = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 5px;
  background: url(${props => props.src}) no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #1c654c;
`

export default function ToolView() {
  const database_url = appStates(state => state.database_url)
  const [title, setTitle] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [spokenSrc, setSpokenSrc] = useState(null)

  const imageRef = useRef(null)

  const query = useQuery()
  const id = query.get('id')

  const getItem = id => {
    axios
      .get(database_url + '/tools/' + id)
      .then(response => {
        console.log(database_url + '/tools/' + id, response)

        setTitle(response.data.title)
        setImageSrc(response.data.image ? database_url + response.data.image.url : null)
        setSpokenSrc(response.data.spoken ? database_url + response.data.spoken.url : null)
      })
      .catch(error => {
        console.log('e:', error)
      })
  }

  useEffect(() => {
    getItem(id)
  }, [id])

  const onImageUploadReady = () => {
    console.log('onImageUploadReady!')
    getItem(id)
  }

  const onSoundUploadReady = () => {
    console.log('onSoundUploadReady!')
    getItem(id)
  }

  const handleImageLoaded = () => {
    console.log(imageRef.current.clientWidth)
  }

  const toggleImageSelect = () => {}

  console.log(spokenSrc)

  return (
    <>
      {/*<EditableInput currentText={title} itemID={id} />*/}
      <div>{id}</div>
      <div>{title}</div>
      <Image onLoad={handleImageLoaded} ref={imageRef} src={imageSrc} />
      <ImagePlacer src={imageSrc} />

      <Upload itemID={id} active={true} onUploadReady={onImageUploadReady} />
      <Recorder itemID={id} active={true} onUploadReady={onSoundUploadReady} />

      <audio id="audio" controls src={spokenSrc} />
    </>
  )
}
