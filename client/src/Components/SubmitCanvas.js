import React from 'react'


const fabric = window.fabric

class SubmitCanvas extends React.Component {
  


  componentDidMount() {

  }

  render() {
    return (
        <form onSubmit={this.handleFormSubmit}>
            {this.props.data}
        </form>

    );
  }
}

export default SubmitCanvas
