import React, { Fragment } from 'react'
import Image from '../CanvasItem/Image.js'
import Video from '../CanvasItem/Video.js'
import Text from '../CanvasItem/Text.js'
import './DesignCanvas.css';

import { dragAndDrop } from '../utils/DragDrop.js';
import * as Cfunc from '../utils/CanvasFunction.js';
import axios from 'axios';


//mainUrl = 'http://localhost:5000/api/';


//윈도우 안에 패브릭을 넣어줌
const fabric = window.fabric; 
//제이쿼리를 사용하기로함                                             
var $ = require('jquery');  
//컨버스를 전역으로 선언                                                
let canvas = null;

class DesignCanvas extends React.Component {
  constructor(props) {
    super(props);
      this.state = { 

        menuDatas :[{
          src: null,
          type: '',
        }],

        toJSON:[{
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
        }],

          //캔버스값을 저장을 저장할 그릇
          canvas: null,                                                    
          menu : 'IMAGE'                                     
      }
  }

  componentWillMount() {
    this.getMenuItemApi('menuDatas')
    .then(res => this.setState({ menuDatas: res }))
    .catch(err => console.log(err));
  }
  
  componentDidMount() {
    //캔버스를 만듬
    canvas = new fabric.Canvas(this.c , { backgroundColor : '#fff' });       

    //캔버스의 크기설정할수 있음
    canvas.setHeight($('.canvas-wrapper').height());                                                  
    canvas.setWidth($('.canvas-wrapper').width());
    this.setState({ canvas }) 

    //드래그 앤 드랍 함수를 실행 , 바로 실행시키면 서버로 부터 메뉴목록 받기전에 실행되서 드래그앤드랍이 데이터에 안먹힘 
    // dragAndDrop(canvas);
    setTimeout(() => { dragAndDrop(canvas); }, 500); 
    //선택한 객체 인덱스 맨앞으로 땡기기
    canvas.on('mouse:down', function() { Cfunc.bringFrontIndex(canvas) });   
  }


  getMenuItemApi = async (value) => {
    const response = await fetch(`${this.props.mainUrl}${value}`);
    const body = await response.json();
    return body;
  }

  addCanvasDataApi = (canvasDatas) => {
    const canvasDataUrl = this.props.mainUrl + 'canvasDatas';
    const url = `${canvasDataUrl}`;
    axios.post( url , { canvasDatas })
    .then( response => { console.log(response) } )
    .catch( response => { console.log(response) } );
  }



  handleMenuChange(menu){ this.setState({ menu : menu }) };

  //IMAGE || VIDEO || TEXT 전환
  handleFurnitureChange() {
    if (this.state.menu === 'IMAGE'){ return ( 
      <div className="addimage"> 
        <Image menuDatas={this.state.menuDatas}></Image> 
      </div>
      ); 
    }
    else if(this.state.menu === 'VIDEO'){ return (
      <div className='addvideo'>  
        <Video menuDatas={this.state.menuDatas}></Video> 
      </div>
      ); 
    }
    else if (this.state.menu === 'TEXT'){ return (
      <div className="addtext">
        <Text canvas={canvas}></Text>
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

            <button className="snip1535u" onClick={(e) =>{ e.preventDefault(); this.handleMenuChange('IMAGE')}}>Image</button>
            <button className="snip1535u" onClick={(e) =>{ e.preventDefault(); this.handleMenuChange('VIDEO')}}>Video</button>
            <button className="snip1535u" onClick={(e) =>{ e.preventDefault(); this.handleMenuChange('TEXT')}}>Text</button>
          
            <label>Background Color</label><br/>
		      		<input className="color" id="bg_color" type="color" onChange={(e) => { e.preventDefault(); Cfunc.bgColor(canvas); }}/><br/><br/>
            <button className="snip1535" id="delete" onClick={(e) => { e.preventDefault(); Cfunc.deleteObjects(canvas); }}>DELETE</button><br/>
            <button className="snip1535" id="sendbackwards" onClick={(e) => { e.preventDefault(); Cfunc.sendBackwards(canvas); }}>SEND BACK</button><br/>
            <button className="snip1535" id="capture" onClick={(e) => { e.preventDefault(); Cfunc.captureButton(canvas); }}>CAP TURE</button><br/>
            <button className="snip1535" id="toJson" onClick={(e) => { e.preventDefault(); this.addCanvasDataApi(canvas.toJSON()) }}>To JSON</button>
          

          </div>

          <div className="furniture">
            { this.handleFurnitureChange() }
          </div>

        </div>
     
      </Fragment>
      );
  }
}

export default DesignCanvas