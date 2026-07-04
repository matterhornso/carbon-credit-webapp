import ReactDOM from 'react-dom'
import React from 'react'
import AiOptions from './AiOptions'
import AIBlockTuneComp from './AIBlockTuneComp'
import './AskAi.css'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { setSectionIndex } from '../../../redux/Slices/CreateNewProject/createNewProjectSectionSlice'
import { setLocalItem, setLocalItemForAi } from '../../../utils/Storage'

export class disableAiBlockTune {
  static get isTune() {
    return true
  }
  constructor({ api, data, block }) {
    this.api = api
    this.data = data
    //this.config = config
    this.block = block
    this.nodes = {} // Initialize this.nodes
  }

  render() {
    const rootNode = document.createElement('div')
    rootNode.setAttribute('class', 'somethinglll')
    this.nodes.holder = rootNode
    rootNode.style.display = 'none'
    return rootNode
  }

  save() {
    return {
      val: false,
    }
  }
}
