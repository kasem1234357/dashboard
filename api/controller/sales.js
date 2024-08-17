const API = require("../classes/Api");
const OverallStat = require("../models/OverallStat"); // Assuming the schema file is named models/OverallStat.js
const asyncErrorHandler = require("../wrapper_functions/asyncErrorHandler");

const getOverallStats =asyncErrorHandler(async(req,res,next)=> {
  const api = new API(req,res)
 const stats = await OverallStat.aggregate([
      {
        $match: { year: 2024 }
      },
      {
        $project: {
          _id: 0,
          totalCustomers: 1,
          yearlySalesTotal: 1,
          yearlyTotalSoldUnits: 1,
          yearlyTotalLikes:1,
          yearlyTotalSubscribing:1,
          year: 1,
          monthlyData: 1,
          dailyData: 1,
          salesByCategory: {
            $map: {
              input: { $objectToArray: "$salesByCategory" },
              as: "category",
              in: { category: "$$category.k", totalSales: "$$category.v" }
            }
          }
        }
      }
    ]);

    api.dataHandler('fetch',stats)

  
  
})
module.exports={getOverallStats}
// Usage
// getOverallStats(2021)
//   .then((stats) => {
//     console.log(JSON.stringify(stats, null, 2));
//   })
//   .catch((error) => {
//     console.error(error);
//   });
