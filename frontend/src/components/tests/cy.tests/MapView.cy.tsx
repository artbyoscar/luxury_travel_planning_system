import React from 'react'
import MapView from '../../MapView'

describe('<MapView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MapView />)
  })
})