import React, { useState, useMemo } from "react";
import legacyScoreWordmark from "./assets/legacy-score-wordmark.png";
import legacyScoreMark from "./assets/legacy-score-symbol.png";

/* ---------------------------------------------------------------
   LOOKUP TABLES — sourced from Legacy_Score_Matrix.xlsx
--------------------------------------------------------------- */
const TABLES = {
  bodyfat: [[30,10],[29.9,10.5],[29.8,11],[29.7,11.5],[29.6,12],[29.5,12.5],[29.4,13],[29.3,13.5],[29.2,14],[29.1,14.5],[29,15],[28.9,15.5],[28.8,16],[28.7,16.5],[28.6,17],[28.5,17.5],[28.4,18],[28.3,18.5],[28.2,19],[28.1,19.5],[28,20],[27.9,20.5],[27.8,21],[27.7,21.5],[27.6,22],[27.5,22.5],[27.4,23],[27.3,23.5],[27.2,24],[27.1,24.5],[27,25],[26.9,25.5],[26.8,26],[26.7,26.5],[26.6,27],[26.5,27.5],[26.4,28],[26.3,28.5],[26.2,29],[26.1,29.5],[26,30],[25.9,30.5],[25.8,31],[25.7,31.5],[25.6,32],[25.5,32.5],[25.4,33],[25.3,33.5],[25.2,34],[25.1,34.5],[25,35],[24.9,35.5],[24.8,36],[24.7,36.5],[24.6,37],[24.5,37.5],[24.4,38],[24.3,38.5],[24.2,39],[24.1,39.5],[24,40],[23.9,40.5],[23.8,41],[23.7,41.5],[23.6,42],[23.5,42.5],[23.4,43],[23.3,43.5],[23.2,44],[23.1,44.5],[23,45],[22.9,45.5],[22.8,46],[22.7,46.5],[22.6,47],[22.5,47.5],[22.4,48],[22.3,48.5],[22.2,49],[22.1,49.5],[22,50],[21.9,50.5],[21.8,51],[21.7,51.5],[21.6,52],[21.5,52.5],[21.4,53],[21.3,53.5],[21.2,54],[21.1,54.5],[21,55],[20.9,55.5],[20.8,56],[20.7,56.5],[20.6,57],[20.5,57.5],[20.4,58],[20.3,58.5],[20.2,59],[20.1,59.5],[20,60],[19.9,60.5],[19.8,61],[19.7,61.5],[19.6,62],[19.5,62.5],[19.4,63],[19.3,63.5],[19.2,64],[19.1,64.5],[19,65],[18.9,65.5],[18.8,66],[18.7,66.5],[18.6,67],[18.5,67.5],[18.4,68],[18.3,68.5],[18.2,69],[18.1,69.5],[18,70],[17.9,70.4],[17.8,70.8],[17.7,71.2],[17.6,71.6],[17.5,72],[17.4,72.4],[17.3,72.8],[17.2,73.2],[17.1,73.6],[17,74],[16.9,74.4],[16.8,74.8],[16.7,75.2],[16.6,75.6],[16.5,76],[16.4,76.4],[16.3,76.8],[16.2,77.2],[16.1,77.6],[16,78],[15.9,78.4],[15.8,78.8],[15.7,79.2],[15.6,79.6],[15.5,80],[15.4,80.3],[15.3,80.6],[15.2,80.9],[15.1,81.2],[15,81.5],[14.9,81.8],[14.8,82.1],[14.7,82.4],[14.6,82.7],[14.5,83],[14.4,83.3],[14.3,83.6],[14.2,83.9],[14.1,84.2],[14,84.5],[13.9,84.8],[13.8,85.1],[13.7,85.4],[13.6,85.7],[13.5,86],[13.4,86.3],[13.3,86.6],[13.2,86.9],[13.1,87.2],[13,87.5],[12.9,87.8],[12.8,88.1],[12.7,88.4],[12.6,88.7],[12.5,89],[12.4,89.2],[12.3,89.4],[12.2,89.6],[12.1,89.8],[12,90],[11.9,90.5],[11.8,91],[11.7,91.5],[11.6,92],[11.5,92.5],[11.4,93],[11.3,93.5],[11.2,94],[11.1,94.5],[11,95],[10.9,95.5],[10.8,96],[10.7,96.2],[10.6,96.4],[10.5,96.6],[10.4,96.8],[10.3,97],[10.2,97.2],[10.1,97.4],[10,97.6],[9.9,97.8],[9.8,98],[9.7,98.2],[9.6,98.4],[9.5,98.6],[9.4,98.8],[9.3,99],[9.2,99.2],[9.1,99.4],[9,99.6],[8.9,99.8],[8.8,100],[8.7,100.2],[8.6,100.4],[8.5,100.6],[8.4,100.8],[8.3,101],[8.2,101.2],[8.1,101.4],[8,101.6],[7.9,101.8],[7.8,102],[7.7,102.2],[7.6,102.4],[7.5,102.6],[7.4,102.8],[7.3,103],[7.2,103.2],[7.1,103.4],[7,103.6]],
  broadjump: [[36,2],[36.5,3],[37,4],[37.5,5],[38,6],[38.5,7],[39,8],[39.5,9],[40,10],[40.5,12],[41,14],[41.5,16],[42,18],[42.5,20],[43,22],[43.5,24],[44,26],[44.5,28],[45,30],[45.5,32],[46,34],[46.5,36],[47,38],[47.5,40],[48,42],[48.5,43],[49,43.6],[49.5,44.2],[50,44.8],[50.5,45.4],[51,46],[51.5,46.6],[52,47.2],[52.5,47.8],[53,48.4],[53.5,49],[54,49.6],[54.5,50.2],[55,50.8],[55.5,51.4],[56,52],[56.5,52.6],[57,53.2],[57.5,53.8],[58,54.4],[58.5,55],[59,55.6],[59.5,56.2],[60,56.8],[60.5,57.4],[61,58],[61.5,58.6],[62,59.2],[62.5,59.8],[63,60.4],[63.5,61],[64,61.6],[64.5,62.2],[65,62.8],[65.5,63.4],[66,64],[66.5,64.6],[67,65.2],[67.5,65.8],[68,66.4],[68.5,67],[69,67.6],[69.5,68.2],[70,68.8],[70.5,69.4],[71,70],[71.5,70.4],[72,70.8],[72.5,71.2],[73,71.6],[73.5,72],[74,72.4],[74.5,72.8],[75,73.2],[75.5,73.6],[76,74],[76.5,74.4],[77,74.8],[77.5,75.2],[78,75.6],[78.5,76],[79,76.4],[79.5,76.8],[80,77.2],[80.5,77.6],[81,78],[81.5,78.4],[82,78.8],[82.5,79.2],[83,79.6],[83.5,80],[84,80.4],[84.5,80.8],[85,81.2],[85.5,81.6],[86,82],[86.5,82.4],[87,82.8],[87.5,83.2],[88,83.6],[88.5,84],[89,84.4],[89.5,84.8],[90,85.2],[90.5,85.6],[91,86],[91.5,86.4],[92,86.8],[92.5,87.2],[93,87.6],[93.5,88],[94,88.4],[94.5,88.8],[95,89.2],[95.5,89.6],[96,90],[96.5,90.4],[97,90.8],[97.5,91.2],[98,91.6],[98.5,92],[99,92.4],[99.5,92.8],[100,93.2],[100.5,93.6],[101,94],[101.5,94.4],[102,94.8],[102.5,95.2],[103,95.6],[103.5,96],[104,96.4],[104.5,96.8],[105,97.2],[105.5,97.6],[106,98],[106.5,98.4],[107,98.8],[107.5,99.2],[108,99.6],[108.5,100],[109,100.5],[109.5,101],[110,101.5],[110.5,102],[111,102.5],[111.5,103],[112,103.5],[112.5,104],[113,104.5],[113.5,105],[114,105.5],[114.5,106],[115,106.5],[115.5,107],[116,107.5],[116.5,108],[117,108.5],[117.5,109],[118,109.5],[118.5,110],[119,110.5],[119.5,111],[120,111.5],[120.5,112],[121,112.5],[121.5,113],[122,113.5],[122.5,114],[123,114.5],[123.5,115],[124,115.5],[124.5,116],[125,116.5],[125.5,117],[126,117.5],[126.5,118],[127,118.5],[127.5,119],[128,119.5],[128.5,120],[129,120.5],[129.5,121],[130,121.5],[130.5,122],[131,122.5],[131.5,123],[132,123.5]],
  // Bench Press & Trap Bar Deadlift are BODYWEIGHT-RATIO tables (lifted-lbs / bodyweight-lbs),
  // not absolute pounds -- see computeResults() where the ratio is computed before lookup.
  // Bench: anchored to ACSM Guidelines for Exercise Testing & Prescription (11th ed.), Table 3.11,
  // 1RM/bodyweight ratio norms (via ExRx.net), blended across 40-49 and 50-59 age bands. Only the
  // Poor/Good/Excellent anchor points (0.41 / 0.885 / 0.915) are sourced; the curve between them
  // is a reasoned linear interpolation, not independently verified.
  bench: [[0.15,2],[0.16,2.9],[0.17,3.7],[0.18,4.6],[0.19,5.5],[0.2,6.3],[0.21,7.2],[0.22,8.1],[0.23,8.9],[0.24,9.8],[0.25,10.7],[0.26,11.5],[0.27,12.4],[0.28,13.3],[0.29,14.1],[0.3,15.0],[0.31,17.3],[0.32,19.5],[0.33,21.8],[0.34,24.1],[0.35,26.4],[0.36,28.6],[0.37,30.9],[0.38,33.2],[0.39,35.5],[0.4,37.7],[0.41,40.0],[0.42,41.4],[0.43,42.9],[0.44,44.3],[0.45,45.7],[0.46,47.1],[0.47,48.6],[0.48,50.0],[0.49,51.4],[0.5,52.9],[0.51,54.3],[0.52,55.7],[0.53,57.1],[0.54,58.6],[0.55,60.0],[0.56,61.0],[0.57,62.0],[0.58,63.0],[0.59,64.0],[0.6,65.0],[0.61,66.0],[0.62,67.0],[0.63,68.0],[0.64,69.0],[0.65,70.0],[0.66,71.0],[0.67,72.0],[0.68,73.0],[0.69,74.0],[0.7,75.0],[0.71,75.5],[0.72,76.1],[0.73,76.6],[0.74,77.2],[0.75,77.7],[0.76,78.2],[0.77,78.8],[0.78,79.3],[0.79,79.9],[0.8,80.4],[0.81,80.9],[0.82,81.5],[0.83,82.0],[0.84,82.6],[0.85,83.1],[0.86,83.6],[0.87,84.2],[0.88,84.7],[0.89,85.8],[0.9,87.5],[0.91,89.2],[0.92,90.2],[0.93,90.7],[0.94,91.1],[0.95,91.6],[0.96,92.0],[0.97,92.4],[0.98,92.9],[0.99,93.3],[1.0,93.8],[1.01,94.2],[1.02,94.7],[1.03,95.1],[1.04,95.6],[1.05,96.0],[1.06,96.2],[1.07,96.3],[1.08,96.5],[1.09,96.6],[1.1,96.8],[1.11,97.0],[1.12,97.1],[1.13,97.3],[1.14,97.4],[1.15,97.6],[1.16,97.8],[1.17,97.9],[1.18,98.1],[1.19,98.2],[1.2,98.4],[1.21,98.6],[1.22,98.7],[1.23,98.9],[1.24,99.0],[1.25,99.2],[1.26,99.4],[1.27,99.5],[1.28,99.7],[1.29,99.8],[1.3,100]],
  // Trap Bar: NO ACSM/NSCA general-population deadlift standard exists (confirmed via search --
  // deadlift isn't in ACSM's standard test battery). This table blends general strength-training
  // consensus (bodyweight lift ~= novice milestone, weakly sourced) with a real upper anchor from
  // Legerski et al., J Sci Med Sport 27(10):734-742 (2024) -- 90th-pct COMPETITIVE powerlifter
  // deadlift = 3.25x bodyweight -- adjusted +8.2% for trap-bar leverage per Swinton et al.,
  // J Strength Cond Res 25(7), 2011. This is the weakest-sourced table in the app; flag to Coach
  // Heiner for review.
  trapbar: [[0.3,2],[0.32,2.9],[0.34,3.7],[0.36,4.6],[0.38,5.5],[0.4,6.3],[0.42,7.2],[0.44,8.1],[0.46,8.9],[0.48,9.8],[0.5,10.7],[0.52,11.5],[0.54,12.4],[0.56,13.3],[0.58,14.1],[0.6,15.0],[0.62,16.0],[0.64,17.0],[0.66,18.0],[0.68,19.0],[0.7,20.0],[0.72,21.0],[0.74,22.0],[0.76,23.0],[0.78,24.0],[0.8,25.0],[0.82,26.0],[0.84,27.0],[0.86,28.0],[0.88,29.0],[0.9,30.0],[0.92,32.0],[0.94,34.0],[0.96,36.0],[0.98,38.0],[1.0,40.0],[1.02,40.7],[1.04,41.3],[1.06,42.0],[1.08,42.7],[1.1,43.3],[1.12,44.0],[1.14,44.7],[1.16,45.3],[1.18,46.0],[1.2,46.7],[1.22,47.3],[1.24,48.0],[1.26,48.7],[1.28,49.3],[1.3,50.0],[1.32,50.7],[1.34,51.3],[1.36,52.0],[1.38,52.7],[1.4,53.3],[1.42,54.0],[1.44,54.7],[1.46,55.3],[1.48,56.0],[1.5,56.7],[1.52,57.3],[1.54,58.0],[1.56,58.7],[1.58,59.3],[1.6,60.0],[1.62,60.7],[1.64,61.3],[1.66,62.0],[1.68,62.7],[1.7,63.3],[1.72,64.0],[1.74,64.7],[1.76,65.3],[1.78,66.0],[1.8,66.7],[1.82,67.3],[1.84,68.0],[1.86,68.7],[1.88,69.3],[1.9,70.0],[1.92,70.7],[1.94,71.3],[1.96,72.0],[1.98,72.7],[2.0,73.3],[2.02,74.0],[2.04,74.7],[2.06,75.3],[2.08,76.0],[2.1,76.7],[2.12,77.3],[2.14,78.0],[2.16,78.7],[2.18,79.3],[2.2,80.0],[2.22,80.3],[2.24,80.7],[2.26,81.0],[2.28,81.3],[2.3,81.7],[2.32,82.0],[2.34,82.3],[2.36,82.7],[2.38,83.0],[2.4,83.3],[2.42,83.7],[2.44,84.0],[2.46,84.3],[2.48,84.7],[2.5,85.0],[2.52,85.3],[2.54,85.7],[2.56,86.0],[2.58,86.3],[2.6,86.7],[2.62,87.0],[2.64,87.3],[2.66,87.7],[2.68,88.0],[2.7,88.3],[2.72,88.7],[2.74,89.0],[2.76,89.3],[2.78,89.7],[2.8,90.0],[2.82,90.3],[2.84,90.6],[2.86,90.8],[2.88,91.1],[2.9,91.4],[2.92,91.7],[2.94,91.9],[2.96,92.2],[2.98,92.5],[3.0,92.8],[3.02,93.1],[3.04,93.3],[3.06,93.6],[3.08,93.9],[3.1,94.2],[3.12,94.4],[3.14,94.7],[3.16,95.0],[3.18,95.3],[3.2,95.6],[3.22,95.8],[3.24,96.1],[3.26,96.4],[3.28,96.7],[3.3,96.9],[3.32,97.2],[3.34,97.5],[3.36,97.8],[3.38,98.1],[3.4,98.3],[3.42,98.6],[3.44,98.9],[3.46,99.2],[3.48,99.4],[3.5,99.7],[3.52,100]],
  planks: [[30,1],[31,2],[32,3],[33,4],[34,5],[35,6],[36,7],[37,8],[38,9],[39,10],[40,11],[41,12.5],[42,14],[43,15.5],[44,17],[45,18.5],[46,20],[47,21.5],[48,23],[49,24.5],[50,26],[51,27.5],[52,28.5],[53,29.5],[54,30.5],[55,31.3],[56,32.1],[57,32.9],[58,33.7],[59,34.5],[60,35.3],[61,36.1],[62,36.9],[63,37.7],[64,38.5],[65,39.3],[66,40.1],[67,40.7],[68,41.3],[69,41.9],[70,42.5],[71,43.1],[72,43.7],[73,44.3],[74,44.9],[75,45.5],[76,46.1],[77,46.7],[78,47.3],[79,47.9],[80,48.5],[81,49.1],[82,49.7],[83,50.3],[84,50.9],[85,51.5],[86,52.1],[87,52.7],[88,53.3],[89,53.9],[90,54.5],[91,55],[92,55.5],[93,56],[94,56.5],[95,57],[96,57.5],[97,58],[98,58.5],[99,59],[100,59.5],[101,60],[102,60.5],[103,61],[104,61.5],[105,62],[106,62.5],[107,63],[108,63.5],[109,64],[110,64.5],[111,65],[112,65.5],[113,66],[114,66.5],[115,67],[116,67.5],[117,68],[118,68.5],[119,69],[120,70],[121,70.3],[122,70.6],[123,70.9],[124,71.2],[125,71.5],[126,71.8],[127,72.1],[128,72.4],[129,72.7],[130,73],[131,73.3],[132,73.6],[133,73.9],[134,74.2],[135,74.5],[136,74.8],[137,75.1],[138,75.4],[139,75.7],[140,76],[141,76.3],[142,76.6],[143,76.9],[144,77.2],[145,77.5],[146,77.8],[147,78.1],[148,78.4],[149,78.7],[150,80],[151,80.3],[152,80.6],[153,80.9],[154,81.2],[155,81.5],[156,81.8],[157,82.1],[158,82.4],[159,82.7],[160,83],[161,83.3],[162,83.6],[163,83.9],[164,84.2],[165,84.5],[166,84.8],[167,85.1],[168,85.3],[169,85.5],[170,85.7],[171,85.9],[172,86.1],[173,86.5],[174,86.8],[175,87.2],[176,88],[177,88.5],[178,89],[179,89.5],[180,90],[181,90.2],[182,90.4],[183,90.6],[184,90.8],[185,91],[186,91.2],[187,91.4],[188,91.6],[189,91.8],[190,92],[191,92.2],[192,92.4],[193,92.6],[194,92.8],[195,93],[196,93.2],[197,93.4],[198,93.6],[199,93.8],[200,94],[201,94.2],[202,94.4],[203,94.6],[204,94.8],[205,95],[206,95.2],[207,95.4],[208,95.6],[209,95.8],[210,96],[211,96.2],[212,96.4],[213,96.6],[214,96.8],[215,97],[216,97.2],[217,97.4],[218,97.6],[219,97.8],[220,98],[221,98.2],[222,98.4],[223,98.6],[224,98.8],[225,99],[226,99.2],[227,99.4],[228,99.6],[229,99.8],[230,100],[231,100.2],[232,100.4],[233,100.6],[234,100.8],[235,101],[236,101.2],[237,101.4],[238,101.6],[239,101.8],[240,102]],
  farmers: [[30,1],[31,2],[32,3],[33,3.5],[34,4],[35,4.5],[36,5],[37,5.5],[38,6],[39,6.5],[40,7],[41,7.5],[42,8],[43,8.5],[44,9],[45,9.5],[46,10],[47,10.4],[48,10.9],[49,11.4],[50,11.9],[51,12.4],[52,12.9],[53,13.4],[54,13.9],[55,14.4],[56,14.9],[57,15.4],[58,15.9],[59,16.4],[60,16.9],[61,17.4],[62,17.9],[63,18.4],[64,18.9],[65,19.4],[66,19.9],[67,20.4],[68,20.9],[69,21.4],[70,21.9],[71,22.4],[72,22.9],[73,23.4],[74,23.9],[75,24.4],[76,24.9],[77,25.4],[78,25.9],[79,26.4],[80,26.9],[81,27.4],[82,27.9],[83,28.4],[84,28.9],[85,29.4],[86,29.9],[87,30.4],[88,30.9],[89,31.4],[90,31.9],[91,32.4],[92,32.9],[93,33.4],[94,33.9],[95,34.4],[96,34.9],[97,35.4],[98,35.9],[99,36.4],[100,36.9],[101,37.4],[102,37.9],[103,38.4],[104,38.9],[105,39.4],[106,39.9],[107,40.4],[108,40.9],[109,41.4],[110,41.9],[111,42.4],[112,42.9],[113,43.4],[114,43.9],[115,44.4],[116,44.9],[117,45.4],[118,45.9],[119,46.4],[120,46.9],[121,47.4],[122,47.9],[123,48.4],[124,48.9],[125,49.4],[126,49.9],[127,50.4],[128,50.9],[129,51.4],[130,51.9],[131,52.4],[132,52.9],[133,53.4],[134,53.9],[135,54.4],[136,54.9],[137,55.4],[138,55.9],[139,56.4],[140,56.9],[141,57.4],[142,57.9],[143,58.4],[144,58.9],[145,59.4],[146,59.9],[147,60.3],[148,60.7],[149,61.1],[150,61.5],[151,61.9],[152,62.3],[153,62.7],[154,63.1],[155,63.5],[156,63.9],[157,64.3],[158,64.7],[159,65.1],[160,65.5],[161,65.8],[162,66.1],[163,66.4],[164,66.7],[165,67],[166,67.3],[167,67.6],[168,67.9],[169,68.2],[170,68.5],[171,68.8],[172,69.1],[173,69.4],[174,69.7],[175,70],[176,70.2],[177,70.4],[178,70.6],[179,70.8],[180,71],[181,71.2],[182,71.4],[183,71.6],[184,71.8],[185,72],[186,72.2],[187,72.4],[188,72.6],[189,72.8],[190,73],[191,73.2],[192,73.4],[193,73.6],[194,73.8],[195,74],[196,74.2],[197,74.4],[198,74.6],[199,74.8],[200,75],[201,75.2],[202,75.4],[203,75.6],[204,75.8],[205,76],[206,76.2],[207,76.4],[208,76.6],[209,76.8],[210,77],[211,77.2],[212,77.4],[213,77.6],[214,77.8],[215,78],[216,78.2],[217,78.4],[218,78.6],[219,78.8],[220,79],[221,79.2],[222,79.4],[223,79.6],[224,79.8],[225,80],[226,80.4],[227,80.8],[228,81.2],[229,81.6],[230,82],[231,82.4],[232,82.8],[233,83.2],[234,83.6],[235,84],[236,84.4],[237,84.8],[238,85.2],[239,85.6],[240,86],[241,86.4],[242,86.8],[243,87.2],[244,87.6],[245,88],[246,88.4],[247,88.8],[248,89.2],[249,89.6],[250,90],[251,90.1],[252,90.2],[253,90.3],[254,90.4],[255,90.5],[256,90.6],[257,90.7],[258,90.8],[259,90.9],[260,91],[261,91.1],[262,91.2],[263,91.3],[264,91.4],[265,91.5],[266,91.6],[267,91.7],[268,91.8],[269,91.9],[270,92],[271,92.1],[272,92.2],[273,92.3],[274,92.4],[275,92.5],[276,92.6],[277,92.7],[278,92.8],[279,92.9],[280,93],[281,93.1],[282,93.2],[283,93.3],[284,93.4],[285,93.5],[286,93.6],[287,93.7],[288,93.8],[289,93.9],[290,94],[291,94.1],[292,94.2],[293,94.3],[294,94.4],[295,94.5],[296,94.6],[297,94.7],[298,94.8],[299,94.9],[300,95],[301,95.1],[302,95.2],[303,95.3],[304,95.4],[305,95.5],[306,95.6],[307,95.7],[308,95.8],[309,95.9],[310,96],[311,96.1],[312,96.2],[313,96.3],[314,96.4],[315,96.5],[316,96.6],[317,96.7],[318,96.8],[319,96.9],[320,97],[321,97.1],[322,97.2],[323,97.3],[324,97.4],[325,97.5],[326,97.6],[327,97.7],[328,97.8],[329,97.9],[330,98],[331,98.1],[332,98.2],[333,98.3],[334,98.4],[335,98.5],[336,98.6],[337,98.7],[338,98.8],[339,98.9],[340,99],[341,99.1],[342,99.2],[343,99.3],[344,99.4],[345,99.5],[346,99.6],[347,99.7],[348,99.8],[349,99.9],[350,100],[351,100.1],[352,100.2],[353,100.3],[354,100.4],[355,100.5],[356,100.6],[357,100.7],[358,100.8],[359,100.9],[360,101],[361,101.1],[362,101.2],[363,101.3],[364,101.4],[365,101.5],[366,101.6],[367,101.7],[368,101.8],[369,101.9],[370,102],[371,102.1],[372,102.2],[373,102.3],[374,102.4],[375,102.5],[376,102.6],[377,102.7],[378,102.8],[379,102.9],[380,103],[381,103.1],[382,103.2],[383,103.3],[384,103.4],[385,103.5],[386,103.6],[387,103.7],[388,103.8],[389,103.9],[390,104],[391,104.1],[392,104.2],[393,104.3],[394,104.4],[395,104.5],[396,104.6],[397,104.7],[398,104.8],[399,104.9],[400,105]],
  run800: [[360,1],[359,2],[358,3],[357,4],[356,5],[355,5.9],[354,6.3],[353,6.7],[352,7.1],[351,7.5],[350,7.9],[349,8.3],[348,8.7],[347,9.1],[346,9.5],[345,9.9],[344,10.3],[343,10.7],[342,11.1],[341,11.5],[340,11.9],[339,12.3],[338,12.7],[337,13.1],[336,13.5],[335,13.9],[334,14.3],[333,14.7],[332,15.1],[331,15.5],[330,15.9],[329,16.3],[328,16.7],[327,17.1],[326,17.5],[325,17.9],[324,18.3],[323,18.7],[322,19.1],[321,19.5],[320,19.9],[319,20.3],[318,20.7],[317,21.1],[316,21.5],[315,21.9],[314,22.3],[313,22.7],[312,23.1],[311,23.5],[310,23.9],[309,24.3],[308,24.7],[307,25.1],[306,25.5],[305,25.9],[304,26.3],[303,26.7],[302,27.1],[301,27.5],[300,27.9],[299,28.3],[298,28.7],[297,29.1],[296,29.5],[295,29.9],[294,30.3],[293,30.7],[292,31.1],[291,31.5],[290,31.9],[289,32.3],[288,32.7],[287,33.1],[286,33.5],[285,33.9],[284,34.3],[283,34.7],[282,35.1],[281,35.5],[280,35.9],[279,36.3],[278,36.7],[277,37.1],[276,37.5],[275,37.9],[274,38.3],[273,38.7],[272,39.1],[271,39.5],[270,39.9],[269,40.3],[268,40.7],[267,41.1],[266,41.5],[265,41.9],[264,42.3],[263,42.7],[262,43.1],[261,43.5],[260,43.9],[259,44.3],[258,44.7],[257,45.1],[256,45.5],[255,45.9],[254,46.3],[253,46.7],[252,47.1],[251,47.5],[250,47.9],[249,48.3],[248,48.7],[247,49.1],[246,49.5],[245,49.9],[244,50.3],[243,50.7],[242,51.1],[241,51.5],[240,51.9],[239,52.3],[238,52.7],[237,53.1],[236,53.5],[235,53.9],[234,54.3],[233,54.7],[232,55.1],[231,55.5],[230,55.9],[229,56.3],[228,56.7],[227,57.1],[226,57.5],[225,57.9],[224,58.3],[223,58.7],[222,59.1],[221,59.5],[220,59.9],[219,60.3],[218,60.7],[217,61.1],[216,61.5],[215,61.9],[214,62.3],[213,62.7],[212,63.1],[211,63.5],[210,63.9],[209,64.3],[208,64.7],[207,65.1],[206,65.5],[205,65.9],[204,66.3],[203,66.7],[202,67.1],[201,67.5],[200,67.9],[199,68.3],[198,68.7],[197,69.1],[196,69.5],[195,70.6],[194,71.2],[193,71.8],[192,72.4],[191,73],[190,73.6],[189,74.2],[188,74.8],[187,75.4],[186,76],[185,76.6],[184,77.2],[183,77.8],[182,78.4],[181,79],[180,80],[179,80.2],[178,80.8],[177,81.4],[176,82],[175,82.6],[174,83.2],[173,83.8],[172,84.4],[171,85],[170,85.6],[169,86.2],[168,87],[167,88],[166,89],[165,90],[164,90.4],[163,90.8],[162,91.2],[161,91.6],[160,92],[159,92.4],[158,92.8],[157,93.2],[156,93.6],[155,94],[154,94.4],[153,94.8],[152,95.2],[151,95.6],[150,96],[149,96.4],[148,96.8],[147,97.2],[146,97.6],[145,98],[144,98.4],[143,98.8],[142,99.2],[141,99.6],[140,100],[139,100.4],[138,100.8],[137,101.2],[136,101.6],[135,102],[134,102.4],[133,102.8],[132,103.2],[131,103.6],[130,104],[129,104.4],[128,104.8],[127,105.2],[126,105.6],[125,106],[124,106.4],[123,106.8],[122,107.2],[121,107.6],[120,108]],
  pullups: [[1,5],[2,15],[3,25],[4,35],[5,45],[6,50],[7,55],[8,60],[9,65],[10,70],[11,72],[12,74],[13,76],[14,78],[15,80],[16,82],[17,84],[18,86],[19,88],[20,90],[21,91],[22,92],[23,93],[24,94],[25,95],[26,95.5],[27,96],[28,96.5],[29,97],[30,97.5],[31,97.7],[32,97.9],[33,98.1],[34,98.3],[35,98.5],[36,98.7],[37,98.9],[38,99.1],[39,99.3],[40,99.5],[41,99.7],[42,99.9],[43,100.1],[44,100.3],[45,100.5]],
  wth: [[0.4,100],[0.41,98],[0.42,96],[0.43,94],[0.44,92],[0.45,90],[0.46,87.5],[0.47,85],[0.48,82.5],[0.49,80],[0.5,75],[0.51,70],[0.52,65],[0.53,60],[0.54,55],[0.55,50],[0.56,45],[0.57,40],[0.58,35],[0.59,30],[0.6,20],[0.61,15],[0.62,10],[0.63,6],[0.64,3],[0.65,0]],
};

