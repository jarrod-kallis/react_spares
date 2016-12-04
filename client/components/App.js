import React from 'react';
// import 'react-redux-toastr/src/less/index.less';

import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

// In order to enable hot reloading you can't use a
// functional component as you top level component
// export default () => {
//   return (
//     <h1>Hi from React!</h1>
//   );
// }

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <NavigationBar />
        {/* <FlashMessagesList /> */}
        { this.props.children }
      </div>
    );
  }
}

export default App;
