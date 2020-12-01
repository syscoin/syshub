import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/**
 * Component that moves the scroll to the top page after the location of the route changes
 * @component
 */
class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return <React.Fragment />
	}
}

export default withRouter(ScrollToTop);