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
    state = { dataString: "no data" };

    componentDidMount()
    {
        var urlParam = window.location.href.split('/?qr=').pop();
        if(!urlParam) 
            return;

        if(urlParam.includes('/'))
        {
            //handle inputs with multiple slashes such as full skylink urls
            urlParam = urlParam.split('/').pop();
        }

        if(!urlParam) 
            return;

        if(urlParam.length == 46)
        {
            //is a skylink
            let portal = "https://siasky.net";
            urlParam = `${portal}/${urlParam}`;
        }

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
