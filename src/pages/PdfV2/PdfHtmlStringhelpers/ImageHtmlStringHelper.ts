import React from 'react'

export const ImageHtmlStringHelper = (
  imgDataUri: any,
  height: any,
  width: any,
  imgCaption?: any
) => {
  return `<img src=${imgDataUri} class="img_dimensions" style="background-color:pink; max-width: 500pt; max-height: 500pt; width: 100%; height: auto; "/>
  ${
    imgCaption &&
    `<span style="font-weight:400; font-size:10; color:#01717F; text-align:center;">${imgCaption}</span>`
  }
  `
}

export const listDataToHtmlString = (
  listData: any,
  ordered: any,
  firstBlock?: boolean
) => {
  console.log('listData: ', listData)
  //const listType = ordered ? 'ol' : 'ul'
  const listType = 'ol'
  const htmlList = `
      <ul style="margin: 0; padding: 0; font-weight:400; font-size:12px;  ${
        firstBlock ? 'margin-top:5px;' : 'margin-top:8px;'
      }">
        ${listData
          .map(
            (listItem: any) =>
              `<li style="margin-bottom: 5px; padding: 0; ">${listItem}</li>`
          )
          .join('')}
      </ul>
  `
  return htmlList
}

export const checkboxDataToHtmlString = (checkboxData: any) => {
  console.log('checkboxData: ', checkboxData)
  const checkboxImgDataUri =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG2SURBVHgB7dhNSwJBHMfx34xeCgmpi4cePEjXDDoGauegvHZRewO+g8xega+gxTdQZC+gfAeeI2ipi5ega5A7zX9twyR1H2bdWdgvCOO6uB8Glx0HiEHszzvjNsuRbgqgLD8oI4LktQdcsM7o/LjrHGMTwDxH6kEeykOPTAtfFTSq5i+SG70XjYBOBN1P0Shl9OoSWId+ZZmFT04jAdaEpgnOS/xnXISm0Q3MEYMSpKoSpKoiRV4f7qFW2Fp4XhoR5QAdZPf5bea5kczk9AzuZFbmnr905DSwPXjClXzNa6lIP0BqaUi/QMo18mQ7B78FAVKukK3iLm6ODuTFvK9DggKphchSbgMXEknVCpueoCqArpD94bv95U5uoaqAlL0yZ6dnl1gApcpyVqni+hrymVXcvQ4RNtA10gtUNdAT0g00DCDl+dntXLQ1cTONE6EAKV8LjNnQcSqBlO8nDiHa/0BUA6lAj8VpaBhAKvB6chIVBpCyt1m4cS+gccl/HFUlSFXFBylv7Udomr09TQNmWX1ompD75zbS4lZHQJjQLDmLJuQG//g32ah+CIwqOkEJKGhjX/YNGx/JZBucJzkAAAAASUVORK5CYII='
  const unCheckBoxImgDataUri =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEuSURBVHgB7ZjBbcJAEEX/juFOCaSEVBC455IK4qQB0gF0EBqILCqIQgpISkgHcQfJFQnvMOsVyAYfB7xI807r2ZX2aXZ8+cAV4FpfxfuIMJgxMJGNCXpA7v4hdsvq+X61r7mG4JiQfUlpjDQoPbZTPD2UB0kq1r8JCe4JordZWGXFOhfBHOkxch6bQVgx3Ky9xyuP6kVa/Y9LEkduIQ17PJgQ3dXPTcUnN89Ki2/CLKAP4s/71yxR58G+BOPdJ69HuAJMUguT1MIktTBJLUxSC5PUwiS1MEktTFILk9TCJLUwSS1MUotuSQmN0BeSrB2XakmJ1L7bxeFr1+GzUydqw3mzFOLpGP29fSxANEeCeHZ53UlPfsngEokhXSwhAX+cSckEGdU0JdEgyCHYF3bfd1JlOIx8DwAAAABJRU5ErkJggg=='
  const checkboxHtmlString = `
    <table style="border-collapse: collapse; border: none; margin-bottom:0px;">
      ${checkboxData
        .map(
          (i: any, index: number) =>
            `<tr key=${index} style="border: 2px solid #fff; margin-bottom:1px;">
        
                <td style="font-weight:400; font-size:12px; text-align:start; margin-left:10px; line-height:1.16; margin-top:5px; margin-bottom:5px; "><img src="${
                  i?.checked ? checkboxImgDataUri : unCheckBoxImgDataUri
                }" width="14" height="14" alt="Checkbox" /></td>
                <td style="font-weight:400; font-size:12px; text-align:start; margin-left:1px; line-height:1.16; margin-top:5px; margin-bottom:5px; margin-right:5px;">${
                  i?.text
                }</td>
           
          </tr>`
        )
        .join('')}
    
    </table>
 `

  return checkboxHtmlString
}
