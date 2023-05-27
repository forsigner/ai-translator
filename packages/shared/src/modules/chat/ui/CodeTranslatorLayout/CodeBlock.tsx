import { StreamLanguage } from '@codemirror/language'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'bone-ui'
import { FowerHTMLProps } from '@fower/core'
import { go } from '@codemirror/legacy-modes/mode/go'
import { Box } from '@fower/react'
import { duotoneLight } from '@uiw/codemirror-theme-duotone'
import { useCodeMirror } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { FC, useEffect, useRef, useState } from 'react'
import { IconCopy, useCopyToClipboard } from '@ai-translator/widgets'

interface Props extends Omit<FowerHTMLProps<'div'>, 'children' | 'onChange'> {
  code: string
  editable?: boolean
  onChange?: (value: string) => void
}

export const CodeBlock: FC<Props> = ({ code, editable = false, onChange = () => {}, ...rest }) => {
  const { copy } = useCopyToClipboard()
  const [copyTips, setCopyTips] = useState('Copy')

  const extensions = [javascript(), StreamLanguage.define(go)]

  const editor = useRef<HTMLDivElement | null>(null)
  const { setContainer } = useCodeMirror({
    editable,
    readOnly: !editable,
    container: editor.current,
    extensions,
    value: code,
    // theme: githubLight,
    // theme: githubDark,
    // theme: tokyoNight,
    // theme: dracula,
    theme: duotoneLight,
    // theme: materialLight,
    minHeight: '460px',
    style: {
      background: 'white',
      overflow: 'hidden',
    },
    onChange: (value) => onChange(value),
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [editor, setContainer])

  return (
    <Box relative flex-1 {...rest}>
      <Tooltip placement="top">
        <TooltipTrigger>
          <Button
            size={24}
            p1
            zIndex-1
            absolute
            right2
            top2
            variant="ghost"
            colorScheme="gray500"
            icon={<IconCopy gray600 strokeWidth={1} />}
            onClick={() => {
              copy(code)
              setCopyTips('Copied')
            }}
          />
        </TooltipTrigger>
        <TooltipContent>{copyTips}</TooltipContent>
      </Tooltip>
      <Box
        ref={editor}
        css={{
          '.cm-editor': {
            outline: 'none',
            py: 12,
            backgroundColor: 'transparent !important',
          },
          '.cm-gutters': {
            backgroundColor: 'transparent !important',
          },
        }}
      />
    </Box>
  )
}
