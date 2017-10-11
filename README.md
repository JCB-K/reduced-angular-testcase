# Rendering Angular inside React

I'm trying to render legacy Angular controllers inside a React app. The issue is that when we browse to it through react-router, the template won't be evaluated. However, after doing a hard reload it works as expected. Can I hook into Angular template compilation, so I can trigger it on external events? (e.g.: react-router)

All the interesting code is in src/App.js.

# Update: solution?

I've written a Angular controller that acts as a bridge between React-Router events and Angular template rendering. We use `ng-include` for async rendering. It looks something like this pseudo code:

```js
const AngularWrapper = history.listen((location) => {
  <div ng-include={getTemplateForLocation(location)} />
})
const App = <Router><AngularWrapper /></Router>
export default App;
```