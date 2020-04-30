const fabric = window.fabric;                                                //윈도우 안에 패브릭을 넣어줌
var $ = require('jquery');                                                   //제이쿼리를 사용하기로함
let canvas = null;


var imageOffsetX, imageOffsetY;                                     //좌표 따려고 선언
var videoOffsetX, videoOffsetY;
let canvas_container = null;
let canvasObject = null;
let canvasContainer = null;

let images = document.querySelectorAll(".addimage img");            // 태그달고있는 전체 NodeList로 반환
let videos = document.querySelectorAll(".addvideo video");

export function dragAndDrop(cav) {       
    if (cav) {
        canvas = cav;
    }                          // 드래그 엔 드랍 이미지 인
    images = document.querySelectorAll(".addimage img");            // 태그달고있는 전체 NodeList로 반환
    videos = document.querySelectorAll(".addvideo video");
    // $(".canvas-container").each(function(index) {
    canvas_container = document.getElementsByClassName('canvas-container')[0];
    // console.log(index);
    // console.log(this);
    console.log(document.getElementsByClassName('canvas-container')[0]);
    canvasObject = $('canvas',canvas_container)[0];
    // console.log(canvasObject);
    canvasContainer = $(canvas_container)[0];
  
    console.log(images);
    console.log(videos);
    console.log('start');

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
}

export function addTextToCanvas() {
    var newText = new fabric.IText($('#new_text').val(), {                 ///c val  이놈이 문제였어 이놈이 문자열로 반환해줌
        left: 50,
        top: 100,                                                          // 텍스트 추가
        fontFamily: 'arial black',
        fill: '#333',
        fontSize: 50
      });
      canvas.add(newText);
      canvas.requestRenderAll();
}
  
function handleDragStart(e) {                                       //넣을 이미지를 클릭하고 옮기는 딱 start시점에 발생
    console.log('DragStart');
    // console.log($(this).prop('tagName'));                          //태그이름 따려고 따는놈 반환값= VIDEO OR IMG
    // console.log(images);
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
    canvas_container.classList.add("over");
  // console.log(this.classList);
}

function handleDragLeave(e) {                                       //넣을 이미지가 canvas에서 나오는 시점에서 발생되는함수
    // console.log('drag leave');
    canvas_container.classList.remove("over");
}

async function handleDrop(e) {                                     //넣을 이미지가 canvas위에 드랍됬을때 호출되는함수
    console.log('drag drop');
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    var img = document.querySelector(".addimage img.img_dragging");                   //저 태그단놈(드래그 중일때만 저 class가 있으니) 선택
    var vid = document.querySelector(".addvideo video.vid_dragging");

    // console.log(vid);
    // console.log(img);
    // console.log($(".addvideo video"));
    // console.log("event: ", e);

    var offset = $(canvasObject).offset();

    var y = e.clientY - (offset.top + imageOffsetY);    
    var x = e.clientX - (offset.left + imageOffsetX);                                 //이미지 or 동영상 추가될 때 드랍되는 좌표값 

    var vy = e.clientY - (offset.top + videoOffsetY);    
    var vx = e.clientX - (offset.left + videoOffsetX);
    // console.log($(img).prop('tagName'));                                           //태그이름 반환


    if ($(img).prop('tagName') === 'IMG') {
        var newImage = new fabric.Image(img, { left: x, top: y });                      //이미지 패브릭 만듬
        canvas.add(newImage);
        newImage.scaleToWidth(img.width);                                             //태그에 단 width(200)을 scale to에 넣어줘서 해결
        newImage.scaleToHeight(img.height);
    }


    else if ($(vid).prop('tagName') === 'VIDEO') {                                     //비디오 패브릭 만듬
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

export function removeCanvasEvent() {
    console.log('test');
    [].forEach.call(images, function(img) {
        img.removeEventListener("dragstart", handleDragStart, false);
        img.removeEventListener("dragend", handleDragEnd, false);
    });

    [].forEach.call(videos, function(vid) {
        vid.removeEventListener("dragstart", handleDragStart, false);
        vid.removeEventListener("dragend", handleDragEnd, false);
    });

    canvasContainer.removeEventListener("dragenter", handleDragEnter, false);
    canvasContainer.removeEventListener("dragover", handleDragOver, false);
    canvasContainer.removeEventListener("dragleave", handleDragLeave, false);
    canvasContainer.removeEventListener("drop", handleDrop, false);
}

