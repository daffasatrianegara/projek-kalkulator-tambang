import { useEffect, useState } from "react";
import { DustProps } from "../types/props.components.types";

const DustComponent: React.FC<DustProps> = ({ onDataUpdate }) => {
  const [cat, setCat] = useState<"high" | "medium" | "low">("high");
  const [dv, setDv] = useState(0);

  useEffect(() => {
    if (cat === "high") {
      setDv(15);
    } else if (cat === "medium") {
      setDv(4);
    } else if (cat === "low") {
      setDv(2);
    }

    onDataUpdate(6, { deduct_value: dv });
  }, [cat, dv]);
  return (
    <div>
      <div className="">
        <p className="font-semibold text-xl md:text-2xl text-crayola-hover">
          Dust
        </p>
      </div>
      <div className="flex sm:flex-nowrap flex-wrap w-full gap-3">
        <div className="w-full sm:w-1/2">
          <label
            className="font-semibold text-crayola text-lg sm:text-xl"
            htmlFor="cat1"
          >
            Damage Category <span className="text-vermilion">*</span>
          </label>
          <select
            className="mt-1 mb-3"
            name="cat1"
            id="cat1"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCat(e.target.value as "high" | "medium" | "low")
            }
          >
            <option value="High">high</option>
            <option value="Medium">medium</option>
            <option value="Low">low</option>
          </select>
          <label
            className="font-semibold text-crayola text-lg sm:text-xl"
            htmlFor="dv"
          >
            Deduct Value <span className="text-vermilion">*</span>
          </label>
          <input className="mt-1" id="dv" type="number" value={dv} disabled />
        </div>
        <div className="w-full sm:w-1/2 bg-white p-2 rounded mt-0 sm:mt-2">
          <ul className="sm:text-sm text-xs list-disc pl-4">
            <li>High</li>
            <p className="text-vermilion">
              Debu tebal, jarak pandang terganggu ({"<"}20 meter), kecepatan
              kendaraan sangat terbatas.
            </p>
            <li>Medium</li>
            <p className="text-vermilion">
              Debu medium, jarak pandang 20-100 meter, terjadi perlambatan
              kecepatan kendaraan.
            </p>
            <li>Low</li>
            <p className="text-vermilion">
              Debu tipis, jarak pandang normal ({">"}100 meter), kecepatan
              kendaraan normal.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DustComponent;
