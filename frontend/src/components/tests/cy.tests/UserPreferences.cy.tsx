import React from 'react'
import UserPreferences from '../../UserPreferences'

describe('<UserPreferences />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserPreferences />)
  })
})