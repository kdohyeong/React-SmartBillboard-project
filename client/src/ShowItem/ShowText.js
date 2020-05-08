import React from 'react'  

class ShowText extends React.Component {


  render() {
    const reSize = 5/3;
      return (

          <div class="svg-wrapper" 
                style={{
                  position : 'fixed',
                  left : this.props.data.zLeft * reSize+'px',
                  top : this.props.data.top * reSize+'px',
                  transform : `rotate(${this.props.data.angle}deg)`,
                  width : this.props.data.width * this.props.data.scaleX * reSize+'px',
                  height : this.props.data.height * this.props.data.scaleY * reSize+'px',
                  backgroundColor : this.props.data.textBackColor
                  }}
          >

            <svg style={{
                  fontSize : 80 * this.props.data.scaleX,
                  fontWeight: 'normal',
                  }}
                  width='100%' 
                  height='100%'
            >

              <text fill= {this.props.data.fill} 
                    stroke={this.props.data.stroke} 
                    strokeWidth={this.props.data.strokeWidth * 3} 
                    fontFamily={this.props.data.fontFamily} 
                    textLength='100%' 
                    y = '70%'
              >{this.props.data.zText}
              </text>
            
            </svg>
        
          </div>
       
      );
  }
}

export default ShowText;
