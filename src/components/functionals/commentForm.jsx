import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }
    render () {
        let { comment } = this.props;
        let { message } = this.state;
        return (
            <Grid container md={8} className="topcommentSectionslView">
                <Grid item md={12} className="commentHeading">
                    Enter Reply
                  </Grid>

                <Grid item md={12} className="proposalDetails">
                    {/* Having Fun ? */}
                    <textarea rows="1" cols="55" className="userComment" value={message} onChange={(e) => { this.setState({ message: e.target.value }) }}>
                    </textarea>
                    <hr className="proposalDetailsHr" />

                    {/* <Button type="submit" color="primary" className="formSubmiButton"> */}
                    <Button onClick={() => this.props.add(comment._id, message)}> Submit </Button>
                    <Button onClick={() => { this.props.cancel(comment._id, false) }}> Cancel </Button>
                </Grid>
            </Grid>
        )
    }
}
const stateToProps = state => {
    return {
        user: state.app.currentUser
    };
};

const dispatchToProps = dispatch => {
    return {};
};


export default connect(stateToProps, dispatchToProps)(CommentForm);