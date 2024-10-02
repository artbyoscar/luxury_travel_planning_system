import React from 'react'
import DestinationSuggestions from '../../DestinationSuggestions'

describe('<DestinationSuggestions />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DestinationSuggestions />)
  })
})