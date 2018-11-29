
// export const isPromise = payload => payload && !!payload.then ? true : false;

export const isPromise = payload => {
  if(Promise && Promise.resolve) return Promise.resolve(payload) == payload;
  else throw 'Promise not supported in your environment';
};

export const thoonk = store => next => action => {

  if(!isPromise(action.payload)) return next(action);
  // next(action);

};
