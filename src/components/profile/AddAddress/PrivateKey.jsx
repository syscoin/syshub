import { useFormContext } from "react-hook-form";
import IconInput from "../../global/IconInput";
import { ErrorMessage } from "@hookform/error-message";

export const PrivateKey = () => {
  const form = useFormContext();
  const { register, watch, errors } = form;
  const currentType = watch("type");

  const isLegacySelected = currentType === "legacy";

  return (
    <div className="form-group">
      <label htmlFor="privateKey">
        {isLegacySelected ? "Voting key" : "Descriptor Wallet"}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          name="privateKey"
          ref={register}
          className="styled"
          placeholder={isLegacySelected ? "012314...." : "wpkh(.....)"}
        />
        <IconInput dataId="privateKey">
          {isLegacySelected ? (
            <p>The private key of the voting address</p>
          ) : (
            <>
              <p>The descriptor of the voting address.</p>
              <p>
                This can be fetched using <code>listdescriptors true</code> on
                your console.
              </p>
            </>
          )}
        </IconInput>
      </div>
      <ErrorMessage
        errors={errors}
        name="privateKey"
        render={({ message }) => (
          <small>
            <p style={{ lineHeight: "1.5" }}>{message}</p>
          </small>
        )}
      />
    </div>
  );
};
