import React from 'react'  
import ReactPlayer from 'react-player' ;

class ShowVideo extends React.Component {
  

  render() {
    const reSize = 5/3;
      return ( 

          <ReactPlayer style={{
                        position : 'fixed',
                        left : this.props.data.zLeft * reSize +'px',
                        top : this.props.data.top * reSize +'px',
                        transform : `rotate(${this.props.data.angle}deg)`,
                        }}
                        url={this.props.data.src} loop playing muted
                        width = {this.props.data.width * this.props.data.scaleX * reSize}
                        height = {this.props.data.height * this.props.data.scaleY * reSize}
                        padding='0' 
                        margin='0'
          />
       
      );
  }
}

export default ShowVideo;
