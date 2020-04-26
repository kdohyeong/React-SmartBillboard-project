import React, { Fragment } from 'react'
// import ReactPlayer from 'react-player'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// import layout from "simple-keyboard-layouts/build/layouts/korean";
import Fsrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/video/test.mp4';
import Isrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/test1.png';               //웹에선 로컬주소를 불러올수없어서 import 시킴
import './DesignCanvas.css';

const fabric = window.fabric                                                // 윈도우 안에 패브릭을 넣어줌
var $ = require('jquery')                                                   // 제이쿼리를 사용하기로함


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
    
    onChange = input => {
      this.setState({ input });                                         //키보드 작동시키는 함수들
      console.log("Input changed", input);
    };

    onKeyPress = button => {
      console.log("Button pressed", button);
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
      // this.keyboard.setInput(input);                                     ///여기까지 키보드
    };
    

  componentDidMount = () => {
                
      canvas = new fabric.Canvas(this.c , {backgroundColor : '#fff'});      // 컨버스를 만듬 
      canvas.setHeight(700);                                                //캔버스의 크기설정할수 있음
      canvas.setWidth(1500);
      this.setState({ canvas })                                             //스테이트에 컨버스내용 저장
    
      dragAndDrop();                                                        //이미지 드래그앤드랍 실행
      // VdragAndDrop();

      canvas.on('mouse:down', function(options) {
      // console.log(options.e.clientX, options.e.clientY);                 //내 현재 마우스가 클릭한 위치 따기     
      getIndex();
      });

      $("#delete").click(function(e){
        // e.preventDefault();
        // canvas.isDrawingMode = false;                                    //삭제 버튼누르면 삭제 함수 실행
        deleteObjects();
        });
     
      $("#addtext").click(function(e){
        // e.preventDefault();
        addText();                                                          //텍스트 추가
        $('#new_text').val('');
        });  

      $('#bg_color').on('input', function() { 
      	canvas.backgroundColor = $('#bg_color').val();                      //배경 컬러설정 
      	canvas.renderAll();
        });
      
      $("#capture").click(function(){
        // canvas.isDrawingMode = false;                                    //클릭하면 버튼함수 호출해서 캡쳐따기
        capturebutton();
        });

      // $(".addvideo video").on('click', function(e){                         ///$("#addvideo").click(function(e){                
      //   // e.preventDefault();                                              //이런식으로 주면 배열하나에 첫번째껏만 들어가는 오류 발생해서 안됐음.  
      //   // console.log($(this)[0]);
      //   // addVideo($(this)[0]);
      //   addVideo(e.target);                                                 //텍스트 추가
      //   });  

  }

  onKeyBoard() {
    if (this.state.mode ==='on'){
      return <Keyboard
          keyboardRef={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          // layout= {layout}
        />
      }
    }

    handleChangebutton(){
      if (this.state.mode === 'on'){
      return <button onClick={() => this.handleChangeMode('off')}>Keyboard Off</button>
      }
      else if (this.state.mode === 'off'){
      return <button onClick={() => this.handleChangeMode('on')}>Keyboard on</button>
      }
    }

   handleChangeMode = (mode) => {
    this.setState({
       mode: mode
        });
      }
    


  render() {
    // const children = React.Children.map(this.props.children, child => {
    //   return React.cloneElement(child, {
    //   canvas: this.state.canvas,                        //컴포넌트에는 기본적으로 this.props.children이라는걸 다 가지고있는데
    //   })                                                //  이 놈을 child라는 놈으로 매핑돌리고 그 child라는 놈에다가 
    // })                                                   //  this.state.canvas 값을 추가해서 리턴해줌
                                                       
    return (
      <Fragment>
        <div className="canvas-container">
        <canvas ref={c => (this.c = c)}/>            {/*이게 컨버스라는 객체 전체 내용을 ref 로 참조해서 c라고 명시한담에*/}
        {/* {this.state.canvas && children}  */}
                                                     {/*그 c를 this.c에 넣어주면 this.c 라는놈이 컨버스 객체의 전체내용을 담고있음*/} 
        </div>                                       {/*그놈을 newCanvas(this.c) 넣어서 컨버스를 만듬 애초에 만들때 */}

        <div className="furniture">
        
        <div className="addimage">
        <img draggable='true' src={this.state.src1} width='200' height='200' />
        <img draggable='true' src={Isrc} width='200' height='200' />
        <img draggable='true' src={this.state.src2} width='200' height='200' />
        <img draggable='true' src={this.state.src3} width='200' height='200' />
        <img draggable='true' src={this.state.src5} width='200' height='200' />
        </div>

        <div className='addvideo'>
        <video draggable='true' src={Fsrc} width="250px" height="250px" muted poster controls/>
        <video draggable='true' src="http://html5demos.com/assets/dizzy.mp4" width='250px' height='250px' poster loop />
        {/* <ReactPlayer url={this.state.src4} width="250px" height="250px" /> */}
        </div>

        </div>
        
        <div>
        <input
          value={this.state.input}
          placeholder={"Virtual Keyboard Start"}
          onChange={this.onChangeInput}
          type="text"
          id="new_text"
          class="form-control"
        />
        {this.onKeyBoard()}
        <div>
        {this.handleChangebutton()}
        <button id="addtext">Text into Canvas</button>
        </div>
        <div class="col-md-9">Background Color</div>
		      		<div class="col-md-3">
		      			<input className="color"type="color" id="bg_color"/>
		      		</div>
        </div>

        <button onClick={e => {
          e.preventDefault()
          console.log(canvas.toJSON());                                 //this.state.canvas.toJSON() 스테이트에도 넣어줬으니 이렇게 해도됌.
        }}>To JSON</button>

        <button id="delete">Delete Selected Image</button>
        <button id="capture">Capture Canvas</button>
        
      </Fragment>
      );
  }
}

