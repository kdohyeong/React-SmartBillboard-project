import React, { Fragment } from 'react'
import ReactPlayer from 'react-player'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// import layout from "simple-keyboard-layouts/build/layouts/korean";
import Fsrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/video/test.mp4';
import Isrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/test1.png';
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
    const canvas = this.canvas = new fabric.Canvas(this.c , {backgroundColor : '#fff'});      //컨버스를 만듬 + this.c를 넣는데 this.c는 밑에부분 보셈

    // var width = parseInt(cs.getPropertyValue('width'), 10);
    // var height = parseInt(cs.getPropertyValue('height'), 10);

    
    canvas.setHeight(700);                                          //캔버스의 크기설정할수 있음
    canvas.setWidth(1500);
    this.setState({ canvas })                  
    
    dragAndDrop(canvas);
   
    canvas.on('mouse:down', function(options) {
      console.log(options.e.clientX, options.e.clientY);             //인덱스 따기
      // console.log(canvas.toJSON().objects[0].src);
      getIndex(canvas);
  
      $("#delete").click(function(){
        // canvas.isDrawingMode = false;                        //삭제 버튼누르면 삭제 함수 실행
      deleteObjects(canvas);
  
        });
      });

      // $('#capture').click(function(e){ 
      // 	e.preventDefault();
      //   canvas.renderAll();
      //   console.log(canvas.toDataURL());
      // });
     
      $("#addtext").click(function(e){
        e.preventDefault();
        addText(canvas);                                        //텍스트 추가 이벤트
        $('#new_text').val('');
        
        });  

      $('#bg_color').on('input', function() { 
      	canvas.backgroundColor = $('#bg_color').val();          //컬러설정 이벤트
      	canvas.renderAll();
      });
      
      
      $("#capture").click(function(){
        // canvas.isDrawingMode = false;                        //클릭하면 버튼함수 호출해서 캡쳐따기
        capturebutton(canvas);
  
        });
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
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
      canvas: this.state.canvas,                        //컴포넌트에는 기본적으로 this.props.children이라는걸 다 가지고있는데
      })                                                //  이 놈을 child라는 놈으로 매핑돌리고 그 child라는 놈에다가 
    })                                                   //  this.state.canvas 값을 추가해서 리턴해줌
                                                       
    return (
      <Fragment>
        <div className="canvas-container">
        <canvas ref={c => (this.c = c)}/>            {/*이게 컨버스라는 객체 전체 내용을 ref 로 참조해서 c라고 명시한담에*/}
        {this.state.canvas && children}              {/*그 c를 this.c에 넣어주면 this.c 라는놈이 컨버스 객체의 전체내용을 담고있음*/} 
        </div>                                       {/*그놈을 newCanvas(this.c) 넣어서 컨버스를 만듬 애초에 만들때 */}

        <div className="furniture">
        <img draggable='true' src={this.state.src1} width='200' height='200' />
        <img draggable='true' src={Isrc} width='200' height='200' />
        <img draggable='true' src={this.state.src2} width='200' height='200' />
        <img draggable='true' src={this.state.src3} width='200' height='200' />
        <img draggable='true' src={this.state.src5} width='200' height='200' />
        <ReactPlayer url={this.state.src4} width="250px" height="250px"></ReactPlayer>
        <video src={Fsrc} class='canvas-vid' width="250" height="250"></video>
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
          console.log(this.state.canvas.toJSON());
        }}>To JSON</button>

        <button id="delete">Delete Selected Image</button>
        <button id="capture">Capture Canvas</button>
        
      </Fragment>
      );
  }
}

export default DesignCanvas



function addText(canvas) { 
  if($('#new_text').val() !=='') {
    var newText = new fabric.IText($('#new_text').val(), {                 ///씨 val  이놈이 문제였어 이놈이 
        left: 50,
        top: 100,                                                          //텍스트 추가함수
        fontFamily: 'arial black',
        fill: '#333',
        fontSize: 50
      });
        canvas.add(newText);
        canvas.requestRenderAll();
        $('#new_text').val('');
    }
}

function getIndex(canvas){
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

 
 function deleteObjects(canvas){
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


function dragAndDrop(canvas) {                        // 함수 외부에서 컨버스를 만들었으니 매개변수로 넣어줌  드래그 엔 드랍 이미지 인
  $(".canvas-container").each(function(index) {

  var images = document.querySelectorAll(".furniture img");
 
  var canvasObject = $('canvas',this)[0];
  var canvasContainer = $(this)[0];

  var imageOffsetX, imageOffsetY;

  function handleDragStart(e) {  //넣을 이미지를 클릭하고 옮기는 딱 start시점에 발생
    console.log('DragStart');
  
    [].forEach.call(images, function(img) {
      img.classList.remove("img_dragging");
      // console.log(img.classList);
    });
    this.classList.add("img_dragging");
    // console.log(this.classList);
    var imageOffset = $(this).offset();
        imageOffsetX = e.clientX - imageOffset.left;  //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
        imageOffsetY = e.clientY - imageOffset.top;
 
  }

  function handleDragOver(e) {   //넣을 이미지가 canvas위에서 자리이동할때 불리는함수
    console.log('drag over');
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "copy";
    return false;
  }

  function handleDragEnter(e) {  //넣을 이미지가 canvas안에 들어가는 시점에서 발생되는 함수(start와는다름)
    console.log('drag enter');
  this.classList.add("over");
  // console.log(this.classList);
  }

  function handleDragLeave(e) {  //넣을 이미지가 canvas에서 나오는 시점에서 발생되는함수
    console.log('drag leave');
    this.classList.remove("over");
  }

  async function handleDrop(e) {    //넣을 이미지가 canvas위에 드랍됬을때 호출되는함수
    console.log('drag drop');
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    var img = document.querySelector(".furniture img.img_dragging");
    
    

    console.log("event: ", e);

    var offset = $(canvasObject).offset();
        var y = e.clientY - (offset.top + imageOffsetY);    //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
        var x = e.clientX - (offset.left + imageOffsetX);

    var newImage = new fabric.Image(img, { 
          left: x, 
          top: y,
        });                                                         //이미지 패브릭 만듬
        canvas.add(newImage);

    return false;
  }

  function handleDragEnd(e) {
    console.log('Dragend');
    [].forEach.call(images, function(img) {
      img.classList.remove("img_dragging");
    });
  }

  [].forEach.call(images, function(img) {
    img.addEventListener("dragstart", handleDragStart, false);
    img.addEventListener("dragend", handleDragEnd, false);
  });
  

  canvasContainer.addEventListener("dragenter", handleDragEnter, false);
  canvasContainer.addEventListener("dragover", handleDragOver, false);
  canvasContainer.addEventListener("dragleave", handleDragLeave, false);
  canvasContainer.addEventListener("drop", handleDrop, false);

  });
}

function capturebutton(canvas){
    canvas.requestRenderAll();                                               //캔버스 전체를 캡쳐따오기
    console.log(canvas.toDataURL('image/png'));
}