import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { appStates } from 'services/appStates'

export default function EditableInput({ currentText, itemID }) {
  const database_url = appStates(state => state.database_url)

  const inputRef = useRef(null)
  const [inputVisible, setInputVisible] = useState(false)
  const [text, setText] = useState(currentText)

  const updateTextValue = () => {
    axios.put(database_url + '/tools/' + itemID, { title: text }).then(response => {
      console.log('h!', response)
    })
  }

  function onClickOutSide(e) {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false) // Disable text input
    }

    updateTextValue()
  }

  useEffect(() => {
    if (inputVisible) {
      document.addEventListener('mousedown', onClickOutSide)
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutSide)
    }
  })

  return (
    <>
      {inputVisible ? (
        <input
          ref={inputRef}
          value={text}
          onChange={e => {
            setText(e.target.value)
          }}
        />
      ) : (
        <span onClick={() => setInputVisible(true)}>{text}</span>
      )}
    </>
  )
}
