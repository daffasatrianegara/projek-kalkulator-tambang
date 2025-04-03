const searchUrciStatus = (urciVal: number) => {
  let status;
  if (urciVal >= 0 && urciVal <= 10) {
    status = "Failed";
  } else if (urciVal >= 11 && urciVal <= 25) {
    status = "Very Poor";
  } else if (urciVal >= 26 && urciVal <= 40) {
    status = "Poor";
  } else if (urciVal >= 41 && urciVal <= 55) {
    status = "fair";
  } else if (urciVal >= 56) {
    status = "Good";
  } else {
    status = "failed";
  }

  return status;
};

export default searchUrciStatus;
