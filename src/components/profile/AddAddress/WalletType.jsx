import { useFormContext } from "react-hook-form";

export const WalletTypeSelection = () => {
  const { register } = useFormContext();
  return (
    <div className="form-group">
      <label htmlFor="type">Address Type</label>
      <div style={{ position: "relative" }}>
        <select className="styled" name="type" ref={register}>
          <option value="descriptor">From Descriptor (QT Default)</option>
          <option value="legacy">Legacy</option>
        </select>
        <div className="icon-input">
          <p>Select the type of address you want to add.</p>
        </div>
      </div>
    </div>
  );
};

export default WalletTypeSelection;
