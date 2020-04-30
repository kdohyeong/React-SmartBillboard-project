import React, { Fragment } from 'react'
import './DesignCanvas.css';
import Image from './Image.js'
import Video from './Video.js'
import Text from './Text.js'

import { dragAndDrop } from '../utils/canvas';

const fabric = window.fabric;                                                //윈도우 안에 패브릭을 넣어줌
var $ = require('jquery');                                                   //제이쿼리를 사용하기로함
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
       
            canvas: null,                                                   //캔버스값을 저장을 저장할 그릇  
            menu : 'IMAGE'                                     
      }
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.c , { backgroundColor : '#fff' });      // 컨버스를 만듬 
    dragAndDrop(canvas)

    // console.log($('.canvas-container').width())                          //컨테이너 크기를 100%로 하고 그값을 가져올라고 찍어봄
    canvas.setHeight($('.canvas-wrapper').height());                                                  //캔버스의 크기설정할수 있음
    canvas.setWidth($('.canvas-wrapper').width());                  //75퍼센트만 컨버스 25%는 메뉴 들어갈곳
    this.setState({ canvas }) 
                
    
    canvas.on('mouse:down', function() { bringFrontIndex() });              //선택한 객체 인덱스 맨앞으로 땡기기
    // console.log(options.e.clientX, options.e.clientY);                   //내 현재 마우스가 클릭한 위치 따기 
                     
    $("#capture").click(function(){ captureButton(); });                    //캡쳐 함수 실행

    $("#delete").click(function(){ deleteObjects(); });                     //삭제 버튼누르면 삭제 함수 실행
                                          
     //텍스트 추가 

    $('#sendbackwards').click(function() { sendBackwards(); });             //선택한 객체의 인덱스를 맨뒤로 보내기 버튼

    $('#bg_color').on('input', function() { bgColor(); });                  //배경색 지정

                //텍스트 색깔  

     //텍스트 테두리 색깔

     //텍스트 테두리 두께

          //텍스트 배경 색깔
  
              //폰트 종류 바꾸기//스테이트에 컨버스내용 저장


  }

  componentDidUpdate(){


    // $("#addtext").click(function(){ addText(); $('#new_text').val(''); });

    $('#text_color').on('input', function() { textColor(); });  

    $('#text_bg_color').on('input', function(){ textBgColor(); });   

    $('#font_family').on('input', function() { fontFamily(); });  

    $('#text_stroke_width').on('input', function(){ textStrokeWidth(); });

    $('#text_stroke_color').on('input', function(){ textStrokeColor(); }); 
  }

  handleMenuChange(menu){
     this.setState({ menu : menu })
    };

    handleFurnitureChange() {
      if (this.state.menu === 'IMAGE'){ 
        return (
        <div className="addimage"> 
          <Image></Image> 
        </div>
        ); 
      }
      else if(this.state.menu === 'VIDEO'){ 
        return (
        <div className='addvideo'>  
          <Video></Video> 
        </div>
        ); 
      }
      else if (this.state.menu === 'TEXT'){ 
        return (
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
            
            <button id="delete">Delete Selected Image</button>
            <button id="sendbackwards">Send Backwards</button>
            <button id="capture">Capture Canvas</button>

            <button onClick={e => { e.preventDefault(); console.log(canvas.toJSON()); }}>To JSON</button>
          </div>


          <div className="furniture">

            { this.handleFurnitureChange() }
            {/* <div id="sideimage"className="addimage"> 
              <Image></Image> 
            </div>
            

            <div id="sidevideo" className='addvideo'> 
              <Video></Video> 
            </div>
          
            <div id="sidetext" className="addtext">
              <Text></Text>
            </div> */}
          </div>

        </div>
     
      </Fragment>
      );
  }
}

export default DesignCanvas

function textColor() {
  // console.log(canvas.getActiveObject());
if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       //선택한 객체가 undefined나 null이 아닐때, 
  if (canvas.getActiveObject().text){                                                   //선택한 객체가 text일때만 실행시키기 위해서
  canvas.getActiveObject().set({ fill: $('#text_color').val() });                                //텍스트 색깔 설정
  canvas.renderAll();
  // console.log(canvas.getActiveObject());
    }
  }
}

function fontFamily() {
  // console.log(canvas.getActiveObject());
if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       //선택한 객체가 undefined나 null이 아닐때, 
  if (canvas.getActiveObject().text){                                                   //선택한 객체가 text일때만 실행시키기 위해서
  canvas.getActiveObject().set({ fontFamily: $('#font_family').val() });                                //텍스트 색깔 설정
  canvas.renderAll();
  // console.log(canvas.getActiveObject());
    }
  }
}

function bgColor() {
  canvas.backgroundColor = $('#bg_color').val();                                          //컨버스 배경 컬러설정 
  canvas.renderAll();
}

function textStrokeColor() {
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       //선택한 객체가 undefined나 null이 아닐때, 
    if (canvas.getActiveObject().text){                                                   //선택한 객체가 text일때만 실행시키기 위해서
    canvas.getActiveObject().set({ stroke: $('#text_stroke_color').val() });                     //텍스트 테두리 색깔 설정
    canvas.renderAll();
    }
  }
}

function textStrokeWidth() {
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       //선택한 객체가 undefined나 null이 아닐때, 
    if (canvas.getActiveObject().text){                                                   //선택한 객체가 text일때만 실행시키기 위해서
    canvas.getActiveObject().set({ strokeWidth: $('#text_stroke_width').val() });                     //텍스트 테두리 색깔 설정
    canvas.renderAll();
    }
  }
}

function textBgColor() {
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       //선택한 객체가 undefined나 null이 아닐때, 
    if (canvas.getActiveObject().text){                                                   //선택한 객체가 text일때만 실행시키기 위해서
    canvas.getActiveObject().set({ backgroundColor: $('#text_bg_color').val() });                //텍스트 배경 색깔 설정
    canvas.renderAll();
    }
  }
}

function sendBackwards() {
  var activeObj = canvas.getActiveObject();
  if (activeObj){
    canvas.sendToBack(activeObj);
    canvas.discardActiveObject();
  }
}

function bringFrontIndex() {
  var activeObj = canvas.getActiveObject();  
  canvas.bringToFront(activeObj);                                                     //클릭한놈 인덱스를 제일 앞으로 당겨옴 
  // console.log(activeObj && canvas.getObjects().indexOf(activeObj));                //콘솔에 인덱스 찍어봄 확인용
  // return activeObj && canvas.getObjects().indexOf(activeObj)
}

function deleteObjects() {
  var activeObject = canvas.getActiveObjects(),                                   //삭제함수
      activeobjectGroup = new fabric.ActiveSelection(activeObject, {              //여러개 선택하면 삭제 안되니깐 새로 패브릭으로 만들어주고
      canvas: canvas                                                              // 그걸 통으로 지우는 방식
    });
    if (activeobjectGroup) {
      // console.log(activeobjectGroup);
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

function captureButton() {
    var img = canvas.requestRenderAll();         
    setTimeout(() => {  
    var imgs = img.toDataURL('image/jpeg')                                                 //캔버스 전체를 캡쳐따오기
    console.log(imgs);
  }, 2000)
}


///비디오 넣기위해 클래스 객체로 커스텀으로 만들어줌. 
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

