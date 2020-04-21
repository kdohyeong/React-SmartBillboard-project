import React, { Fragment } from 'react'

const fabric = window.fabric   // 윈도우 안에 패브릭을 넣어줌
var $ = require('jquery')


class DesignCanvas extends React.Component {

  state = {
  canvas: null,
  src1:"http://placehold.it/150x150/848/fff",
  src2:"https://http.cat/100",
  src3:"http://placehold.it/220x220/848/000",
  scale :0.5,

  }

  
  componentDidMount() {
    const canvas = new fabric.Canvas(this.c)
    canvas.setHeight(700); //캔버스의 크기설정할수 있음
    canvas.setWidth(1500);
    this.setState({ canvas })
    dragAndDrop(canvas);
  }      
     
  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
      canvas: this.state.canvas,
      })
    })
    
    
    return (
      <Fragment>
        <div className="canvas-container">
        <canvas ref={c => (this.c = c)}/>
        {this.state.canvas && children}
        </div>

        <div className="furniture">
        <img draggable='true' src={this.state.src1} width='200' height='200'/>
        </div>
        <div className="furniture">
        <img draggable='true' src={this.state.src2} width='200'/>
        </div>
        <div className="furniture">
        <img draggable='true' src={this.state.src3} width='200'/>
        </div>

        <button onClick={e => {
          e.preventDefault()
          console.log(this.state.canvas.toJSON())
        }}>To JSON</button>
        
      </Fragment>
      );
  }
}

export default DesignCanvas

function dragAndDrop(canvas) {
  $(".canvas-container").each(function(index) {

  var images = document.querySelectorAll(".furniture img");
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

    fabric.Image.fromURL(img.src, img => {
    canvas.add(img)
    })

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
