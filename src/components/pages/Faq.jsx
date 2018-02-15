import React, { Component } from 'react';
import { Collapse } from 'antd';

import { connect } from 'react-redux';
import { withStyles } from 'material-ui';
import Typography from 'material-ui/Typography';

// import components
import { faqStyle } from './styles';

const Panel = Collapse.Panel;

const faqQuestions = [
  {
    section: 'General',
    questions: [
      {
        question: 'HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'HOW DO I SEND SYSCOIN TO SOMEONE?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      }
    ]
  },
  {
    section: 'Tutorials',
    questions: [
      {
        question: 'HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'HOW DO I SEND SYSCOIN TO SOMEONE?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      }
    ]
  },
  {
    section: 'Getting Started',
    questions: [
      {
        question: 'HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'HOW DO I SEND SYSCOIN TO SOMEONE?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      }
    ]

  },
  {
    section: 'Alises',
    questions: [
      {
        question: 'HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'HOW DO I SEND SYSCOIN TO SOMEONE?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      }
    ]

  },
  {
    section: 'Market Place',
    questions: [
      {
        question: 'HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'HOW DO I SEND SYSCOIN TO SOMEONE?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      }
    ]

  },
  {
    section: 'Digital Certificates',
    questions: [
      {
        question: 'HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'HOW DO I SEND SYSCOIN TO SOMEONE?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      }
    ]

  },
  {
    section: 'Encrypted Messaging',
    questions: [
      {
        question: 'HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      },
      {
        question: 'HOW DO I SEND SYSCOIN TO SOMEONE?',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      }
    ]

  },

]


class Faq extends Component {
  render() {
    const { classes, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>

        <Typography variant="display1" gutterBottom>
          SYSHUB FAQ
      </Typography>

        <div className="faqs-div">
          <Collapse bordered={false}>
            {faqQuestions.map((cat, index) => {
              return (
                <Panel header={cat.section} key={index} className="faq-category">
                  {cat.questions.map((ques, index) => {
                    return (
                      <Collapse bordered={false} key ={index}>
                        <div className="list-dot"></div>
                        <Panel header={ques.question} key={index} showArrow={false} className="faq-subCategory">
                          <div style={{ padding: '15px', border: '1px solid #a4b0be', marginLeft: 35 }}>
                            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
                              {ques.answer}
                            </div>
                            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
                              {ques.answer}
                            </div>
                            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
                              {ques.answer}
                            </div>
                            <div style={{ color: '#a4b0be' }}>
                              {ques.answer}
                            </div>
                          </div>
                        </Panel>
                      </Collapse>
                    )
                  })}
                </Panel>


              )
            })}
          </Collapse>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(faqStyle)(Faq)
);
