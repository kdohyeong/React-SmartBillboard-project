import React, { Fragment } from 'react'

const fabric = window.fabric   // 윈도우 안에 패브릭을 넣어줌
var $ = require('jquery')


class DesignCanvas extends React.Component {

  state = {
  canvas: null,
  }

  
  componentDidMount() {
    const canvas = new fabric.Canvas(this.c)
    canvas.setHeight(700); //캔버스의 크기설정할수 있음
    canvas.setWidth(1500);
    this.setState({ canvas })

  }      
     
  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
      canvas: this.state.canvas,
      })
    })
    
    
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)}/>
        {this.state.canvas && children}
        <button onClick={e => {
          e.preventDefault()
          console.log(this.state.canvas.toJSON())
        }}>To JSON</button>
        
      </Fragment>
      );
  }
}

export default DesignCanvas