import { isPromise, thoonk } from './index';

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

describe('thoonk, a popular alternative to thunk', () => {

  test('it works', () => {

  });

});
