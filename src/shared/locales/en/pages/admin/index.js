const admin = {
  admin: {
    meta: {
      title: 'Syscoin SentryNodes - Admin',
      keywords: 'Syscoin, SentryNodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards',
      description: 'Sysnode.info provides Syscoin SentryNode Operators the tools to maximise the most from their SentryNodes!'
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
    },
    faqs: {
      heading: 'F.A.Q. list',
      loading: 'Loading questions...',
      table: {
        title: 'Title',
        creation: 'Creation date',
        update: 'Update date',
        actions: 'Actions'
      },
      newFaq: {
        title: 'Add new F.A.Q.'
      },
      updateFaq: {
        title: 'Update F.A.Q.'
      }
    }
  }
}
export default admin;