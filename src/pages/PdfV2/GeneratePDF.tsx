import React, { useEffect, useState, useRef } from 'react'
import htmlToPdfmake from 'html-to-pdfmake'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import PDFViewer from '../../atoms/PDFViewer/PDFViewer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  GENERATE_PDF_INTRO_DATA,
  PROJECT_DESIGNING_DESCRIPTION_DATA,
  TOCCONSTANTS,
} from '../../config/pdf.config'
import {
  calculateDots,
  convertImageToDataURIFromLocalImages,
  makePdfDataFromApiData,
} from './helper'
import LoderOverlay from '../../components/LoderOverlay'
import { getLocalItem } from '../../utils/Storage'
import {
  ImageHtmlStringHelper,
  listDataToHtmlString,
} from './PdfHtmlStringhelpers/ImageHtmlStringHelper'
import pdf_header_image from '../../assets/Images/Icons/pdf_header_image.png'
import AddPdfComments from './PdfComments/AddPdfComments'
import { setExportPdfFn } from '../../redux/Slices/pdfCommentsSlice'
import { fileUploadCalls } from '../../api/fileUpload.api'

pdfMake.vfs = pdfFonts.pdfMake.vfs

pdfMake.fonts = {
  Poppins: {
    normal: 'Poppins-Regular.ttf',
    bold: 'Poppins-Medium.ttf',
    italics: 'Poppins-MediumItalic.ttf',
    bolditalics: 'Poppins-BoldItalic.ttf',
  },
}

const convertNestedValuesToHtml: any = (data: any, index: number) => {
  console.log('convertNestedValuesToHtml: ', data)
  return `
  <div>
  <h3 class='' style="font-size:12px; font-weight:500; margin-top:${
    index === 0 ? 7 : 10
  };" >${data?.inStepSubSectionTitle}</h3>
  ${data.value
    .map(
      (i: any, index: number) =>
        `<div key=${index}>
      <div class=''>${
        i?.type === 'list'
          ? listDataToHtmlString(i?.data?.listData, i?.data?.ordered)
          : //: i?.type === 'checkbox'
          //? checkboxHtmldata(i?.data)
          i?.type === 'table'
          ? tableHtmlContent(i?.data)
          : i?.type === 'image'
          ? ImageHtmlStringHelper(i?.data, 200, 400)
          : `<div class='para_content' style="font-weight:400; font-size:12px;">${i?.data}</div>`
      }</div>
    </div>`
    )
    .join(' ')}
  </div>
  `
}