export default DesignCanvas


let canvas = null; //new fabric.Canvas(this.c , {backgroundColor : '#fff'});      //컨버스를 전역으로 선언!


function addText() { 
  if($('#new_text').val() !=='') {
    var newText = new fabric.IText($('#new_text').val(), {                 ///c val  이놈이 문제였어 이놈이 
        left: 50,
        top: 100,                                                          // 텍스트 추가
        fontFamily: 'arial black',
        fill: '#333',
        fontSize: 50
      });
        canvas.add(newText);
        canvas.requestRenderAll();
        $('#new_text').val('');
        console.log($('#new_text'));
    }
}

function getIndex(){
  var activeObj = canvas.getActiveObject();
  
  // if (activeObj){
  //   if (activeObj._element.currentSrc === canvas.toJSON().objects[0].src){
  // console.log(activeObj._element.currentSrc);
  //   }
    // console.log(activeObj._element.currentSrc);
    //   }
  canvas.bringToFront(activeObj);                                                  //클릭한놈 인덱스를 제일 앞으로 당겨옴 
  console.log(activeObj && canvas.getObjects().indexOf(activeObj));                //콘솔에 인덱스 찍어봄 확인용
  return activeObj && canvas.getObjects().indexOf(activeObj)
 }

 
 function deleteObjects(){
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


function dragAndDrop() {                                        // 드래그 엔 드랍 이미지 인
  $(".canvas-container").each(function(index) {

  var images = document.querySelectorAll(".addimage img");
  var videos = document.querySelectorAll(".addvideo video");


  var canvasObject = $('canvas',this)[0];
  var canvasContainer = $(this)[0];

  var imageOffsetX, imageOffsetY;
  var videoOffsetX, videoOffsetY;


  function handleDragStart(e) {                                    //넣을 이미지를 클릭하고 옮기는 딱 start시점에 발생
    console.log('DragStart');
  
    console.log($(this).prop('tagName'));

    [].forEach.call(images, function(img) {
      img.classList.remove("img_dragging");
       // console.log(img.classList);
    });

    if ($(this).prop('tagName') === 'IMG'){
      this.classList.add("img_dragging");
      // console.log(this.classList);
      
    var imageOffset = $(this).offset();
        imageOffsetX = e.clientX - imageOffset.left;             //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
        imageOffsetY = e.clientY - imageOffset.top;
    }

   
    [].forEach.call(videos, function(vid) {
        vid.classList.remove("vid_dragging");
      });
    if ($(this).prop('tagName') === 'VIDEO'){
      this.classList.add("vid_dragging");

      var videoOffset = $(this).offset();
      videoOffsetX = e.clientX - videoOffset.left;             //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
      videoOffsetY = e.clientY - videoOffset.top;
    }
  }

  function handleDragOver(e) {                                  //넣을 이미지가 canvas위에서 자리이동할때 불리는함수
    console.log('drag over');
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "copy";
    return false;
  }

  function handleDragEnter(e) {                             //넣을 이미지가 canvas안에 들어가는 시점에서 발생되는 함수(start와는다름)
    console.log('drag enter');
  this.classList.add("over");
  // console.log(this.classList);
  }

  function handleDragLeave(e) {                                //넣을 이미지가 canvas에서 나오는 시점에서 발생되는함수
    console.log('drag leave');
    this.classList.remove("over");
  }

  async function handleDrop(e) {                              //넣을 이미지가 canvas위에 드랍됬을때 호출되는함수
    console.log('drag drop');
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    var img = document.querySelector(".addimage img.img_dragging");
    var vid = document.querySelector(".addvideo video.vid_dragging");
    
    console.log($(".addvideo video"));

    console.log("event: ", e);

    var offset = $(canvasObject).offset();

    var y = e.clientY - (offset.top + imageOffsetY);    //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
    var x = e.clientX - (offset.left + imageOffsetX);

    var vy = e.clientY - (offset.top + videoOffsetY);    //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
    var vx = e.clientX - (offset.left + videoOffsetX);
    console.log($(img).prop('tagName'));

    if ($(img).prop('tagName') === 'IMG'){
      var newImage = new fabric.Image(img, {left: x, top: y, });                                                         //이미지 패브릭 만듬
          canvas.add(newImage);
        }

    else if ($(vid).prop('tagName') === 'VIDEO'){
      var newVideo = new fabric.CustomVideo(vid, {left: vx, top: vy, width: 200, height: 200, cropRect: {x: 200, y: 50, w: 200, h: 200}});
      canvas.add(newVideo);     

      function playTrigger(){
        var vid = $(".addvideo video.vid_dragging");
          if(vid.paused || vid.ended) return false;                               //비디오를 현재시간으로 계속 셋팅해서 플레이시킴
            newVideo.set('time', vid.currentTime)
          // console.log('current time:', v.currentTime)
          canvas.renderAll()
          setTimeout(playTrigger,20)
          }   

        newVideo.getElement().addEventListener('play', playTrigger(), false);           
        newVideo.getElement().play();
    }

    return false;
  }

  function handleDragEnd(e) {
    console.log('Dragend');
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

function capturebutton(){
    var img = canvas.requestRenderAll();         
    setTimeout(() => {  
    var imgs = img.toDataURL('image/jpeg')                                                         //캔버스 전체를 캡쳐따오기
    console.log(imgs);
  }, 2000)
}

///비디오 넣기위해 클래스 객체로 커스텀으로 만들어줌. 
fabric.CustomVideo = fabric.util.createClass(fabric.Image, {
  type: 'video',
  cropRect: null,                                              //비디오에서 부분만 짜를때 쓸꺼
  
  initialize: function (video, options) {
    const defaultOpts = {
      lockRotation: false,                                 //앵글 돌리기 잠금
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


// function addVideo(selected) {
//   // console.log($('#addvideo')[0]);                                   //  이거 존나 중요!!!! 
//   // console.log(document.getElementById('addvideo'));

// var vid = selected; //$('.addvideo video');
// const newVideo = new fabric.CustomVideo(vid, {left: 50, top: 0, width: 200, height: 200, cropRect: {x: 200, y: 50, w: 200, h: 200}});

// canvas.add(newVideo);                                                      //비디오 추가

// newVideo.getElement().addEventListener('play', playTrigger, false);           
// newVideo.getElement().play();


// function playTrigger() {
// if(vid.paused || vid.ended) return false;                               //비디오를 현재시간으로 계속 셋팅해서 플레이시킴
// newVideo.set('time', vid.currentTime)
// // console.log('current time:', v.currentTime)
// canvas.renderAll()
// setTimeout(playTrigger,20)
// }
// }






// function VdragAndDrop() {                                        // 드래그 엔 드랍 이미지 인
//   $(".canvas-container").each(function(index) {

//   var videos = document.querySelectorAll(".addvideo video");
 
//   var canvasObject = $('canvas',this)[0];
//   var canvasContainer = $(this)[0];

//   var videoOffsetX, videoOffsetY;

//   function handleDragStart(e) {                                    //넣을 이미지를 클릭하고 옮기는 딱 start시점에 발생
//     console.log('DragStart');
  
//     [].forEach.call(videos, function(vid) {
//       vid.classList.remove("vid_dragging");
//       // console.log(img.classList);
//     });
//     this.classList.add("vid_dragging");
//     // console.log(this.classList);
//     var videoOffset = $(this).offset();
//         videoOffsetX = e.clientX - videoOffset.left;             //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
//         videoOffsetY = e.clientY - videoOffset.top;
 
//   }

//   function handleDragOver(e) {                                  //넣을 이미지가 canvas위에서 자리이동할때 불리는함수
//     console.log('drag over');
//     if (e.preventDefault) {
//       e.preventDefault();
//     }
//     e.dataTransfer.dropEffect = "copy";
//     return false;
//   }

//   function handleDragEnter(e) {                             //넣을 이미지가 canvas안에 들어가는 시점에서 발생되는 함수(start와는다름)
//     console.log('drag enter');
//   this.classList.add("over");
//   // console.log(this.classList);
//   }

//   function handleDragLeave(e) {                                //넣을 이미지가 canvas에서 나오는 시점에서 발생되는함수
//     console.log('drag leave');
//     this.classList.remove("over");
//   }

//   async function handleDrop(e) {                              //넣을 이미지가 canvas위에 드랍됬을때 호출되는함수
//     console.log('drag drop');
//     e = e || window.event;
//     if (e.preventDefault) {
//       e.preventDefault();
//     }
//     if (e.stopPropagation) {
//       e.stopPropagation();
//     }

//     var vid = document.querySelector(".addvideo video.vid_dragging");
    
    
//     console.log("event: ", e);

//     var offset = $(canvasObject).offset();
//         var y = e.clientY - (offset.top + videoOffsetY);    //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
//         var x = e.clientX - (offset.left + videoOffsetX);

    
//     const newVideo = new fabric.CustomVideo(vid, {left: x, top: y, width: 200, height: 200, cropRect: {x: 200, y: 50, w: 200, h: 200}});

//     canvas.add(newVideo);                                                      //비디오 추가

//     if (newVideo !== null){
//     newVideo.getElement().addEventListener('play', playTrigger, false);           
//     newVideo.getElement().play();

//     }

//     function playTrigger() {
//     if(vid.paused || vid.ended) return false;                               //비디오를 현재시간으로 계속 셋팅해서 플레이시킴
//     newVideo.set('time', vid.currentTime)
//     // console.log('current time:', v.currentTime)
//     canvas.renderAll()
//     setTimeout(playTrigger,20)
//     }   

//       return false;
//     }


//   function handleDragEnd(e) {
//     console.log('Dragend');
//     [].forEach.call(videos, function(vid) {
//       vid.classList.remove("vid_dragging");
//     });
//   }

//   [].forEach.call(videos, function(vid) {
//     vid.addEventListener("dragstart", handleDragStart, false);
//     vid.addEventListener("dragend", handleDragEnd, false);
//   });
  

//   canvasContainer.addEventListener("dragenter", handleDragEnter, false);
//   canvasContainer.addEventListener("dragover", handleDragOver, false);
//   canvasContainer.addEventListener("dragleave", handleDragLeave, false);
//   canvasContainer.addEventListener("drop", handleDrop, false);

//   });
// }

