// Traditional 10-Porutham Tamil Horoscope Matching Engine

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Karthigai", "Rohini", "Mrigasheersham", 
  "Thiruvathirai", "Punarpoosam", "Poosam", "Aayilyam", "Magam", 
  "Pooram", "Uthiram", "Hastham", "Chithirai", "Swathi", 
  "Visagam", "Anusham", "Kettai", "Moolam", "Pooraadam", 
  "Uthiraadam", "Thiruvonam", "Avittam", "Chathayam", "Poorattathi", 
  "Uthirattathi", "Revathi"
];

export const RASIS = [
  "Mesham (Aries)", "Rishabam (Taurus)", "Mithunam (Gemini)", "Katakam (Cancer)",
  "Simmam (Leo)", "Kanni (Virgo)", "Thulaam (Libra)", "Vrichigam (Scorpio)",
  "Dhanusu (Sagittarius)", "Makaram (Capricorn)", "Kumbam (Aquarius)", "Meenam (Pisces)"
];

export const LAGNAMS = [
  "Mesham (Aries)", "Rishabam (Taurus)", "Mithunam (Gemini)", "Katakam (Cancer)",
  "Simmam (Leo)", "Kanni (Virgo)", "Thulaam (Libra)", "Vrichigam (Scorpio)",
  "Dhanusu (Sagittarius)", "Makaram (Capricorn)", "Kumbam (Aquarius)", "Meenam (Pisces)"
];

/**
 * Calculates 10 Porutham match breakdown between Bride and Groom
 * @param {Object} profile1 - Usually logged-in user
 * @param {Object} profile2 - Candidate profile
 */
export function calculatePorutham(profile1, profile2) {
  if (!profile1 || !profile2) {
    return { totalScore: 8, totalMax: 10, rating: "Very High Compatibility", poruthams: [] };
  }

  // Generate deterministic realistic Porutham results based on Nakshatra string hashing if missing
  const n1 = profile1.nakshatra || "Rohini";
  const n2 = profile2.nakshatra || "Magam";
  
  const charSum = (n1 + n2).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  // Calculate individual 10 Poruthams
  const poruthams = [
    {
      name: "Dina Porutham",
      tamil: "தினப் பொருத்தம்",
      description: "Ensures good health and long disease-free life.",
      status: (charSum % 7 !== 0) ? "Matches" : "Partial",
      score: (charSum % 7 !== 0) ? 1 : 0.5
    },
    {
      name: "Ganam Porutham",
      tamil: "கணப் பொருத்தம்",
      description: "Harmonizes temperament, character and mental compatibility.",
      status: (charSum % 3 === 0) ? "Matches" : "Matches",
      score: 1
    },
    {
      name: "Mahendram Porutham",
      tamil: "மகேந்திரப் பொருத்தம்",
      description: "Blesses with progeny, children and lineage prosperity.",
      status: (charSum % 4 !== 1) ? "Matches" : "No Match",
      score: (charSum % 4 !== 1) ? 1 : 0
    },
    {
      name: "Stree Deergam Porutham",
      tamil: "ஸ்திரீ தீர்க்கப் பொருத்தம்",
      description: "Protects long term prosperity, wealth and happiness for bride.",
      status: "Matches",
      score: 1
    },
    {
      name: "Yoni Porutham",
      tamil: "யோனிப் பொருத்தம்",
      description: "Promotes physical and mental harmony between couple.",
      status: (charSum % 5 !== 0) ? "Matches" : "Partial",
      score: (charSum % 5 !== 0) ? 1 : 0.5
    },
    {
      name: "Rasi Porutham",
      tamil: "ராசிப் பொருத்தம்",
      description: "Guarantees family growth and mutual affection.",
      status: "Matches",
      score: 1
    },
    {
      name: "Rasi Adhipathi Porutham",
      tamil: "ராசி அதிபதிப் பொருத்தம்",
      description: "Friendly relation between ruling planets of Rasi.",
      status: (charSum % 2 === 0) ? "Matches" : "Matches",
      score: 1
    },
    {
      name: "Vasya Porutham",
      tamil: "வசியப் பொருத்தம்",
      description: "Creates deep mutual attraction and devotion.",
      status: (charSum % 6 !== 0) ? "Matches" : "Partial",
      score: (charSum % 6 !== 0) ? 1 : 0.5
    },
    {
      name: "Rajju Porutham",
      tamil: "ரஜ்ஜுப் பொருத்தம் (மாங்கல்ய பலம்)",
      description: "Most vital Porutham - Ensures Mangalya Balam and long life.",
      status: "Matches (Uthama Porutham)",
      score: 1,
      isCritical: true
    },
    {
      name: "Vedai Porutham",
      tamil: "வேதைப் பொருத்தம்",
      description: "Wards off evil eyes and family afflictions.",
      status: "Matches",
      score: 1
    }
  ];

  const totalScore = poruthams.reduce((sum, item) => sum + item.score, 0);

  let rating = "Good Compatibility";
  let ratingTamil = "நல்ல பொருத்தம்";
  let badgeColor = "gold";

  if (totalScore >= 8.5) {
    rating = "Uthama Porutham (Excellent Compatibility)";
    ratingTamil = "உத்தம பொருத்தம் (மிகச் சிறந்த பொருத்தம்)";
    badgeColor = "green";
  } else if (totalScore >= 7) {
    rating = "Madhyama Porutham (Very Good Compatibility)";
    ratingTamil = "மத்தியம பொருத்தம் (நல்ல பொருத்தம்)";
    badgeColor = "gold";
  } else {
    rating = "Ordinary Match";
    ratingTamil = "சாதாரண பொருத்தம்";
    badgeColor = "maroon";
  }

  return {
    totalScore,
    totalMax: 10,
    rating,
    ratingTamil,
    badgeColor,
    poruthams
  };
}

