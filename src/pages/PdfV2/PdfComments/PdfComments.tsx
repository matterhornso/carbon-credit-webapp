import React from 'react'
import CommentBoxAccountIcon from '../../../assets/Images/Icons/CommentBoxAccountIcon.svg'
import { useAppSelector } from '../../../hooks/reduxHooks'

interface CommentBoxProps {
  time: string
  comments: string
}

const PdfComments = ({ commentsData }: any) => {
  const commentDatas = useAppSelector(
    ({ pdfComments }) => pdfComments.commentsData
  )

  return (
    <div className="djdjdj">
      {/*{commentDatas &&
        commentDatas?.map((i: any, index: number) => (*/}
      {/*{Array(17)
        .fill(fhghgh)*/}
      {commentDatas &&
        commentDatas?.map((i: any, index: number) => {
          const boundingRect = i?.position?.boundingRect

          // Calculate the position of the comment box
          const top = boundingRect?.y1 || 0
          const left = boundingRect?.x2 || 0
          return (
            <div
              key={index}
              style={{
                position: 'sticky',
                background: 'rgb(222, 235, 255)',
                color: 'rgb(13, 14, 14)',
                padding: '14px 14px 15px 20px',
                borderRadius: '8px',
                width: '300px',
                //top: i?.position?.boundingRect?.x1,
                top: `${top}px`, // Set top position
                left: `${left}px`, // Set left position
                //top: i?.position?.rects[0]?.x1,
                //right: '10px',
              }}
            >
              <CommentBox time={'5: 20 PM Today'} comments={i?.comment?.text} />
            </div>
          )
        })}
    </div>
  )
}

export default PdfComments

export const CommentBox = ({ time, comments }: CommentBoxProps) => {
  return (
    <div style={{ background: '#DEEBFF', color: '#0D0E0E' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          columnGap: 7,
        }}
      >
        <div>
          <img src={CommentBoxAccountIcon} alt="" width={26} height={26} />
        </div>
        <div style={{ fontWeight: 500, fontSize: 16 }}>Registry</div>
      </div>
      <div
        style={{
          fontWeight: 400,
          fontSize: 14,
          color: '#667080',
          paddingTop: 7,
          paddingBottom: 25,
        }}
      >
        {time}
      </div>
      <div style={{ fontWeight: 500, fontSize: 16 }}>{comments}</div>
    </div>
  )
}

const fhghgh = [
  {
    content: {
      text: ' Type Checking for JavaScript',
    },
    position: {
      boundingRect: {
        x1: 255.73419189453125,
        y1: 139.140625,
        x2: 574.372314453125,
        y2: 165.140625,
        width: 809.9999999999999,
        height: 1200,
      },
      rects: [
        {
          x1: 255.73419189453125,
          y1: 139.140625,
          x2: 574.372314453125,
          y2: 165.140625,
          width: 809.9999999999999,
          height: 1200,
        },
      ],
      pageNumber: 1,
    },
    comment: {
      text: 'Flow or TypeScript?',
      emoji: '🔥',
    },
    id: '8245652131754351',
  },
]
