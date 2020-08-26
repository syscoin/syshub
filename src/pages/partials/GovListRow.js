import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import ReactTooltip from 'react-tooltip';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export class GovListRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            rowData: [],
            enabled: 0
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            rowData: this.props.govRowData,
            enabled: this.props.enableVal
        });
    }
    comaToNum = (str) => {
        return Number(str.replace(",", ""));
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            var rowdata=this.state.rowData;
            var final_url="";
            console.log(rowdata.url);
            if(rowdata.url!=="" && rowdata.url!=='emptyField') {
                final_url=rowdata.url;
            } else {
                final_url="/404";
            }
            var enabled=this.comaToNum(this.state.enabled);
            var unixTimestamp = rowdata.CreationTime;
            var milliseconds = unixTimestamp * 1000;
            const dateObject = new Date(milliseconds)
            const humanDateFormat = dateObject.getDate()+"-"+(dateObject.getMonth()+1)+"-"+dateObject.getFullYear();
            var pass="";
            if(((rowdata.YesCount - rowdata.NoCount)/enabled)*100 > 10) {
                pass=<i className='fa fa-check greenIcon' data-tip={t('govlist.table.green_text')}></i>;
            } else {
                pass=<i className='fa fa-times redIcon' data-tip={t('govlist.table.red_text')}></i>;
            }
            var green_comment=<p>
                    <CopyToClipboard text={'gobject votemany '+rowdata.Hash+' yes'}
                    onCopy={() => this.setState({green_copied: true})}>
                    <button type="button" className="copybtns greenIcon">Copy Yes <i className='fa fa-check'></i></button>
                    </CopyToClipboard>
                </p>;
            var red_comment=<p>
                <CopyToClipboard text={'gobject votemany '+rowdata.Hash+' no'}
                onCopy={() => this.setState({red_copied: true})}>
                <button type="button" className="copybtns redIcon">Copy No <i className='fa fa-times' ></i></button>
                </CopyToClipboard>
            </p>;
        return(
            <tr className='vrRows'>
                <td className='text-center'>
                    <ReactTooltip />
                    {pass}
                </td>
                <td>
                    {rowdata.name}
                    <br/>
                    <a href={final_url} taget='_blank'><span className="badge badge-success">{t('govlist.table.view_proposal_txt')}</span></a>
                </td>
                <td>{humanDateFormat}</td>
                <td>{parseFloat(rowdata.payment_amount*rowdata.nPayment)} SYS</td>
                <td>
                    <p className="mb-1">{parseFloat(rowdata.payment_amount/rowdata.nPayment)} SYS / Month(s)</p>
                    <p>{rowdata.nPayment} Month(s)</p>
                </td>
                <td>{(rowdata.YesCount/(rowdata.YesCount+rowdata.NoCount)*100).toFixed(2)+"%"}</td>
                <td>{(rowdata.NoCount/(rowdata.YesCount+rowdata.NoCount)*100).toFixed(2)+"%"}</td>
                <td>{((rowdata.AbsoluteYesCount/enabled)*100).toFixed(2)+"%"}</td>
                <td>
                    {green_comment}
                    {red_comment}
                </td>
            </tr>
        )
        } else {
            return(
                <tr>
                    <td colSpan="9">{t('govlist.loading')}</td>
                </tr>
            )
        }
    }
}

export default withTranslation()(GovListRow);
