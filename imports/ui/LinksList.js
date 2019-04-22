import React from 'react';
import { Meteor } from 'meteor/meteor'; 
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links.js'; 
import LinksListItem from './LinksListItem.js'; 

export default class LinksList extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            links: []
        }; 
    }
    componentDidMount(){
        console.log('component did mount LinksList');
         // Call tracker dot autorun
        this.linksTracker = Tracker.autorun( () => {
            Meteor.subscribe('linksPub'); 
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch(); 
            this.setState({ links: links}); 
        });
    }
    componentWillUnmount(){
        console.log('component will unmount liksLinst');
        this.linksTracker.stop();
    }
    renderLinksListItems(){
        // if statemnt if there are no links in links array length is zero
        // return static jsx 
        // div p tag No likns found
        if(this.state.links.length === 0){
            return (
                <div className="item">
                     <p className="item__status-message">No links found</p>
                </div>
            ); 
        }

        return this.state.links.map((link) => {
            // link object
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
            // return <p key={link._id}>{link.url}</p>
        });
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}