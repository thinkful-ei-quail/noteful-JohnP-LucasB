import React from 'react';

export default class FetchError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>There was an issue with the server, please try again.</h1>;
    }

    return this.props.children;
  }
}
