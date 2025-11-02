$(window).on("load", function () {
   setTimeout(function () {
    $(".ct_complete_setup_loader").fadeOut();
  }, 4000); // 4000 ms = 4 seconds
});


$(document).ready(function(){
    $('.ct_toggle_bar').click(function(){
    $("main").toggleClass("active")
})
 $(".ct_filter_btn ").click(function(){
$(".ct_filter_sidebar").addClass("show")
  })
$(".ct_close_filter  ").click(function(){
$(".ct_filter_sidebar").removeClass("show")
  })

  $('.ct_setting_list_filter').click(function(){
    $(".ct_settings_lists").addClass('show')
  })
  $('.ct_setting_close').click(function(){
    $(".ct_settings_lists").removeClass('show')
  })
})

   



$('.ct_story_slider_1').owlCarousel({
    loop:false,
    margin:10,
    nav:false,


    dots:false,
    responsive:{
        0:{
            items:4
        },
        1200:{
            items:6
        },
        1600:{
            items:11
        }
    }
})
$('.ct_story_view_modal_slider').owlCarousel({
    loop:true,
     center:true,
    margin:30,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:4
        },
        600:{
            items:6
        },
        1000:{
            items:3
        }
    }
})

$('.ct_img_slider_4').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
})


$(".ct_product_gallary_slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

$(".chat-list a").click(function () {
    $(".chatbox").addClass("showbox");
    return false;
  });

  $(".chat-icon").click(function () {
    $(".chatbox").removeClass("showbox");
  });



   const ct_form = document.getElementById("ct_multistep_form");
const ct_steps = document.querySelectorAll(".ct_form_step_form");
const ct_nextBtns = document.querySelectorAll(".ct_next");
const ct_prevBtns = document.querySelectorAll(".ct_prev");
const ct_progress = document.getElementById("ct_progress_form");
const ct_stepText = document.querySelector(".ct_step_form");

let ct_formStepsNum = 0;

ct_nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    ct_formStepsNum++;
    updateFormSteps();
  });
});

ct_prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    ct_formStepsNum--;
    updateFormSteps();
  });
});

function updateFormSteps() {
  ct_steps.forEach((step) => step.classList.remove("active"));
  ct_steps[ct_formStepsNum].classList.add("active");
  updateProgressbar();
}

function updateProgressbar() {
  const progressWidth = ((ct_formStepsNum + 1) / ct_steps.length) * 100;
  ct_progress.style.width = progressWidth + "%";
  ct_stepText.textContent = `Step ${ct_formStepsNum + 1} of ${ct_steps.length}`;
}

// Optional: handle submit
ct_form.addEventListener("submit", (e) => {
  e.preventDefault();
//   alert("Form submitted successfully!");
});

