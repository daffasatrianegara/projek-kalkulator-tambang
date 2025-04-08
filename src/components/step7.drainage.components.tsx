import { useEffect, useState } from "react";
import { drainageParams } from "../assets/urci-params/params.data";
import searchY from "../utils/searchY";
import calculateArea from "../utils/calculateArea";
import calculateDensity from "../utils/calculateDensity";
import { Props } from "../types/props.components.types";
import { CustomToast } from "./ui/customToast";

const DrainageComponent: React.FC<Props> = ({
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
        const y = searchY(drainageParams, cat, density);
        if (y !== null) {
          setDv(y);
          onDataUpdate(7, { deduct_value: y });
        }
      }
    }
  }, [length, width, area, cat]);

  return (
    <div>
      <div className="w-full">
        <div className="flex gap-2 sm:gap-3 items-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-crayola rounded-full flex items-center justify-center">
            <p className="font-semibold text-lg md:text-xl text-alabaster">7</p>
          </div>
          <p className="font-semibold text-xl md:text-2xl text-crayola-hover">
            Drainage
          </p>
        </div>
        <img
          className="w-full sm:w-1/2 border-2 border-crayola rounded my-3 sm:my-5"
          src="/img/7.drainage.jpg"
          alt="img_drainage"
        />
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
            placeholder="Masukkan panjang jalan yang rusak..."
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
            placeholder="Masukkan lebar jalan yang rusak..."
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
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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
            <p className="text-vermilion">Tidak terdapat tali air.</p>
            <li>Medium</li>
            <p className="text-vermilion">
              Terdapat tali air, aliran air terhambat.
            </p>
            <li>Low</li>
            <p className="text-vermilion">
              Terdapat tali air, aliran air lancar.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DrainageComponent;
