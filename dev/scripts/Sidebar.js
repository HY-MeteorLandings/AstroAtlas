import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <img src="public/assets/meteorIcon.png" alt="" />
                <div className="title">
                    <h1>AstroAtlas.</h1>
                </div>
                <ul className="form">
                    <form onSubmit={this.props.handleSubmit}>
                        <li className="styleSelect slate">
                            <select className="year" name="year" id="year" onChange={this.props.handleChange} >
                                {this.props.yearOptions.map((year, index) => {
                                    return year ? <option value={year} key={index}>{year}</option> : null;
                                })}
                            </select>
                        </li>
                        <li>
                            <label htmlFor="year">Year</label>
                        </li>
                        <li>
                            <div className="styleSelect slate">
                                <select id="mass" onChange={this.props.massHandleChange}>
                                    {this.props.massInput.map((number, i) => {
                                        return <option value={number} key={i}>{number}</option>
                                    })}
                                </select>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="Mass">Mass (in grams)</label>
                        </li>
                        <li>
                            <input type="submit" value="Submit" />
                        </li>
                    </form>
                </ul>
            </div>
        )
    }
}

export default Sidebar;