import { useEffect, useRef, useState } from 'react'

const heightToNumber = (str: string): number => {
  return +str.replace('px', '')
}

const calculateRows = (textarea: HTMLTextAreaElement | null): number => {
  if (!textarea) return 0

  const style = getComputedStyle(textarea)
  const lineHeight = heightToNumber(style.lineHeight)
  const paddingY = heightToNumber(style.paddingTop) + heightToNumber(style.paddingBottom)
  const textareaHeight = textarea.scrollHeight

  return Math.floor((textareaHeight - paddingY) / lineHeight)
}

function TextAreaWithDynamicRows() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [rows, setRows] = useState(0)

  useEffect(() => {
    setRows(calculateRows(textareaRef.current))
  }, [])

  const handleInput = () => {
    setRows(calculateRows(textareaRef.current))
  }

  return (
    <>
      <div>普通の</div>
      <textarea style={{ width: '50%', lineHeight: '1.2' }}>あいうえお</textarea>

      <div>自動調整</div>
      <textarea ref={textareaRef} rows={rows} onInput={handleInput} style={{ width: '50%', lineHeight: '1.2' }}>
        あいうえお
      </textarea>
    </>
  )
}

function Main() {
  return (
    <div style={{ width: '100vw', height: '100vh', padding: '50px' }}>
      <TextAreaWithDynamicRows />
    </div>
  )
}

export default Main
