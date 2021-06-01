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
    state = { dataString: "http://app.skydrop.hns.to" };

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
        window.location.hash = event.target.value;

        this.setState({ dataString: event.target.value });
    }

    copyLink()
    {
        if (!navigator?.clipboard?.writeText)
            return;

        navigator.clipboard.writeText(this.state.dataString);
    }

    render()
    {
        let inputStyle : CSSProperties = {
            fontSize: "24px",
            display: "inline-block",
            margin: "0 0 8px 0",
            width: "50vw",
            padding: "8px"
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

        let innerContainerStyle : CSSProperties = {
            display: "block",
            textAlign: "left",
            width: "50vw"
        };

        let buttonStyle : CSSProperties = {
            float: "right",
            marginTop: "4px",
            position: "relative",
            right: "-8px"
        };

        return (
            <div className="App">
                <div style={containerStyle}>
                    <p style={inlineStyle}><a href="http://app.skydrop.hns.to">SkyDrop</a></p>
                    <p style={inlineStyle}><a href="https://play.google.com/store/apps/details?id=to.hns.skydrop">Google Play</a></p>
                    <p style={inlineStyle}><a href="https://apps.apple.com/app/id1568591168#?platform=iphone">App Store</a></p>
                </div>
                <header className="App-header">
                    <BarcodeImage dataString={this.state.dataString}/>
                    <div style={innerContainerStyle}>
                        <label style={labelStyle}>Enter text to encode to QR:</label>  
                        <input style={inputStyle} type="text" ref={this.inputText} onChange={a => this.changeDataString(a)} value={this.state.dataString}/>
                        <button style={buttonStyle} onClick={() => this.copyLink()}>Copy Link</button>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
