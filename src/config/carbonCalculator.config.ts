export const CARBON_CALCULATOR_PROJECT_TYPES = [
  {
    label: 'afforestation',
    value: 'Afforestation',
  },
  // {
  //   label: 'recycling',
  //   value: 'Recycling',
  // },
  {
    label: 'PETa',
    value: 'PETa',
  },
  {
    label: 'PETbg',
    value: 'PETbg',
  },
  {
    label: 'HDPE',
    value: 'HDPE',
  },
  {
    label: 'LDPE',
    value: 'LDPE',
  },
  {
    label: 'PP',
    value: 'PP',
  },
  {
    label: 'PS',
    value: 'PS',
  },
  {
    label: 'EPS',
    value: 'EPS',
  },
  {
    label: 'PUR',
    value: 'PUR',
  },
  {
    label: 'PVC',
    value: 'PVC',
  },
  {
    label: 'EUmix',
    value: 'EUmix',
  },
]

export const AFFORESTATION_PROJECT_TYPE_INPUT_FIELDS = [
  {
    inputType: 'text',
    heading: 'Number of years',
    heading2: 'Please provide number of years',
    placeholder: 'No of years',
    name: 'no_of_years',
    value: '',
  },
  {
    inputType: 'text',
    heading: 'Total trees per area in hectares',
    heading2: 'Please provide the trees per area in hectares',
    placeholder: 'Trees per area',
    name: 'trees_per_area',
    value: '',
  },
  {
    heading: 'Total area in hectares',
    heading2: 'Please provide the total area in hectares',
    inputType: 'text',
    placeholder: 'Area',
    name: 'area',
    value: '',
  },
]

export const RECYCLING_PROJECT_TYPE_INPUT_FIELDS = [
  {
    inputType: 'text',
    heading: 'Number of tons recycled',
    heading2: 'Please provide number of tons recycled',
    placeholder: 'No of tons recycled',
    name: 'no_of_tons_recycled',
    value: '',
  },
]

export const OTHER_PROJECT_TYPE_INPUT_FIELDS = [
  {
    inputType: 'text',
    heading: 'Number of tons',
    heading2: 'Please provide number of tons',
    placeholder: 'No of tons',
    name: 'no_of_kgs',
    value: '',
  },
]
