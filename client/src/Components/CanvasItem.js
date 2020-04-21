import React from 'react'
import omit from 'lodash.omit'

const fabric = window.fabric

class CanvasItem extends React.Component {
  
  static defaultProps = {
    scale: 1.0,
  }

  state = {
    src1:"http://placehold.it/150x150/848/fff",
    src2:"https://http.cat/100",
    src3:"http://placehold.it/220x220/848/000",
    scale :0.5,
  }

 AddItem(src) {
  const options = omit(this.state.scale, ['scale'])
    
  fabric.Image.fromURL(src, img => {
    img.scale(this.state.scale)
    this.props.canvas.add(img)
  }, options)

 }

  render() {
    
    return (
        <div>
        <div className="furniture">
        <img onClick={() => {this.AddItem(this.state.src1)}} src={this.state.src1} width='200' height='200'/>
        </div>
        <div className="furniture">
        <img onClick={() => {this.AddItem(this.state.src2)}} src={this.state.src2} width='200'/>
        </div>
        <div className="furniture">
        <img onClick={() => {this.AddItem(this.state.src3)}} src={this.state.src3} width='200'/>
        </div>
        </div>
    );
  }
}

export default CanvasItem;
