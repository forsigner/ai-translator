import React, { useState, useEffect } from 'react'
import { Text } from 'ink'

type Props = {
  input: string[]
}

export default function App({ input = [] }: Props) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => previousCounter + 1)
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Text>
      Hello, <Text color="green">{input[0]}</Text>
      <Text color="green">{counter} tests passed</Text>;
    </Text>
  )
}
