//윈도우 안에 패브릭을 넣어줌
const fabric = window.fabric;
//제이쿼리를 사용하기로함                             
var $ = require('jquery');
//캔버스를 전역으로 선언
let canvas = null;

//텍스트 추가 함수
export function addTextToCanvas(_canvas) {
  canvas = _canvas;
  //.val => value값을 반환해줌
  var newText = new fabric.IText($('#new_text').val(), {                
      left: 50,
      top: 100,                                                         
      fontFamily: 'arial black',
      fill: '#333',
      fontSize: 50
    });
    canvas.add(newText);
    canvas.requestRenderAll();
}

//폰트 종류 설정
export function fontFamily(_canvas) {
  canvas = _canvas;
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       
    if (canvas.getActiveObject().text) {                                                  
      canvas.getActiveObject().set({ fontFamily: $('#font_family').val() });                             
      canvas.renderAll();
    }
  }
}

//텍스트 색깔 설정
export function textColor(_canvas) {
  canvas = _canvas;
  //선택한 객체가 undefined나 null이 아닐때,
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){  
    //선택한 객체가 text일때만 실행시키기 위해서      
    if (canvas.getActiveObject().text) {                         
      canvas.getActiveObject().set({ fill: $('#text_color').val() });                                
      canvas.renderAll();
    }
  }
}

//텍스트 배경 색 설정 
export function textBgColor(_canvas) {
  canvas = _canvas;
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){        
    if (canvas.getActiveObject().text) {                                                   
    canvas.getActiveObject().set({ backgroundColor: $('#text_bg_color').val() });         
    canvas.renderAll();
    }
  }
}

//텍스트 테두리 설정
export function textStrokeColor(_canvas) {
  canvas = _canvas;
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       
    if (canvas.getActiveObject().text) {                                                  
    canvas.getActiveObject().set({ stroke: $('#text_stroke_color').val() });                    
    canvas.renderAll();
    }
  }
}

//텍스트 테두리 두께 설정
export function textStrokeWidth(_canvas) {
  canvas = _canvas;
  if (canvas.getActiveObject() !== undefined && canvas.getActiveObject() !== null){       
    if (canvas.getActiveObject().text) {                                                  
    canvas.getActiveObject().set({ strokeWidth: $('#text_stroke_width').val() });                   
    canvas.renderAll();
    }
  }
}
