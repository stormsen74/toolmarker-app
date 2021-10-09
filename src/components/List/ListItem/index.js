import React, { useState } from 'react'
import styled from 'styled-components'
import { appStates } from 'services/appStates'
import { useHistory } from 'react-router-dom'

const FlexRow = styled.div`
  display: flex;
  //align-items: center;
  justify-content: center;
`

const FlexColumn = styled.div`
  display: flex;
  padding: 5px;
  color: rgb(204, 204, 204);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #606060;
`

export const ImageIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background: url(${props => props.src}) no-repeat;
  background-size: cover;
  background-color: darkgreen;
`

const Title = styled.div`
  text-align: center;
  color: rgba(204, 204, 204, 0.71);
  font-size: 18px;
`

export default function ListItem({ item }) {
  const database_url = appStates(state => state.database_url)
  const { id, title, image, spoken } = item
  const src = image !== null ? database_url + image.url : null
  const [selectImageActive, setSelectImageActive] = useState(false)
  const history = useHistory()

  const toggleImageSelect = () => {
    setSelectImageActive(!selectImageActive)
  }

  const onSelect = () => {
    history.push('/tool?id=' + id)
  }

  return (
    <>
      <Title>{title}</Title>
      <FlexRow onClick={onSelect}>
        <FlexColumn>
          <ImageIcon onClick={toggleImageSelect} src={src} />
        </FlexColumn>
        <FlexColumn>
          <div>{'id:' + id}</div>
          <div>{'edit'}</div>
        </FlexColumn>
      </FlexRow>
    </>
  )
}
