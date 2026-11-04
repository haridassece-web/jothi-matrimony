const crypto = require("crypto");

const PAYU_KEY = process.env.PAYU_KEY || process.env.VITE_PAYU_KEY || "";
const PAYU_SALT = process.env.PAYU_SALT || "";

const PAYU_URL =
  process.env.PAYU_ENV === "production"
    ? "https://secure.payu.in/_payment"
    : "https://test.payu.in/_payment";

function sha512(value) {
  return crypto
    .createHash("sha512")
    .update(value)
    .digest("hex");
}

function generatePaymentHash(data) {
  const hashString = [
    PAYU_KEY,
    data.txnid,
    data.amount,
    data.productinfo,
    data.firstname,
    data.email,
    data.udf1 || "",
    data.udf2 || "",
    data.udf3 || "",
    data.udf4 || "",
    data.udf5 || "",
    "",
    "",
    "",
    "",
    "",
    "",
    PAYU_SALT,
  ].join("|");

  return sha512(hashString);
}

// Function to verify response hash from PayU on callback
function verifyPaymentHash(data) {
  const {
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    status,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    additionalCharges,
    hash
  } = data;

  let hashSequence = [
    status,
    "",
    "",
    "",
    "",
    "",
    udf5,
    udf4,
    udf3,
    udf2,
    udf1,
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    PAYU_KEY
  ].join("|");

  let hashString = `${PAYU_SALT}|${hashSequence}`;

  if (additionalCharges) {
    hashString = `${additionalCharges}|${hashString}`;
  }

  const calculatedHash = sha512(hashString);
  return calculatedHash.toLowerCase() === (hash || "").toLowerCase();
}

module.exports = {
  generatePaymentHash,
  verifyPaymentHash,
  PAYU_KEY,
  PAYU_SALT,
  PAYU_URL,
};
