import React from 'react';

class InitialUserInput extends React.Component {
    render() {
        return(
         <div>
             <div className="title">
                <h1>AstroAtlas</h1>
             </div>
                <form onSubmit={this.props.handleSubmit}>
                
                 <select name="year" id="year" onChange={this.props.handleChange} >
                    {this.props.yearOptions.map( (year, index) => {
                        return year ? <option value={year} key={index}>{year}</option> : null;
                    })}
                 </select>
                 <label htmlFor="year">Year</label>
                 <input type="submit" value="Submit"/>
             </form>
         </div>
        )
    }
}

export default InitialUserInput;