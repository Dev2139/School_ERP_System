/**
 * Helper to convert Date of Birth (DOB) to initial password format (DDMMYYYY).
 * Example: DOB '2006-10-06' or Date object -> '06102006'
 */
exports.formatDOBToPassword = (dob) => {
  if (!dob) return '01012000'; // fallback default

  const d = new Date(dob);
  if (isNaN(d.getTime())) {
    // If string like '06/10/2006'
    const parts = String(dob).replace(/[^0-9]/g, '');
    if (parts.length === 8) return parts;
    return '01012000';
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());

  return `${day}${month}${year}`;
};
