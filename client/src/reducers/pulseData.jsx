//  reducer for INCREMENT/DECREMENT
// x = time of click, y = number of clicks
const pulseData = (state = [{x: 0, y: 0}], action) => {
  let last = state[ state.length - 1 ].y;
  switch (action.type) {
    case 'INCREMENT':
      return [...state, { x: action.time, y: ++last }];
    case 'DECREMENT':
      if (last !== 0) {
        return [...state, { x: action.time, y: --last }];
      }
      return [...state, { x: action.time, y: 0 }];
    default:
      return state;
  }
};

export default pulseData;
