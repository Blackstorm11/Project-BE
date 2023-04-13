// // Importing packages
// const cron = require("node-cron");
// const express = require("express");
// const nodemailer = require("nodemailer");
  
// app = express();
  
// // Calling sendEmail() function every 1 minute
// cron.schedule("*/1 * * * *", function() {
// sendMail();
// });
  
// // Send Mail function using Nodemailer
//     let mailTransporter = nodemailer.createTransport({
//         service: "gmail",
//         secure: true,
//         port: 465,
//         auth: {
//         user: 'sidesai567@gmail.com',
//         pass: 'dlooxwhcejadxocu'
//         }
//     });
      
//     // Setting credentials
//     let mailDetails = {
//         from: "sidesai567@gmail.com",
//         to: "germano4601@gmail.com",
//         subject: "Test mail using Cron job",
//         text: "https://software-quotes.netlify.app/"
//     };
      
      
//     // Sending Email
//     mailTransporter.sendMail(mailDetails, (error, data) => {
//         if (error) {
//             console.log("Error Occurs", error);
//         } else {
//             console.log("Email sent successfully");
//         }
//     });

  
// app.listen(3000);