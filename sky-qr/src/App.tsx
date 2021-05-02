import React, { createRef, CSSProperties } from 'react';
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

    inputText = createRef<HTMLInputElement>();

    componentDidMount()
    {
        var urlParam = window.location.href.split('/').pop();
        if(!urlParam) 
            return;

        if(urlParam.length == 46)
        {
            //is a skylink
            let portal = "https://siasky.net";
            urlParam = `${portal}/${urlParam}`;
        }

        if(urlParam.startsWith("#"))
            urlParam = urlParam.substring(1);

        this.setState({ dataString: urlParam });
    }

    changeDataString(event : React.ChangeEvent<HTMLInputElement>)
    {
        this.setState({ dataString: event.target.value });
    }

    copyLink()
    {
        navigator.clipboard.writeText(this.state.dataString);
    }

    render()
    {
        let inputStyle : CSSProperties = {
            fontSize: "24px",
            display: "inline-block",
            margin: "0 0 8px 0",
            width: "50vw"
        };

        let labelStyle : CSSProperties = {
            fontSize: "16px",
            display: "inline-block",
            margin: "0 0 8px 0",
            width: "50vw"
        };

        let containerStyle : CSSProperties = {
            whiteSpace: "nowrap"
        };

        let inlineStyle : CSSProperties = {
            display: "inline-block",
            color: "#eeeeee",
            width: "33vw"
        };

        return (
            <div className="App">
                <div style={containerStyle}>
                    <p style={inlineStyle}><a href="http://app.encodeqr.hns.to">SkyDrop</a></p>
                    <p style={inlineStyle}><a href="https://to.skydroid.app/skydrop.skyqr">Android</a></p>
                    <p style={inlineStyle}><a href="">iOS</a></p>
                </div>
                <header className="App-header">
                    <BarcodeImage dataString={this.state.dataString}/>
                    <label style={labelStyle}>Enter skylink to encode:</label>  
                    <input style={inputStyle} type="text" ref={this.inputText} onChange={a => this.changeDataString(a)} value={this.state.dataString}/>
                    <button onClick={() => this.copyLink()}>Copy Link</button>
                </header>
            </div>
        );
    }
}

export default App;
