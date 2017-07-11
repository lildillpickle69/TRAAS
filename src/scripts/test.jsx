import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';


// window.renderApp = function(id) {
//   if (id === 'main') {
//     ReactDOM.render(<App />, document.getElementById(id));
//   } else if (id === 'form') {
//     ReactDOM.render(<NewAddendum />, document.getElementById(id));
//   }
// };

ReactDOM.render((<Main />
), document.getElementById('main'));
