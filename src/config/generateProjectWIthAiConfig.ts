import moment from 'moment'
import { getPromptForSubSectionOnePointOne } from '../utils/gptAssistant/gptAssistant.util'

export const SECTION_LIST: any = [
  {
    value: '1.1 Summary Description of the Project',
    label: '1.1',
  },
  { value: '1.2 Audit History', label: '1.2' },
  { value: '1.3 Sectoral Scope and Project Type', label: '1.3' },
  { value: '1.4 Project Eligibility', label: '1.4' },
  { value: '1.5 Project Design', label: '1.5' },
  { value: '1.6 Project Proponent', label: '1.6' },
  { value: '1.7 Other Entities Involved in the Project', label: '1.7' },
  { value: '1.8 Ownership', label: '1.8' },
  { value: '1.9 Project Start Date', label: '1.9' },
  { value: '1.10 Project Crediting Period', label: '1.10' },
  {
    value:
      '1.11 Project Scale and Estimated GHG Emission Reductions or Removals',
    label: '1.11',
  },
  { value: '1.12 Description of Project Activity', label: '1.12' },
  { value: '1.13 Project Location', label: '1.13' },
  { value: '1.14 Conditions Prior to Project Initiation', label: '1.14' },
  {
    value:
      '1.15 Compliance with Laws, Statutes and Other Regulatory Frameworks',
    label: '1.15',
  },
  {
    value: '1.16 Double Counting and Participation under other GHG Programs',
    label: '1.16',
  },
  {
    value: '1.17 Double Claiming, Other Forms of Credit, and Scope 3 Emissions',
    label: '1.17',
  },
  { value: '1.18 Sustainable Development Contributions', label: '1.18' },
  {
    value: '1.19 Additional Information relevant to the project',
    label: '1.19',
  },
]

export const COMPILE_SUB_SECTION_DATA_PROMPT = `Deliver the output containing only the necessary and relevant compiled data. Make sure there are no additional comments or instructions preceding or following the final output. Exclude the section number or section title from the final response.`

export const SUB_SECTION_ASSISTANCE_CONFIG: any = {
  '1.1': {
    assistantId: 'asst_jQQsBUa8XIMRL5HMZlVRNFkI',
    assistantMsgToBeLoaded: (projectIntroObj: any) => {
      return getPromptForSubSectionOnePointOne(projectIntroObj)
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.2': {
    assistantId: 'asst_LwdBAzXokNaGg9Wb3MhQfiNg',
    assistantMsgToBeLoaded: () => {
      return 'Give me the content for audit history'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.3': {
    assistantId: 'asst_XxyHukFWMfSa8ebMurMN1nu6',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.4': {
    assistantId: 'asst_gLtv7xvrSbB7iJvDMPXtSgeq',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.5': {
    assistantId: 'asst_bGXPdXuYNsbztmeIHA01jMHR',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.6': {
    assistantId: 'asst_B43cF7aARjdvtgxzcktgHWZF',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.7': {
    assistantId: 'asst_SQeu0zXcOBJ87luBlTviXzqX',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.8': {
    assistantId: 'asst_sKM1xEV0iBsWtr9nY72X4Bfh',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.9': {
    assistantId: 'asst_Loe6vIZe0V6zRFmE2qrUGBiO',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.10': {
    assistantId: 'asst_68DjhVBmr7t6ns1dns8nBKk3',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.11': {
    assistantId: 'asst_PrvmYZjXxpTzYC6MNn95DTWT',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.12': {
    assistantId: 'asst_bVh66UnqQEet6zXtdcIw5B7n',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
    // assistantMsgToBeLoaded,
  },
  '1.13': {
    assistantId: 'asst_jS7ZYWyrrWlm8i1Jsuvud1sW',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.14': {
    assistantId: 'asst_HsKUnAMKxQNPguLpjUchL5SW',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.15': {
    assistantId: 'asst_ezGf4Dt8GC4hZysoMBjQeCDC',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.16': {
    assistantId: 'asst_jFGmhOnddGZZDnmybmgZ4bke',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.17': {
    assistantId: 'asst_hpjFRvz5TWhsdmeoaWbG8lfG',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.18': {
    assistantId: 'asst_9nkhXHvHbLMDX5UW9DqP6bXU',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
  '1.19': {
    assistantId: 'asst_ByBi5bYMUSaDTwPNVwAdvEaI',
    assistantMsgToBeLoaded: () => {
      return 'Lets Start.'
    },
    asstCompilePrompt: () => {
      return COMPILE_SUB_SECTION_DATA_PROMPT
    },
  },
}

export const QUICK_REPLIES = [
  {
    label: 'Give detailed description',
    prompt: 'Give detailed description on the previous response',
  },
  {
    label: 'Improve writing',
    prompt: 'Improve writing for the previous message',
  },
  { label: 'Summarise', prompt: 'Summarise the previous response' },
]
