import React from 'react'; 
import Clipboard from 'clipboard';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }
    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            setTimeout(() => this.setState({ justCopied: false }), 1000)
            // return ;
        }).on('error', () => {
            // return this.setState({ justCopied: false });
        })
    }
    componentWillUnmount(){
        this.clipboard.destroy();
    }
    justCopiedMethod(){
        if(this.state.justCopied==true){
            return 'copied'
        }else if(this.state.justCopied==false){
            return 'copy'
        }
    }
    renderStats(){
        const visitMessage = this.props.visitedCount === 1 ? 'view' : 'views';
        let visitedMessage = null; 
        // let momentNow = moment(this.props.lastVisitedAt);

        if(typeof this.props.lastVisitedAt === 'number'){
            visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`;
        }

        return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    }
    render(){
        return(
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
                    Visit
                </a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.justCopiedMethod()}</button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>  
        );
    }
}

LinksListItem.propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired, 
    userId: React.PropTypes.string.isRequired,
    visitedCount: React.PropTypes.number.isRequired, 
    lastVisitedAt: React.PropTypes.number
};

LinksListItem.defaultProps = {
    justCopied: false
}