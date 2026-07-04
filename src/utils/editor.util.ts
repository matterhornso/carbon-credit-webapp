export const getEditorBlockData = (editorObj: any) => {
  let data
  if (!editorObj?.blocks) {
    return (data = '')
  }
  data = editorObj?.blocks[0]?.data?.text
  return data
}

export const getProjectProponentName = (data: any) => {
  if (!data) {
    return '-'
  }
  const getTableArr =
    data?.roles_responsibility_1?.blocks[0] &&
    data?.roles_responsibility_1?.blocks[0]?.data?.content
  if (!getTableArr) {
    return '-'
  }

  const organizationNameIndex = getTableArr.findIndex((i: any) => {
    return i[0] === 'Organization Name'
  })

  return getTableArr[organizationNameIndex][1] || '-'
}

export const getEstimattedAnnualEmissionsRevenue = (data: any) => {
  if (!data) {
    return '-'
  }

  const getTableArr = data?.blocks[0] && data?.blocks[0]?.data?.content
  if (!getTableArr) {
    return '-'
  }

  const estimattedAnnualRevenueDataIndex = getTableArr.findIndex((i: any) => {
    return i[0] === 'Annual Avg'
  })
  return getTableArr[estimattedAnnualRevenueDataIndex][1] || '-'
}
