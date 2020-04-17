import React, {Component} from 'react';
import ShowAI from './Components/ShowAI';
import MakeCustom from './Components/MakeCustom';
import ShowCustom from './Components/ShowCustom';
import Button from '@material-ui/core/Button';
import './App.css';


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
      this.callApi()
      .then(res => this.setState({datas: res}))
      .catch(err => console.log(err));
      this.ChangeView() 
    }
    
  callApi = async () => {
      const response = await fetch('http://localhost:5000/api/videos');
      const body = await response.json();
      return body;
    }

  handleChangeMode = (mode) => {
    this.setState({
      mode: mode
    });
  }

  
  ChangeView() {
    if (this.state.mode === 'BILLBOARD'){
      if (this.state.category === 'AI') 
        {return this.state.datas ? <ShowAI datas={this.state.datas}/> : '..LOADING'}  
      else {return <ShowCustom datas={this.state.datas}/>}
    }
    else if (this.state.mode === 'MAKE') {return <MakeCustom/>}
  }

  render(){
    return(
      <div>
      {this.ChangeView()}
        <ul class>
        <li class>
          <Button fullWidth='true' variant="contained" color="primary" href="#contained-buttons" 
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
