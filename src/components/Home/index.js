import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory()
  return (
    <>
      <div
        onClick={() => {
          history.push('/List')
        }}
      >
        List
      </div>
      <div
        onClick={() => {
          history.push('/Recorder')
        }}
      >
        Recorder
      </div>
    </>
  )
}
