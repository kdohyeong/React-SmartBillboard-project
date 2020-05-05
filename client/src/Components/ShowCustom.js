import React from 'react';
import ReactPlayer from 'react-player' 
import './MakeCustom.css'





class ShowCustom extends React.Component {


  setStyle= (_left, _top, _angle) => {
      let style = { 
                    position : 'fixed',
                    left : _left * 1.66+'px',
                    top : _top * 1.5455+'px',
                    transform : `rotate(${_angle}deg)`,
                  }
      return style 
  }

  render () {

      return (
        <div>
            {
            this.props.datas.map((data) => {
              if (data.zTYPE === 'video') {
                return (
                  
                  <ReactPlayer padding='0' margin='0' style={ this.setStyle(data.zleft, data.top, data.angle) }
                      url={data.src} loop playing
                      width = {data.width * data.scaleX * 1.66}
                      height = {data.height * data.scaleY * 1.5455}
                  />
               
                  );
              }
              else if (data.zTYPE === 'image'){
                return (
                  <div>
                  <img style={ this.setStyle(data.zleft, data.top, data.angle) } 
                      src ={data.src}
                      width = {data.width * data.scaleX * 1.66}
                      height = {data.height * data.scaleY * 1.5455}
                      alt = ""
                  ></img>
                </div>
                );
              } 
            })
            }
        </div>
      );
    }
  } 

  
export default ShowCustom;
