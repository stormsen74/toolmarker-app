import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { appStates } from '../../services/appStates'
import ListItem from './ListItem'

// https://css-tricks.com/a-grid-of-logos-in-squares/

const ListContainer = styled.div`
  position: relative;
  padding: 5px;
  overflow: auto;
  border: 1px solid yellowgreen;
`

export default function List() {
  const database_url = appStates(state => state.database_url)
  const [items, setItems] = useState([])

  const buildList = data => {
    const tempItems = []
    data.forEach(data => {
      tempItems.push({ id: data.id, title: data.title, image: data.image, spoken: data.spoken })
    })

    setItems(tempItems)
  }

  const listItems = () => {
    axios
      .get(database_url + '/tools')
      .then(response => {
        console.log('👍', response)
        buildList(response.data)
      })
      .catch(error => {})
  }

  useEffect(() => {
    listItems()
  }, [])

  const addNew = () => {
    axios
      .post(database_url + '/tools', { title: 'new Tool' })
      .then(response => {
        console.log('add', response)
      })
      .catch(error => {})
  }

  return (
    <>
      <div onClick={addNew}>ADD</div>
      <ListContainer>
        {items.map((item, index) => {
          return <ListItem key={index} item={item} />
        })}
      </ListContainer>
    </>
  )
}
