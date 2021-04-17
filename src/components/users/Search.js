import React, { useState }from 'react'

function Search({ showClear, clearUsers, searchUsers, setAlert }) {
    
    const [text,setText]=useState('');    

    // normal function
    function onChange(e){ 
        // this.setState({ [e.target.name]:e.target.value });        
        setText(e.target.value);
    }

    // arrow function
    const onSubmit= (e) =>{
        e.preventDefault();
        if(text === ''){
            setAlert('Please enter a name','light');
        }
        else{
            searchUsers(text); 
            // this.setState({ text: ''});
            setText('');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="Search Users" value={text} onChange={onChange}/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
            {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
        </div>
    )

}


export default Search


