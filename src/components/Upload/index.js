import React, { useState } from 'react'
import axios from 'axios'
import { appStates } from '../../services/appStates'
import styled from 'styled-components'

const Select = styled.input`
  font-size: 13px;
  margin-bottom: 10px;
`

const Submit = styled.input`
  font-size: 15px;
  margin-bottom: 10px;
  background-color: darkgreen;
  border: 1px solid orange;
`

export default function Upload({ itemID, active, onUploadReady }) {
  const database_url = appStates(state => state.database_url)
  const [files, setFiles] = useState()

  const uploadFile = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('files', files[0])

    axios
      .post(database_url + '/upload', formData)
      .then(response => {
        console.log('upload ...', database_url, response)

        const imageId = response.data[0].id

        axios
          .put(database_url + '/tools/' + itemID, { image: imageId })
          .then(response => {
            console.log('👍', response)
            onUploadReady()
          })
          .catch(error => {
            console.log('e:', error)
          })
      })
      .catch(error => {
        //handle error
      })
  }

  return (
    active && (
      <form onSubmit={uploadFile}>
        <Select type="file" onChange={e => setFiles(e.target.files)} />
        <Submit type="submit" value="Submit" />
      </form>
    )
  )
}
