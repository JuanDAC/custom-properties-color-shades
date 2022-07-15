const reducerMiddlewares = (methodName) => (reducer, middleware) => middleware(methodName, reducer);

const applyMiddlewares = (middlewares) => ([methodName, reducer]) => [methodName, middlewares.reduce(reducerMiddlewares(methodName), reducer)];

const areMiddleware = (acum, middleware) => acum && typeof middleware == 'function'

const addMiddleware = (reducers = {}, middlewares = []) => {
    if (!(Array.isArray(middlewares) && middlewares.reduce(areMiddleware, middlewares.length > 0)))
        throw Error('you should use an array of middlewawres');
    const entriesReducers = Object.entries(reducers);
    const reducersWithMiddleware = entriesReducers.map(applyMiddlewares(middlewares));
    const newReducers = Object.fromEntries(reducersWithMiddleware);
    return newReducers;
};

export const sliceMiddleware = (sliceConfig = {}, middlewares) => {
    const { reducers, initialState } = sliceConfig;
    const middlewareWithConfig = middlewares.map((middleware) => middleware(sliceConfig));
    const middlewaresToApply = middlewareWithConfig.map((middleware) => middleware.middleware);
    const initialStateToApply = middlewareWithConfig.map((middleware) => middleware.initialStateUpdate);
    sliceConfig.reducers = addMiddleware(reducers, middlewaresToApply);
    sliceConfig.initialState = initialStateToApply.reduce((state, func) => func(state), initialState);
    return sliceConfig;
}

export const middlewareLocalStorage = ({ name, initialState: { appName } }) => {
    if (typeof appName === 'undefined')
        throw Error('You should add appName key in the initialState');

    const keyLocalStorage = `${appName}/${name}`;

    const initialStateUpdate = (initialState) => {
        const newInitialState = JSON.parse(localStorage.getItem(keyLocalStorage)) || initialState;
        return newInitialState;
    }

    const middleware = (_, reducer) => (...args) => {
        reducer(...args);
        const [state] = args;
        localStorage.setItem(`${appName}/${name}`, JSON.stringify(state));
    };

    return { middleware, initialStateUpdate };
}