// Step lookup: round input to nearest available key (matches VLOOKUP exact-match behavior on rounded test data)
function lookupScore(table, raw) {
  if (raw === "" || raw === null || raw === undefined || isNaN(raw)) return null;
  const x = parseFloat(raw);
  if (table.length === 0) return null;
  // find closest x <= value (VLOOKUP approximate match would use largest value <= lookup)
  // Tables are ascending or descending depending on metric; normalize by sorting ascending on key
  const sorted = [...table].sort((a, b) => a[0] - b[0]);
  let best = sorted[0];
  for (const [k, v] of sorted) {
    if (k <= x) best = [k, v];
    else break;
  }
  // if x below smallest key, fall back to smallest; if above largest, clamp to largest
  if (x < sorted[0][0]) return sorted[0][1];
  if (x > sorted[sorted.length - 1][0]) return sorted[sorted.length - 1][1];
  return best[1];
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

const TIERS = [
  { name: "TITAN", min: 90, color: "#C9A24B" },
  { name: "WARRIOR", min: 85, color: "#8B3A3A" },
  { name: "FORGED", min: 80, color: "#6B5B3E" },
  { name: "CHALLENGER", min: 70, color: "#3E5C6B" },
  { name: "FUNCTIONAL", min: 60, color: "#4B6B4E" },
  { name: "BUILDER", min: 50, color: "#5A5A5A" },
  { name: "FOUNDATION", min: 0, color: "#3a3a3a" },
];
function getTier(score) {
  for (const t of TIERS) if (score >= t.min) return t;
  return TIERS[TIERS.length - 1];
}

// Age multiplier: +0.5% per year over 40, capped (effectively no hard cap needed for realistic ages)
function ageMultiplier(age) {
  const a = parseFloat(age);
  if (!a || a <= 40) return 1;
  const years = Math.min(a - 40, 120);
  return 1 + years * 0.005;
}

const FIELDS = [
  { key: "bodyfat", label: "Body Fat %", unit: "%", table: TABLES.bodyfat, placeholder: "e.g. 17.8", weight: 1 },
  { key: "wth", label: "Waist-to-Height Ratio", unit: "ratio (waist÷height, both in inches)", table: TABLES.wth, placeholder: "e.g. 0.51", weight: 1, isRatio: true },
  { key: "broadjump", label: "Broad Jump", unit: "inches", table: TABLES.broadjump, placeholder: "e.g. 87", weight: 1 },
  { key: "trapbar", label: "Trap Bar Deadlift (5RM)", unit: "lbs", table: TABLES.trapbar, placeholder: "e.g. 385", weight: 1.5, bodyweightRatio: true },
  { key: "bench", label: "Bench Press (5RM)", unit: "lbs", table: TABLES.bench, placeholder: "e.g. 225", weight: 1, bodyweightRatio: true },
  { key: "run800", label: "800m Run", unit: "seconds", table: TABLES.run800, placeholder: "e.g. 245", weight: 1 },
  { key: "pullups", label: "Pull-ups", unit: "reps", table: TABLES.pullups, placeholder: "e.g. 12", weight: 1 },
  { key: "planks", label: "Plank Hold", unit: "seconds", table: TABLES.planks, placeholder: "e.g. 85", weight: 1 },
  { key: "farmers", label: "Farmer's Carry", unit: "ft (body weight, per side)", table: TABLES.farmers, placeholder: "e.g. 250", weight: 1 },
];

// Coach's-voice copy per test: used in the per-row comparison note and the closing report.
// Normative-data references backing each test's score bands. Populated as each
// metric gets verified against published research — see conversation history for
// the comparison notes. Tests without an entry yet still use the original,
// unverified Legacy_Score_Matrix.xlsx values.
const SOURCES = {
  bodyfat: {
    label: "Univ. of Pennsylvania age-graded body composition standards, via Medical News Today",
    url: "https://www.medicalnewstoday.com/articles/body-fat-percentage-chart",
  },
  wth: {
    label: "Ashwell & Gibson, \"Waist-to-height ratio as an indicator of 'early health risk'\", BMJ Open (2016)",
    url: "https://pubmed.ncbi.nlm.nih.gov/26975935/",
  },
  broadjump: {
    label: "Marins et al., normative values in 8,628 police officers, Journal of Strength and Conditioning Research (NSCA)",
    url: "https://www.researchgate.net/publication/386140941",
  },
  bench: {
    label: "ACSM Guidelines for Exercise Testing & Prescription (11th ed.), Table 3.11 bench-press ratio norms, via ExRx.net",
    url: "https://exrx.net/Testing/WeightLifting/BenchStandard40LB",
  },
  trapbar: {
    label: "Legerski et al., 809,986-entry powerlifting norms, J Sci Med Sport (2024); trap-bar adjustment from Swinton et al., JSCR (2011)",
    url: "https://pubmed.ncbi.nlm.nih.gov/39060209/",
  },
};

const FIELD_COPY = {
  bodyfat: {
    strength: "Body composition is dialed in",
    improvement: "Body fat is the lever that moves every other number",
    plan: "Tighten up nutrition and add two conditioning sessions a week.",
  },
  wth: {
    strength: "Waist-to-height sits in the low-risk range",
    improvement: "Waist-to-height is trending toward a range worth watching",
    plan: "Aim to trim 1-2 inches off the waist this quarter through diet and loaded carries.",
  },
  broadjump: {
    strength: "Explosive power off the ground is a real weapon",
    improvement: "Power output is the gap holding back the rest of the profile",
    plan: "Add broad jumps or box jumps before your main lift, twice a week.",
  },
  trapbar: {
    strength: "Posterior chain strength stands out",
    improvement: "Raw pulling strength off the floor needs attention",
    plan: "Run a 6-week trap bar progression, adding 5-10 lbs each week.",
  },
  bench: {
    strength: "Upper body pressing strength is a clear asset",
    improvement: "Pressing strength is lagging the rest of the profile",
    plan: "Bench twice a week for 6 weeks with a simple linear progression.",
  },
  run800: {
    strength: "Aerobic conditioning is a real asset",
    improvement: "Conditioning is the piece holding the score back",
    plan: "Add two interval sessions a week — 400m repeats, building toward race pace.",
  },
  pullups: {
    strength: "Pulling strength and endurance are excellent",
    improvement: "Pull-up capacity needs building",
    plan: "Three sets of pull-up ladders, 3x a week — bands or negatives if needed.",
  },
  planks: {
    strength: "Core endurance is well ahead of the field",
    improvement: "Core endurance under fatigue is the opportunity",
    plan: "Daily plank holds, adding 10 seconds each week.",
  },
  farmers: {
    strength: "Grip and loaded-carry capacity are elite for the age group",
    improvement: "Grip and carry capacity need work — often the first thing to fade past 40",
    plan: "Farmer's carries twice a week, adding distance or load weekly.",
  },
};

// Score bands driving the per-test bell curve are now the SAME 7 tiers as the overall
// score (TITAN..FOUNDATION), not a separate 5-bucket scale — one color language everywhere.
// Ascending order (FOUNDATION..TITAN) with each band's upper bound filled in.
const SCORE_BANDS = [...TIERS].reverse().map((t, i, arr) => ({
  ...t,
  upper: i < arr.length - 1 ? arr[i + 1].min : 100,
}));

function bandForScore(score) {
  let band = SCORE_BANDS[0];
  for (const b of SCORE_BANDS) if (score >= b.min) band = b;
  return band;
}

const TIER_ADJECTIVE = {
  TITAN: "Elite",
  WARRIOR: "Excellent",
  FORGED: "Strong",
  CHALLENGER: "Solid",
  FUNCTIONAL: "Developing",
  BUILDER: "Building",
  FOUNDATION: "Foundational",
};

function compareLabel(score) {
  const band = bandForScore(score);
  return `${TIER_ADJECTIVE[band.name]} — ${band.name}-level performance`;
}

const SHORT_UNITS = {
  bodyfat: "%", wth: "", broadjump: " in", trapbar: "×", bench: "×",
  run800: " sec", pullups: " reps", planks: " sec", farmers: " ft",
};

// Reverse-looks-up the field's own raw-value range that produced this tier band —
// e.g. for Body Fat %, "CHALLENGER" might mean 15.5%-18.1%, straight from the same lookup table.
function normativeRangeText(field, score) {
  const band = bandForScore(score);
  const matches = field.table.filter(([, s]) => s >= band.min && s < (band.upper === 100 ? 100.001 : band.upper));
  if (matches.length === 0) return "";
  const raws = matches.map((m) => m[0]);
  const rmin = Math.min(...raws);
  const rmax = Math.max(...raws);
  const fmt = (v) => (field.isRatio || field.bodyweightRatio ? v.toFixed(2) : Number.isInteger(v) ? String(v) : v.toFixed(1));
  const unit = SHORT_UNITS[field.key] || "";
  return rmin === rmax ? `${fmt(rmin)}${unit}` : `${fmt(rmin)}–${fmt(rmax)}${unit}`;
}

function encouragementLine(score) {
  if (score >= 90) return "Outstanding — keep this as a strength, not a maintenance item.";
  if (score >= 75) return "Strong work here — you're ahead of most men your age.";
  if (score >= 50) return "Solid foundation — a little focused work pushes this into strength territory.";
  if (score >= 25) return "Not far off pace — a few weeks of focused work closes this gap fast.";
  return "This is where the biggest gains are waiting.";
}

// Headline arcs from an opening statement to a closing call-to-action as the form fills in.
const TAGLINE_STAGES = [
  { min: 0, lines: ["WHAT YOU CAN", "STILL DO"] },
  { min: 0.15, lines: ["WHAT YOU'VE", "GOT LEFT"] },
  { min: 0.35, lines: ["EARN YOUR", "AGE BACK"] },
  { min: 0.55, lines: ["THE NUMBERS", "DON'T CARE"] },
  { min: 0.8, lines: ["STILL IN", "THE FIGHT"] },
  { min: 1, lines: ["PROVE IT'S", "NOT OVER"] },
];

function getTaglineLines(progress) {
  let current = TAGLINE_STAGES[0];
  for (const stage of TAGLINE_STAGES) {
    if (progress >= stage.min) current = stage;
  }
  return current.lines;
}

function HeroTagline({ progress }) {
  const [top, bottom] = getTaglineLines(progress);
  return (
    <h1 key={top + bottom} style={{ ...styles.heroTitle, animation: "taglineIn 0.5s ease both" }}>
      {top}<br/>{bottom}
    </h1>
  );
}

export default function LegacyScoreApp() {
  const [page, setPage] = useState("intake"); // intake | result
  const [age, setAge] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [waistIn, setWaistIn] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [inputs, setInputs] = useState({});
  const [name, setName] = useState("");

  const wthValue = useMemo(() => {
    const h = parseFloat(heightIn);
    const w = parseFloat(waistIn);
    if (!h || !w) return "";
    return (w / h).toFixed(3);
  }, [heightIn, waistIn]);

  const allInputs = { ...inputs, wth: wthValue };

  const handleChange = (key, val) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const results = useMemo(() => {
    return FIELDS.map((f) => {
      const raw = allInputs[f.key];
      let lookupValue = raw;
      let ratio;
      if (f.bodyweightRatio) {
        const bw = parseFloat(weightLbs);
        const lifted = parseFloat(raw);
        ratio = bw && lifted ? lifted / bw : "";
        lookupValue = ratio;
      }
      const score = lookupScore(f.table, lookupValue);
      return { ...f, raw, ratio, score: score === null ? null : clamp(score, 0, 100) };
    });
  }, [allInputs, weightLbs]);

  const filledResults = results.filter((r) => r.score !== null);
  const totalWeight = filledResults.reduce((s, r) => s + r.weight, 0);
  const rawScore = filledResults.length
    ? filledResults.reduce((s, r) => s + r.score * r.weight, 0) / totalWeight
    : 0;
  const mult = ageMultiplier(age);
  const adjustedScore = clamp(rawScore * mult, 0, 110);
  const tier = getTier(adjustedScore);
  const allFilled = filledResults.length === FIELDS.length;

  const canSubmit = age && heightIn && waistIn && weightLbs && allFilled;

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        ::selection { background: #8FC1E6; color: #0A1F3D; }
        @keyframes taglineIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @page { margin: 12mm; }
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>

      {page === "intake" && (
        <Intake
          age={age} setAge={setAge}
          heightIn={heightIn} setHeightIn={setHeightIn}
          waistIn={waistIn} setWaistIn={setWaistIn}
          weightLbs={weightLbs} setWeightLbs={setWeightLbs}
          wthValue={wthValue}
          name={name} setName={setName}
          inputs={inputs} handleChange={handleChange}
          canSubmit={canSubmit}
          onSubmit={() => setPage("result")}
        />
      )}

      {page === "result" && (
        <Result
          name={name}
          age={age}
          results={results}
          rawScore={rawScore}
          mult={mult}
          adjustedScore={adjustedScore}
          tier={tier}
          onBack={() => setPage("intake")}
        />
      )}
    </div>
  );
}

function Intake({ age, setAge, heightIn, setHeightIn, waistIn, setWaistIn, weightLbs, setWeightLbs, wthValue, name, setName, inputs, handleChange, canSubmit, onSubmit }) {
  const requiredValues = [age, heightIn, waistIn, weightLbs, ...FIELDS.map((f) => (f.key === "wth" ? wthValue : inputs[f.key]))];
  const filledCount = requiredValues.filter((v) => v !== undefined && v !== null && v !== "").length;
  const progress = filledCount / requiredValues.length;

  return (
    <div style={styles.wrap}>
      <Header />

      <section style={styles.heroBlock}>
        <div style={styles.heroEyebrow}>STANDARD: 40 AND OVER</div>
        <HeroTagline progress={progress} />
        <p style={styles.heroSub}>
          Strength, Energy, and Resilience start with your willingness to put the work in.
        </p>
      </section>

      <section style={styles.formSection}>
        <Card title="Profile" idx="01">
          <Row>
            <Field label="Name (optional)">
              <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jamie Heiner" />
            </Field>
            <Field label="Age" required>
              <input style={styles.input} type="number" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 50" />
            </Field>
          </Row>
          <Row>
            <Field label="Height (inches)" required>
              <input style={styles.input} type="number" inputMode="decimal" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="e.g. 72" />
            </Field>
            <Field label="Waist (inches)" required>
              <input style={styles.input} type="number" inputMode="decimal" value={waistIn} onChange={(e) => setWaistIn(e.target.value)} placeholder="e.g. 37" />
            </Field>
          </Row>
          <Row>
            <Field label="Weight (lbs)" required>
              <input style={styles.input} type="number" inputMode="decimal" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="e.g. 195" />
            </Field>
          </Row>
          <div style={styles.derivedNote}>Used to scale Bench Press and Trap Bar Deadlift to your bodyweight — same way ACSM's strength standards work.</div>
          {wthValue && (
            <div style={styles.derivedNote}>Waist-to-height ratio: <span style={{ color: "#8FC1E6", fontFamily: "'JetBrains Mono', monospace" }}>{wthValue}</span></div>
          )}
        </Card>

        <Card title="Body Composition" idx="02">
          <Field label="Body Fat %" required>
            <input style={styles.input} type="number" inputMode="decimal" step="0.1"
              value={inputs.bodyfat || ""} onChange={(e) => handleChange("bodyfat", e.target.value)}
              placeholder="e.g. 17.8" />
          </Field>
        </Card>

        <Card title="Power" idx="03">
          <Field label="Standing Broad Jump (inches)" required>
            <input style={styles.input} type="number" inputMode="decimal"
              value={inputs.broadjump || ""} onChange={(e) => handleChange("broadjump", e.target.value)}
              placeholder="e.g. 87" />
          </Field>
        </Card>

        <Card title="Strength" idx="04" accent>
          <Field label={<span>Trap Bar Deadlift <span style={styles.weightTag}>1.5× WEIGHT</span></span>} required>
            <input style={styles.input} type="number" inputMode="decimal"
              value={inputs.trapbar || ""} onChange={(e) => handleChange("trapbar", e.target.value)}
              placeholder="5-rep max, lbs — e.g. 385" />
          </Field>
          <Field label="Bench Press (5-rep max, lbs)" required>
            <input style={styles.input} type="number" inputMode="decimal"
              value={inputs.bench || ""} onChange={(e) => handleChange("bench", e.target.value)}
              placeholder="e.g. 225" />
          </Field>
        </Card>

        <Card title="Conditioning" idx="05">
          <Field label="800m Run (seconds)" required>
            <input style={styles.input} type="number" inputMode="decimal"
              value={inputs.run800 || ""} onChange={(e) => handleChange("run800", e.target.value)}
              placeholder="e.g. 245" />
          </Field>
        </Card>

        <Card title="Muscular Endurance" idx="06">
          <Row>
            <Field label="Pull-ups (reps)" required>
              <input style={styles.input} type="number" inputMode="numeric"
                value={inputs.pullups || ""} onChange={(e) => handleChange("pullups", e.target.value)}
                placeholder="e.g. 12" />
            </Field>
            <Field label="Plank Hold (seconds)" required>
              <input style={styles.input} type="number" inputMode="numeric"
                value={inputs.planks || ""} onChange={(e) => handleChange("planks", e.target.value)}
                placeholder="e.g. 85" />
            </Field>
          </Row>
        </Card>

        <Card title="Loaded Carry" idx="07">
          <Field label="Farmer's Carry — body weight, distance (ft)" required>
            <input style={styles.input} type="number" inputMode="decimal"
              value={inputs.farmers || ""} onChange={(e) => handleChange("farmers", e.target.value)}
              placeholder="e.g. 250" />
          </Field>
        </Card>

        <button style={{ ...styles.submitBtn, opacity: canSubmit ? 1 : 0.4, cursor: canSubmit ? "pointer" : "not-allowed" }}
          disabled={!canSubmit} onClick={onSubmit}>
          CALCULATE LEGACY SCORE →
        </button>
        {!canSubmit && <div style={styles.helperNote}>Fill in every field above to generate your score.</div>}
      </section>

      <Footer />
    </div>
  );
}

function Result({ name, age, results, rawScore, mult, adjustedScore, tier, onBack }) {
  const bonusPct = ((mult - 1) * 100).toFixed(1);
  return (
    <div style={styles.wrap}>
      <Header />

      <section style={{ ...styles.heroBlock, textAlign: "center", paddingTop: 48 }}>
        <div style={styles.heroEyebrow}>{name ? name.toUpperCase() : "ATHLETE"} · AGE {age}</div>
        <div style={styles.scoreTierRow}>
          <div style={{ ...styles.scoreCircle, borderColor: tier.color }}>
            <div style={styles.scoreNumber}>{adjustedScore.toFixed(1)}</div>
            <div style={styles.scoreLabel}>LEGACY SCORE</div>
          </div>
          <TierLadder tier={tier} />
        </div>

        {mult > 1 && (
          <div style={styles.bonusLine}>
            Base score {rawScore.toFixed(1)} → age bonus +{bonusPct}% ({age - 40} {age - 40 === 1 ? "year" : "years"} over 40) → <strong style={{ color: "#8FC1E6" }}>{adjustedScore.toFixed(1)}</strong>
          </div>
        )}
      </section>

      <section style={styles.formSection}>
        <CoachReport name={name} results={results} tier={tier} />

        <div style={styles.breakdownTitle}>THE BREAKDOWN</div>
        {results.map((r, i) => (
          <BreakdownRow key={r.key} field={r} idx={i + 1} />
        ))}

        <div className="no-print" style={styles.actionRow}>
          <button style={styles.downloadBtn} onClick={() => window.print()}>DOWNLOAD PDF ↓</button>
          <button style={styles.backBtn} onClick={onBack}>← RECALCULATE</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TierLadder({ tier }) {
  return (
    <div style={styles.tierLadder}>
      {TIERS.map((t) => {
        const active = t.name === tier.name;
        return (
          <div
            key={t.name}
            style={{
              ...styles.tierLadderRow,
              background: active ? t.color : "transparent",
              color: active ? "#0A1F3D" : "#4A6082",
              borderColor: active ? t.color : "#1C3E68",
              opacity: active ? 1 : 0.5,
              fontWeight: active ? 700 : 400,
              fontSize: active ? 20 : 12,
              padding: active ? "10px 16px" : "5px 14px",
              transform: active ? "scale(1.04)" : "scale(1)",
              boxShadow: active ? "0 4px 14px rgba(0,0,0,0.35)" : "none",
            }}
          >
            {t.name}
          </div>
        );
      })}
    </div>
  );
}

function getNextTier(tier) {
  const idx = TIERS.findIndex((t) => t.name === tier.name);
  return idx > 0 ? TIERS[idx - 1] : null;
}

function CoachReport({ name, results, tier }) {
  const scored = results
    .map((r) => ({ ...r, score: r.score === null ? 0 : r.score }))
    .sort((a, b) => a.score - b.score);
  const objectives = scored.slice(0, 2);
  const wins = [...scored].sort((a, b) => b.score - a.score).slice(0, 2);
  const firstName = name ? name.split(" ")[0] : "athlete";
  const nextTier = getNextTier(tier);

  return (
    <div style={styles.reportCard}>
      <div style={styles.reportTitle}>
        <img src={legacyScoreMark} alt="" style={styles.reportTitleMark} />
        COACH'S REPORT
      </div>
      <p style={styles.reportIntro}>
        {firstName === "athlete" ? "Here's" : `${firstName}, here's`} the plan — two things carrying you, two things to build.
      </p>
      <p style={styles.reportTierCallout}>
        {nextTier ? (
          <>You could move up to <strong style={{ color: nextTier.color }}>{nextTier.name}</strong> by improving <strong>{objectives[0]?.label}</strong> and <strong>{objectives[1]?.label}</strong>.</>
        ) : (
          <>You're at the top tier — <strong style={{ color: tier.color }}>TITAN</strong>. Focus on maintaining {objectives[0]?.label} and {objectives[1]?.label} so nothing slips.</>
        )}
      </p>

      <div style={styles.reportSectionLabel}>WHERE YOU'RE WINNING</div>
      {wins.map((w) => (
        <div key={w.key} style={styles.reportRow}>
          <span style={styles.reportRowScore}>{w.score.toFixed(0)}</span>
          <span>
            <strong>{w.label}.</strong> {FIELD_COPY[w.key]?.strength}.
          </span>
        </div>
      ))}

      <div style={{ ...styles.reportSectionLabel, marginTop: 18 }}>TWO OBJECTIVES</div>
      {objectives.map((o) => (
        <div key={o.key} style={styles.reportRow}>
          <span style={{ ...styles.reportRowScore, color: "#D98C8C" }}>{o.score.toFixed(0)}</span>
          <span>
            <strong>{o.label}.</strong> {FIELD_COPY[o.key]?.improvement}.
          </span>
        </div>
      ))}

      <div style={{ ...styles.reportSectionLabel, marginTop: 18 }}>THE PLAN MOVING FORWARD</div>
      <ul style={styles.reportPlanList}>
        {objectives.map((o) => (
          <li key={o.key} style={styles.reportPlanItem}>
            <strong>{o.label}:</strong> {FIELD_COPY[o.key]?.plan}
          </li>
        ))}
      </ul>
      <p style={styles.reportClose}>
        Retest in 6-8 weeks. Keep the strengths on maintenance, put the focus on these two — that's how the score moves.
      </p>
    </div>
  );
}

function BellCurve({ score, id }) {
  const width = 300, height = 70, cx = width / 2, sigma = 46, baseline = 62, amplitude = 52;
  const N = 60;
  const heightAt = (x) => baseline - amplitude * Math.exp(-((x - cx) ** 2) / (2 * sigma * sigma));
  const topPts = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * width;
    topPts.push(`${x.toFixed(1)},${heightAt(x).toFixed(1)}`);
  }
  const areaPath = `M0,${baseline} L${topPts.join(" L")} L${width},${baseline} Z`;
  const curvePath = `M${topPts.join(" L")}`;
  const mx = clamp((score / 100) * width, 6, width - 6);
  const my = heightAt(mx);
  const gradId = `bc-grad-${id}`;
  const clipId = `bc-clip-${id}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="56" style={{ display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          {SCORE_BANDS.map((b) => (
            <React.Fragment key={b.name}>
              <stop offset={`${b.min}%`} stopColor={b.color} />
              <stop offset={`${Math.max(b.min, b.upper - 0.4)}%`} stopColor={b.color} />
            </React.Fragment>
          ))}
        </linearGradient>
        <clipPath id={clipId}><path d={areaPath} /></clipPath>
      </defs>
      <line x1={0} y1={baseline} x2={width} y2={baseline} stroke="#1C3E68" strokeWidth="1" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width={width} height={height} fill={`url(#${gradId})`} opacity="0.9" />
      </g>
      <path d={curvePath} fill="none" stroke="rgba(245,248,251,0.4)" strokeWidth="1.5" />
      <line x1={mx} y1={baseline} x2={mx} y2={my} stroke="#0A1F3D" strokeWidth="2" strokeDasharray="2,2" />
      <circle cx={mx} cy={my} r="5" fill="#F5F8FB" stroke="#0A1F3D" strokeWidth="2" />
    </svg>
  );
}

function BreakdownRow({ field, idx }) {
  const score = field.score === null ? 0 : field.score;
  const pct = clamp(score, 0, 100);
  const copy = FIELD_COPY[field.key];
  return (
    <div style={styles.breakdownRow}>
      <div style={styles.breakdownTop}>
        <span style={styles.breakdownLabel}>
          {String(idx).padStart(2, "0")} — {field.label}
          {field.weight > 1 && <span style={styles.weightTag}> {field.weight}× WEIGHT</span>}
        </span>
        <span style={styles.breakdownScore}>{score.toFixed(1)}</span>
      </div>
      <div style={styles.barTrack}>
        <div style={{ ...styles.barFill, width: `${pct}%`, background: field.weight > 1 ? "#8FC1E6" : "#2F5480" }} />
      </div>
      <div style={styles.breakdownRaw}>
        {field.raw}{field.unit && !field.isRatio ? ` ${field.unit.split(" ")[0]}` : ""}
        {field.bodyweightRatio && field.ratio ? ` · ${field.ratio.toFixed(2)}× bodyweight` : ""}
      </div>

      <div style={styles.compareBlock}>
        <BellCurve score={score} id={field.key} />
        <div style={styles.compareLine}>
          Here's how you compare:{" "}
          <span style={styles.tierDot(bandForScore(score).color)} />
          <strong style={{ color: "#F5F8FB" }}>{compareLabel(score)} ({normativeRangeText(field, score)})</strong>
        </div>
        <div style={styles.coachNote}>{encouragementLine(score)} {copy && (score >= 75 ? copy.strength + "." : copy.improvement + ".")}</div>
      </div>
      {SOURCES[field.key] && (
        <div style={styles.sourceLine}>
          <a href={SOURCES[field.key].url} target="_blank" rel="noreferrer" title={SOURCES[field.key].label} style={styles.sourceLink}>Click here for reference ↗</a>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <img src={legacyScoreWordmark} alt="Legacy Score, by Jamie Heiner" style={styles.wordmarkImg} />
    </header>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      Legacy Score by Jamie Heiner — Strength &amp; Conditioning Coach.<br/>
      Standard calibrated to age 40. Every year over earns a half-percent back.
    </footer>
  );
}

function Card({ title, idx, children, accent }) {
  return (
    <div style={{ ...styles.card, borderColor: accent ? "#8FC1E6" : "#1C3E68" }}>
      <div style={styles.cardHeader}>
        <span style={styles.cardIdx}>{idx}</span>
        <span style={styles.cardTitle}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={styles.row}>{children}</div>;
}

function Field({ label, required, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.fieldLabel}>{label}{required && <span style={{ color: "#8B3A3A" }}> *</span>}</label>
      {children}
    </div>
  );
}

/* ---------------- styles ----------------
   Palette: Valor Christian (Highlands Ranch, CO) — navy, Columbia blue, white.
   Tier badge colors (TIERS array above) are left untouched per request. */
const NAVY = "#0A1F3D";
const NAVY_DEEP = "#071528";
const NAVY_CARD = "#0F2A4D";
const NAVY_BORDER = "#1C3E68";
const COLUMBIA = "#8FC1E6";
const COLUMBIA_SOFT = "#B9D9EB";
const WHITE = "#F5F8FB";
const MUTED = "#8FA3BE";
const FAINT = "#4A6082";

const styles = {
  app: {
    background: NAVY,
    minHeight: "100vh",
    fontFamily: "'Oswald', sans-serif",
    color: WHITE,
  },
  wrap: { maxWidth: 720, margin: "0 auto", padding: "0 0 60px" },
  header: {
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "18px 20px", borderBottom: `1px solid ${NAVY_BORDER}`,
  },
  wordmarkImg: { height: 44, width: "auto", maxWidth: "100%", objectFit: "contain" },
  heroBlock: { padding: "36px 20px 24px" },
  heroEyebrow: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2,
    color: COLUMBIA, marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, lineHeight: 0.95,
    letterSpacing: 1, margin: "0 0 16px", color: WHITE,
  },
  heroSub: { fontSize: 16, lineHeight: 1.5, color: MUTED, maxWidth: 520, fontWeight: 300 },
  formSection: { padding: "0 20px" },
  card: {
    border: `1px solid ${NAVY_BORDER}`, borderRadius: 6, padding: 20, marginBottom: 16,
    background: NAVY_CARD,
  },
  cardHeader: { display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 },
  cardIdx: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: FAINT },
  cardTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1.5, color: COLUMBIA },
  row: { display: "flex", gap: 14, flexWrap: "wrap" },
  field: { flex: "1 1 200px", marginBottom: 14 },
  fieldLabel: {
    display: "block", fontSize: 13, color: MUTED, marginBottom: 6,
    fontWeight: 500, letterSpacing: 0.3,
  },
  input: {
    width: "100%", background: NAVY_DEEP, border: `1px solid ${NAVY_BORDER}`, borderRadius: 4,
    padding: "12px 14px", color: WHITE, fontSize: 16,
    fontFamily: "'JetBrains Mono', monospace", outline: "none",
  },
  derivedNote: { fontSize: 13, color: MUTED, marginTop: -4 },
  weightTag: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: NAVY_DEEP,
    background: COLUMBIA, padding: "2px 6px", borderRadius: 3, marginLeft: 8,
  },
  submitBtn: {
    width: "100%", padding: "18px", marginTop: 8, background: COLUMBIA, color: NAVY_DEEP,
    border: "none", borderRadius: 4, fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20, letterSpacing: 2, fontWeight: 700,
  },
  helperNote: { textAlign: "center", fontSize: 12, color: FAINT, marginTop: 10 },
  actionRow: { display: "flex", gap: 10, marginTop: 24 },
  backBtn: {
    flex: 1, padding: "16px", background: "transparent", color: COLUMBIA,
    border: `1px solid ${COLUMBIA}`, borderRadius: 4, fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 16, letterSpacing: 1.5,
  },
  downloadBtn: {
    flex: 1, padding: "16px", background: COLUMBIA, color: NAVY_DEEP,
    border: "none", borderRadius: 4, fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 16, letterSpacing: 1.5, fontWeight: 700,
  },
  scoreTierRow: {
    display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center",
    gap: 20, margin: "24px 0",
  },
  scoreCircle: {
    width: 220, height: 220, borderRadius: "50%", border: "4px solid",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    flexShrink: 0, background: NAVY_CARD,
  },
  scoreNumber: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: WHITE, lineHeight: 1 },
  scoreLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: MUTED, marginTop: 6 },
  tierLadder: { display: "flex", flexDirection: "column", gap: 4, minWidth: 150, textAlign: "left" },
  tierLadderRow: {
    padding: "6px 14px", borderRadius: 3, border: "1px solid",
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 1.5,
    transition: "all 0.2s",
  },
  bonusLine: { fontSize: 13, color: MUTED, marginTop: 18, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6 },
  breakdownTitle: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 2,
    color: COLUMBIA, margin: "8px 0 18px", borderBottom: `1px solid ${NAVY_BORDER}`, paddingBottom: 10,
  },
  breakdownRow: { marginBottom: 26, paddingBottom: 24, borderBottom: `1px solid ${NAVY_BORDER}` },
  breakdownTop: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 },
  breakdownLabel: { fontSize: 14, color: WHITE, fontWeight: 500 },
  breakdownScore: { fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: COLUMBIA, fontWeight: 600 },
  barTrack: { height: 6, background: NAVY_DEEP, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3, transition: "width 0.3s" },
  breakdownRaw: { fontSize: 11, color: FAINT, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" },
  compareBlock: { marginTop: 12, background: NAVY_DEEP, border: `1px solid ${NAVY_BORDER}`, borderRadius: 4, padding: "10px 12px 4px" },
  compareLine: { fontSize: 12, color: MUTED, marginTop: 2, fontFamily: "'JetBrains Mono', monospace" },
  tierDot: (color) => ({
    display: "inline-block", width: 9, height: 9, borderRadius: "50%",
    background: color, boxShadow: "0 0 0 1px rgba(245,248,251,0.35)", marginRight: 6, verticalAlign: "middle",
  }),
  coachNote: { fontSize: 12.5, color: "#C6D6E8", marginTop: 6, marginBottom: 8, lineHeight: 1.5, fontStyle: "italic" },
  sourceLine: { fontSize: 10, color: FAINT, marginTop: 6, textAlign: "right", fontFamily: "'JetBrains Mono', monospace" },
  sourceLink: { color: FAINT, textDecoration: "underline" },
  reportCard: {
    border: `1px solid ${COLUMBIA}`, borderRadius: 6, padding: "20px 20px 22px",
    marginBottom: 30, background: NAVY_CARD,
  },
  reportTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2, color: COLUMBIA, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 },
  reportTitleMark: { width: 30, height: 30, objectFit: "contain", verticalAlign: "-6px" },
  reportIntro: { fontSize: 14, color: MUTED, marginTop: 0, marginBottom: 4, lineHeight: 1.5 },
  reportTierCallout: {
    fontSize: 14.5, color: WHITE, margin: "10px 0 0", lineHeight: 1.5,
    background: NAVY_DEEP, border: `1px solid ${NAVY_BORDER}`, borderRadius: 4, padding: "10px 12px",
  },
  reportSectionLabel: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: MUTED,
    marginTop: 14, marginBottom: 8, borderTop: `1px solid ${NAVY_BORDER}`, paddingTop: 12,
  },
  reportRow: { display: "flex", gap: 12, alignItems: "baseline", fontSize: 13.5, color: WHITE, marginBottom: 8, lineHeight: 1.5 },
  reportRowScore: { fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#8FE6B0", fontWeight: 700, minWidth: 26 },
  reportPlanList: { margin: "0 0 12px", paddingLeft: 18, fontSize: 13.5, color: WHITE, lineHeight: 1.6 },
  reportPlanItem: { marginBottom: 6 },
  reportClose: { fontSize: 12.5, color: MUTED, margin: 0, lineHeight: 1.5, fontStyle: "italic" },
  footer: {
    textAlign: "center", fontSize: 12, color: FAINT, padding: "30px 20px 0",
    fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8,
  },
};