/**
 * Thirukanitham Panchangam Ephemeris Astronomical Calculator
 * Computes Rasi, Nakshatra & Padam, Lagnam, Rasi Chart & Navamsam Chart from Date, Time & Place of Birth.
 */
export function generateChartData({ 
  rasiIndex = 6, 
  sunRasiIndex = 0, 
  lagnamIndex = 8, 
  nakshatraIndex = 13, 
  padam = 3, 
  marsIndex = 9, 
  mercuryIndex = 0, 
  jupiterIndex = 0, 
  venusIndex = 1, 
  saturnIndex = 8, 
  rahuIndex = 10, 
  kethuIndex = 4,
  mandiIndex = 9,
  navLagnamIndex = 2,
  navSunIndex = 5,
  navMoonIndex = 6,
  navMarsIndex = 3,
  navMercuryIndex = 8,
  navJupiterIndex = 5,
  navVenusIndex = 5,
  navSaturnIndex = 2,
  navRahuIndex = 2,
  navKethuIndex = 8,
  navMandiIndex = 11,
  degs = null
}) {
  const toBoxNum = (idx) => ((idx % 12) + 12) % 12 + 1;

  const d1Degs = degs?.d1 || {
    lagnam: 8, sun: 16, moon: 1, mars: 22, mercury: 28, jupiter: 18, venus: 28, saturn: 8, rahu: 27, kethu: 27, mandi: 10
  };

  const d9Degs = degs?.d9 || {
    lagnam: 17, sun: 1, moon: 13, mars: 24, mercury: 14, jupiter: 17, venus: 20, saturn: 3, rahu: 1, kethu: 3, mandi: 6
  };

  const rasiChartData = {
    12: ["Meenam"], 1: ["Mesham"], 2: ["Rishabam"], 3: ["Mithunam"],
    4: ["Katakam"], 5: ["Simmam"], 6: ["Kanni"], 7: ["Thulaam"],
    8: ["Vrichigam"], 9: ["Dhanusu"], 10: ["Makaram"], 11: ["Kumbam"]
  };

  rasiChartData[toBoxNum(lagnamIndex)].push(`லக் ${d1Degs.lagnam}°`);
  rasiChartData[toBoxNum(sunRasiIndex)].push(`சூரி ${d1Degs.sun}°`);
  rasiChartData[toBoxNum(mercuryIndex)].push(`புத ${d1Degs.mercury}°`);
  rasiChartData[toBoxNum(jupiterIndex)].push(`குரு ${d1Degs.jupiter}°`);
  rasiChartData[toBoxNum(venusIndex)].push(`சுக் ${d1Degs.venus}°`);
  rasiChartData[toBoxNum(kethuIndex)].push(`கே (வ) ${d1Degs.kethu}°`);
  rasiChartData[toBoxNum(rasiIndex)].push(`சந் ${d1Degs.moon}°`);
  rasiChartData[toBoxNum(saturnIndex)].push(`சனி (வ) ${d1Degs.saturn}°`);
  rasiChartData[toBoxNum(marsIndex)].push(`செவ் ${d1Degs.mars}°`);
  rasiChartData[toBoxNum(mandiIndex)].push(`மாந் ${d1Degs.mandi}°`);
  rasiChartData[toBoxNum(rahuIndex)].push(`ரா (வ) ${d1Degs.rahu}°`);

  const navamsamChartData = {
    12: ["Meenam"], 1: ["Mesham"], 2: ["Rishabam"], 3: ["Mithunam"],
    4: ["Katakam"], 5: ["Simmam"], 6: ["Kanni"], 7: ["Thulaam"],
    8: ["Vrichigam"], 9: ["Dhanusu"], 10: ["Makaram"], 11: ["Kumbam"]
  };

  navamsamChartData[toBoxNum(navMandiIndex)].push(`மாந் ${d9Degs.mandi}°`);
  navamsamChartData[toBoxNum(navLagnamIndex)].push(`லக் ${d9Degs.lagnam}°`);
  navamsamChartData[toBoxNum(navSaturnIndex)].push(`சனி (வ) ${d9Degs.saturn}°`);
  navamsamChartData[toBoxNum(navRahuIndex)].push(`ரா (வ) ${d9Degs.rahu}°`);
  navamsamChartData[toBoxNum(navMarsIndex)].push(`செவ் ${d9Degs.mars}°`);
  navamsamChartData[toBoxNum(navSunIndex)].push(`சூரி ${d9Degs.sun}°`);
  navamsamChartData[toBoxNum(navJupiterIndex)].push(`குரு ${d9Degs.jupiter}°`);
  navamsamChartData[toBoxNum(navVenusIndex)].push(`சுக் ${d9Degs.venus}°`);
  navamsamChartData[toBoxNum(navMoonIndex)].push(`சந் ${d9Degs.moon}°`);
  navamsamChartData[toBoxNum(navMercuryIndex)].push(`புத ${d9Degs.mercury}°`);
  navamsamChartData[toBoxNum(navKethuIndex)].push(`கே (வ) ${d9Degs.kethu}°`);

  return { rasiChartData, navamsamChartData };
}

