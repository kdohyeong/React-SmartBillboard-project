import React, { Fragment } from 'react'
import Image from './Image.js'
import Video from './Video.js'
import Text from './Text.js'
import './DesignCanvas.css';

import { dragAndDrop } from '../utils/DragDrop.js';

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
    canvas.on('mouse:down', function() { bringFrontIndex() }); 
    //내 현재 마우스가 클릭한 위치 따기              
    // console.log(options.e.clientX, options.e.clientY);                  
    //캡쳐 함수 실행                 
    $("#capture").click(function(){ captureButton(); });                    
    //삭제 버튼누르면 삭제 함수 실행
    $("#delete").click(function(){ deleteObjects(); });                     
    //선택한 객체의 인덱스를 맨뒤로 보내기 버튼
    $('#sendbackwards').click(function() { sendBackwards(); });             
    //캔버스 배경색 지정
    $('#bg_color').on('input', function() { bgColor(); });                  

  }

  componentDidUpdate(){
    //텍스트 색깔
    $('#text_color').on('input', function() { textColor(); });  
    //텍스트 배경 색깔
    $('#text_bg_color').on('input', function(){ textBgColor(); });   
    //폰트 종류 바꾸기//스테이트에 컨버스내용 저장
    $('#font_family').on('input', function() { fontFamily(); });  
    //텍스트 테두리 두께
    $('#text_stroke_width').on('input', function(){ textStrokeWidth(); });
    //텍스트 테두리 색깔
    $('#text_stroke_color').on('input', function(){ textStrokeColor(); }); 
  }
  //IMAGE || VIDEO || TEXT 전환
  handleMenuChange(menu){ this.setState({ menu : menu }) };

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
        <Text></Text>
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
          
            <label>Background Color</label>
		      	<div>
		      		<input className="color" id="bg_color" type="color" />
		      	</div>
            
            <button id="delete">DELETE</button>
            <button id="sendbackwards">SEND BACK</button>
            <button id="capture">CAPTURE</button>

            <button onClick={e => { e.preventDefault(); console.log(canvas.toJSON()); }}>To JSON</button>
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
//TEXT 색깔 설정
function textColor() {
//선택한 객체가 undefined나 null이 아닐때,
if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){  
  //선택한 객체가 text일때만 실행시키기 위해서      
  if (canvas.getActiveObject().text) {                        
    //텍스트 색깔 설정  
    canvas.getActiveObject().set({ fill: $('#text_color').val() });                                
    canvas.renderAll();
    }
  }
}

//폰트 설정 
function fontFamily() {
if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       
  if (canvas.getActiveObject().text) {                                                  
    canvas.getActiveObject().set({ fontFamily: $('#font_family').val() });                             
    canvas.renderAll();
    }
  }
}

//컨버스 배경 컬러설정
function bgColor() {
  canvas.backgroundColor = $('#bg_color').val();                                          
  canvas.renderAll();
}

//TEXT 테두리 설정
function textStrokeColor() {
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       
    if (canvas.getActiveObject().text) {                                                  
    canvas.getActiveObject().set({ stroke: $('#text_stroke_color').val() });                    
    canvas.renderAll();
    }
  }
}

//TEXT 테두리 두께 설정
function textStrokeWidth() {
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       
    if (canvas.getActiveObject().text) {                                                  
    canvas.getActiveObject().set({ strokeWidth: $('#text_stroke_width').val() });                   
    canvas.renderAll();
    }
  }
}

//TEXT 배경 색 설정 
function textBgColor() {
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){        
    if (canvas.getActiveObject().text) {                                                   
    canvas.getActiveObject().set({ backgroundColor: $('#text_bg_color').val() });         
    canvas.renderAll();
    }
  }
}

// 아이템 뒤로보내기
function sendBackwards() {
  var activeObj = canvas.getActiveObject();
  if (activeObj) {
    canvas.sendToBack(activeObj);
    canvas.discardActiveObject();
  }
}

//선택한 아이템 맨 앞으로 가져오기
function bringFrontIndex() {
  var activeObj = canvas.getActiveObject();  
  canvas.bringToFront(activeObj);                                                  
}

//선택한 아이템 삭제
function deleteObjects() {
  var activeObject = canvas.getActiveObjects(),
      //여러개 선택하면 삭제 안되니깐 새로 패브릭으로 만들어주고 그걸 삭제                                   
      activeobjectGroup = new fabric.ActiveSelection(activeObject, {       
      canvas: canvas                                                              
      });
    if (activeobjectGroup) {
      activeobjectGroup.forEachObject(function(obj) {
      canvas.remove(obj);
      });
    }
    else {
      canvas.remove(activeObject);
    }
  canvas.discardActiveObject();
  canvas.requestRenderAll();
}

//캔버스 전체 캡쳐
function captureButton() {
    var img = canvas.requestRenderAll();         
    setTimeout(() => {  
    var imgs = img.toDataURL('image/jpeg')                                              
    console.log(imgs);
  }, 2000)
}

//비디오 넣기위해 클래스 객체로 커스텀으로 만듬
fabric.CustomVideo = fabric.util.createClass(fabric.Image, {
  type: 'video',
  cropRect: null,                                              //비디오에서 부분만 짜를때 쓸꺼
  
  initialize: function (video, options) {
    const defaultOpts = {
      lockRotation: false,                                     //앵글 돌리기 잠금
      objectCaching: true,
      cacheProperties: ['time']
    }
    options = options || {}
      
    this.callSuper('initialize', video, 
                   Object.assign({}, defaultOpts, options))
  },
  _draw: function (video,ctx,w,h) {
    const c = this.cropRect
    const d = {
      x: -this.width/2,
      y: -this.height/2,
      w: this.width,
      h: this.height
    }
    if (c) {
      ctx.drawImage(video, d.x, d.y, d.w, d.h)
    } else {
      ctx.drawImage(video, d.x, d.y, d.w, d.h)
    }
  },
  
  _render: function (ctx) {
    // console.log('rendered', this.cropLeft)
    this._draw(this.getElement(), ctx)
  }
})

