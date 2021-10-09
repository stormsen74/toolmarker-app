import React, { useState } from 'react'
import AudioReactRecorder, { RecordState } from '../ReactAudioRecorder'
import styled from 'styled-components'
import axios from 'axios'
import { appStates } from '../../services/appStates'

// https://www.npmjs.com/package/audio-react-recorder
// https://github.com/hackingbeauty/react-mic//
// https://github.com/sivaprakashDesingu/react-voice-recorder/blob/master/src/components/Recorder.js
// https://stackoverflow.com/questions/64256382/converting-audio-blob-to-file-for-upload-to-backend-without-saving-it-locally
// https://www.codegrepper.com/code-examples/javascript/axios+file+upload

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default function Recorder() {
  const [recordState, setRecordState] = useState(null)
  const [audioData, setAudioData] = useState(null)
  const database_url = appStates(state => state.database_url)

  const start = () => {
    setRecordState(RecordState.START)
  }

  const pause = () => {
    setRecordState(RecordState.PAUSE)
  }

  const stop = () => {
    setRecordState(RecordState.STOP)
  }

  const onStop = data => {
    setAudioData(data)
    console.log('onStop: audio data', data)
  }

  const uploadFile = async () => {
    const file = new File([audioData.blob], 'recording.wav')

    console.log('audioData.blob', audioData.blob)
    console.log('formData', file)

    const formData = new FormData()
    // formData.append('files', audioData);
    formData.append('files', file)

    axios
      .post(database_url + '/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        const id = response.data[0].id
        // console.log('upload ...', database_url, response, id)

        axios
          .put(database_url + '/tools/1', { spoken: id })
          .then(response => {
            console.log('👍', response)
          })
          .catch(error => {
            console.log('e:', error)
          })
      })
      .catch(error => {
        console.log('uploadError: ', error)
      })
  }

  return (
    <Container>
      <AudioReactRecorder state={recordState} onStop={onStop} backgroundColor="rgb(255,255,255)" />
      <audio id="audio" controls src={audioData ? audioData.url : null} />
      <div>
        <button id="record" onClick={start}>
          Start
        </button>
        <button id="pause" onClick={pause}>
          Pause
        </button>
        <button id="stop" onClick={stop}>
          Stop
        </button>
        <button id="upload" onClick={uploadFile}>
          Upload
        </button>
      </div>
    </Container>
  )
}
