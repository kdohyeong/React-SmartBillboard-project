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

  setBack= (_back) => {
    let style = {
      backgroundColor : _back,
    }
    return style
  }

  render () {
      return (
        <Fragment>
          
          <div className='back' style={this.setBack(this.props.datas[0].background)}/>
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
                            alt = ""
                        />
                    );
                  } 
              })
            }

        </Fragment>
      );
    }
  } 

  
export default ShowCustom;