const htmlToPdfMakeHtmlString = (data: any) => {
  console.log(data)
  const dataTohtmlCode = `
  <div class=''>
    ${data
      .map(
        (item: any, itemIdx: number) => `
        <div class='' key=${itemIdx}>
          <div class=${
            itemIdx !== 0 && `pdf-pagebreak-before `
          } ><h3 style="font-weight:500; font-size:16px; color:#0D5058;">${
          item?.sectionTitle
        }</h3></div>
          <div>
            ${item?.subSections
              ?.map(
                (subSectionItem: any, subSectionIdx: any) => `
                <div key=${subSectionIdx}>
                    <h3 style="font-weight:500; font-size:14px; color:#000; margin-top:${
                      subSectionIdx === 0 ? 15 : 14
                    }px;"   }>${subSectionItem?.subSectionTitle || ''}</h3>
                  <div class="">
                    ${subSectionItem?.subSectionData
                      ?.map(
                        (i: any, dataIdx: any) => `
                        <div key=${dataIdx} style="margin-top:0px; margin-bottom:0px;">
                          ${
                            i?.nestedObj
                              ? convertNestedValuesToHtml(i, dataIdx)
                              : `<div>
                          ${
                            i?.type === 'list'
                              ? listDataToHtmlString(
                                  i?.data?.listData,
                                  i?.data?.ordered,
                                  dataIdx === 0 ? true : false
                                )
                              : //: i?.type === 'checkbox'
                              //? checkboxDataToHtmlString(i?.data)
                              i?.type === 'table'
                              ? tableHtmlContent(i?.data)
                              : i?.type === 'image'
                              ? ImageHtmlStringHelper(
                                  i?.data,
                                  200,
                                  400,
                                  i?.imgCaption
                                )
                              : `<div class='para_content ' style="font-weight:400; font-size:12px;" >${i?.data}</div>`
                          }</div>`
                          }
                        </div>
                      `
                      )
                      .join('')}
                  </div>
                </div>
              `
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('')}
  </div>`
  //console.log('dataTohtmlCode: ', dataTohtmlCode)
  return dataTohtmlCode
}

const tableHtmlContent = (tableData: any) => {
  console.log('tableData: ', tableData)
  const columnWidth = 595 / tableData[0].length

  const tableHtml = `<div style="margin: 0px; padding: 0; margin-top:0;">
<table style="margin:0px; padding:0; margin-top:0px;">
  <tr>
    ${tableData[0]
      .map(
        (i: any) =>
          `<th style="font-weight:500; font-size:12px; background-color:#8BD3DC; border:3px solid #fff; margin-left:10px; margin-top:5px; margin-bottom:5px; margin-right:5px; text-align:start; width:${columnWidth}px;">${i}</th> `
      )
      .join('')}
  </tr>
  ${tableData
    .slice(1)
    .map(
      (i: any, index: number) =>
        `<tr key=${index} style="border:2px solid #fff;">
      ${i
        ?.map(
          (item: any, itemIdx: number) =>
            `<td style="font-weight:400; font-size:12px; background-color:#E6F5F7; text-align:start; margin-left:10px; line-height:1.16; margin-top:5px; margin-bottom:5px; margin-right:5px;">${item}</td>`
        )
        .join('')}
      </tr>`
    )
    .join('')}

</table></div>
`
  return tableHtml
}

const GeneratePDF = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type

  const draftPDDCompilation: any = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2
  )
  const savedProjectDetails: any = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetails
  )

  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )

  const [pdfBlob, setPdfBlob] = useState<any>()
  const [showLoader, setShowLoader] = useState<any>(false)
  const [headerIconDataUri, setHeaderIconDataUri] = useState<any>('')

  useEffect(() => {
    getHeaderIconDataUri()
  }, [])

  const getHeaderIconDataUri = async () => {
    try {
      const dataUri = await convertImageToDataURIFromLocalImages(
        pdf_header_image
      )
      setHeaderIconDataUri(dataUri)
    } catch (e) {
      console.log('error in converting img to data uri: ', e)
    }
  }

  useEffect(() => {
    if (
      draftPDDCompilation &&
      headerIconDataUri &&
      currentProjectDraftDetails
    ) {
      console.log('calling helper function')
      getPdfData()
    }
  }, [draftPDDCompilation, headerIconDataUri, currentProjectDraftDetails])

  const getPdfData = async () => {
    try {
      setShowLoader(true)

      const pdfData = await makePdfDataFromApiData(
        draftPDDCompilation,
        savedProjectDetails
      )
      console.log('pdfData: ', pdfData)
      const pdfContent = htmlToPdfMakeHtmlString(pdfData)
      generatePDF(pdfContent)
      //setShowLoader(false)
    } catch (e) {
      console.log(e)
    } finally {
      setShowLoader(false)
    }
  }

  const createIntroPage: any = async (data: any) => {
    const {
      projectIntroduction: { name, project_img },
      project_description,
    } = currentProjectDraftDetails

    const projectName = name?.data

    const projectProponent =
      project_description?.roles_responsibility?.data?.roles_responsibility_1?.blocks[0]?.data?.content?.filter(
        (i: any) => {
          return i[0] === 'Organization Name'
        }
      )[0][1]

    const projectDescription =
      project_description?.purpose_objective_general_description?.data
        ?.blocks[0]?.data?.text

    const getProjectImg: any = async () => {
      try {
        const res = await fileUploadCalls.getFile(project_img)
        return URL.createObjectURL(res)
      } catch (e) {
        console.log(e)
      }
    }

    const truncateDescription: any = (description: any) => {
      return description.length > 500
        ? `${description.slice(0, 500)}...`
        : description
    }

    const pdfIntroData = GENERATE_PDF_INTRO_DATA(
      projectName,
      '',
      truncateDescription(projectDescription),
      await getProjectImg(project_img),
      projectProponent
    )

    const IntroData = await Promise.all(
      pdfIntroData.map(async (i: any) => {
        return {
          [i?.type]:
            i?.type === 'text'
              ? i?.content
              : await convertImageToDataURIFromLocalImages(i?.content),
          ...i?.styles,
        }
      })
    )
    return IntroData
  }

  // Function to create table of contents content
  const createTOCContent: any = (data: any) => {
    const tableOfContentsContent: any = [
      {
        text: 'Table of Contents',
        fontSize: 16,
        fontWeight: 500,
        bold: true,
        margin: [0, 0, 0, 2],
      },
      { text: '\n', fontSize: 12 },
    ]

    data.forEach((section: any) => {
      tableOfContentsContent.push(
        {
          text: section.name.toUpperCase(),
          fontSize: 12,
          fontWeight: 500,
          bold: true,
          margin: [0, 8, 0, 8],
          color: '#029FB3',
        },
        ...section.list.map((item: any) => {
          const dots = calculateDots(item)
          const line = `${item} ${dots}`

          return {
            text: line,
            fontSize: 12,
            alignment: 'left',
            margin: [0, 0, 0, 5],
            noWrap: true,
          }
        })
      )
    })

    return tableOfContentsContent
  }

  // Create the table of contents content
  const tableOfContentsContent = createTOCContent(TOCCONSTANTS)

  // Function to create the table rows based on the data
  const createTableRows = (data: any) => {
    return data.map((item: any) => {
      return [
        {
          text: item.leftText,
          fillColor: '#8BD3DC',
          color: '#000000',
          fontSize: 11,
          fontWeight: 500,
          bold: true,
          alignment: 'left',
          width: '40%', // Set the width of the left box to 40%
          verticalAlign: 'middle',
          borderColor: ['#fff', '#fff', '#fff', '#fff'],
          margin: [3, 5, 3, 5],
        },
        {
          text: item.rightText,
          fillColor: '#E6F5F7',
          color: '#000000',
          fontSize: 11,
          fontWeight: 400,
          alignment: 'left',
          width: '60%',
          borderColor: ['#fff', '#fff', '#fff', '#fff'],
          margin: [5, 5, 3, 5],
        },
      ]
    })
  }

  const getProjectDesignDescriptionData = () => {
    if (!currentProjectDraftDetails) {
      return
    }
    const {
      uuid,
      projectIntroduction: { name, sectoral_scope },
      project_description,
    } = currentProjectDraftDetails
    const projectProponent =
      project_description?.roles_responsibility?.data?.roles_responsibility_1?.blocks[0]?.data?.content?.filter(
        (i: any) => {
          return i[0] === 'Organization Name'
        }
      )[0][1] || '-'

    const annualAvgGHGEmission =
      project_description?.aggregated_GHG_emissions?.data?.blocks[0]?.data?.content?.filter(
        (i: any) => {
          return i[0] === 'Annual Avg'
        }
      )[0][1] || '-'

    const projectData = {
      uuid,
      name: name?.data,
      projectProponent,
      representative: '',
      dateofSubmission: '',
      dateOfValidation: '',
      dateOfVersion: '',
      hostCountry: '',
      sectoralScope: sectoral_scope.join(', '),
      groupedProject: '',
      otherRequirements: '',
      methodologyAndVersion: '',
      type: '',
      mrvCycle: '',
      otherCerts: '',
      annualAvgGHGEmission: annualAvgGHGEmission || '-',
    }
    return projectData
  }

  const tableRows: any = createTableRows(
    PROJECT_DESIGNING_DESCRIPTION_DATA(getProjectDesignDescriptionData())
  )

  // Create the table of contents content
  const generatePDF = async (html?: any) => {
    const pdfmakeContent: any = htmlToPdfmake(html, {
      removeExtraBlanks: true,
      tableAutoSize: true,
    })

    //const pdfmakeContent = htmlToPdfmake(html, { removeExtraBlanks: true })
    console.log('pdfmakeContent: ', pdfmakeContent)

    const documentDefinition: any = {
      content: [
        // Intro page content
        await createIntroPage(),
        { text: '', pageBreak: 'after' },
        {
          text: 'Project Designs Description',
          fontSize: 20,
          fontWeight: 400,
          margin: [0, 3, 0, 17], // Top margin 10, Bottom margin 20
        },
        {
          stack: [
            {
              margin: [10, 0, 0, 0], // Left margin of 10px
              table: {
                heights: 30,
                widths: ['40%', '60%'],
                body: [...tableRows],
              },
            },
          ],
        },
        { text: '', pageBreak: 'after' },
        ...tableOfContentsContent,
        //Breaking the page after TOC page
        { text: '', pageBreak: 'after' },
        pdfmakeContent, // The content from html-to-pdfmake
      ],
      //dontBreakRows: true,
      //pageSize: 'A4',
      //pageMargins: [30, 30],
      pageMargins: {
        top: 43,
        bottom: 80,
        left: 30,
        right: 30,
      },
      pageSize: {
        width: 595,
        height: 842,
      },
      header: function (currentPage: any, pageCount: any) {
        if (currentPage > 1)
          return {
            stack: [
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 27,
                    y1: 30,
                    x2: 565,
                    y2: 30,
                    lineWidth: 1,
                    lineColor: '#8BD3DC',
                  },
                ],
              },
              {
                columns: [
                  {
                    image: headerIconDataUri,
                    width: 30,
                    margin: [30, -20, 10, 25],
                    fontSize: 12,
                    color: '#000000',
                    alignment: 'left',
                  },
                  {
                    text: 'ICR project design description v.1.0',
                    margin: [30, -20, 30, 0],
                    fontSize: 8,
                    color: '#000000',
                    alignment: 'right',
                    paddingTop: 2,
                  },
                ],
              },
            ],
          }
      },
      footer: function (currentPage: any) {
        if (currentPage > 1)
          return {
            stack: [
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 27,
                    y1: 50,
                    x2: 565,
                    y2: 50,
                    lineWidth: 1,
                    lineColor: '#8BD3DC',
                  },
                ],
              },
              {
                text: currentPage - 1,
                alignment: 'center',
                fontWeight: 400,
                fontSize: 10,
                margin: [0, 10, 0, 0],
              },
            ],
          }
      },
      pageBreakBefore: function (currentNode: any) {
        return (
          currentNode.style &&
          currentNode.style.indexOf('pdf-pagebreak-before') > -1
        )
      },
      defaultStyle: {
        font: 'Poppins',
        width: 600,
        height: 850,
        pageOrientation: 'portrait',
      },

      styles: {
        section_title: {
          fontWeight: 500,
          fontSize: 16,
          color: '#0D5058',
        },
        //second_subSection_title: {
        //  marginTop: 100,
        //},
        para_content: {
          lineHeight: 1.21,
          marginTop: 3,
        },
        //in_step_title: {
        //  fontSize: 12,
        //  //fontWeight: 500,
        //  bold: true,
        //},
        img_dimensions: {
          alignment: 'center',
        },
        'html-table': {
          marginTop: 0,
        },
      },
    }

    const pdfGenerator = pdfMake?.createPdf(documentDefinition)
    pdfGenerator?.getBlob((blob: any) => {
      const url = URL.createObjectURL(blob)
      setPdfBlob(url)
      //setURL(url)
      dispatch(setExportPdfFn({ pdfGenerator, pdfReady: true, pdfUrl: url }))
    })
    setShowLoader(false)
    // pdfGenerator.download('document.pdf')
  }

  const resetHash = () => {
    document.location.hash = ''
  }

  const pdfViewerRef: any = useRef(null)
  const commentsSectionRef: any = useRef(null)

  //const handlePdfScroll = () => {
  //  if (pdfViewerRef.current && commentsSectionRef.current) {
  //    const pdfScrollTop = pdfViewerRef.current.scrollTop
  //    commentsSectionRef.current.scrollTop = pdfScrollTop
  //  }
  //}

  return (
    <>
      <LoderOverlay show={pdfBlob ? false : true} />
      {pdfBlob && (
        <div style={{ display: 'flex' }}>
          <div
            style={{ overflowY: 'scroll' }}
            ref={pdfViewerRef}
            //onScroll={handlePdfScroll}
          >
            {/* Your PDF viewer component */}
            <AddPdfComments pdfBlob={pdfBlob} />
          </div>
        </div>
      )}
    </>
  )
}

export default GeneratePDF
