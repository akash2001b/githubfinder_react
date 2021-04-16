import React from 'react';
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import Users from './components/users/Users'; 
import User from './components/users/User'; 
import {Search} from './components/users/Search';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      users:[],
      user: {},
      repos:[],
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


  // GEt a single github user
  getUser= async (username) => {

    this.setState({loading:true});

    const res=await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({loading:false, user: res.data }); 


  }

  // Get users repos
  getUserRepos= async (username) => {

    this.setState({loading:true});

    const res=await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({loading:false, repos: res.data }); 


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
    const { users, repos,  user, loading} = this.state;   
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon='fab fa-github'/>
          <div className="container">
            <Switch>
              <Route exact path='/' render={ (props) => 
                <>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 0 ? true : false} 
                    setAlert={this.setAlert}
                  /> 
                  <Users loading={loading} users={users} />
                </>
              } />

              <Route exact path='/about' component={About}/>

              <Route exact path='/user/:login' render={ (props) =>{  
                return (<User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />)
              }}/>

            </Switch>
            
            <Alert alert={this.state.alert}/>            
          </div>
        </div>
      </Router>
    );   

  }
}

export default App;