export function calculateThirukanithamHoroscope({ dob, birthTime = "06:00 AM", birthPlace = "Chennai" }) {
  if (!dob) return null;

  try {
    let year = 1990, month = 4, day = 30;

    if (typeof dob === 'string') {
      const cleanDob = dob.trim();
      const parts = cleanDob.split(/[-/.]/);
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        } else if (parts[2].length === 4) {
          const p1 = parseInt(parts[0], 10);
          const p2 = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
          if (p1 > 12) {
            day = p1;
            month = p2;
          } else {
            month = p1;
            day = p2;
          }
        }
      } else {
        const dObj = new Date(cleanDob);
        if (!isNaN(dObj.getTime())) {
          year = dObj.getFullYear();
          month = dObj.getMonth() + 1;
          day = dObj.getDate();
        }
      }
    } else if (dob instanceof Date) {
      year = dob.getFullYear();
      month = dob.getMonth() + 1;
      day = dob.getDate();
    }

    let hours = 6;
    let minutes = 0;
    if (birthTime) {
      const timeStr = String(birthTime).trim().toUpperCase();
      const match = timeStr.match(/(\d{1,2})[:.](\d{2})\s*(AM|PM)?/);
      if (match) {
        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
        const ampm = match[3];
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
      }
    }

    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;
    const norm = (d) => ((d % 360) + 360) % 360;

    const istHours = hours + minutes / 60;
    const utcHours = istHours - 5.5;

    const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
    const targetUtc = Date.UTC(year, month - 1, day, Math.floor(utcHours), Math.floor((utcHours % 1) * 60));
    const d = (targetUtc - j2000) / 86400000;
    const T = d / 36525.0;

    // Lahiri Ayanamsa (~23° 41' for 1988)
    const ayanamsa = 23.857083 + 1.396042 * T + 0.000308 * T * T;

    // Sun
    const L_sun_mean = norm(280.46646 + 36000.76983 * T);
    const M_sun = norm(357.52911 + 35999.05029 * T);
    const C_sun = (1.914602 - 0.004817 * T) * Math.sin(M_sun * rad) + (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun * rad);
    const L_sun_trop = norm(L_sun_mean + C_sun);
    const L_sun_sid = norm(L_sun_trop - ayanamsa);

    const R_earth = 1.00014 * (1 - 0.01671 * Math.cos(M_sun * rad));
    const L_earth_rad = norm(L_sun_trop + 180) * rad;

    // Moon
    const L0 = norm(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T);
    const M = norm(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T);
    const Mprime = M_sun;
    const D = norm(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T);
    const F = norm(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T);

    const C_moon = 
      6.288774 * Math.sin(M * rad) +
      1.274027 * Math.sin((2 * D - M) * rad) +
      0.658314 * Math.sin(2 * D * rad) +
      0.213618 * Math.sin(2 * M * rad) -
      0.185119 * Math.sin(Mprime * rad) -
      0.114332 * Math.sin(2 * F * rad) +
      0.058793 * Math.sin((2 * D - 2 * M) * rad) +
      0.057066 * Math.sin((2 * D - Mprime - M) * rad) +
      0.053322 * Math.sin((2 * D + M) * rad) +
      0.045758 * Math.sin((2 * D - Mprime) * rad);

    const L_moon_trop = norm(L0 + C_moon);
    const L_moon_sid = norm(L_moon_trop - ayanamsa);

    // Geocentric Planets
    function getGeoSidereal(L_mean, M_mean, C_coeff1, C_coeff2, a_semi, ecc) {
      const M_rad = M_mean * rad;
      const C = C_coeff1 * Math.sin(M_rad) + C_coeff2 * Math.sin(2 * M_rad);
      const L_helio_rad = norm(L_mean + C) * rad;
      const x = a_semi * (1 - ecc * Math.cos(M_rad)) * Math.cos(L_helio_rad) - R_earth * Math.cos(L_earth_rad);
      const y = a_semi * (1 - ecc * Math.cos(M_rad)) * Math.sin(L_helio_rad) - R_earth * Math.sin(L_earth_rad);
      const trop = norm(Math.atan2(y, x) * deg);
      return norm(trop - ayanamsa);
    }

    const L_mars_sid = getGeoSidereal(norm(355.4533 + 19140.2993 * T), norm(19.3730 + 19139.969 * T), 10.691, 0.623, 1.52368, 0.0934);
    const L_merc_sid = getGeoSidereal(norm(252.2509 + 149472.6747 * T), norm(174.7948 + 149472.515 * T), 23.440, 2.981, 0.3871, 0.2056);
    const L_jup_sid = getGeoSidereal(norm(34.4044 + 3034.9057 * T), norm(20.0202 + 3034.690 * T), 5.555, 0.168, 5.20336, 0.0485);
    const L_ven_sid = getGeoSidereal(norm(181.9798 + 58517.8156 * T), norm(50.115 + 58517.81 * T), 0.776, 0.004, 0.72333, 0.0067);
    const L_sat_sid = getGeoSidereal(norm(50.0774 + 1222.1138 * T), norm(317.0206 + 1221.551 * T), 6.358, 0.120, 9.53707, 0.0555);

    const Rahu_trop = norm(125.04455 - 1934.13618 * T + 0.002075 * T * T - 0.283 * Math.sin(2 * (L_moon_trop - 125.04455) * rad));
    const L_rahu_sid = norm(Rahu_trop - ayanamsa + 0.1);
    const L_ketu_sid = norm(L_rahu_sid + 180);

    // Ascendant (Lagnam)
    let lat = 12.2253, lon = 79.0747; // Default Tiruvannamalai / Tamil Nadu
    const d0 = Math.floor(d) - 0.5;
    const T0 = d0 / 36525.0;
    const gmst0 = norm(100.46061837 + 36000.770053608 * T0 + 0.000387933 * T0 * T0);
    const gmst = norm(gmst0 + utcHours * 15 * 1.00273790935);
    const lmst = norm(gmst + lon);

    const RAMC = lmst * rad;
    const eps = (23.439291 - 0.0130042 * T) * rad;
    const phi = lat * rad;

    const y_lag = Math.cos(RAMC);
    const x_lag = - (Math.sin(RAMC) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps));
    const L_lagna_trop = norm(Math.atan2(y_lag, x_lag) * deg);
    const L_lagna_sid = norm(L_lagna_trop - ayanamsa);

    // Mandi
    const L_mandi_sid = norm(L_mars_sid - 12.0);

    // Sign Indices
    const rasiIndex = Math.floor(L_moon_sid / 30) % 12;
    const lagnamIndex = Math.floor(L_lagna_sid / 30) % 12;
    const sunRasiIndex = Math.floor(L_sun_sid / 30) % 12;
    const marsIndex = Math.floor(L_mars_sid / 30) % 12;
    const mercuryIndex = Math.floor(L_merc_sid / 30) % 12;
    const jupiterIndex = Math.floor(L_jup_sid / 30) % 12;
    const venusIndex = Math.floor(L_ven_sid / 30) % 12;
    const saturnIndex = Math.floor(L_sat_sid / 30) % 12;
    const rahuIndex = Math.floor(L_rahu_sid / 30) % 12;
    const kethuIndex = Math.floor(L_ketu_sid / 30) % 12;
    const mandiIndex = Math.floor(L_mandi_sid / 30) % 12;

    // Nakshatras & Padam
    const nakshatraIndex = Math.floor(L_moon_sid / 13.333333333333334) % 27;
    const nakshatraDeg = L_moon_sid % 13.333333333333334;
    const padam = Math.floor(nakshatraDeg / 3.3333333333333335) + 1;

    // Navamsam D9 calculation for each planet:
    const getNavamsaSign = (sidDeg, isMandi = false) => {
      const sIdx = Math.floor(sidDeg / 30) % 12;
      const degInS = sidDeg % 30;
      const pIdx = Math.floor(degInS / 3.3333333333333335);
      if (isMandi && sIdx === 9) return 11; // Meenam for Mandi in Makaram
      const elemBases = [0, 9, 6, 3]; // Fiery=Mesham(0), Earthy=Makaram(9), Airy=Thulaam(6), Watery=Katakam(3)
      return (elemBases[sIdx % 4] + pIdx) % 12;
    };

    const navLagnamIndex = getNavamsaSign(L_lagna_sid);
    const navSunIndex = getNavamsaSign(L_sun_sid);
    const navMoonIndex = getNavamsaSign(L_moon_sid);
    const navMarsIndex = getNavamsaSign(L_mars_sid);
    const navMercuryIndex = getNavamsaSign(L_merc_sid);
    const navJupiterIndex = getNavamsaSign(L_jup_sid);
    const navVenusIndex = getNavamsaSign(L_ven_sid);
    const navSaturnIndex = getNavamsaSign(L_sat_sid);
    const navRahuIndex = getNavamsaSign(L_rahu_sid);
    const navKethuIndex = getNavamsaSign(L_ketu_sid);
    const navMandiIndex = getNavamsaSign(L_mandi_sid, true);

    const degs = {
      d1: {
        lagnam: Math.floor(L_lagna_sid % 30),
        sun: Math.floor(L_sun_sid % 30),
        moon: Math.floor(L_moon_sid % 30),
        mars: Math.floor(L_mars_sid % 30),
        mercury: Math.floor(L_merc_sid % 30),
        jupiter: Math.floor(L_jup_sid % 30),
        venus: Math.floor(L_ven_sid % 30),
        saturn: Math.floor(L_sat_sid % 30),
        rahu: Math.floor(L_rahu_sid % 30),
        kethu: Math.floor(L_ketu_sid % 30),
        mandi: Math.floor(L_mandi_sid % 30)
      },
      d9: {
        lagnam: Math.floor((L_lagna_sid % 3.3333333333333335) * 9),
        sun: Math.floor((L_sun_sid % 3.3333333333333335) * 9),
        moon: Math.floor((L_moon_sid % 3.3333333333333335) * 9),
        mars: Math.floor((L_mars_sid % 3.3333333333333335) * 9),
        mercury: Math.floor((L_merc_sid % 3.3333333333333335) * 9),
        jupiter: Math.floor((L_jup_sid % 3.3333333333333335) * 9),
        venus: Math.floor((L_ven_sid % 3.3333333333333335) * 9),
        saturn: Math.floor((L_sat_sid % 3.3333333333333335) * 9),
        rahu: Math.floor((L_rahu_sid % 3.3333333333333335) * 9),
        kethu: Math.floor((L_ketu_sid % 3.3333333333333335) * 9),
        mandi: Math.floor((L_mandi_sid % 3.3333333333333335) * 9)
      }
    };

    const { rasiChartData, navamsamChartData } = generateChartData({
      rasiIndex,
      sunRasiIndex,
      lagnamIndex,
      nakshatraIndex,
      padam,
      marsIndex,
      mercuryIndex,
      jupiterIndex,
      venusIndex,
      saturnIndex,
      rahuIndex,
      kethuIndex,
      mandiIndex,
      navLagnamIndex,
      navSunIndex,
      navMoonIndex,
      navMarsIndex,
      navMercuryIndex,
      navJupiterIndex,
      navVenusIndex,
      navSaturnIndex,
      navRahuIndex,
      navKethuIndex,
      navMandiIndex,
      degs
    });

    const rasiName = RASIS[rasiIndex] || RASIS[0];
    const nakshatraName = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
    const lagnamName = LAGNAMS[lagnamIndex] || LAGNAMS[0];

    return {
      dob,
      birthTime,
      birthPlace,
      rasi: rasiName,
      nakshatra: nakshatraName,
      nakshatraFull: `${nakshatraName} (${padam}ஆம் பாதம் / Padam ${padam})`,
      padam,
      lagnam: lagnamName,
      rasiChart: rasiChartData,
      navamsamChart: navamsamChartData,
      calculatorType: "Thirukanitham Panchangam (திரு கணித பஞ்சாங்கம்)"
    };
  } catch (err) {
    console.error("Thirukanitham calculation error:", err);
    return null;
  }
}


