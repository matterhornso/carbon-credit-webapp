// /**
//  * Build styles
//  */
// import React from 'react'
// import './index.css'
// import { IconMarker } from '@codexteam/icons'
// import AiOptions from './AiOptions'
// import ReactDOM from 'react-dom'
// import AskAI from './AskAI'

// /**
//  * Marker Tool for the Editor.js
//  *
//  * Allows to wrap inline fragment and style it somehow.
//  */
// export default class AskAiTooltip {
//   /**
//    * Class name for term-tag
//    *
//    * @type {string}
//    */
//   static get CSS() {
//     return 'cdx-marker'
//   }

//   /**
//    * @param {{api: object}}  - Editor.js API
//    */
//   constructor({ api }) {
//     this.api = api

//     /**
//      * Toolbar Button
//      *
//      * @type {HTMLElement|null}
//      */
//     this.button = null

//     /**
//      * Tag represented the term
//      *
//      * @type {string}
//      */
//     this.tag = 'MARK'

//     /**
//      * CSS classes
//      */
//     this.iconClasses = {
//       base: this.api.styles.inlineToolButton,
//       active: this.api.styles.inlineToolButtonActive,
//     }
//   }

//   /**
//    * Specifies Tool as Inline Toolbar Tool
//    *
//    * @return {boolean}
//    */
//   static get isInline() {
//     return true
//   }

//   /**
//    * Create button element for Toolbar
//    *
//    * @return {HTMLElement}
//    */
//   //render() {
//   //  this.button = document.createElement('button')
//   //  this.button.type = 'button'
//   //  this.button.classList.add(this.iconClasses.base)
//   //  this.button.innerHTML = this.toolboxIcon
//   //  //const rootNode = document.createElement('div')
//   //  //rootNode.setAttribute('class', this.CSS.wrapper)
//   //  //const parentDiv = this.button
//   //  //this.nodes.holder = parentDiv
//   //  // Create a div element to be used as a wrapper
//   //  const wrapperDiv = document.createElement('div')
//   //  // Append the button to the wrapper div
//   //  wrapperDiv.appendChild(this.button)

//   //  // Now you can use the wrapperDiv as needed, for example, appending it to the document body or another element
//   //  document.body.appendChild(wrapperDiv) //

//   //  ReactDOM.render(<AiOptions />, wrapperDiv)
//   //  return wrapperDiv
//   //}

//   render() {
//     this.button = document.createElement('button')
//     this.button.type = 'button'
//     this.button.classList.add(this.iconClasses.base)
//     this.button.innerHTML = this.toolboxIcon

//     // Create a div element to be used as a wrapper
//     const wrapperDiv = document.createElement('div')
//     // Append the button to the wrapper div
//     wrapperDiv.appendChild(this.button)
//     wrapperDiv.setAttribute('class', 'tooltip_wrapper_position')
//     // Add a click event listener to the button
//     this.button.addEventListener('click', () => {
//       // Render the AiOptions component inside the wrapperDiv when the button is clicked
//       ReactDOM.render(<AiOptions />, wrapperDiv)
//     })

//     return wrapperDiv
//   }

//   //renderSettings() {
//   //  const rootNode = document.createElement('div')
//   //  rootNode.setAttribute('class', this.CSS.wrapper)
//   //  this.nodes.holder = rootNode

//   //  const onDataChange = (newData) => {
//   //    this.data = {
//   //      ...newData,
//   //    }
//   //  }
//   //  ReactDOM.render(
//   //    <div>
//   //      <AskAI
//   //        data={this.data}
//   //        onDataChange={onDataChange}
//   //        readOnly={this.readOnly}
//   //      />
//   //    </div>,
//   //    rootNode
//   //  )
//   //  console.log('send_icon: ', this.nodes.holder)
//   //  return this.nodes.holder
//   //}

//   /**
//    * Wrap/Unwrap selected fragment
//    *
//    * @param {Range} range - selected fragment
//    */
//   surround(range) {
//     if (!range) {
//       return
//     }

//     let termWrapper = this.api.selection.findParentTag(
//       this.tag,
//       AskAiTooltip.CSS
//     )

//     /**
//      * If start or end of selection is in the highlighted block
//      */
//     if (termWrapper) {
//       this.unwrap(termWrapper)
//     } else {
//       this.wrap(range)
//     }
//   }

//   /**
//    * Wrap selection with term-tag
//    *
//    * @param {Range} range - selected fragment
//    */
//   wrap(range) {
//     /**
//      * Create a wrapper for highlighting
//      */
//     let marker = document.createElement(this.tag)

//     marker.classList.add(AskAiTooltip.CSS)

//     /**
//      * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
//      * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
//      *
//      * // range.surroundContents(span);
//      */
//     marker.appendChild(range.extractContents())
//     range.insertNode(marker)

//     /**
//      * Expand (add) selection to highlighted block
//      */
//     this.api.selection.expandToTag(marker)
//   }

//   /**
//    * Unwrap term-tag
//    *
//    * @param {HTMLElement} termWrapper - term wrapper tag
//    */
//   unwrap(termWrapper) {
//     /**
//      * Expand selection to all term-tag
//      */
//     this.api.selection.expandToTag(termWrapper)

//     let sel = window.getSelection()
//     let range = sel.getRangeAt(0)

//     let unwrappedContent = range.extractContents()

//     /**
//      * Remove empty term-tag
//      */
//     termWrapper.parentNode.removeChild(termWrapper)

//     /**
//      * Insert extracted content
//      */
//     range.insertNode(unwrappedContent)

//     /**
//      * Restore selection
//      */
//     sel.removeAllRanges()
//     sel.addRange(range)
//   }

//   /**
//    * Check and change Term's state for current selection
//    */
//   checkState() {
//     const termTag = this.api.selection.findParentTag(this.tag, AskAiTooltip.CSS)

//     this.button.classList.toggle(this.iconClasses.active, !!termTag)
//   }

//   /**
//    * Get Tool icon's SVG
//    * @return {string}
//    */
//   get toolboxIcon() {
//     return `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>`
//     //return IconMaker;
//   }

//   /**
//    * Sanitizer rule
//    * @return {{mark: {class: string}}}
//    */
//   static get sanitize() {
//     return {
//       mark: {
//         class: AskAiTooltip.CSS,
//       },
//     }
//   }
// }
