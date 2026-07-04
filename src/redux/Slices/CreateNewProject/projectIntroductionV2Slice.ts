import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface projectIntroductionReducerInterface {
  projectIntroduction: any
}
const initialState: projectIntroductionReducerInterface = {
  //name: null,
  //sectoral_scope: [],
  //scale: '',
  //location: null,
  //area: null,
  //start_date: null,
  //duration: null,
  projectIntroduction: {
    name: {
      data: '',
    },
    sectoral_scope: [],
    scale: '',
    location: {
      data: '',
    },
    area: {
      data: '',
    },
    start_date: '',
    duration: {},
    // SDG: [],
    // project_img: '',
  },
}

const projectIntroductionV2 = createSlice({
  name: 'projectIntroductionV2',
  initialState,
  reducers: {
    setProjectIntroduction: (state, action: PayloadAction<any>) => {
      state.projectIntroduction = action.payload
    },
    resetProjectIntroductionSlice: () => initialState,
  },
})

export const { setProjectIntroduction, resetProjectIntroductionSlice } =
  projectIntroductionV2.actions

export default projectIntroductionV2.reducer
