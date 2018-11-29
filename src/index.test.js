import { isPromise, thoonk } from './index';

// jest.mock('./index.js', () => ({
//   store: {
//     dispatch: ({ type }) => {
//       if(type === 'PROMISE_ACTION') return Promise.resolve('Did promise');
//       else if(type === 'LOAD_START') return 'Loading';
//       else if(type === 'LOAD_END') return 'Done Loading';
//       else if(type === 'ERROR') return 'Error action';
//       else return Promise.reject('404');
//     }
//   }
// }));

describe('isPromise?', () => {

  test('it returns true if payload is promise', () => {
    const promise = () => new Promise((resolve, reject) => resolve('done'));
    const test = isPromise(promise());
    expect(test).toBe(true);
  });

  test('it returns false if payload is not promise', () => {
    const nonPromise = jest.fn();
    const test = isPromise(nonPromise());
    expect(test).toBe(false);
  });

});

describe('thoonk, a popular addition to thunk', () => {

  test('if a non-promise is passed in, just call next(action)', () => {
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn()
    };
    const next = jest.fn();
    const actionFn = jest.fn();
    const action = {
      payload: actionFn
    };
    thoonk(store)(next)(action);
    expect(next.mock.calls).toHaveLength(1);
    expect(actionFn.mock.calls).toHaveLength(0);
  });

  test('if a promise is passed in, call PROMISE_ACTION and LOAD_END', () => {
    const promiseFn = jest.fn();
    const promise = () => new Promise((resolve, reject) => {
      promiseFn();
      resolve('done');
    });


    // const store = {
    //   dispatch: jest.fn(),
    //   getState: jest.fn()
    // };
    // const next = jest.fn();
    // const actionFn = jest.fn();
    // const action = {
    //   payload: actionFn
    // };
    // thoonk(store)(next)(action);
    // expect(next.mock.calls).toHaveLength(1);
    // expect(actionFn.mock.calls).toHaveLength(0);

  });

  test('if a promise errors, call LOAD_END and ERROR', () => {

  });

});
