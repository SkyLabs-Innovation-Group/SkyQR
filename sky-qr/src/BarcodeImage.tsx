import React, { createRef, CSSProperties } from 'react';
import { BrowserQRCodeSvgWriter } from '@zxing/browser';

interface BarcodeImageProps
{
    dataString : string
}

export class BarcodeImage extends React.Component<BarcodeImageProps>
{
    container = createRef<HTMLDivElement>();

    componentDidMount()
    {
        this.generateBarcode();
    }

    componentDidUpdate()
    {
        this.generateBarcode();
    }

    render()
    {
        let containerStyle : CSSProperties = 
        {
            background: "#EEEEEE"
        }

        return (
            <div style={containerStyle} ref={this.container}>

            </div>
        )
    }

    generateBarcode()
    {
        if (!this.container.current) return;

        this.container.current.innerHTML = '';

        let writer = new BrowserQRCodeSvgWriter();
        writer.writeToDom(this.container.current, this.props.dataString, 200, 200);
    }
}