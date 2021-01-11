const admin = {
  admin: {
    meta: {
      title: 'Syscoin Masternodes - Admin',
      keywords: 'Syscoin, Masternodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards',
      description: 'Sysnode.info provides Syscoin Masternode Operators the tools to maximise the most from their Masternodes!'
    },
    heading: 'Admin dashboard',
    users: {
      label: 'Search user',
      placeholder: 'Email address',
      table: {
        email: 'Email',
        name: 'Name',
        admin: 'Admin',
        actions: 'Actions'
      },
      modal: {
        title: "Add new admin user"
      }
    },
    proposals: {
      heading: 'Hidden proposals',
      label: 'Hide a proposal',
      placeholder: 'Proposal hash',
      table: {
        name: 'Name',
        hash: 'Proposal hash',
        creation: 'Creation date',
        actions: 'Actions'
      }
    }
  }
}
export default admin;