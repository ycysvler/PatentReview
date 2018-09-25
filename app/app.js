import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

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
         return (<div>main</div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);