import React, { Fragment }from 'react'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import * as Tfunc from '../utils/TextFunction.js';

let canvas = null;

//MAKE 메뉴에 텍스트 버튼을 눌렀을 때 텍스트 관련 목록을 뿌려주는 컴포넌트
class TextItem extends React.Component {
  constructor(props) {
    super(props);
      this.state ={
        mode:"off",
        layoutName: "default",
        input: ""
      }
    canvas = this.props.canvas;
  }

  //키보드 함수
  //입력인자로 ON || OFF 받아서 state 전환
  handleOnKeyborad = (mode) => { this.setState({ mode: mode }); };

  //키보드 입력값이 바뀌면 그 값을 state에 저장
  onChange = input => { this.setState({ input }); };
      
  //클릭시 버튼이 shift면 lock으로 전환
  onKeyPress = button => { if (button === "{shift}" || button === "{lock}") this.handleShift(); };
      
  //인풋이 바뀌면 그 값을 state input에 저장해서 텍스트박스에 적용
  onChangeInput = (e) => { e.preventDefault(); const input = e.target.value; this.setState({ input }); };

  //쉬프트 누르면 대 소문자 전환
  handleShift = (e) => { 
    const layoutName = this.state.layoutName; 
    this.setState({ layoutName: layoutName === "default" ? "shift" : "default" }); 
  };

  //ON일때 키보드 , 입력창 , 추가버튼 출력 //ref={(t) => {text = t}}
  onKeyBoard() {
    if (this.state.mode ==='on'){
      return  <Fragment>

                <input
                  value={this.state.input} placeholder={"Keyboard Input"} onChange={this.onChangeInput} type="text" id="new_text"
                />
                <Keyboard
                        keyboardRef={r => (this.keyboard = r)} layoutName={this.state.layoutName}
                        onChange={this.onChange} onKeyPress={this.onKeyPress}
                />
                <button id="addtext" onClick={ (e) => { e.preventDefault(); Tfunc.addText(this.keyboard , canvas); }}>ADD TEXT</button><br/>

              </Fragment>
    }
  };

  //키보드 ON & OFF 버튼
  handleChangeButton() {
    if (this.state.mode === 'on'){
      return <button onClick={(e) => { e.preventDefault(); this.handleOnKeyborad('off'); }}>Keyboard Off</button>
    }
    else if (this.state.mode === 'off'){
      return <button onClick={(e) => { e.preventDefault(); this.handleOnKeyborad('on'); }}>Keyboard on</button>
    }
  };

  //텍스트 글꼴 옵션리스트
  fontOption() {
    return (
        <Fragment>
          <option value="arial black">Arial</option>
          <option value="helvetica" >Helvetica</option>
          <option value="comic sans ms">Comic Sans MS</option>
          <option value="impact">Impact</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="delicious">Delicious</option>
          <option value="verdana">Verdana</option>
          <option value="georgia">Georgia</option>
          <option value="courier">Courier</option>
        </Fragment>
    );
  };
  
  render() {
    return (
        <Fragment>

          {this.onKeyBoard()}
          
          {this.handleChangeButton()}<br/>

          <label>Font Family</label><br/>
            <select id="font_family" onChange={(e) => { e.preventDefault(); Tfunc.fontFamily(canvas); }}>
              { this.fontOption() }
            </select><br/>

            <label>Text Color</label><br/>
              <input className="color" id="text_color" type="color" onChange={(e) => { e.preventDefault(); Tfunc.textColor(canvas); }} /><br/>
            <label>Text Background Color</label><br/>
              <input className="color" id="text_bg_color" type="color" onChange={(e) => { e.preventDefault(); Tfunc.textBgColor(canvas); }} /><br/>
            <label>Stroke Color</label><br/>
              <input className="color" id="text_stroke_color" type="color" onChange={(e) => { e.preventDefault(); Tfunc.textStrokeColor(canvas); }} /><br/>
            <label>Stroke Width</label><br/>   
              <input className="range"  id="text_stroke_width" type="range" 
                      onChange={(e) => { e.preventDefault(); Tfunc.textStrokeWidth(canvas); }} min="1" max="5" defaultValue="1" /><br/> 
            
          </Fragment>
    );
  }
}

export default TextItem;
