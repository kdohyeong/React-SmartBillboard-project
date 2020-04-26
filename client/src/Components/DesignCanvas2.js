import React from 'react'

const fabric = window.fabric   // 윈도우 안에 패브릭을 넣어줌
var $ = require('jquery')


class DesignCanvas2 extends React.Component {
  componentDidMount() {

    
    fabric.CustomVideo = fabric.util.createClass(fabric.Image, {
      type: 'customvideo',
      cropRect: null,
      
      initialize: function (video, options) {
        const defaultOpts = {
          lockRotation: true,
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
          ctx.drawImage(video, c.x, c.y, c.w, c.h, d.x, d.y, d.w, d.h)
        } else {
          ctx.drawImage(video, d.x, d.y, d.w, d.h)
        }
      },
      
      _render: function (ctx) {
        console.log('rendered', this.cropLeft)
        this._draw(this.getElement(), ctx)
      }
  })
  
  const canvas = new fabric.Canvas('c');

  var v = document.getElementById('v');
  
  const vid = new fabric.CustomVideo(v, {left: 50, top: 0, width: 200, height: 200, cropRect: {x: 200, y: 50, w: 200, h: 200}})
  const vidDefault = new fabric.Image(v, {left: 50, top: 210, width: 200, height: 200})

  canvas.add(vid)
canvas.add(vidDefault)


vid.getElement().play()
console.log('vid', vid)


     }      
   

  render() {

    return (
      <div>
      <canvas id='c' width="640" height="480"></canvas>
      <video id='v' style="position: fixed; left: 500px" controls>
          <source src="http://html5demos.com/assets/dizzy.mp4"/>
      </video>
      </div>
    );
  }
}

export default DesignCanvas2


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



 // $(".addvideo video").on('click', function(e){                         ///$("#addvideo").click(function(e){                
      //   // e.preventDefault();                                              //이런식으로 주면 배열하나에 첫번째껏만 들어가는 오류 발생해서 안됐음.  
      //   // console.log($(this)[0]);
      //   // addVideo($(this)[0]);
      //   addVideo(e.target);                                                 //텍스트 추가
      //   });  


 // const children = React.Children.map(this.props.children, child => {
    //   return React.cloneElement(child, {
    //   canvas: this.state.canvas,                        //컴포넌트에는 기본적으로 this.props.children이라는걸 다 가지고있는데
    //   })                                                //  이 놈을 child라는 놈으로 매핑돌리고 그 child라는 놈에다가 
    // })                                                   //  this.state.canvas 값을 추가해서 리턴해줌


    // return (
    //   <Fragment>
    //     <div className="canvas-container">
    //     <canvas ref={c => (this.c = c)}/>            {/*이게 컨버스라는 객체 전체 내용을 ref 로 참조해서 c라고 명시한담에*/}
    //     {/* {this.state.canvas && children}  */}


     // if (activeObj){
  //   if (activeObj._element.currentSrc === canvas.toJSON().objects[0].src){
  // console.log(activeObj._element.currentSrc);
  //   }
    // console.log(activeObj._element.currentSrc);
    //   }


    // import layout from "simple-keyboard-layouts/build/layouts/korean";
// import ReactPlayer from 'react-player'