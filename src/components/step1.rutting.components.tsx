import { useEffect, useState } from "react";
import { ruttingParams } from "../assets/urci-params/params.data";
import searchY from "../utils/searchY";
import calculateArea from "../utils/calculateArea";
import calculateDensity from "../utils/calculateDensity";
import { Props } from "../types/props.components.types";
import { CustomToast } from "./ui/customToast";

const RuttingComponent: React.FC<Props> = ({
  onDataUpdate,
  meassuredLength,
  meassuredWidth,
  meassuredArea,
}) => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [area, setArea] = useState(0);
  const [cat, setCat] = useState<"high" | "medium" | "low">("high");
  const [dv, setDv] = useState(0);

  useEffect(() => {
    if (length && width) {
      if (Number(length) > Number(meassuredLength)) {
        CustomToast({
          type: "error",
          title: "Invalid Damage Length",
          message:
            "The reported road damage length exceeds the total measured length of the road.",
        });
        return;
      }

      if (Number(width) > Number(meassuredWidth)) {
        CustomToast({
          type: "error",
          title: "Invalid Damage Width",
          message:
            "The reported road damage width exceeds the total measured width of the road.",
        });
        return;
      }

      setArea(calculateArea(length, width));
      const density = calculateDensity(
        meassuredArea.toString(),
        area.toString(),
      );
      if (density) {
        const y = searchY(ruttingParams, cat, density);
        if (y !== null) {
          setDv(y);
          onDataUpdate(1, { deduct_value: dv });
        }
      }
    }
  }, [length, width, area, cat]);
  return (
    <div>
      <div>
        <p className="font-semibold text-xl md:text-2xl text-crayola-hover">
          Rutting
        </p>
      </div>
      <div className="flex sm:flex-nowrap flex-wrap w-full gap-3">
        <div className="w-full sm:w-1/3">
          <label
            className="font-semibold text-crayola text-lg sm:text-xl"
            htmlFor="pur"
          >
            Damaged Road length (m) <span className="text-vermilion">*</span>
          </label>
          <input
            className="mt-1"
            id="pur"
            type="number"
            placeholder="Enter the length of the damaged road..."
            onChange={(e) => setLength(e.target.value)}
            required
          />
        </div>
        <div className="w-full sm:w-1/3">
          <label
            className="font-semibold text-crayola text-lg sm:text-xl"
            htmlFor="lu"
          >
            Damaged Road Width (m) <span className="text-vermilion">*</span>
          </label>
          <input
            className="mt-1"
            id="lu"
            type="number"
            placeholder="Enter the width of the damaged road..."
            onChange={(e) => setWidth(e.target.value)}
            required
          />
        </div>
        <div className="w-full sm:w-1/3">
          <label
            className="font-semibold text-crayola text-lg sm:text-xl"
            htmlFor="lu"
          >
            Damaged Road Area (m²) <span className="text-vermilion">*</span>
          </label>
          <input className="mt-1" id="lu" type="number" value={area} disabled />
        </div>
      </div>
      <div className="flex sm:flex-nowrap flex-wrap w-full gap-3 mt-3">
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
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
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
              Rutting {">"} 7,5 cm, getaran keras, terdapat pumping material
              subgrade, subgrade tidak memiliki daya dukung.
            </p>
            <li>Medium</li>
            <p className="text-vermilion">
              Rutting 2,5 – 7,5 cm, Getaran minim, kecepatan kendaraan menurun.
            </p>
            <li>Low</li>
            <p className="text-vermilion">
              Rutting max 2,5 cm, Getaran minim, kecepatan kendaraan normal.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RuttingComponent;
