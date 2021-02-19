import React from "react";
import WAValidator from "@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js";
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
            <p>The collateral transaction hash.</p>
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
        <select
          className="styled"
          name="collateralIndex"
          id="collateralIndex"
          ref={register}
          defaultValue=""
        >
          <option value="" hidden>
            Select the collateral index
          </option>
          <option value="0">0</option>
          <option value="1">1</option>
        </select>
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
        <label htmlFor="ipAddress">IP address</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="ipAddress"
            ref={register}
            name="ipAddress"
            className="styled"
          />
          <IconInput dataId="ipAddress">
            <p>Must be unique on the network. Can be set to 0, which will require a ProUpServTx.</p>
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
            <p>The Syscoin address to use for payee updates and proposal voting.</p>
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
            <p>The operator BLS public key. The BLS private key does not have to be known, Do not place it.</p>
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
            <p>The voting address.</p>
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
            <p>The fraction in %% to share with the operator. The value must be between 0.00 and 100.00.</p>
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
            <p>The Syscoin address to use for masternode reward payments.</p>
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
          Prepare
        </button>
      </div>
    </form>
  );
};

export default MasternodeDetails;
