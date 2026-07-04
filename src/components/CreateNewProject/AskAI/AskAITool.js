// @desc USE THIS AI ONLY FOR TOOLTIP

// import React, { Component, useEffect } from 'react'
// import AskAI from './AskAI' // Import the functional component
// import { Images } from '../../../theme'
// import ReactDOM from 'react-dom'
// import './AskAi.css'

// export default class AskAiTool {
//   static get toolbox() {
//     return {
//       title: 'Ask AI',
//       icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
//     }
//   }

//   constructor({ data, config, api, readOnly }) {
//     this.api = api
//     this.readOnly = readOnly
//     this.CSS = {
//       wrapper: 'ask-ai-wrapper',
//     }
//     this.data = data
//     this.nodes = {
//       holder: null,
//     }
//   }

//   render() {
//     const rootNode = document.createElement('div')
//     rootNode.setAttribute('class', this.CSS.wrapper)
//     this.nodes.holder = rootNode

//     const onDataChange = (newData) => {
//       this.data = {
//         ...newData,
//       }
//     }
//     ReactDOM.render(
//       <div>
//         <AskAI
//           data={this.data}
//           onDataChange={onDataChange}
//           readOnly={this.readOnly}
//         />
//       </div>,
//       rootNode
//     )
//     console.log('send_icon: ', this.nodes.holder)
//     return this.nodes.holder
//   }

//   save() {
//     return {
//       text: '',
//     }
//   }
// }

// function handleChange(event) {
//   const input = event.target
//   const icon = input.nextElementSibling
//   // Your logic when the input value changes
// }

// function handleIconClick(event) {
//   const icon = event.target
//   icon.textContent = '←'
//   const input = icon.previousElementSibling
//   input.placeholder = 'AI is typing...'
//   // Your logic when the right arrow icon is clicked
// }
