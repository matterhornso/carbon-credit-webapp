import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CCSelectBox from './CCSelectBox'
import { ROLES } from '../../config/constants.config'

const typeOptions = [
  { name: 'Issuer', value: ROLES.ISSUER },
  { name: 'Verifier', value: ROLES.VERIFIER },
]
test('renders CCSelectBox', () => {
  //   render(
  //     <CCSelectBox
  //       native={true}
  //       label="Particpant Type"
  //       items={typeOptions}
  //       // onChange={(e) => setSelectedRole(e.target.value)}
  //     />
  //   )
  //   const elem = screen.getByRole('option', {
  //     name: 'Issuer',
  //   }) as HTMLSelectElement
  //   // expect(
  //   //   screen.getByRole('option', { name: 'Select a country' }).selected
  //   // ).toBe(true)
  //   // if (elem) expect(elem.selected).toBe(true)
})
// it('should display the correct number of options', () => {
//   render(
//     <CCSelectBox
//       label="Particpant Type"
//       items={typeOptions}
//       // onChange={(e) => setSelectedRole(e.target.value)}
//     />
//   )
//   expect(screen.getAllByRole('option').length).toBe(2)
// })
// it('calls onChange if change event fired', () => {
//   const mockCallback = jest.fn()
//   const { getByTestId } = render(
//     <div>
//       <CCSelectBox
//         label="Particpant Type"
//         items={typeOptions}
//         data-testid="my-wrapper"
//         onChange={mockCallback}
//       />
//     </div>
//   )
//   const wrapperNode = getByTestId('my-wrapper')
//   console.log(wrapperNode)
//   // Dig deep to find the actual <select>
//   const selectNode = wrapperNode.childNodes[0].childNodes[0]
//   fireEvent.change(selectNode, { target: { value: '3' } })
//   expect(mockCallback.mock.calls).toHaveLength(1)
// })
