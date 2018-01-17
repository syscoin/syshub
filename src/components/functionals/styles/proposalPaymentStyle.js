import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;

export default {
  proposalPaymentRoot: {
    height: "100%",
    marginLeft: "15px",
    marginTop: "80px",
    "& .paymentsView": {
      "& .OnTimePaymentView": {
        "& .form": {
          "& .FormGroup": {
            "& .input-field": {
              color: primaryLight

            }
          }
        }
      }
    }


  }
};
