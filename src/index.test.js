import { isPromise, thoonk } from './index';
import { createStore, applyMiddleware } from 'redux';

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
    const action = { type: 'ASDF' };
    const reducer = jest.fn();
    const store = createStore(reducer, {}, applyMiddleware(thoonk));
    store.dispatch(action);

    expect(reducer.mock.calls[1][1]).toEqual({ type: 'ASDF' });
  });

  test('if a promise is passed in, call PROMISE_ACTION and LOAD_END', () => {
    const promise = Promise.resolve('done');
    const action = { type: 'PROMISE_ACTION', payload: promise };
    const reducer = jest.fn();
    const store = createStore(reducer, {}, applyMiddleware(thoonk));
    store.dispatch(action);

    return promise
      .then(() => expect(reducer.mock.calls[1][1]).toEqual({ type: 'LOAD_START' }))
      .then(() => expect(reducer.mock.calls[2][1]).toEqual({ type: 'PROMISE_ACTION', payload: 'done' }))
      .then(() => expect(reducer.mock.calls[3][1]).toEqual({ type: 'LOAD_END' }))
  });

  test('if a promise errors, call LOAD_END and ERROR', () => {
    const promise = Promise.reject('fail');
    const action = { type: 'PROMISE_ACTION', payload: promise };
    const reducer = jest.fn();
    const store = createStore(reducer, {}, applyMiddleware(thoonk));
    store.dispatch(action);

    return promise
      .then()
      .catch(() => {
        expect(reducer.mock.calls[1][1]).toEqual({ type: 'LOAD_START' });
        expect(reducer.mock.calls[2][1]).toEqual({ type: 'LOAD_END' });
        expect(reducer.mock.calls[3][1]).toEqual({ type: 'ERROR', payload: 'fail' });
      });
  });

});
