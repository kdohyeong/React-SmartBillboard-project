import React, { Fragment } from 'react'

const fabric = window.fabric   // 윈도우 안에 패브릭을 넣어줌
var $ = require('jquery')


class DesignCanvas extends React.Component {
  componentDidMount() {
    
    initCanvas();
        
     }      

  render() {

    return (
      <Fragment>
        <div className="canvas-container">
        <canvas ref={c => (this.c = c)} />
        </div>
                  <div className="furniture">
                      <img draggable ="true" src="https://placeimg.com/80/64/1"/>
                    </div>
                    <div className="furniture">
                        <img draggable ="true" src="https://placeimg.com/80/64/3"/>
                    </div>
        
      </Fragment>
    );
  }
}

export default DesignCanvas

  function initCanvas() {
    $(this.c).each(function(index) {
      // console.log($(".canvas-container"));
      var canvasContainer = $(this.c);
      // console.log($('canvas-container'));
      console.log($(this[0]));
      var canvasObject = $(this.c);  
      console.log(this.c);    ///this는 전달받은 객체와 같음!
      var url = $(this).data("floorplan");
      var canvas = (window._canvas = new fabric.Canvas(this.c));

      canvas.setHeight(1000); //캔버스의 크기설정할수 있음
      canvas.setWidth(1000);
      canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas));
  
      var imageOffsetX, imageOffsetY;
  
      function handleDragStart(e) {  //넣을 이미지를 클릭하고 옮기는 딱 start시점에 발생
        console.log('DragStart');
        [].forEach.call(images, function(img) {
          img.classList.remove("img_dragging");
        });
        this.classList.add("img_dragging");
  
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
      }
  
      function handleDragLeave(e) {  //넣을 이미지가 canvas에서 나오는 시점에서 발생되는함수
        console.log('drag leave');
        this.classList.remove("over");
      }
// ㄴㄴ 그냥 어차피 여기서만 쓰이는 함수이고기addEventListener은 무조건 한번만 해야돼 여러번 하면 여러번 불리게 돼서 하면 안돼 그래서 componentDidMount에 넣어서
// 한번만 호출하게 한거고 거  addEventListener은 무조건 한번만 해야 너 이거 어찌알았냐? 한번만 해야한다는건 의무사항임 시발
//근데 지금이거 응용해서 이미지하나가 아니라 저네 페이지에있는것처럼 다른 이미지도 똑같이 적용할수 있겠지?할수있겠찌 ㅇㅇ시발 고맙ㄷ캉ㅋ ㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅇㅋㅋㅇㅋㅋㅋㅋㅇㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅈㅋ캌ㅋㅋㄹㅋ캌ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅈ캌ㅋㅋㅋㅋㄹ캌ㅋ
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
        var y = e.clientY - (offset.top + imageOffsetY); //내가 놓은 위치에 이미지가 그 위치에 안착하게 도와주는부분
        var x = e.clientX - (offset.left + imageOffsetX);
  
        var newImage = new fabric.Image(img, {//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1여기서 img란 밑에 삽입되길 기다리는 놈이 img를 의미함,위에서의  src={this.props.basket[0]} width='600' 이놈의 width통제받는다는말
          width: img.width,   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!img.width    이부분존나중요!!!!!!!!!!이미지가 canvas에 들어가는순간 바뀌는 크기지정하는곳!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          height: img.height,  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!img.height    width랑 height을 600 , 600 으로 하면 보임, 사진이 짤리고 안짤리고는 이부분과, Testhome에 있는 이미지원본크기 이 둘사이의 상관관계에 의해 사진이 짤리고 안짤리고가결정남
          left: x,           //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1!!!!!!!!!!!!!!!!!!!!!!!!!Testhome에서 받는 원본이미지가 존나 크면 잘려나오고, 감당이 되는 사이즈가 주어지면 제대로나옴, 
          top: y                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Testhome의 원본이미지가 800 800크긴데 여기서 width 400 height 400 주면 짤려나오고
        });                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Testhome이 800800 인데 여기서 width 800 hetight 800 주면 제대로 다나옴, 여기서 width height은 기준이 Lest ,Top 왼쪽윗꼭지점기준 width height이여서 원본이미지크기보다 작게 canvas에서 찍을경우 잘려나오는것임
      
        canvas.add(newImage);
       
       //////////////////////////////////////////////////////////////////////  
     // 여기부분이 드랍되는 순간 canvas.add로 새로운 이미지 쳐넣는부분 난 이 이미지를 따고싶다
    //  canvas.requestRenderAll();  
    //  var can = document.getElementById('test');
    //   setTimeout(() => {
    //     console.log(can.toDataURL('image/png'));
    //    }, 1000)
        ////////////////////////////////////////////////////////////////////이부분이 이미지캡쳐의생명!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //이부분만 추가되면 이미지 캡쳐된 파일 딸수있음........근데 local이미지에 한정되서 딸수있음!!!그래서 CORS문제 해결해야함..CORS문제해결하려면 S3와연결된 node서버쪽에서
        //내쪽으로 이미지 보내는 그 js.파일위에다가
        //app.all('/*', function(req, res, next) { //이미지 권한문제의 핵심 나중에 서버쪽 사람들한테 이걸 붙이라고 해라!!!!!!!!!!!!!//
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
 // });            이거 밑에 4줄 붙여주면 이미지파일 헤더에 권한사용할수 있게 보내지므로, 그때부턴 외부 이미지도 캡쳐딸수있게 될것이다!!!!!!!!!!
       //////////////////////////////////////////////////////////////////////
      
         return false;
      }
  
function handleDragEnd(e) {
        console.log('Dragend');
        [].forEach.call(images, function(img) {
          img.classList.remove("img_dragging");
        });
      }
  
      
      var images = document.querySelectorAll(".furniture img");
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
//////////////////////////////////////
//이밑함수는 base64파일 이미지파일로 바꾸기위해만든함수
  function encodeBase64ImageFile (image) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      // convert the file to base64 text
      reader.readAsDataURL(image)
      // on reader load somthing...
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }