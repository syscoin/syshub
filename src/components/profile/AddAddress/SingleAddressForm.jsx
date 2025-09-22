import { FormProvider, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import IconInput from "../../global/IconInput";
import WalletTypeSelection from "./WalletType";
import { PrivateKey } from "./PrivateKey";
import {
  parseDescriptor,
  deriveAddressesFromXprv,
  deriveAddressFromWifPrivKey,
} from "./validation-utils";

const schema = yup.object().shape({
  name: yup.string().required("Label is required"),
  type: yup
    .string()
    .required("Address type is required")
    .oneOf(
      ["descriptor", "legacy"],
      "Address type must be descriptor or legacy"
    ),
  address: yup
    .string()
    .required("Voting address is required")
    .test(
      "Validated Address Validity",
      "Invalid Address",
      (value, { parent }) => {
        if (!parent?.privateKey || !value) {
          return false;
        }

        if (parent.type === "legacy") {
          // Validate that provided legacy WIF corresponds to the provided address
          try {
            const derived = deriveAddressFromWifPrivKey(parent.privateKey);
            return (derived || "").toLowerCase() === value.toLowerCase();
          } catch (_) {
            return false;
          }
        }

        const results = parseDescriptor(parent.privateKey);
        if (!results || !results.xprv || !results.path) {
          return false;
        }

        const addresses = deriveAddressesFromXprv(
          results.xprv,
          results.path,
          100
        );

        return addresses
          .map((a) => (a || "").toLowerCase())
          .includes(value.toLowerCase());
      }
    ),
  txId: yup
    .string()
    .matches(/-0$|-1$/, "Tx Id must end with the index: -0 or -1")
    .required("Tx id is required"),
  privateKey: yup.string().required("Private key is required"),
});

export const SingleAddressForm = ({ onSingleCreation, isSubmitting }) => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "descriptor",
      name: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const singleAdd = async (data) => {
    await onSingleCreation(data);
  };
  const { errors } = formState;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(singleAdd)}>
        <WalletTypeSelection />
        <div className="form-group">
          <label htmlFor="name">Label</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="name"
              ref={register}
              className="styled"
              id="name"
            />
            <IconInput dataId="name">
              <p>
                Label to differentiate from other voting address at the moment
                of vote
              </p>
            </IconInput>
          </div>
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <small>
                <p style={{ lineHeight: "1.5" }}>{message}</p>
              </small>
            )}
          />
        </div>

        <PrivateKey />

        <div className="form-group">
          <label htmlFor="address">Voting address</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="address"
              ref={register}
              className="styled"
              id="address"
            />
            <IconInput dataId="address">
              <p>
                The same voting address that you used in your protx_register
              </p>
            </IconInput>
          </div>
          {errors.address && (
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => (
                <small>
                  <p style={{ lineHeight: "1.5" }}>{message}</p>
                </small>
              )}
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="txId">Tx id</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="txId"
              ref={register}
              className="styled"
              id="txId"
            />
            <IconInput dataId="txId">
              <p>The collateral hash and collateral index of your masternode</p>
            </IconInput>
          </div>
          <ErrorMessage
            errors={errors}
            name="txId"
            render={({ message }) => (
              <small>
                <p style={{ lineHeight: "1.5" }}>{message}</p>
              </small>
            )}
          />
        </div>

        <div className="form-actions-spaced">
          <button className="btn btn--blue" disabled={isSubmitting}>
            Add
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
