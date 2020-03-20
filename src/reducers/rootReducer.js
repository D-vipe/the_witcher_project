let initState = {
  targetHistory: [],
  dataGovernments: [],
  secondScreen: false,
  targetId: null,
  selectElements: {},
  parentId: null,
  currentIndex: 0,
  itemIdx: null,
  targetItem: null,
  loaded: false,
  loadedCarousel: false,
  previousTargetId: null
};

if (window.localStorage.app_state !== undefined && window.localStorage.app_state !== null) {
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
      targetId: action.targetId
    }
  }

  if (action.type === 'SET_TARGET_HISTORY') {
    let history = state.targetHistory;
    if (history.length > 0) {
      if (history[history.length - 1] !== action.targetId) {
        history.push(action.targetId);
      }
    } else {
      history.push(action.targetId);
    }
    return {
      ...state,
      targetHistory: [
        ...history
      ]
    }
  }

  if (action.type === 'HISTORY_TARGET_BACK') {
    let history = state.targetHistory,
        new_target_id = null,
        loaded = true,
        loadedCarousel = true,
        second_screen = true;

    if (history.length > 1) {
      history.pop();
      new_target_id = history[history.length - 1];
    } else {
      history = [];
      loaded = false;
      loadedCarousel = false;
      second_screen = false;
    }

    return {
      ...state,
      targetId: new_target_id,
      loaded: loaded,
      loadedCarousel: loadedCarousel,
      secondScreen: second_screen,
      targetHistory: [
        ...history
      ]
    }
  }

  if (action.type === 'CLEAR_TARGET_HISTORY') {
    return {
      ...state,
      secondScreen: false,
      targetHistory: []
    }
  }

  if (action.type === 'DROP_SECONDSCREEN') {
    return {
      ...state,
      secondScreen: action.secondScreen,
      targetId: action.targetId,
      targetHistory: []
    }
  }

  if (action.type === 'SET_ITEM_COLLECTION') {
    console.log(action.selectElements);
    return {
      ...state,
      selectElements: action.selectElements,
      parentId: action.parentId,
      targetId: action.targetId,
      targetItem: action.selectElements.target,
      loaded: action.loaded
    }
  }
  if (action.type === 'SET_CAROUSEL_STATE') {
    return {
      ...state,
      itemIdx: action.itemIdx,
      targetItem: action.targetItem,
      loadedCarousel: action.loadedCarousel,
    }
  }

  return state;
};

export default rootReducer;
