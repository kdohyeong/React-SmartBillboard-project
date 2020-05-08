import React, { Fragment } from 'react';
import ReactPlayer from 'react-player' 
import './MakeCustom.css'

class ShowCustom extends React.Component {


  setStyle= (_left, _top, _angle) => {
      let style = { 
                    position : 'fixed',
                    left : _left * 5/3+'px',
                    top : _top * 5/3+'px',
                    transform : `rotate(${_angle}deg)`,
      }
      return style 
  }

  setBackColor= (_back) => {
      let style = {
        backgroundColor : _back,
      }
    return style
  }

  setSvgStyle= (_left, _top, _angle, _width, _height, _scaleX, _scaleY, _back) => {
      let style = {
                      position : 'fixed',
                      left : _left * 5/3+'px',
                      top : _top * 5/3+'px',
                      transform : `rotate(${_angle}deg)`,
                      width : _width * _scaleX * 5/3+'px',
                      height : _height * _scaleY * 5/3+'px',
                      backgroundColor : _back,
      }
    return style
  }

  setTextStyle=( _scaleX, _scaleY) =>{
      let style = {
      fontSize : 80 * _scaleX,
      fontWeight: 'normal',

      }
    return style
  }

  render () {

      return (
        <Fragment>
          
          <div className='back' style={this.setBackColor(this.props.datas[0].background)}/> 
            {
              this.props.datas.map((data) => {
                  if (data.zTYPE === 'video') {
                    return (   
                      <ReactPlayer padding='0' margin='0' style={ this.setStyle(data.zleft, data.top, data.angle) }
                          url={data.src} loop playing muted
                          width = {data.width * data.scaleX * 5/3}
                          height = {data.height * data.scaleY * 5/3}
                      />
                    );
                  }
                  else if (data.zTYPE === 'image'){
                    return (
                      <img style={ this.setStyle(data.zleft, data.top, data.angle) } 
                          src ={data.src}
                          width = {data.width * data.scaleX * 5/3}
                          height = {data.height * data.scaleY * 5/3}
                          draggable="false"
                          alt = ""
                      />
                    );
                  }
                  else if (data.zTYPE === 'i-text'){
                    return (
                      <Fragment>
                      
                      <div class="svg-wrapper" style={ this.setSvgStyle(data.zleft, data.top, data.angle, data.width,
                           data.height, data.scaleX, data.scaleY, data.textBackColor) }>

                        <svg width= '100%' height="100%" style={this.setTextStyle(data.scaleX , data.scaleY)}>
                          <text fill= {data.fill} stroke={data.stroke} strokeWidth={data.strokeWidth * 3} 
                          fontFamily={data.fontFamily} y = '70%' textLength="100%" 
                          >{data.zTEXT}</text>
                        
                        </svg>
                      
                      </div>
                  
                      </Fragment>
                    )}
              })
            }

        </Fragment>
      );
    }
  } 

  
export default ShowCustom;
