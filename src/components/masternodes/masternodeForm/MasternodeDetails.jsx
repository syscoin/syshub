import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import IconInput from "../../global/IconInput";

const schema = yup.object().shape({
  collateralHash: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required("Collateral hash is required"),
  collateralIndex: yup
    .string()
    .required("Collateral index is required")
    .matches(/^[0-1]/, "Collateral index must be: 0 or 1"),
  ipAddress: yup.string()
    .required("IP Address is required")
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])(.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])){3}$/,
      "Must be a valid IP address"
    ),
  ownerAddress: yup.string()
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
    .required("The owner address is required"),
  operatorPubKey: yup.string().required("Operator public key is required"),
  votingAddress: yup.string()
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
    .required("The voting address is required"),
  operatorReward: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("The operator reward is required")
    .typeError("Must be a number")
    .min(0, "Must be a positive number")
    .max(100.00, "Max value is 100.00"),
  payoutAddress: yup.string()
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
    .required("The payout address is required"),
  fundAddress: yup.string()
    .notRequired(),
});

/**
 * Component of the masternode register form
 * @component
 * @subcategory masternodes
 * @param {*} onNext function that gets executed after the form is submitted
 * @example
 * const onNext = () => {}
 * return (
 *  <MasternodeDetails onNext={onNext} />
 * )
 */
const MasternodeDetails = ({ onNext }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      operatorReward: 0
    }
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div className="form-group">
        <label htmlFor="collateralHash">Collateral Hash</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="collateralHash"
            ref={register}
            name="collateralHash"
            className="styled"
          />
          <IconInput dataId="collateralHash">
            <p>The txid of the 100000 Syscoin collateral funding transaction.</p>
          </IconInput>
        </div>
        
        <ErrorMessage
          errors={errors}
          name="collateralHash"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>
      <div className="form-group">
        <label htmlFor="collateralIndex">Collateral index</label>
        <div style={{ position: 'relative' }}>
          <select
            className="styled"
            name="collateralIndex"
            id="collateralIndex"
            ref={register}
            defaultValue=""
          >
            <option value="" hidden>
              Select The output index of the 100000 Syscoin funding transaction
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
          <IconInput dataId="collateralIndex">
            <p>The output index of the 100000 Syscoin funding transaction. Use the <code>masternode_outputs</code> command in your QT wallet to get the collateral_hash and corresponding index.</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="collateralIndex"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="ipAddress">IP Address (without port)</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="ipAddress"
            ref={register}
            name="ipAddress"
            className="styled"
          />
          <IconInput dataId="ipAddress">
            <p>Enter the IP address of your SentryNode server (without port number). Must be unique on the network. Can be set to 0, which will require a ProUpServTx.</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="ipAddress"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ownerAddress">Owner address</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="ownerAddress"
            ref={register}
            name="ownerAddress"
            className="styled"
          />
          <IconInput dataId="ownerAddress">
            <p>The Syscoin address generated above for the owner address</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="ownerAddress"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="operatorPubKey">Operator public key</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="operatorPubKey"
            ref={register}
            name="operatorPubKey"
            className="styled"
          />
          <IconInput dataId="operatorPubKey">
            <p style={{ lineHeight: "1.5" }}>The BLS public key generated above (or provided by your hosting service)</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="operatorPubKey"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="votingAddress">Voting address</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="votingAddress"
            ref={register}
            name="votingAddress"
            className="styled"
          />
          <IconInput dataId="votingAddress">
            <p style={{ lineHeight: "1.5" }}>The Syscoin address generated above, or the address of a delegate, used for proposal voting</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="votingAddress"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="operatorReward">Operator reward</label>
        <div style={{ position: 'relative' }}>
          <input
            type="number"
            min="0.00"
            max="100.00"
            id="operatorReward"
            ref={register}
            name="operatorReward"
            className="styled"
            style={{paddingRight: '30px'}}
          />
          <IconInput dataId="operatorReward">
            <p style={{ lineHeight: "1.5" }}>The percentage of the block reward allocated to the operator as payment,</p>
            <p style={{ lineHeight: "1.5" }}>0 for no reward - this is if you want to pay someone else a % of your rewards.</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="operatorReward"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="payoutAddress">Payout address</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="payoutAddress"
            ref={register}
            name="payoutAddress"
            className="styled"
          />
          <IconInput dataId="payoutAddress">
            <p>A Syscoin address to receive the owner’s masternode rewards.</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="payoutAddress"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fundAddress">Fee source address (optional)</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="fundAddress"
            ref={register}
            name="fundAddress"
            className="styled"
          />
          <IconInput dataId="fundAddress">
            <p style={{lineHeight:'1.5'}}>If specified wallet will only use coins from this address to fund ProTx.</p>
            <p style={{lineHeight:'1.5'}}>If not specified, payoutAddress is the one that is going to be used.</p>
          </IconInput>
        </div>
        <ErrorMessage
          errors={errors}
          name="fundAddress"
          render={({ message }) => (
            <small>
              <p style={{ lineHeight: "1.5" }}>{message}</p>
            </small>
          )}
        />
      </div>

      <div className="form-actions-spaced">
        <button className="btn btn--blue" type="submit">
          Next
        </button>
      </div>
    </form>
  );
};

export default MasternodeDetails;
