import React, { useEffect } from 'react'
import { remark } from 'remark'
// import remarkHtml from 'remark-html/lib'
import remarkHtml from 'remark-html'

const GPTResponseParser = ({ msg }: any) => {
  const convertMarkdownToHTML = (markdown: string) => {
    try {
      const processedHTML = remark()
        .use(remarkHtml)
        .processSync(markdown)
        .toString()
      const parserHtml = processedHTML
        .replace(/&#x3C;/g, '<')
        .replace(/&#x3E;/g, '>')
      return parserHtml
    } catch (error) {
      console.error('Error converting Markdown to HTML:', error)
      return ''
    }
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(msg) }} />
  )
}

export default GPTResponseParser
