// function to calculate price of a booking using different rates or daily, weekly, and monthly hire.
// if booking period is over 1 week but less than a month, weekly rate is applied to any left over days, 
// if booking is over a month, monthly rate is applied to any left over days.
async function calculateTotalPrice(equipmentArray, startDate, endDate) {
    try {
      console.log("calculateTotalPrice - Start");
  
      // Ensure startDate and endDate are valid Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid startDate or endDate");
      }
  
      // Calculate the total number of days from ms
      const days = Math.floor(Math.abs((end - start) / (24 * 60 * 60 * 1000)));
  
      console.log("Days:", days);
  
      // Calculate total price for each equipment object
      const totalPrices = equipmentArray.map((equipment) => {
        if (!equipment) {
          console.error("Invalid equipment object:", equipment);
          return 0;
        }
        
        // add supply cost, which is only applicable to one made to order item
        let totalPrice = 0 + equipment.supplyCost;
        

        console.log(`Calculating price for equipment ${equipment._id}:`);
        
        // determine rate and calculate item price 
        if (days < 7) {
          totalPrice = days * equipment.pricePerDay;
          console.log(`Price for ${days} days: ${totalPrice}`);
        } else if (days >= 7 && days < 29) {
          // Use the weekly rate for 7 to 28 days
          totalPrice = (equipment.pricePerWeek / 7) * days;
          console.log(`Price for ${days} days: ${totalPrice}`);
        } else {
          // Use the monthly rate for 29 days or more
          totalPrice = (equipment.pricePerMonth / 29) * days;
          console.log(`Price for ${days} days: ${totalPrice}`);
        }
  
        // Round to 2 decimal places
        totalPrice = Number(totalPrice.toFixed(2));
  
        return totalPrice;
      });
  
      console.log("Individual Total Prices:", totalPrices);
  
      // Sum up the total prices to get the overall total price
      const totalPrice = totalPrices.reduce((sum, price) => sum + price, 0);
  
      // Round the overall total to 2 decimal places
      const roundedTotalPrice = Number(totalPrice.toFixed(2));
  
      console.log("Total Price:", roundedTotalPrice);
  
      console.log("calculateTotalPrice - End");
  
      return roundedTotalPrice;
    } catch (error) {
      console.error("Error calculating total price:", error.message);
      throw new Error("Error calculating total price");
    }
  }
  
  export default calculateTotalPrice;