import {
  ruttingParams,
  improperCrossSectionParams,
  potholesParams,
  corrugationParams,
  looseAgregateParams,
  drainageParams,
} from "../assets/urci-params/params.data";
import searchY from "../utils/searchY";
import searchYUrci from "../utils/searchYUrci";

const MainPage = () => {
  return (
    <div className="w-full min-h-screen py-20 bg-sea-green flex justify-center items-center">
      <div className="lg:w-[80%] md:w-[90%] w-[95%] h-full bg-alabaster p-8 rounded-lg">
        <div className="mb-8">
          <p className="text-center font-bold text-2xl md:text-3xl text-crayola">
            URCI Calculator
          </p>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap w-full gap-5">
          <div className="w-full sm:w-1/2">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="pu"
            >
              Measured Road Length <span className="text-vermilion">*</span>
            </label>
            <input
              className="mt-1"
              id="pu"
              name="pUkr"
              type="number"
              placeholder="Enter the length of the road you measured..."
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="lu"
            >
              Measured Road Width <span className="text-vermilion">*</span>
            </label>
            <input
              id="lu"
              className="mt-1"
              name="lUkr"
              type="number"
              placeholder="Enter the width of the road you are measuring..."
            />
          </div>
        </div>

        {/* Rutting */}
        <div className="mt-4">
          <p className="font-semibold text-xl md:text-2xl text-crayola-hover">
            Rutting
          </p>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap w-full gap-5">
          <div className="w-full sm:w-1/2">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="pur"
            >
              Length of Damaged Road <span className="text-vermilion">*</span>
            </label>
            <input
              className="mt-1"
              id="pur"
              name="pUkrR"
              type="number"
              placeholder="Enter the length of the damaged road..."
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="lu"
            >
              Width of Damaged Road <span className="text-vermilion">*</span>
            </label>
            <input
              className="mt-1"
              id="lu"
              name="lUkrR"
              type="number"
              placeholder="Enter the width of the damaged road..."
            />
          </div>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap w-full gap-5 mt-3">
          <div className="w-full sm:w-1/2">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="cat1"
            >
              Damage Category <span className="text-vermilion">*</span>
            </label>
            <select className="mt-1" name="cat1" id="cat1">
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
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
                Rutting 2,5 – 7,5 cm, Getaran minim, kecepatan kendaraan
                menurun.
              </p>
              <li>Low</li>
              <p className="text-vermilion">
                Rutting max 2,5 cm, Getaran minim, kecepatan kendaraan normal.
              </p>
            </ul>
          </div>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap w-full gap-5 mt-3">
          <div className="w-full sm:w-1/2">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="luasKrRoot"
            >
              Area of ​​Damaged Road
            </label>
            <input id="luasKrRoot" type="number" disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
