import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { withTranslation } from "react-i18next";

import Background from '../components/global/Background';
import BackgroundInner from '../components/global/BackgroundInner';
import InnerBanner from '../components/global/InnerBanner';

var publicurl=process.env.PUBLIC_URL;

/**
 * Old setup page 
 * @component
 * @category Pages
 */
class Setup extends Component {
    render() {
        const { t } = this.props;
        return (
            <Background>
                <BackgroundInner />
                <main className="section setupPage">
                    <MetaTags>
                        <title>{t('setup.meta.title')}</title>
                        <meta name="keywords" content={t('setup.meta.keywords')} />
                        {/* <meta name="description" content={t('setup.meta.description')} /> */}
                    </MetaTags>
                    <div className="shell-large">
                        <div className="section__body">
                            <div className="articles">
                                <InnerBanner heading={t('setup.title')}/>
                                <section className="section_setup bg-white">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="custom__setup__content text-center mb-5">
                                                    <h3 className="mb-2">{t('setup.preliminaries.title')}</h3>
                                                    <p>{t('setup.preliminaries.description')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                                                <div className="setup__list">
                                                    <ol>
                                                        <li>{t('setup.preliminaries.preliminary.p1')}</li>
                                                        <li>{t('setup.preliminaries.preliminary.p2.d1')}
                                                            <blockquote>
                                                                <ul>
                                                                    <li><i className="fa fa-angle-right"></i> 64-bit CPU, 2 Cores (4 preferred)</li>
                                                                    <li><i className="fa fa-angle-right"></i> 4GB RAM (real) minimum (8GB RAM preferred)</li>
                                                                    <li><i className="fa fa-angle-right"></i> 4GB swap (if less than 8GB real RAM) will need to use SSD if using Swap</li>
                                                                    <li><i className="fa fa-angle-right"></i> VM or OpenVZ (KVM preferred)</li>
                                                                    <li><i className="fa fa-angle-right"></i> Linux OS, Ubuntu 18.04.1 LTS (Bionic Beaver) preferred</li>
                                                                    <li><i className="fa fa-angle-right"></i> 80GB Disk Space (100GB+ SSD preferred)</li>
                                                                </ul>
                                                            </blockquote>
                                                            <p>{t('setup.preliminaries.preliminary.p2.d2')}</p>
                                                        </li>
                                                        <li>{t('setup.preliminaries.preliminary.p3')}</li>
                                                        <li>{t('setup.preliminaries.preliminary.p4')}</li>
                                                    </ol>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                                                <h3>{t('setup.preliminaries.providers.title')}</h3>
                                                <div className="installation__list">
                                                    <div className="listcontent">
                                                        <p>{t('setup.preliminaries.providers.description')}</p>
                                                        <hr/>
                                                        <Link to="#">UK2.net</Link>
                                                        <Link to="#">IONOS.co.uk</Link>
                                                        <Link to="#">InterServer.net</Link>
                                                        <Link to="#">OVH.co.uk</Link>
                                                        <Link to="#">KimSufi.com</Link>
                                                        <Link to="#">netcup.de</Link>
                                                        <Link to="#">hetzner.de</Link>
                                                        <Link to="#">mVPS.net</Link>
                                                        <Link to="#">VPS-Mart.com</Link>
                                                        <Link to="#">Hostinger.com</Link>
                                                        <Link to="#">BudgetVM.com</Link>
                                                        <Link to="#">Virtono.com</Link>
                                                        <Link to="#">LeaseWeb.com</Link>
                                                        <Link to="#">HomeAtCloud.com</Link>
                                                        <Link to="#">IdeaStack.com</Link>
                                                        <Link to="#">SimplyHosting.com</Link>
                                                        <Link to="#">RAMNode.com</Link>
                                                        <Link to="#">Time4VPS.com</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 mb-5">
                                                <h3>{t('setup.installation.title')}</h3>
                                                <div className="accordion" id="accordion">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button data-toggle="collapse" data-target="#collapseOne">
                                                                <span>{t('setup.installation.p1.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p>{t('setup.installation.p1.d1')}</p>
                                                                <p>{t('setup.installation.p1.d2')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                                                <span>{t('setup.installation.p2.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapseTwo" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p>{t('setup.installation.p2.d1')}<br/>
                                                                    {t('setup.installation.p2.d2')} <code>{t('setup.installation.p2.d3')}</code>  {t('setup.installation.p2.d4')} <code>{t('setup.installation.p2.d5')}</code>.<br/>
                                                                    <em>{t('setup.installation.p2.d6')} <code>{t('setup.installation.p2.d7')}</code> {t('setup.installation.p2.d8')} <code></code>{t('setup.installation.p2.d9')}</em></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse3">
                                                                <span>{t('setup.installation.p3.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse3" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p>{t('setup.installation.p3.d1')}<br/>
                                                                {t('setup.installation.p3.d2')} <code>{t('setup.installation.p3.d3')}</code>  {t('setup.installation.p3.d4')} <code>{t('setup.installation.p3.d5')}</code>.</p>
                                                                <p>{t('setup.installation.p3.d6')}</p>
                                                                <img src={publicurl+'/assets/images/ss.png'} alt="" className="img-fluid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse4">
                                                                <span>{t('setup.installation.p4.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse4" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p><strong>{t('setup.installation.p4.d1')}</strong> {t('setup.installation.p4.d2')}</p>
                                                                <ol>
                                                                    <li> {t('setup.installation.p4.d3')}<code>{t('setup.installation.p4.d4')}</code> {t('setup.installation.p4.d5')} <code>{t('setup.installation.p4.d6')}</code>.
                                                                    <ul>
                                                                        <li><em>{t('setup.installation.p4.d7')} <code>Masternode42</code> {t('setup.installation.p4.d8')}</em></li>
                                                                        <li>{t('setup.installation.p4.d9')} <code> sys </code> {t('setup.installation.p4.d10')} <code>3</code>.</li>
                                                                    </ul>
                                                                    </li>
                                                                    <li>{t('setup.installation.p4.d11')}<br/>
                                                                    </li>
                                                                </ol>
                                                                <img src={publicurl+'/assets/images/ss2.png'} alt="" className="img-fluid" />
                                                                <p><strong>{t('setup.installation.p4.d12')}</strong> {t('setup.installation.p4.d13')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse5">
                                                                <span>{t('setup.installation.p5.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse5" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <ol>
                                                                    <li>{t('setup.installation.p5.d1')} <code>{t('setup.installation.p5.d2')}</code> {t('setup.installation.p5.d3')}</li>
                                                                    <li>{t('setup.installation.p5.d4')} <code>{t('setup.installation.p5.d5')}</code><br/>
                                                                    </li>
                                                                    <div><img src={publicurl+'/assets/images/ss3.png'} alt="" className="img-fluid" /></div>
                                                                    <li>{t('setup.installation.p5.d6')} <code>OK</code>.
                                                                    <ul>
                                                                    <li>{t('setup.installation.p5.d7')}</li>
                                                                    </ul>
                                                                    </li>
                                                                    <li>{t('setup.installation.p5.d8')} <code>{t('setup.installation.p5.d9')}</code> {t('setup.installation.p5.d10')}</li>
                                                                    <li>{t('setup.installation.p5.d11')} <code>{t('setup.installation.p5.d12')}</code> {t('setup.installation.p5.d13')} <code>{t('setup.installation.p5.d14')}</code> {t('setup.installation.p5.d15')} <strong>{t('setup.installation.p5.d16')}</strong> {t('setup.installation.p5.d17')}<br/>                                            </li>
                                                                    <div><img src={publicurl+'/assets/images/ss4.png'} alt="" className="img-fluid" /></div>
                                                                    <li>{t('setup.installation.p5.d18')} <code>{t('setup.installation.p5.d19')}</code>, {t('setup.installation.p5.d20')}</li>
                                                                    <li>{t('setup.installation.p5.d21')}<br/>
                                                                    </li>
                                                                    <div><img src={publicurl+'/assets/images/ss5.png'} alt="" className="img-fluid" /></div>
                                                                    <li>{t('setup.installation.p5.d22')} <code>{t('setup.installation.p5.d23')}</code>.</li>
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse6">
                                                                <span>{t('setup.installation.p6.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse6" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <ul>
                                                                <li>{t('setup.installation.p6.d1')} <code>{t('setup.installation.p6.d2')}</code> {t('setup.installation.p6.d3')} <code>{t('setup.installation.p6.d4')}</code>.<br/>
                                                                    <div><img src={publicurl+'/assets/images/ss6.png'} alt="" className="img-fluid" /></div>
                                                                    {t('setup.installation.p6.d5')}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse7">
                                                                <span>{t('setup.installation.p7.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse7" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p>{t('setup.installation.p7.d1')}</p>
                                                                <ol>
                                                                    <li>{t('setup.installation.p7.d2')} <code>masternode.conf</code>{t('setup.installation.p7.d3')} <Link href="https://support.syscoin.org/t/the-syscoin-data-directory/103" className="inline-onebox">{t('setup.installation.p7.d4')} <span className="badge badge-notification clicks" title="2 clicks">2</span></Link>.</li>
                                                                    <li>{t('setup.installation.p7.d5')} <code>masternode.conf</code> {t('setup.installation.p7.d6')}</li>
                                                                </ol>
                                                                <blockquote>
                                                                    <p><code># Masternode config file</code><br/>
                                                                    <code># Format: alias IP:port control_token collateral_output_txid collateral_output_index</code></p>
                                                                </blockquote>
                                                                <ol start="3">
                                                                    <li>{t('setup.installation.p7.d7')}
                                                                    <ul>
                                                                    <li>{t('setup.installation.p7.d8')} <code>#</code> {t('setup.installation.p7.d9')}</li>
                                                                    <li>{t('setup.installation.p7.d10')} <code>Maternodes</code> {t('setup.installation.p7.d11')}</li>
                                                                    <li>{t('setup.installation.p7.d12')} <code>IP</code> {t('setup.installation.p7.d13')}</li>
                                                                    <li>{t('setup.installation.p7.d14')} <code>8369</code> {t('setup.installation.p7.d15')}</li>
                                                                    <li>{t('setup.installation.p7.d16')}</li>
                                                                    </ul>
                                                                    </li>
                                                                </ol>
                                                                <blockquote>
                                                                    <p><code># Masternode config file</code><br/>
                                                                    <code># Format: alias IP:port control_token collateral_output_txid collateral_output_index</code><br/>
                                                                    <code>mn1 123.123.123.123:8369 5ra1rhngvNkhkiFE8STrmvH3LvYTCzLyRFHFsZvrJUBV6ZmWnc 06e38868bb8f9958e34d5155437d009b72dff33fc87fd42e51c0f74fdb 0</code></p>
                                                                </blockquote>
                                                                <ol start="4">
                                                                    <li>{t('setup.installation.p7.d17')}</li>
                                                                    <li>{t('setup.installation.p7.d18')}
                                                                    <ul>
                                                                    <li>{t('setup.installation.p7.d19')} <code>Masternode</code> {t('setup.installation.p7.d20')}</li>
                                                                    <li>{t('setup.installation.p7.d21')}</li>
                                                                    <li>{t('setup.installation.p7.d22')}</li>
                                                                    <li>
                                                                    <strong>{t('setup.installation.p7.d23')}</strong> {t('setup.installation.p7.d24')}</li>
                                                                    </ul>
                                                                    </li>
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse8">
                                                                <span>{t('setup.installation.p8.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse8" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p><strong>{t('setup.installation.p8.d1')}</strong> {t('setup.installation.p8.d2')}<br/>
                                                                <Link href="https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh">https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh <span className="badge badge-notification clicks" title="1 click">1</span></Link></p>
                                                                <ol>
                                                                    <li>{t('setup.installation.p8.d3')}
                                                                    <details>
                                                                    <summary>{t('setup.installation.p8.d4')}</summary>
                                                                    <p> {t('setup.installation.p8.d5')} <Link href="https://www.chiark.greenend.org.uk/~sgtatham/putty/">PuTTY</Link> {t('setup.installation.p8.d6')}</p>
                                                                    </details>
                                                                    </li>
                                                                    <li>{t('setup.installation.p8.d7')} <code>root</code>, {t('setup.installation.p8.d8')} <code>root</code> {t('setup.installation.p8.d9')} <code>sudo -s</code>.
                                                                    <ul>
                                                                    <li>{t('setup.installation.p8.d10')} <code>root</code> {t('setup.installation.p8.d11')}</li>
                                                                    </ul>
                                                                    </li>
                                                                    <li>{t('setup.installation.p8.d12')}<br/>
                                                                    <code>bash &lt;(curl -sL https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh)</code>
                                                                    <ul>
                                                                    <li>{t('setup.installation.p8.d13')}</li>
                                                                    <li>
                                                                    <code>curl</code> {t('setup.installation.p8.d14')} <code>bash</code> {t('setup.installation.p8.d15')} <code>bash</code> {t('setup.installation.p8.d16')}</li>
                                                                    </ul>
                                                                    </li>
                                                                    <li>{t('setup.installation.p8.d17')}
                                                                    <ul>
                                                                    <li>{t('setup.installation.p8.d18')}</li>
                                                                    <li>{t('setup.installation.p8.d19c')} <code>y</code> {t('setup.installation.p8.d20')} <code>n</code> {t('setup.installation.p8.d21')} <code>no</code>.</li>
                                                                    <li>{t('setup.installation.p8.d22')} <strong>your</strong> {t('setup.installation.p8.d23')}</li>
                                                                    </ul>
                                                                    <blockquote>
                                                                    <p><code>Syscoin Core Github Branch [master]:</code><br/>
                                                                    <code>Masternode Control Token []: 5ra1rhngvNkhkiFE8STrmvH3LvYTCzLyRFHFsZvrJUBV6ZmWnc</code><br/>
                                                                    <code>External IP Address [123.123.123.123]: </code><br/>
                                                                    <code>Masternode Port [8369]:</code><br/>
                                                                    <code>Configure for mainnet? [Y/n]:</code><br/>
                                                                    Press any key to continue or Ctrl+C to exit…</p>
                                                                    </blockquote>
                                                                    </li>
                                                                    <li>{t('setup.installation.p8.d24')}</li>
                                                                    <li>{t('setup.installation.p8.d25')}<br/>
                                                                    {t('setup.installation.p8.d26')} <code>source ~/.bashrc</code> {t('setup.installation.p8.d27')} <code>{t('setup.installation.p8.d28')}</code>.</li>
                                                                    <li>{t('setup.installation.p8.d29')}<br/>
                                                                    {t('setup.installation.p8.d30')} <code>syscoin-cli getblockchaininfo</code> {t('setup.installation.p8.d31')} <code>{t('setup.installation.p8.d32')}</code>
                                                                    <ul>
                                                                    <li>{t('setup.installation.p8.d33')}</li>
                                                                    </ul>
                                                                    <blockquote>
                                                                    <p>{t('setup.installation.p8.d34')}<br/>
                                                                        {t('setup.installation.p8.d35')}</p>
                                                                    </blockquote>
                                                                    </li>
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse9">
                                                                <span>{t('setup.installation.p9.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse9" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p><strong>{t('setup.installation.p9.d1')}</strong> {t('setup.installation.p9.d2')}</p>
                                                                <p><s>1. {t('setup.installation.p9.d3')} <code>Masternodes</code> {t('setup.installation.p9.d4')}</s><br/>
                                                                <s>2. {t('setup.installation.p9.d5')} <code>Initialize</code>.</s><br/>
                                                                <strong>{t('setup.installation.p9.d6')}</strong> {t('setup.installation.p9.d7')} <code>Initialize</code> {t('setup.installation.p9.d8')}</p>
                                                                <ol>
                                                                    <li>{t('setup.installation.p9.d9')}</li>
                                                                    <li>{t('setup.installation.p9.d10')} <code>masternode initialize [MASTERNODE LABEL]</code>
                                                                    <ul>
                                                                    <li>{t('setup.installation.p9.d11')}</li>
                                                                    <li>{t('setup.installation.p9.d12')}</li>
                                                                    <li>{t('setup.installation.p9.d13')}</li>
                                                                    </ul>
                                                                    </li>
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse10">
                                                                <span>{t('setup.installation.p10.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                        </button>
                                                        </div>
                                                        <div id="collapse10" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p>{t('setup.installation.p10.d1')}<br/>
                                                                    {t('setup.installation.p10.d2')} <Link href="https://syshub.org">Syshub.org <span className="badge badge-notification clicks" title="1 click">1</span></Link> {t('setup.installation.p10.d3')}<br/>
                                                                    {t('setup.installation.p10.d4')}</p>
                                                                <ul>
                                                                    <li>{t('setup.installation.p10.d5')}</li>
                                                                    <li>{t('setup.installation.p10.d6')}</li>
                                                                    <li>{t('setup.installation.p10.d7')}</li>
                                                                </ul>
                                                                <p><strong>{t('setup.installation.p10.d8')}</strong></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button className="collapsed" data-toggle="collapse" data-target="#collapse11">
                                                                <span>{t('setup.installation.p11.title')}</span>
                                                                <i className="fa fa-angle-down float-right"></i>
                                                            </button>
                                                        </div>
                                                        <div id="collapse11" className="collapse" data-parent="#accordion">
                                                            <div className="card-body">
                                                                <p>{t('setup.installation.p11.d1')}<br/>
                                                                    {t('setup.installation.p11.d2')}<br/>
                                                                <code>nano /home/syscoin/.syscoin/syscoin.conf</code><br/>
                                                                {t('setup.installation.p11.d3')}<br/>
                                                                <code>nano /home/syscoin/sentinel/sentinel.conf</code><br/>
                                                                {t('setup.installation.p11.d4')}<br/>
                                                                <code>sudo crontab -u syscoin -l</code><br/>
                                                                {t('setup.installation.p11.d5')}<br/>
                                                                <code>sudo su -c "sentinel-ping" syscoin</code><br/>
                                                                {t('setup.installation.p11.d6')}<br/>
                                                                <code>sudo less /home/syscoin/sentinel/sentinel-cron.log</code><br/>
                                                                {t('setup.installation.p11.d7')}<br/>
                                                                <code>sudo less /home/syscoin/.syscoin/debug.log</code><br/>
                                                                {t('setup.installation.p11.d8')}<br/>
                                                                <code>sudo service syscoind stop</code><br/>
                                                                <code>sudo service syscoind start</code><br/>
                                                                <code>sudo service syscoind restart</code><br/>
                                                                {t('setup.installation.p11.d9')}<br/>
                                                                <code>ps aux | grep syscoind</code></p>
                                                                <p>{t('setup.installation.p11.d10')} <code>syscoin-cli</code> {t('setup.installation.p11.d11')} <code>syscoin</code> {t('setup.installation.p11.d12')}<br/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                                <div className="install__block">
                                                    <h4>{t('setup.rewards.title')}</h4>
                                                    <p>{t('setup.rewards.d1')} <code>([{t('setup.rewards.d2')}] * 4) /60</code>.</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                                <div className="install__block">
                                                    <h4>{t('setup.updates.title')}</h4>
                                                    <p>{t('setup.updates.d1')} <code>sysmasternode</code> {t('setup.updates.d2')}<br/>
                                                        <code>bash &lt;(curl -sL https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh)</code>. ({t('setup.updates.d3')})</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                                <div className="install__block">
                                                    <h4>{t('setup.summary.title')}</h4>
                                                    <p>{t('setup.summary.d1')} <code>syscoin</code> {t('setup.summary.d2')} <code>syscoind</code> {t('setup.summary.d3')} <code>syscoin</code> {t('setup.summary.d4')}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                                <div className="install__block">
                                                    <h4>{t('setup.acknowledgements.title')}</h4>
                                                    <p>{t('setup.acknowledgements.description')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    </main>
                
            </Background>
        )
    }
}

export default withTranslation()(Setup);
