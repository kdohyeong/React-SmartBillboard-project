import React, { Fragment } from 'react'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Fsrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/video/test.mp4';
import Isrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/test1.png';               //웹에선 로컬주소를 불러올수없어서 import 시킴
import './DesignCanvas.css';

const fabric = window.fabric;                                                // 윈도우 안에 패브릭을 넣어줌
var $ = require('jquery');                                                   // 제이쿼리를 사용하기로함
let canvas = null;                                                           //컨버스를 전역으로 선언!

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
       
            canvas: null,                                   //캔버스값을 저장을 저장할 그릇
            src1:"http://placehold.it/150x150/848/fff",
            src2:"https://http.cat/100",
            src3:"http://placehold.it/220x220/848/000", 
            src4:"http://html5demos.com/assets/dizzy.mp4",
            src5:"https://http.cat/302", 
            src6:"https://lh3.googleusercontent.com/proxy/Behma-2PNzGok16XGYQz8tStsyGAHpq8kanQl-BHgRYeUaKCtxPkNfzrpmXo4qUjcSDfySDecalkLUHstUIdc0Iym8IDl-oLeNceeEhh-dta1EH1F3v4UP1dFrOjgUgJMi69OlA2VT_N2uNyylBuiNen2hLVK788O3yRjV77hA",     
            scale :0.5,

            mode:"off",
            layoutName: "default",
            // layout: {layout},
            input: ""
      }
  }
  
    // formJson(canvas) {
    // var json = this.state.canvas.toJSON();
    // json.objects.map((data) => this.setState({

    //     id : null,
    //     src: data.src,
    //     width: data.width,
    //     height: data.height,
    //     top: data.top,
    //     left: data.left,
    //     angle: data.angle,
    //     categoty: 'CUSTOM',
    //     type : data.type,
    //     scaleX: data.scaleX,
    //     scaleY: data.scaleY

    //    })
    //   );
    // }
    
  onChange = input => {                                                       //키보드 작동시키는 함수들
    this.setState({ input });                                               
    // console.log("Input changed", input);
  };

  onKeyPress = button => {
    // console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;
      this.setState({
        layoutName: layoutName === "default" ? "shift" : "default"
      });
    };

  onChangeInput = event => {
    const input = event.target.value;  
      this.setState({ input });
      // this.keyboard.setInput(input);                                   
    };
    
  onKeyBoard() {
    if (this.state.mode ==='on'){
      return <Keyboard
          keyboardRef={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />
      }
    }
  
  handleChangeButton() {
    if (this.state.mode === 'on'){
      return <button onClick={() => this.handleChangeMode('off')}>Keyboard Off</button>
      }
    else if (this.state.mode === 'off'){
      return <button onClick={() => this.handleChangeMode('on')}>Keyboard on</button>
      }
    }
  
  handleChangeMode = (mode) => {
    this.setState({ mode: mode });                                          ///여기까지 키보드
    }

  componentDidMount() {

    canvas = new fabric.Canvas(this.c , { backgroundColor : '#fff' });      // 컨버스를 만듬 

    // console.log($('.canvas-container').width())                          //컨테이너 크기를 100%로 하고 그값을 가져올라고 찍어봄
    canvas.setHeight(700);                                                  //캔버스의 크기설정할수 있음
    canvas.setWidth($('.canvas-container').width() * 0.7);                  //75퍼센트만 컨버스 25%는 메뉴 들어갈곳
    this.setState({ canvas })                                               //스테이트에 컨버스내용 저장
    
    dragAndDrop();                                                          //이미지,비디오 드래그 앤 드랍으로 추가
    
    canvas.on('mouse:down', function() { bringFrontIndex() });              //선택한 객체 인덱스 맨앞으로 땡기기
    // console.log(options.e.clientX, options.e.clientY);                   //내 현재 마우스가 클릭한 위치 따기 
                     
    $("#capture").click(function(){ captureButton(); });                    //캡쳐 함수 실행

    $("#delete").click(function(){ deleteObjects(); });                     //삭제 버튼누르면 삭제 함수 실행
                                          
    $("#addtext").click(function(){ addText(); $('#new_text').val(''); });  //텍스트 추가 

    $('#sendbackwards').click(function() { sendBackwards(); });             //선택한 객체의 인덱스를 맨뒤로 보내기 버튼

    $('#bg_color').on('input', function() { bgColor(); });                  //배경색 지정

    $('#text_color').on('input', function() { textColor(); });              //텍스트 색깔  

    $('#text_stroke_color').on('input', function(){ textStrokeColor(); });  //텍스트 테두리 색깔

    $('#text_stroke_width').on('input', function(){ textStrokeWidth(); });  //텍스트 테두리 두께

    $('#text_bg_color').on('input', function(){ textBgColor(); });          //텍스트 배경 색깔
  
    $('#font_family').on('input', function() { fontFamily(); });            //폰트 종류 바꾸기
  
  
  }

  render() {

    return (
      <Fragment>
        <div className="canvas-container" width='100%'>
          <canvas ref={c => (this.c = c)} />            {/*컨버스 참조내용을 c로 받고 그걸 this.c에 넣어서 new fabric.canvas(this.c) */}                                              
                                            
          <div className="furniture">
          
            <div className="addimage">
            <img draggable='true' src={this.state.src1} width='200' height='200' />
            <img draggable='true' src={Isrc} width='200' height='200' />
            <img draggable='true' src={this.state.src2} width='200' height='200' />
            <img draggable='true' src={this.state.src3} width='200' height='200' />
            <img draggable='true' src={this.state.src5} width='200' height='200' />
            <img draggable='true' src="https://i.pinimg.com/originals/e2/b7/da/e2b7da6bc749ba2d7ebdfda28fac6009.gif" width='200' height='200' />
            </div>

            <div className='addvideo'>
            <video draggable='true' src={Fsrc} width="250px" height="250px" muted poster="" />
            <video draggable='true' src="http://html5demos.com/assets/dizzy.mp4" width='250px' height='250px' poster="" loop />
            </div>

          </div>
        
          <div>
          <input
            value={this.state.input}
            placeholder={"Virtual Keyboard Start"}
            onChange={this.onChangeInput}
            type="text"
            id="new_text"
            className="form-control"
          />
          {this.onKeyBoard()}
          <div>

          {this.handleChangeButton()}
          <button id="addtext">Text into Canvas</button>
          <button id="sendbackwards">Send Backwards</button>
          </div>

        <label>Font family</label>
        <select id="font_family">
          <option value="arial black" selected>Arial</option>
          <option value="helvetica" >Helvetica</option>
          <option value="comic sans ms">Comic Sans MS</option>
          <option value="impact">Impact</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="delicious">Delicious</option>
          <option value="verdana">Verdana</option>
          <option value="georgia">Georgia</option>
          <option value="courier">Courier</option>
        </select><br/>

        <label>Background Color</label>
		      		<div>
		      			<input className="color" id="bg_color" type="color" />
		      		</div>
        <label>Text Color</label>
              <div>
                <input className="color" id="text_color" type="color" />
              </div>
        <label>Stroke Color</label>
              <div>
                <input className="color" id="text_stroke_color" type="color" />
              </div>
        <label>Stroke Width</label>
              <div>
                <input className="range"  id="text_stroke_width" type="range" min="1" max="10" defaultValue="1" />
              </div>
        <label>Text Background Color</label>
              <div>
                <input className="color" id="text_bg_color" type="color" />
              </div>
        


        </div>

        <button onClick={e => {
          e.preventDefault()
          console.log(canvas.toJSON());                                 //this.state.canvas.toJSON() 스테이트에도 넣어줬으니 이렇게 해도됌.
        }}>To JSON</button>

        <button id="delete">Delete Selected Image</button>
        <button id="capture">Capture Canvas</button>
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

function addText() { 
  if($('#new_text').val() !=='') {
    var newText = new fabric.IText($('#new_text').val(), {                 ///c val  이놈이 문제였어 이놈이 문자열로 반환해줌
        left: 50,
        top: 100,                                                          // 텍스트 추가
        fontFamily: 'arial black',
        fill: '#333',
        fontSize: 50
      });
      canvas.add(newText);
      canvas.requestRenderAll();
      $('#new_text').val('');
      // console.log($('#new_text'));
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


function dragAndDrop() {                                              // 드래그 엔 드랍 이미지 인
  $(".canvas-container").each(function(index) {
  
  var images = document.querySelectorAll(".addimage img");            // 태그달고있는 전체 NodeList로 반환
  var videos = document.querySelectorAll(".addvideo video");
 
  var canvasObject = $('canvas',this)[0];
  var canvasContainer = $(this)[0];

  var imageOffsetX, imageOffsetY;                                     //좌표 따려고 선언
  var videoOffsetX, videoOffsetY;


  function handleDragStart(e) {                                       //넣을 이미지를 클릭하고 옮기는 딱 start시점에 발생
    // console.log('DragStart');
    // console.log($(this).prop('tagName'));                          //태그이름 따려고 따는놈 반환값= VIDEO OR IMG

    [].forEach.call(images, function(img) {
      img.classList.remove("img_dragging");                           //모든 img중에 classList 에서 dragging 남아있는거 지움 
       // console.log(img.classList);
    });

    if ($(this).prop('tagName') === 'IMG'){
      this.classList.add("img_dragging");                             //태그이름이 이미지일때만 실행해서 넣어줌
      // console.log(this.classList);
      
    var imageOffset = $(this).offset();
        imageOffsetX = e.clientX - imageOffset.left;                  //내가 놓은 위치에 이미지가 그 위치에 안착하게 값 계산
        imageOffsetY = e.clientY - imageOffset.top;
    }

   
    [].forEach.call(videos, function(vid) {
        vid.classList.remove("vid_dragging");                         //이미지랑 마찬가지
      });
      
    if ($(this).prop('tagName') === 'VIDEO'){
      this.classList.add("vid_dragging");

      var videoOffset = $(this).offset();
      videoOffsetX = e.clientX - videoOffset.left;             
      videoOffsetY = e.clientY - videoOffset.top;
    }
  }

  function handleDragOver(e) {                                        //넣을 이미지가 canvas위에서 자리이동할때 불리는함수
    // console.log('drag over');
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "copy";
    return false;
  }

  function handleDragEnter(e) {                                       //넣을 이미지가 canvas안에 들어가는 시점에서 발생되는 함수
    // console.log('drag enter');
  this.classList.add("over");
  // console.log(this.classList);
  }

  function handleDragLeave(e) {                                       //넣을 이미지가 canvas에서 나오는 시점에서 발생되는함수
    // console.log('drag leave');
    this.classList.remove("over");
  }

  async function handleDrop(e) {                                     //넣을 이미지가 canvas위에 드랍됬을때 호출되는함수
    // console.log('drag drop');
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    var img = document.querySelector(".addimage img.img_dragging");                   //저 태그단놈(드래그 중일때만 저 class가 있으니) 선택
    var vid = document.querySelector(".addvideo video.vid_dragging");
    
    // console.log($(".addvideo video"));
    // console.log("event: ", e);

    var offset = $(canvasObject).offset();

    var y = e.clientY - (offset.top + imageOffsetY);    
    var x = e.clientX - (offset.left + imageOffsetX);                                 //이미지 or 동영상 추가될 때 드랍되는 좌표값 

    var vy = e.clientY - (offset.top + videoOffsetY);    
    var vx = e.clientX - (offset.left + videoOffsetX);
    // console.log($(img).prop('tagName'));                                           //태그이름 반환
    
  
    if ($(img).prop('tagName') === 'IMG'){
      var newImage = new fabric.Image(img, { left: x, top: y });                      //이미지 패브릭 만듬
        canvas.add(newImage);
        newImage.scaleToWidth(img.width);                                             //태그에 단 width(200)을 scale to에 넣어줘서 해결
        newImage.scaleToHeight(img.height);
      }


    else if ($(vid).prop('tagName') === 'VIDEO'){                                     //비디오 패브릭 만듬
      var newVideo = new fabric.CustomVideo(vid, {left: vx, top: vy, width: 200, height: 200, cropRect: {x: 200, y: 50, w: 200, h: 200}});
        canvas.add(newVideo);     

      function playTrigger() {
        var vid = $(".addvideo video.vid_dragging");
          if(vid.paused || vid.ended) return false;                                   //비디오의 장면을 현재시간으로 계속 셋팅해서 플레이시킴
            newVideo.set('time', vid.currentTime);
          // console.log('current time:', v.currentTime)
          canvas.renderAll();
          setTimeout(playTrigger,20)
          }   

        newVideo.getElement().addEventListener('play', playTrigger(), false);           
        newVideo.getElement().play();
    }

    return false;
  }

  function handleDragEnd(e) {
    // console.log('Dragend');
    [].forEach.call(images, function(img) {
      img.classList.remove("img_dragging");
    });

    [].forEach.call(videos, function(vid) {
      vid.classList.remove("vid_dragging");
    });
  }

  [].forEach.call(images, function(img) {
    img.addEventListener("dragstart", handleDragStart, false);
    img.addEventListener("dragend", handleDragEnd, false);
  });

  [].forEach.call(videos, function(vid) {
    vid.addEventListener("dragstart", handleDragStart, false);
    vid.addEventListener("dragend", handleDragEnd, false);
  });


  canvasContainer.addEventListener("dragenter", handleDragEnter, false);
  canvasContainer.addEventListener("dragover", handleDragOver, false);
  canvasContainer.addEventListener("dragleave", handleDragLeave, false);
  canvasContainer.addEventListener("drop", handleDrop, false);
  });
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

