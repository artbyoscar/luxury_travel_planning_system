import React from 'react'
import Recommendations from '../../Recommendations'

describe('<Recommendations />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Recommendations />)
  })
})