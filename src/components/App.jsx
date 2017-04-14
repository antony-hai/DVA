import React from 'react'
import { connect } from 'dva'

const App = ({ children, ...otherProps }) => {
  return (
    <section>
      {React.cloneElement(children, {
        key: otherProps.location.pathname,
        ...otherProps,
      })}
    </section>
  )
}

App.propTypes = {}

function mapStateToProps({ auth }) {
  return {
    auth: Object.assign({}, auth),
  }
}

export default connect(mapStateToProps)(App)
