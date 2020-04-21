import React from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

class Circle extends React.Component {
  static propTypes = {
    test: PropTypes.string,
    canvas: PropTypes.object,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
  }

  static defaultProps = {
    top: 0,
    left: 0,
    radius: 5,
    fill: 'red',
  }

  componentDidMount() {
    console.log(this.props);
    const circle = new fabric.Circle(this.props)
    this.props.canvas.add(circle)
  }

  render() {
    console.log(this.props)
    return null
  }
}

export default Circle
