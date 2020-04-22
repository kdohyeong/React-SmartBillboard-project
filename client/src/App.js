import React, {Component} from 'react';
import ShowAI from './Components/ShowAI';
import MakeCustom from './Components/MakeCustom';
import ShowCustom from './Components/ShowCustom';
import Button from '@material-ui/core/Button';
import './App.css';

const mainUrl = 'http://localhost:5000/api/';

// const videoUrl = mainUrl + 'video';
// const imageUrl = mainUrl + 'image';

class App extends Component {
constructor(props){
  super(props);

  this.state = {
    mode: 'BILLBOARD',            // 'BILLBOARD' || 'MAKE' || 'DETAIL' || 'QUESTION'  
    category: 'AI',               // 'AI' || 'CUSTOM'
    datas: [{               
          id: null,               // 1 ~ 10
          src: null,              
          width: null,
          height: null,
          top: null,
          left: null, 
          type: null,             // 'IMAGE' || 'VIDEO'
          zIndex: null            // image,video order
    }]
    }
  }

  componentDidMount(){
      this.callApi('videos')
      .then(res => this.setState({datas: res}))
      .catch(err => console.log(err));
      this.changeView() 
    }
    
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

  
  changeView() {
    if (this.state.mode === 'BILLBOARD'){
      if (this.state.category === 'AI') 
        {return this.state.datas ? <ShowAI datas={this.state.datas}/> : '..LOADING'}  
      else if (this.state.category === 'CUSTOM') 
        {return this.state.datas ? <ShowCustom datas={this.state.datas}/> : '..LOADING'}
    }
    else if (this.state.mode === 'MAKE') {return <MakeCustom/>}
  }

  render(){
    return(
      <div>
      {this.changeView()}
        <ul class>
        <li class>
          <Button fullWidth='true' variant="contained" color="primary" href="#contained-buttons" fontSize="x-large"
                  onClick={() => this.handleChangeMode('BILLBOARD')} name='Show' value='ShowBill'>Home</Button></li>
        <li class>
          <Button fullWidth='true' variant="contained" color="primary" href="#contained-buttons" 
                  onClick={() => this.handleChangeMode('MAKE')} name='Make' value='MakeBill'>Make BillBoard</Button></li>
        </ul>
      </div>
     );
  }
}

export default App;
