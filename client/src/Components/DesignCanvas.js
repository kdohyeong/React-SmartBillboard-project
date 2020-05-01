import React, { Fragment } from 'react'
import Image from './Image.js'
import Video from './Video.js'
import Text from './Text.js'
import './DesignCanvas.css';

import { dragAndDrop } from '../utils/DragDrop.js';
import * as Cfunc from '../utils/CanvasFunction.js';

//윈도우 안에 패브릭을 넣어줌
const fabric = window.fabric; 
//제이쿼리를 사용하기로함                                             
var $ = require('jquery');  
//컨버스를 전역으로 선언                                                
let canvas = null;

class DesignCanvas extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          id : null,
          src: null,
          width: '',
          height: '',
          top: '',
          left: '',
          angle: '',
          categoty: 'CUSTOM',
          type: '',
          scaleX: '',
          scaleY: '',

            //캔버스값을 저장을 저장할 그릇
          canvas: null,                                                    
          menu : 'IMAGE'                                     
      }
  }

  componentDidMount() {
    //캔버스를 만듬
    canvas = new fabric.Canvas(this.c , { backgroundColor : '#fff' });       

    //캔버스의 크기설정할수 있음
    canvas.setHeight($('.canvas-wrapper').height());                                                  
    canvas.setWidth($('.canvas-wrapper').width());
    this.setState({ canvas }) 

    //드래그 앤 드랍 함수를 실행            
    dragAndDrop(canvas);
    //선택한 객체 인덱스 맨앞으로 땡기기
    canvas.on('mouse:down', function() { Cfunc.bringFrontIndex(canvas) });   

  }

  handleMenuChange(menu){ this.setState({ menu : menu }) };

  //IMAGE || VIDEO || TEXT 전환
  handleFurnitureChange() {
    if (this.state.menu === 'IMAGE'){ return (
      <div className="addimage"> 
        <Image></Image> 
      </div>
      ); 
    }
    else if(this.state.menu === 'VIDEO'){ return (
      <div className='addvideo'>  
        <Video></Video> 
      </div>
      ); 
    }
    else if (this.state.menu === 'TEXT'){ return (
      <div className="addtext">
        <Text canvas={canvas}></Text>
      </div>
      ); 
    }
  };

  render() {
    return (
      <Fragment>
        
        <div className="canvas-container">

          <div className="title">Billboard Maker</div>

          <div className="canvas-wrapper">
            <canvas ref={c => (this.c = c)} />  
          </div>                                 
        
          <div className="menu">

            <button onClick={(e) =>{ e.preventDefault(); this.handleMenuChange('IMAGE')}}>Image</button>
            <button onClick={(e) =>{ e.preventDefault(); this.handleMenuChange('VIDEO')}}>Video</button>
            <button onClick={(e) =>{ e.preventDefault(); this.handleMenuChange('TEXT')}}>Text</button>
          
            <label>Background Color</label><br/>
		      		<input className="color" id="bg_color" type="color" onChange={(e) => { e.preventDefault(); Cfunc.bgColor(canvas); }}/>
            <button id="delete" onClick={(e) => { e.preventDefault(); Cfunc.deleteObjects(canvas); }}>DELETE</button>
            <button id="sendbackwards" onClick={(e) => { e.preventDefault(); Cfunc.sendBackwards(canvas); }}>SEND BACK</button>
            <button id="capture" onClick={(e) => { e.preventDefault(); Cfunc.captureButton(canvas); }}>CAPTURE</button>
            <button id="toJson" onClick={(e) => { e.preventDefault(); console.log(canvas.toJSON()); }}>To JSON</button>
          
          </div>

          <div className="furniture">
            { this.handleFurnitureChange() }
          </div>

        </div>
     
      </Fragment>
      );
  }
}

export default DesignCanvas