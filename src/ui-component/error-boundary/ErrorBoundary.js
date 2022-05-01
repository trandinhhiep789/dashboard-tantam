import React from 'react'
import error404 from '../../assets/erro-boundary/404.png'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    if (error) {
      console.error('ErrorBoundary', info.componentStack)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="NotFoundCom">
          <div className="NotFoundCom--dflex">
            <div>
              <img className="NotFoundCom__img" src={error404} />
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
