import React, { useState } from 'react';
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import Users from './components/users/Users'; 
import User from './components/users/User'; 
import Search from './components/users/Search';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';


function App (props) { 

  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({});
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);
  const [alert,SetAlert]=useState(null);



  // search github users
  const searchUsers= async (text) =>{
    setLoading(true);

    const res=await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setUsers(res.data.items);

  }


  // GEt a single github user
  const getUser= async (username) => {
    setLoading(true);

    const res=await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setUser(res.data);
  }


  // Get users repos
  const getUserRepos= async (username) => {

    setLoading(true);

    const res=await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setRepos(res.data);



  }

  // clear users from state
  const clearUsers= () => {    
    setLoading(false);
    setUsers([]);
  }


  // set alert
  const showAlert=(msg,type) => {
    SetAlert({msg,type});

    setTimeout(() => {
      SetAlert(null);
    }, 3000);
  }  


  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" icon='fab fa-github'/>
        <div className="container">
          <Switch>
            <Route exact path='/' render={ (props) => 
              <>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true : false} 
                  SetAlert={showAlert}
                /> 
                <Users loading={loading} users={users} />
              </>
            } />

            <Route exact path='/about' component={About}/>

            <Route exact path='/user/:login' render={ (props) =>{  
              return (<User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />)
            }}/>

          </Switch>
          
          <Alert alert={alert}/>            
        </div>
      </div>
    </Router>
  );   

}

export default App;
