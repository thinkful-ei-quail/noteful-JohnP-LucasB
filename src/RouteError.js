import React from 'react';

export default class RouteError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Theres a problem with the
          Path you are attempting, try refreshing the page, or using the back arrow</h1>;
    }

    return this.props.children;
  }
}
