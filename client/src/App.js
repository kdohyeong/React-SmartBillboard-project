import React, {Component} from 'react';
import ShowAI from './Components/ShowAI';
import MakeCustom from './Components/MakeCustom';
import ShowCustom from './Components/ShowCustom';
import Button from '@material-ui/core/Button';
import './App.css';

//로컬 서버 주소/api/
const mainUrl = 'http://localhost:5000/api/';

// const videoUrl = mainUrl + 'video';
// const imageUrl = mainUrl + 'image';

class App extends Component {
constructor(props){
  super(props);

  this.state = {
    mode: 'BILLBOARD',            // 'BILLBOARD' || 'MAKE' || 'DETAIL' || 'QUESTION'               
    datas: [{               
          id: null,               // 1 ~ 10
          src: null,              
          width: null,
          height: null,
          top: null,
          left: null, 
          type: null,             // 'IMAGE' || 'VIDEO'
          angle: null,             // ANGLE
          scaleX: null,
          scaleY: null,
          category: 'CUSTOM',     // 'AI' || 'CUSTOM'
      }]
    }
  }

  componentDidMount() {
      //api로 비디오를 호출 후 그 데이터를 state에 저장
      this.callApi('videos')
      .then(res => this.setState({datas: res}))
      .catch(err => console.log(err));
      this.viewChange() 
  
    }

  // componentDidUpdate(){
  //     this.callApi('videos')
  //     .then(res => this.setState({datas: res}))
  //     .catch(err => console.log(err));
  //     this.viewChange() 
  // }

  //서버주소 + value로 데이터 가져오는 API
  callApi = async (value) => {
      const response = await fetch(`${mainUrl}${value}`);
      const body = await response.json();
      return body;
    }

  handleChangeMode = (mode) => {
    this.setState({
      mode: mode
    });
  }

  //state에 따라 home 화면에 다른 컴포넌트를 뿌려줌
  viewChange() {
    if (this.state.mode === 'BILLBOARD'){
        if (this.state.datas[0].category === 'AI') 
          { return this.state.datas ? <ShowAI datas={this.state.datas}/> : '..LOADING '}  
        else if (this.state.datas[0].category === 'CUSTOM') 
          { return this.state.datas ? <ShowCustom datas={this.state.datas}/> : '..LOADING' }
    }
    else if (this.state.mode === 'MAKE') { return <MakeCustom mainUrl = {mainUrl}/> }
  }

  render(){
    return(
      <div>
      { this.viewChange() }
        <ul>
          <li>
            <Button fullWidth={true} variant="contained" color="primary" href="#contained-buttons" fontSize="x-large"
                    onClick={() => this.handleChangeMode('BILLBOARD')} name='Show' value='ShowBill'>Home</Button></li>
          <li>
            <Button fullWidth={true} variant="contained" color="primary" href="#contained-buttons" 
                    onClick={() => this.handleChangeMode('MAKE')} name='Make' value='MakeBill'>Billboard Maker</Button></li>
        </ul>
      </div>
     );
  }
}

export default App;
