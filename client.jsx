const axios = require('axios');
const React = require('react');
const ReactDOM = require('react-dom');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}

const getHistory = async () => {
  let url = getApiUrl() + '/history/';
  let result = await axios.get(url);
  console.log(result)
}

getHistory();

class App extends React.Component {
    render() {
        return (
            <div> 
                <input type="text" placeholder="serch..."/>
                <button>search</button>
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)