import React from 'react';
import './HomeScreen.sass';
import OptionItem from '../optionItem/OptionItem';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidUpdate() {
        if (this.props.governments.length > 0) {
            if (!this.state.loaded)
                this.setState({ loaded: true })
        }
    }

    render () {
        let {
            governments
        } = this.props;
        return (
            <div className="FirstScreen">
                <div className="container">
                    <div className="row">
                        <div className="d-flex align-items-center justify-content-center w-100">
                            <div className="wolf_logo"> </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            (() => {
                                if(this.state.loaded) {
                                    return (<OptionItem items={governments}/>)
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeScreen;
