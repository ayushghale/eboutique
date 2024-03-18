export default function generateUniqueCode() {
    const today = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
    const startDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .replace(/[-:T]/g, "")
      .slice(0, 12);
    const range = parseInt(today) - parseInt(startDate);
    const rand = Math.floor(Math.random() * (range + 1));
    const uniqueID = parseInt(startDate) + rand;
    const length = 20;
    const pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tCode = "";
    for (let i = 0; i < length; i++) {
      tCode += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    tCode = tCode + uniqueID.toString();
  
    return tCode; // Fixed variable name to be returned
  }
  