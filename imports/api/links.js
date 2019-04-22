import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'; 
import shortid from 'shortid'; 

export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish('linksPub', function () {
        return Links.find({ userId: this.userId })
    });
}

Meteor.methods({
    //resource.action eg emails.archive
    'links.insert'(url){
        if(!this.userId){
            throw new Meteor.Error('not-authorised');
        }
            new SimpleSchema({
                url: {
                    type: String,
                    label: 'Your link',
                    regEx: SimpleSchema.RegEx.Url
                }
            }).validate({ url: url });     
        Links.insert({
            _id: shortid.generate(),
            url: url, 
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.setVisibility'(_id, visible){
        // Check if user is logged in. Throw an error if not. 
        if(!this.userId){
            throw new Meteor.Error('not-authorised');
        }
        // Create simple schema _id is a string with length greater than 1
            new SimpleSchema({
                _id: {
                    type: String,
                    min: 1
                },
                visible: {
                    type: Boolean
                }
            }).validate({_id: _id, visible: visible});
        // visible is a boolean
        Links.update({
            _id: _id, 
            userId: this.userId},
            { $set: { visible: visible } }); 
    },
    'links.trackVisit'(_id){
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id: _id });

        Links.update({_id: _id}, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        })
    }
});

