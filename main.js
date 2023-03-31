var multipleCardCarousel = document.querySelector(
    "#carouselExampleControls"
  );
  if (window.matchMedia("(min-width: 768px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false,
    });
    var carouselWidth = $(".carousel-inner")[0].scrollWidth;
    var cardWidth = $(".carousel-item").width();
    var scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        scrollPosition += cardWidth;
        $("#carouselExampleControls .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
    $("#carouselExampleControls .carousel-control-prev").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carouselExampleControls .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
  jQuery(document).ready(function () {
    jQuery("#form-submit-button").prop("disabled", true).css({
      "pointer-events": "none",
    });
    jQuery("#form-submit-download-button").prop("disabled", true).css({
      "pointer-events": "none",
    });
    jQuery("#resendOtp").hide();
    jQuery("#sent-otp").hide();     
    jQuery("#valid-otp").hide();
    jQuery("#invalid-otp").hide();
  
    function OTPInput() {
      const inputs = document.querySelectorAll("#partitioned > *[id]");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keydown", function (event) {
          if (event.key === "Backspace") {
            inputs[i].value = "";
            if (i !== 0) inputs[i - 1].focus();
          } else {
            if (i === inputs.length - 1 && inputs[i].value !== "") {
              return true;
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key;
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
            } else if (event.keyCode > 64 && event.keyCode < 91) {
              inputs[i].value = String.fromCharCode(event.keyCode);
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
            }
          }
        });
      }
      let compiledOtp = "";
    }
    OTPInput();
  
    let sendOtpRes;
    let verifyOtpRes;
  
    jQuery("#sendOtp").click(async function (event) {
      event.preventDefault();
      let phoneNum =  document.getElementById("Phone").value;
      console.log("phoneNum", phoneNum);
      if (phoneNum.length === 10) {
        jQuery("#sendOtp").hide();
        jQuery("#resendOtp").show();
        sendOtpRes = await callLapp({
          phone: phoneNum,
        });
        console.log("testtt", sendOtpRes);
        if (sendOtpRes.message.Status === "Success") {
          jQuery("#sent-otp").show();
          jQuery("#sent-otp").delay(3000).fadeOut("slow");
        }
      }
    });
    jQuery("#resendOtp").click(async function (event) {
      event.preventDefault();
      let phoneNum = document.getElementById("Phone").value;
      // console.log("phoneNum", phoneNum);
      if (phoneNum.length === 10) {
        jQuery("#sendOtp").hide();
        jQuery("#resendOtp").show();
        jQuery("#sent-otp").show();
        sendOtpRes = await callLapp({
          phone: phoneNum,
        });
        console.log("testtt", sendOtpRes);
        if (sendOtpRes.message.Status === "Success") {
          jQuery("#sent-otp").delay(3000).fadeOut("slow");
        }
      }
    });
    jQuery("#validateOtp").click(async function (event) {
      event.preventDefault();
      const otpval = document.getElementById("otp-field").value;
      let phoneNum = document.getElementById("Phone").value;
      verifyOtpRes = await validateOtp(
        phoneNum,
        otpval,
        sendOtpRes.message.FormOTPResponseModel.Code
        );
      console.log("testtt", verifyOtpRes);
      if (verifyOtpRes.message.Status === "Success") {
        jQuery("#invalid-otp").hide();
        jQuery("#valid-otp").show();
        jQuery("#otp-field").css({
          "background-color": "unset",
        });
        jQuery("#form-submit-button").prop("disabled", false).css({
          "pointer-events": "unset",
        });
        jQuery("#phone-validation").prop("disabled", true).css({
          "pointer-events": "none",
          opacity: "0.5",
        });
      } else {
        jQuery("#invalid-otp").show();
        jQuery("#otp-field").css({
          "background-color": "#FFE5E5",
        });
      }
    });
  
  
  
    const validateOtp = (num, otp, code) => {
      let data = {
        Otp: otp,
        FieldContent: num,
        Code: code,
      };
      let options = {
        url: `https://lapps-in21.leadsquared.com/execute?name=da_56973_230bb1a1&stage=Test&action=verifyOtp`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "jmIJL7YnhHRzrlx6YqhW5saXVLurPqx6tYCp1jke",
        },
        data: JSON.stringify(data),
      };
  
      return new Promise((res, rej) => {
        jQuery
        .ajax(options)
        .done((result) => {
          res(result);
        })
        .fail((err) => {
          rej(err);
        });
      });
    };
  
    const callLapp = (data) => {
      console.log("datadata", data);
      let options = {
        url: `https://lapps-in21.leadsquared.com/execute?name=da_56973_230bb1a1&stage=Test&action=sendOtp`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "jmIJL7YnhHRzrlx6YqhW5saXVLurPqx6tYCp1jke",
        },
        data: JSON.stringify(data),
      };
  
      return new Promise((res, rej) => {
        jQuery
        .ajax(options)
        .done((result) => {
          res(result);
        })
        .fail((err) => {
          rej(err);
        });
      });
    };
  
  
  });
  
     function validateForm1() {
       const form_value1 = document.getElementById('frmrlp-block-3');
       let first_name = form_value1.elements["FirstName"].value;
       let last_name = form_value1.elements["LastName"].value;
       let email = form_value1.elements["EmailAddress"].value;
       let phone = form_value1.elements["Phone"].value;
       var school = form_value1.elements["mx_Degree"].value;
       var programs = form_value1.elements["mx_Program"].value;
       var form_data = {first_name: first_name, last_name: last_name, email: email, phone: phone, school: school, programs: programs}
       
       let options = {
        url: `https://formanalytica.com/api/v1/user/business_user/submit_lead/`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "dmtpv-id" : "vbu_isds_reg2022"
        },
        data: JSON.stringify(form_data),
       };
       return new Promise((res, rej) => {
       jQuery
       .ajax(options)
       .done((result) => {
         // Downloading Brochure Code  start
         var link = document.createElement('a');
         link.href ="assets/pdf/VU-brochure-2023.pdf";
         link.download = 'VU brochure.pdf';
         link.dispatchEvent(new MouseEvent('click'));   
         res(result);
       })
       .fail((err) => {
         console.log("error",err);
         rej(err);
       });
      });
    }
  