import { commentsCalls } from '../api/commentsCalls.api'
import { ROLES } from '../config/constants.config'
import {
  setComment,
  setSections,
  setSelectedSection,
} from '../redux/Slices/commentsSlice'
import { store } from '../redux/store'
import { getLocalItem } from './Storage'

export const getComments = async () => {
  const userType = getLocalItem('userDetails')?.type

  const sectionIDs = store.getState().comments.sectionIDs
  const project = store.getState().comments.project
  const selectedSectionIndex = store.getState().comments.selectedSectionIndex

  const commentsRes = await Promise.all(
    sectionIDs.map(async (sectionID: any) => {
      if (sectionID) return await getSectionWiseComment(sectionID)
    })
  )

  const sectionsTemp = [
    {
      name: 'Section A',
      id:
        userType === ROLES.VERIFIER
          ? project?.section_a
          : project?.section_a?._id,
      unreadCount: getUnreadCommentCount(commentsRes[0]),
      unreadCommentIDs: getUnreadCommentID(commentsRes[0]),
      comments: commentsRes[0],
    },
    {
      name: 'Section B',
      id:
        userType === ROLES.VERIFIER
          ? project?.section_b
          : project?.section_b?._id,
      unreadCount: getUnreadCommentCount(commentsRes[1]),
      unreadCommentIDs: getUnreadCommentID(commentsRes[1]),
      comments: commentsRes[1],
    },
    {
      name: 'Section C',
      id:
        userType === ROLES.VERIFIER
          ? project?.section_c
          : project?.section_c?._id,
      unreadCount: getUnreadCommentCount(commentsRes[2]),
      unreadCommentIDs: getUnreadCommentID(commentsRes[2]),
      comments: commentsRes[2],
    },
    {
      name: 'Section D',
      id:
        userType === ROLES.VERIFIER
          ? project?.section_d
          : project?.section_d?._id,
      unreadCount: getUnreadCommentCount(commentsRes[3]),
      unreadCommentIDs: getUnreadCommentID(commentsRes[3]),
      comments: commentsRes[3],
    },
    {
      name: 'Section E',
      id:
        userType === ROLES.VERIFIER
          ? project?.section_e
          : project?.section_e?._id,
      unreadCount: getUnreadCommentCount(commentsRes[4]),
      unreadCommentIDs: getUnreadCommentID(commentsRes[4]),
      comments: commentsRes[4],
    },
  ]
  store.dispatch(setSections(sectionsTemp))

  //If already some section selected then setting it as selectedSection in redux
  if (selectedSectionIndex || selectedSectionIndex === 0) {
    store.dispatch(setSelectedSection(sectionsTemp[selectedSectionIndex]))
  } else {
    store.dispatch(setSelectedSection(sectionsTemp[0]))
  }
}

const getSectionWiseComment = async (sectionID: string) => {
  const projectID = store.getState().comments.projectID

  try {
    const urlParam = `?project_id=${projectID}&section_id=${sectionID}`
    const res = await commentsCalls.getComments(urlParam)
    return res?.data
  } catch (err) {
    console.log('Error in  commentsCalls.getComments api ~ ', err)
  }
}

const getUnreadCommentCount = (comments: any) => {
  const user_id = getLocalItem('userDetails')?.user_id

  let count = 0
  if (comments && comments.length) {
    comments.forEach((comment: any) => {
      if (!comment?.read && comment?.from !== user_id) {
        count += 1
      }
    })
  }
  return count
}
const getUnreadCommentID = (comments: any) => {
  const user_id = getLocalItem('userDetails')?.user_id

  const unreadCommentIDs: any = []
  if (comments && comments.length) {
    comments.forEach((comment: any) => {
      if (!comment?.read && comment?.from !== user_id) {
        unreadCommentIDs.push(comment._id)
      }
    })
  }
  return unreadCommentIDs
}

export const sendComment = async () => {
  const comment = store.getState().comments.comment
  const projectID = store.getState().comments.projectID
  const selectedSection = store.getState().comments.selectedSection
  const commentFrom = store.getState().comments.commentFrom
  const commentTo = store.getState().comments.commentTo

  if (!comment) return
  const payload = {
    project_id: projectID,
    section_id: selectedSection?.id,
    comment: comment,
    from: commentFrom,
    to: commentTo,
    read: false,
  }
  try {
    const createCommentRes = await commentsCalls.createComment(payload)
    console.log(createCommentRes)
    if (createCommentRes?.success) {
      getComments()
      store.dispatch(setComment(''))
    }
  } catch (err) {
    console.log('Error in commentsCalls.createComment api ~ ', err)
  }
}

export const markCommentsAsRead = async (commentIDs: any) => {
  const payload = {
    _id: commentIDs,
    read: true,
  }
  try {
    const res = await commentsCalls.updateComment(payload)
    if (res?.success) {
      getComments()
    }
  } catch (e) {
    console.log('Error in commentsCalls.updateComment api ~ ', e)
  }
}
