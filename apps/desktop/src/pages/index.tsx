import { Box } from '@fower/react'
import { useRouter } from 'next/router'

export default function PageHome() {
  const { push } = useRouter()

  return (
    <Box rounded2XL p4 bgWhite h-100vh>
      <Box>gogo</Box>
      <Box>gogo</Box>
      <Box>gogo</Box>
      <Box>gogo</Box>
    </Box>
  )
}
