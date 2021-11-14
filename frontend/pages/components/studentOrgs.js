import React, { Component } from 'react'


// This function creates elements out of the JSON that is returned
// Edit this to change the way the elements on the page look
function createElements(stringJSON) {
    let json = JSON.parse(stringJSON);
    let elements = [];
    elements.push(<br></br>);
    elements.push(<br></br>);
    for (let i = 0; i < json.length; i++) {
        elements.push(
        <div class="container-fluid" key={i}>
            
            <div class="row">

                <div class="col-sm-8">

                    <h3>{json[i]["name"]}</h3>

                </div> 
                <div class="col-sm-4">

                    Member Count: {json[i]["memberCount"]}

                </div> 

            </div>
        
        </div>
        
        )
    }
    return elements;
}

export default class StudentOrgs extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', returnedJSON: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.elements = [];
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        fetch('http://localhost:3001/sorg/' + this.state.name)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({ returnedJSON: JSON.stringify(json) });
            // console.log(this.state.returnedJSON);
            this.elements = createElements(this.state.returnedJSON);
            this.forceUpdate();
        })

    }

    render() {
        return (
            <div className="search-form">
                <form onSubmit={this.handleSubmit}>

                    <label>
                        Name:
                        <input type="text" name='name' value={this.state.subject} onChange={this.handleChange} />
                    </label><br/>

                    <input type="submit" value="Submit" />
                </form>
                <div className='returnedElements'>
                    <ul>
                        {this.elements} {this.memberCount}
                    </ul>
                </div>

            </div>
        )
    }

}