import OpenAI from 'openai'
import { openai } from './config'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

// export const gptAssistanceHelpers = () => {
// Create an assistant
export async function initChatBot() {
  return await openai.beta.assistants.create({
    name: 'carbon credit consultant ver 2',
    instructions: '',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4-1106-preview',
  })
}

// retrieve existing assistance
export async function retrieveAssistant(assistantId: string) {
  return await openai.beta.assistants.retrieve(assistantId)
}

// create thread
export async function createNewThread() {
  return await openai.beta.threads.create()
}

export async function retrieveThreadConversation(threadId: string) {
  return await openai.beta.threads.retrieve(threadId)
}

export const createMessage = async (threadId: any, contentObj: any) => {
  return await openai.beta.threads.messages.create(threadId, contentObj)
}

export const createAssistantRun = async (
  threadId: string,
  assistant_id: any
) => {
  return await openai.beta.threads.runs.create(threadId, assistant_id)
}

export const checkRunStatus = async (threadId: string, runId: string) => {
  return await openai.beta.threads.runs.retrieve(threadId, runId)
}

export const assistantResponse = async (threadId: string) => {
  return await openai.beta.threads.messages.list(threadId)
}

// ---------------------------- GPT assistance utility function --------------------------
export const updateInternalConversationMsgIds = (
  selectedSectionForGenerateProjectWithAI: any,
  passMsgToThreadId: string,
  internalConversationMsgIds: any
) => {
  const label = selectedSectionForGenerateProjectWithAI?.label

  if (!label) {
    console.error('Selected section label is missing')
    return internalConversationMsgIds // Return the original state
  }

  const existingIds = internalConversationMsgIds[label] || []

  const updatedInternalConversationMsgIds = {
    ...internalConversationMsgIds,
    [label]: [...existingIds, passMsgToThreadId],
  }

  return updatedInternalConversationMsgIds
}

export const getPromptForSubSectionOnePointOne = (projectIntroObj: any) => {
  const name = projectIntroObj?.name?.data || '-'
  const sectoral_scope = projectIntroObj?.sectoral_scope?.toString() || '-'
  const scale = projectIntroObj?.scale || '-'
  const location = projectIntroObj?.location?.data || '-'
  const area = projectIntroObj?.area?.data || '-'
  const startDate = projectIntroObj?.start_date || '-'
  const duration =
    `Starts from ${projectIntroObj?.duration?.from} to ${projectIntroObj?.duration?.to}` ||
    '-'
  return `help me complete section 1.1 that is “Summary Description of the Project” for my project with below basic details: project name: ${name} project sectoral scope: ${sectoral_scope}  scale: ${scale} project location: ${location} project area: ${area} start date: ${startDate} duration: ${duration}`
}

export const convertMarkdownToHTML = (markdown: string) => {
  try {
    const processedHTML = remark()
      .use(remarkHtml)
      .processSync(markdown)
      .toString()
    const parserHtml = processedHTML
      .replace(/&#x3C;/g, '<')
      .replace(/&#x3E;/g, '>')
    console.log('parserHtml', typeof parserHtml, parserHtml)
    return parserHtml
  } catch (error) {
    console.error('Error converting Markdown to HTML:', error)
    return ''
  }
}
