import React from 'react';
import axios from 'axios';
import './App.css';
import Users from './components/users/Users'; 
import {Search} from './components/users/Search';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      users:[],
      loading:false,
      alert:null
    };
  }

  // async componentDidMount(){

  //   this.setState({loading:true});

  //   const res=await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({loading:false, users: res.data });     
  //   // console.log(res.data);
  // }




  // search github users
  searchUsers= async (text) =>{

    this.setState({loading:true});

    const res=await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    // console.log(res.data.items);
    this.setState({loading:false, users: res.data.items });

  }

  // clear users from state
  clearUsers= () => {
    this.setState({users: [], loading: false});
  }
  // set alert
  setAlert=(msg,type) => {
    this.setState({ alert: { msg, type} });

    setTimeout(() => {
      this.setState({alert: null});
    }, 3000);

  }


  render(){
    const { users, loading} = this.state;   
    return (
      <div className="App">
        <Navbar title="Github Finder" icon='fab fa-github'/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={users.length > 0 ? true : false} 
            setAlert={this.setAlert}
          /> 
          <Users loading={loading} users={users} />
        </div>
      </div>
    );

  }
}

export default App;
