import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BarcodeImage } from './BarcodeImage';

interface AppProps { }

interface AppState 
{ 
    dataString : string
}

class App extends React.Component<AppProps, AppState>
{
    state = { dataString: "No Data" };

    componentDidMount()
    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let dataString = urlParams.get("qr");

        if (dataString != null)
            this.setState({ dataString: dataString })
    }

    render()
    {
        return (
            <div className="App">
                <header className="App-header">
                    
                    <BarcodeImage dataString={this.state.dataString}/>
                    <p>
                        {this.state.dataString}
                    </p>
                </header>
            </div>
        );
    }
}

export default App;
