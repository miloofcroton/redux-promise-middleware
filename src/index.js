
export const store = {
  dispatch: jest.fn(),
  getState: jest.fn()
};
// export const isPromise = payload => payload && !!payload.then ? true : false;
export const isPromise = payload => {
  if(Promise && Promise.resolve) return Promise.resolve(payload) == payload;
  else throw 'Promise not supported in your environment';
};

export const thoonk = store => next => action => {

  if(!isPromise(action.payload)) return next(action);
  store.dispatch({ type: 'LOAD_START' });
  return action.payload
    .then(result => {
      store.dispatch({ type: 'PROMISE_ACTION', payload: result });
      store.dispatch({ type: 'LOAD_END' });
    })
    .catch(err => {
      store.dispatch({ type: 'LOAD_END' });
      store.dispatch({ type: 'ERROR', payload: err });
    });

};
