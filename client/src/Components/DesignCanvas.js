import React, { Fragment } from 'react'

const fabric = window.fabric   // 윈도우 안에 패브릭을 넣어줌
var $ = require('jquery')     // 제이쿼리를 사용하기로함


class DesignCanvas extends React.Component {

  state = {
  canvas: null,                                   //캔버스값을 저장을 저장할 그릇
  src1:"http://placehold.it/150x150/848/fff",
  src2:"https://http.cat/100",
  src3:"http://placehold.it/220x220/848/000",       
  scale :0.5,

  }

  
  componentDidMount() {
    const canvas = new fabric.Canvas(this.c)          //컨버스를 만듬 + this.c를 넣는데 this.c는 밑에부분 보셈
    canvas.setHeight(700);                            //캔버스의 크기설정할수 있음
    canvas.setWidth(1500);
    this.setState({ canvas })                  
    dragAndDrop(canvas);
    canvas.on('mouse:down', function(options) {
    console.log(options.e.clientX, options.e.clientY);
    getIndex(canvas);

    $("#delete").click(function(){
      // canvas.isDrawingMode = false;                        //삭제 버튼누르면 삭제 함수 실행
      deleteObjects(canvas);
    });
    
    // canvas.item(0).sourcePath = '/assets/dragon.svg';
    // console.log(JSON.stringify(canvas.toDatalessJSON()));
    console.log(canvas.toJSON());
    
    });
      
  }      
     
  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
      canvas: this.state.canvas,                        //컴포넌트에는 기본적으로 this.props.children이라는걸 다 가지고있는데
      })                                                //  이 놈을 child라는 놈으로 매핑돌리고 그 child라는 놈에다가 
    })                                                  //  this.state.canvas 값을 추가해서 리턴해줌
    
    return (
      <Fragment>
        <div className="canvas-container">
        <canvas ref={c => (this.c = c)}/>            {/*이게 컨버스라는 객체 전체 내용을 ref 로 참조해서 c라고 명시한담에*/}
        {this.state.canvas && children}              {/*그 c를 this.c에 넣어주면 this.c 라는놈이 컨버스 객체의 전체내용을 담고있음*/} 
        </div>                                       {/*그놈을 newCanvas(this.c) 넣어서 컨버스를 만듬 애초에 만들때 */}

        <div className="furniture">
        <img draggable='true' src={this.state.src1} width='200' height='300' />
        {/* </div>
        <div className="furniture"> */}
        <img draggable='true' src={this.state.src2} width='200' height='200' />
        {/* </div>
        <div className="furniture"> */}
        <img draggable='true' src={this.state.src3} width='200' height='200' />
        </div>

        <button onClick={e => {
          e.preventDefault()
          console.log(this.state.canvas.toJSON());
        }}>To JSON</button>

        <button id="delete">Delete selected object(s)</button>
        

      </Fragment>
      );
  }
}

export default DesignCanvas



// function saveCanvas(canvas) {
//   console.log(canvas.getObjects().indexOf($('furniture')));
// }


function getIndex(canvas){
  var activeObj = canvas.getActiveObject();
  canvas.bringToFront(activeObj);                                                  //씨발 일단 인덱스는 땄는데 도대체 어케해야 toJSON에 
  console.log(activeObj && canvas.getObjects().indexOf(activeObj));                //이걸 넣을수 있는지 모르겠다
  // return activeObj && canvas.getObjects().indexOf(activeObj)
 }

 function deleteObjects(canvas){
  var activeObject = canvas.getActiveObjects(),
      activeobjectGroup = new fabric.ActiveSelection(activeObject, {              //여러개 선택하면 삭제 안되니깐 새로 패브릭으로 만들어주고
      canvas: canvas                                                              // 그걸 통으로 지우는 방식
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


function dragAndDrop(canvas) {                        // 함수 외부에서 컨버스를 만들었으니 매개변수로 넣어줌
  $(".canvas-container").each(function(index) {

  var images = document.querySelectorAll(".furniture img");
  var videos = document.querySelectorAll(".furniture video");
  var canvasContainer = $(this)[0];

  function handleDragStart(e) {  //넣을 이미지를 클릭하고 옮기는 딱 start시점에 발생
    console.log('DragStart');
    [].forEach.call(images, function(img) {
      img.classList.remove("img_dragging");
      // console.log(img.classList);
    });
    this.classList.add("img_dragging");
    // console.log(this.classList);
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

    var newImage = new fabric.Image(img, { 
        
        });        
        canvas.add(newImage);


    // fabric.Image.fromURL(img.src, img => {
    // canvas.add(img)
    // })

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
