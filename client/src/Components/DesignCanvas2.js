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

