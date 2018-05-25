import React from 'react';

class InitialUserInput extends React.Component {
    render() {
        return(
         <div>
             <div className="title">
                <h1>AstroAtlas</h1>
             </div>
             <form>
                
                 <select name="year" id="year">
                    {this.props.yearOptions.map( (year, index) => {
                        return year ? <option key={index }>{year}</option> : null;
                    })}
                 </select>
                 <label htmlFor="year">Year</label>
             </form>
         </div>
        )
    }
}

export default InitialUserInput;