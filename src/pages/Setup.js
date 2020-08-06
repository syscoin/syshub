import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InnerBanner from '../parts/InnerBanner';
import MetaTags from 'react-meta-tags';
var publicurl=process.env.PUBLIC_URL;
export class Setup extends Component {
    render() {
        return(
            <main className="setupPage">
                 <MetaTags>
                        <title>Syscoin Masternodes - Masternode Setup</title>
                        <meta name="keywords" content="Syscoin, Masternodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards" />
                        <meta name="description" content="Sysnode.info provides Syscoin Masternode Operators the tools to maximise the most from their Masternodes!" />
                </MetaTags>
                <InnerBanner heading="Setup Your Syscoin Masternode"/>
                <section className="section_setup bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="custom__setup__content text-center mb-5">
                            <h3 className="mb-2">Important Preliminaries</h3>
                            <p>Please read them carefully.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                        <div className="setup__list">
                            <ol>
                                <li>You will need 100 000 SYS, plus change.</li>
                                <li>You will need a server (can be virtual) with the following requirements:
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
                                    <p>Check the list below for options. We purposefully don’t provide a single recommendation because we aim for a network that is regionally distributed and spread across various hosters.</p>
                                </li>
                                <li>You will need the latest version of Syscoin Qt 4.x 3. If you are still on Syscoin 3.x then you will need to follow the Upgrade Guide.</li>
                                <li>We indicate placeholders by using squared brackets. [PASSWORD] becomes 12345 if your password is 12345. In fact, if your password is so simple, urgently learn about secure passwords and then change it.</li>
                            </ol>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                        <h3>List of VPS Providers</h3>
                        <div className="installation__list">
                            <div className="listcontent">
                                <p>There are many VPS service providers that offer and exceed the hardware requirements, as such it is recommended that you shop around and do your own homework on various potential providers. Note the following is a list of just some examples and should not be interpreted as recommendations or endorsement.</p>
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
                        <h3>Installation</h3>
                        <div className="accordion" id="accordion">
                            <div className="card">
                                <div className="card-header">
                                    <button data-toggle="collapse" data-target="#collapseOne">
                                        <span>Getting Prepared</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>To stake your masternode you will need to provide exactly 100,000 SYS in your masternode address. Use Syscoin-Qt for your system to process this transaction.</p>
                                        <p>Wait for your local Syscoin-Qt to fully sync.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                        <span>Unlocking Syscoin-Qt</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>To unlock your wallet: go to Window-&gt; Console<br/>
                                            and type: <code>walletpassphrase [PASSWORD] [SECONDS]</code>  and press and <code>Enter</code>.<br/>
                                            <em>The <code>[SECONDS]</code> parameter defines for how many seconds your wallet should stay unlocked. You can also lock it again manually using <code>walletlock</code>.</em></p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse3">
                                        <span>Generating a Masternode Control Token</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse3" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>To generate your masternode control token, go to Console<br/>
                                        and type: <code>masternode genkey</code>  and press <code>Enter</code>.</p>
                                        <p>Copy this value as you will need it later, it will look similar to the following:</p>
                                        <img src={publicurl+'/assets/images/ss.png'} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse4">
                                        <span>Generating A New Legacy Address</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse4" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p><strong>Note:</strong> You need a Syscoin 4 address in a special legacy format, that can only be created using the console. Please follow these instructions without deviation.</p>
                                        <ol>
                                            <li>Go to Console and type: <code>getnewaddress [LABEL] legacy</code> and press <code>Enter</code>.
                                            <ul>
                                                <li><em>Pick something descriptive, such as <code>Masternode42</code> as label.</em></li>
                                                <li>Masternodes require legacy addresses, and will neither work with the new Bech32 addresses that start with <code>sys</code> nor with ordinary addresses starting with <code>3</code>.</li>
                                            </ul>
                                            </li>
                                            <li>Copy this address as well as you will need to send your collateral to it in the next step.<br/>
                                            </li>
                                        </ol>
                                        <img src={publicurl+'/assets/images/ss2.png'} alt="" className="img-fluid" />
                                        <p><strong>Note:</strong> If you are creating multiple masternodes, you will need separate control tokens and collateral addresses for each.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse5">
                                        <span>Sending 100,000 SYS Collateral</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse5" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <ol>
                                            <li>Use the GUI, click on the <code>Send</code> tab.</li>
                                            <li>Click on <code>Inputs ...</code><br/>
                                            </li>
                                            <div><img src={publicurl+'/assets/images/ss3.png'} alt="" className="img-fluid" /></div>
                                            <li>Select the unspent transaction outputs you want to use for your collateral, click <code>OK</code>.
                                            <ul>
                                            <li>Be aware that you cannot send transactions with more than 675 inputs.</li>
                                            </ul>
                                            </li>
                                            <li>Enter your masternode collateral address from the previous step into the <code>Pay To</code> field.</li>
                                            <li>Enter exactly <code>100,000</code> into the <code>Amount</code> field and do <strong>not</strong> subtract fees from the amount.<br/>                                            </li>
                                            <div><img src={publicurl+'/assets/images/ss4.png'} alt="" className="img-fluid" /></div>
                                            <li>Press <code>Send</code>, enter your password if asked, confirm the transaction details.</li>
                                            <li>Find your funding transaction in the transaction view by the label you provided earlier.<br/>
                                            </li>
                                            <div><img src={publicurl+'/assets/images/ss5.png'} alt="" className="img-fluid" /></div>
                                            <li>Right-click on your new transaction and select <code>Copy transaction ID</code>.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse6">
                                        <span>Getting your Output Index</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse6" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <ul>
                                        <li>Go back to the Console, type: <code>masternode outputs</code> and press <code>Enter</code>.<br/>
                                            <div><img src={publicurl+'/assets/images/ss6.png'} alt="" className="img-fluid" /></div>
                                        Match the transaction ID you just copied to the corresponding entry and note down the number behind it. This is the output index.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse7">
                                        <span>Editing maternode.conf</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse7" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>Next we will have to edit the masternode.conf file.</p>
                                        <ol>
                                            <li>Navigate to the <code>masternode.conf</code>in <Link href="https://support.syscoin.org/t/the-syscoin-data-directory/103" className="inline-onebox">The Syscoin data directory <span className="badge badge-notification clicks" title="2 clicks">2</span></Link>.</li>
                                            <li>Open <code>masternode.conf</code> in a text editor of your choice, the simpler the better.</li>
                                        </ol>
                                        <blockquote>
                                            <p><code># Masternode config file</code><br/>
                                            <code># Format: alias IP:port control_token collateral_output_txid collateral_output_index</code></p>
                                        </blockquote>
                                        <ol start="3">
                                            <li>Add a line at the bottom of the file, adhering to the format indicated in the comment at the top.
                                            <ul>
                                            <li>Lines starting with <code>#</code> are comments and will be ignored by Syscoin.</li>
                                            <li>The alias you enter will identify this masternode in the <code>Maternodes</code> tab in Syscoin-Qt.</li>
                                            <li>The required <code>IP</code> is that of your server.</li>
                                            <li>Use the <code>8369</code> as the port.</li>
                                            <li>Fill the rest of the fields with the information you copied earlier.</li>
                                            </ul>
                                            </li>
                                        </ol>
                                        <blockquote>
                                            <p><code># Masternode config file</code><br/>
                                            <code># Format: alias IP:port control_token collateral_output_txid collateral_output_index</code><br/>
                                            <code>mn1 123.123.123.123:8369 5ra1rhngvNkhkiFE8STrmvH3LvYTCzLyRFHFsZvrJUBV6ZmWnc 06e38868bb8f9958e34d5155437d009b72dff33fc87fd42e51c0f74fdb 0</code></p>
                                        </blockquote>
                                        <ol start="4">
                                            <li>Save the file</li>
                                            <li>Close and restart Syscoin-Qt.
                                            <ul>
                                            <li>If you don’t see your masternode listed in the <code>Masternode</code> tab please double check the above configuration.</li>
                                            <li>If you now go to Coin Control you will see you collateral and it will have a padlock indicating it is locked.</li>
                                            <li>If you send any Syscoin from this wallet make sure that your collateral is locked.</li>
                                            <li>
                                            <strong>Convenience:</strong> After restarting, keep Syscoin-Qt running, we will need it again after setting up the server.</li>
                                            </ul>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse8">
                                        <span>Installing syscoind on your server</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse8" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p><strong>Note:</strong> We’re using a script to keep this step as simple as possible. It’s a good idea to read through any script you find on the Internet before running it, including this one made by the community:<br/>
                                        <Link href="https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh">https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh <span className="badge badge-notification clicks" title="1 click">1</span></Link></p>
                                        <ol>
                                            <li>Connect to your server via SSH.
                                            <details>
                                            <summary>
                                            Win</summary>
                                            <p> You can use <Link href="https://www.chiark.greenend.org.uk/~sgtatham/putty/">PuTTY</Link> as SSH client.</p>
                                            </details>
                                            </li>
                                            <li>If you’re not <code>root</code>, become <code>root</code> by running <code>sudo -s</code>.
                                            <ul>
                                            <li>If you are <code>root</code> already, please consider creating another user accont and disabling root login as that is a security issue - especially if you log in using a password, instead of public key encryption.</li>
                                            </ul>
                                            </li>
                                            <li>As root, enter the following command to start the automated install:<br/>
                                            <code>bash &lt;(curl -sL https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh)</code>
                                            <ul>
                                            <li>Note this has only been tested on Ubuntu 16.04 and 18.04.</li>
                                            <li>
                                            <code>curl</code> will download the file and feed it to <code>bash</code> which is the name of the thing you’re typing your commands into. <code>bash</code> will then interpret the lines in the files as commands to execute and run the script.</li>
                                            </ul>
                                            </li>
                                            <li>Providing input to the script.
                                            <ul>
                                            <li>Default values are found in brackets and pressing enter will selected them.</li>
                                            <li>For entries with a [Y/n] the capital letter is the default. Enter <code>y</code> to choose ‘yes’ or <code>n</code> to choose <code>no</code>.</li>
                                            <li>Likely the only value you will need to enter is <strong>your</strong> masternode control token.</li>
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
                                            <li>Wait for the setup to finish.</li>
                                            <li>Setup your access to syscoind.<br/>
                                            type: <code>source ~/.bashrc</code> and press <code>Enter</code>.</li>
                                            <li>Check you are fully synced and geth_sync_status = synced:<br/>
                                            type <code>syscoin-cli getblockchaininfo</code> and press <code>Enter</code>
                                            <ul>
                                            <li>You will get this error until you start your Masternode as below</li>
                                            </ul>
                                            <blockquote>
                                            <p>“status”: “Not capable masternode: Masternode not in masternode list”<br/>
                                            START MASTERNODE</p>
                                            </blockquote>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse9">
                                        <span>Initializing your masternode</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse9" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p><strong>Note:</strong> The next step requires a fully synced Syscoin-Qt, which should have happened by now if you didn’t close it as advised earlier. Otherwise, start it again and wait for it to fully sync. This can take 10 minutes.</p>
                                        <p><s>1. Choose the <code>Masternodes</code> tab, select your masternode,</s><br/>
                                        <s>2. Click <code>Initialize</code>.</s><br/>
                                        <strong>Note:</strong> For the moment, the <code>Initialize</code> Button is bugged. We need to use the Console again.</p>
                                        <ol>
                                            <li>Unlock your walled as you did at the start in Step 2.</li>
                                            <li>Go to the Console, enter <code>masternode initialize [MASTERNODE LABEL]</code>
                                            <ul>
                                            <li>Every time you do this, you will reset the grace period your node has to wait before it can receive rewards. The grace period 102 hours at the time of this writing.</li>
                                            <li>(Re-)Initializing a masternode does not affect seniority. Seniority is only dependent on the funding transaction.</li>
                                            <li>If the masternode status ever becomes <code>New_Start_Required</code> and stays that way over 15-30 minutes, that means it has been disconnected from the network. Something might be wrong, it might be time to re-initialize it again as it won’t receive rewards anymore.</li>
                                            </ul>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse10">
                                        <span>Governance / Sign up to Syshub (optional but highly recommended)</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse10" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>As the proud owner of a masternode, you are elligible to partake in Syscoin’s governance process.<br/>
                                            The most convenient way to do this, is to head over to <Link href="https://syshub.org">Syshub.org <span className="badge badge-notification clicks" title="1 click">1</span></Link> and register your masternode.<br/>
                                            Syshub allows you to easily, securely and comfortably:</p>
                                        <ul>
                                            <li>create proposals</li>
                                            <li>vote on proposals</li>
                                            <li>…and checkout some statistics around masternodes.</li>
                                        </ul>
                                        <p><strong>This is a community project, your votes and your input are important.</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <button className="collapsed" data-toggle="collapse" data-target="#collapse11">
                                        <span>Command reference to manage your masternode</span>
                                        <i className="fa fa-angle-down float-right"></i>
                                    </button>
                                </div>
                                <div id="collapse11" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>MASTERNODE COMMANDS IF YOU USED THE SCRIPT<br/>
                                        View your syscoin.conf<br/>
                                        <code>nano /home/syscoin/.syscoin/syscoin.conf</code><br/>
                                        View your sentinel.conf<br/>
                                        <code>nano /home/syscoin/sentinel/sentinel.conf</code><br/>
                                        View the syscoin user crontab which should contain:<br/>
                                        <code>sudo crontab -u syscoin -l</code><br/>
                                        Run a sentinel ping to speed up Qt syncing? why not!<br/>
                                        <code>sudo su -c "sentinel-ping" syscoin</code><br/>
                                        View the sentinel-ping cron log, look for errors<br/>
                                        <code>sudo less /home/syscoin/sentinel/sentinel-cron.log</code><br/>
                                        View the syscoind debug log, look for errors<br/>
                                        <code>sudo less /home/syscoin/.syscoin/debug.log</code><br/>
                                        Start and stop the syscoind systemd service<br/>
                                        <code>sudo service syscoind stop</code><br/>
                                        <code>sudo service syscoind start</code><br/>
                                        <code>sudo service syscoind restart</code><br/>
                                        Check that the syscoind process is running at the proper user<br/>
                                        <code>ps aux | grep syscoind</code></p>
                                        <p>Aliases to run the respective <code>syscoin-cli</code> command as the <code>syscoin</code> user:<br/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="install__block">
                            <h4>Eligibility for Rewards</h4>
                            <p>Keep in mind that your masternode will not immediately be eligible for rewards. The eligibility period in hours is given by the formula <code>([number of masternodes] * 4) /60</code>.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="install__block">
                            <h4>Future Updates</h4>
                            <p>Updates and reconfigurations can be performed by entering the command <code>sysmasternode</code> or the initial auto install command:<br/>
                                <code>bash &lt;(curl -sL https://raw.githubusercontent.com/Syscoin/Masternode-install-script/master/script.sh)</code>. (the earlier is an alias for the later)</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="install__block">
                            <h4>Summary</h4>
                            <p>This script installs the necessary dependencies to build the Syscoin Core from source. It creates a user named <code>syscoin</code> and uses a systemd service to start the <code>syscoind</code> process as the <code>syscoin</code> user automatically at boot after the necessary networking services have started.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="install__block">
                            <h4>Acknowledgements</h4>
                            <p>Special thanks to demesm and doublesharp for the initial script, Bigpoppa for most of the conversion and bitje, johnp and the Syscoin team for upgrading and working out minor issues to get it running on SYS4.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </main>
        )
    }
}

export default Setup;