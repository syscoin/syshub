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
      <label htmlFor="privateKey">Voting key</label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          name="privateKey"
          ref={register}
          className="styled"
          placeholder={isLegacySelected ? "012314...." : "wpkh(.....)"}
        />
        <IconInput dataId="privateKey">
          <p>The private key of the voting address</p>
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
