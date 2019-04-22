import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            showVisible: true
        };
    }
    componentDidMount(){
        this.tracker = Tracker.autorun( () => {
            // console.log(Session.get('showVisible'));
            const linksFilter = Session.get('showVisible'); 
            this.setState({ showVisible: linksFilter });
            // this.setState({ links: links}); 
        });
    }
    componentWillUnmount(){
        this.tracker.stop();
    }
    // tracker dot autorun call
    render(){
        return (
            <div>
                <label className="checkbox">
                    <input 
                    className="checkbox__box"
                    type="checkbox"
                    checked={!this.state.showVisible}
                    onChange={(e) => {
                            Session.set('showVisible', !e.target.checked) 
                    }}
                    />
                    show hidden links
                </label>
            </div>
        );
    }
}

// providing a value and an onchange handler, adding some glue to wire it up
// manipulating the state
// 2 life cycle methods mount and unmount
// component did mount set up tracker autorun call to watch for changes to show visible
// watch the value and then set the state
