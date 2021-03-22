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
        var urlParam = window.location.href.split('/').pop();
        if(!urlParam) return;

        this.setState({ dataString: urlParam });
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
