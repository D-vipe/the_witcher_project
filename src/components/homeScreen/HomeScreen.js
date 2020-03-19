import React from 'react';
import './HomeScreen.sass';
import OptionItem from '../optionItem/OptionItem';
import connect from "react-redux/es/connect/connect";

class HomeScreen extends React.Component {

  render () {
    let {
      dataGovernments,
      select_func
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
            <OptionItem select_func={select_func} items={dataGovernments} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataGovernments: state.dataGovernments,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
