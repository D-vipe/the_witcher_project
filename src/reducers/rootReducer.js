console.log(window.localStorage.app_state);
let initState = {
  dataGovernments: [],
  secondScreen: false,
  currentTarget: null
};

if (window.localStorage.app_state !== undefined) {
  initState = JSON.parse(window.localStorage.app_state);
}


const rootReducer = (state = initState, action) => {
  if (action.type === 'SET_GOVERNMENTS') {
     return {
       ...state,
       dataGovernments: action.dataGovernments
     }
  }

  if (action.type === 'SET_SECONDSCREEN') {
    return {
      ...state,
      secondScreen: action.secondScreen,
      currentTarget: action.currentTarget
    }
  }
  return state;
};

export default rootReducer;
