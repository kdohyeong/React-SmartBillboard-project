import React, { Fragment }from 'react'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

class Text extends React.Component {
  constructor(props) {
    super(props);
      this.state ={
        mode:"off",
        layoutName: "default",
        input: ""
      }
  }

  onChange = input => { this.setState({ input }); };
    
  onKeyPress = button => { if (button === "{shift}" || button === "{lock}") this.handleShift(); };
    
  handleShift = () => {
    const layoutName = this.state.layoutName;
    this.setState({ layoutName: layoutName === "default" ? "shift" : "default" });
  };
    
  onChangeInput = event => {
    const input = event.target.value;  
    this.setState({ input });
  };
        
  onKeyBoard() {
    if (this.state.mode ==='on'){
      return <Keyboard
              keyboardRef={r => (this.keyboard = r)}
              layoutName={this.state.layoutName}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />
    }
  };
      
  handleChangeButton() {
    if (this.state.mode === 'on'){
      return <button onClick={() => this.handleChangeMode('off')}>Keyboard Off</button>
    }
    else if (this.state.mode === 'off'){
      return <button onClick={() => this.handleChangeMode('on')}>Keyboard on</button>
    }
  }
      
  handleChangeMode = (mode) => {
    this.setState({ mode: mode });                                          ///여기까지 키보드
  }

  render() {
    return (
      <Fragment>
       

       <input
            value={this.state.input}
            placeholder={"Virtual Keyboard Start"}
            onChange={this.onChangeInput}
            type="text"
            id="new_text"
            className="form-control"
        />
      {this.onKeyBoard()}
      {this.handleChangeButton()}

      <button id="addtext">Text into Canvas</button><br/>

      <label>Font family : </label>
        <select id="font_family">
          <option value="arial black" selected>Arial</option>
          <option value="helvetica" >Helvetica</option>
          <option value="comic sans ms">Comic Sans MS</option>
          <option value="impact">Impact</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="delicious">Delicious</option>
          <option value="verdana">Verdana</option>
          <option value="georgia">Georgia</option>
          <option value="courier">Courier</option>
        </select><br/>

        <label>Text Color</label>
              <div>
                <input className="color" id="text_color" type="color" />
              </div>
        <label>Stroke Color</label>
              <div>
                <input className="color" id="text_stroke_color" type="color" />
              </div>
        <label>Stroke Width</label>
              <div>
                <input className="range"  id="text_stroke_width" type="range" min="1" max="5" defaultValue='1' />
              </div>
        <label>Text Background Color</label>
              <div>
                <input className="color" id="text_bg_color" type="color" />
              </div>

      </Fragment>
    );
  }
}

export default Text
