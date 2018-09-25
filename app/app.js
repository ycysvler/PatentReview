import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import { Button } from 'antd';

const mapStateToProps = (state, ownProps) => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
class App extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
         return (<div><Button>Default</Button></div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);