function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// // --- RED PANEL ---
// gsap.from(".line-1", {
//   scrollTrigger: {
//     trigger: ".line-1",
//     scroller: "#main",
//     scrub: true,
//     start: "top bottom",
//     end: "top top",
//     onUpdate: self => console.log(self.direction)
//   },
//   scaleX: 0,
//   transformOrigin: "left center", 
//   ease: "none"
// });


// // --- ORANGE PANEL ---
// gsap.from(".line-2", {
//   scrollTrigger: {
//     trigger: ".orange",
//     scroller: "#main",
//     scrub: true,
//     pin: true,
//     start: "top top",
//     end: "+=100%"
//   },
//   scaleX: 0, 
//   transformOrigin: "left center", 
//   ease: "none"
// });


// // --- PURPLE/GREEN PANEL ---
// var tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".purple",
//       scroller: "#main",
//       scrub: true,
//       pin: true,
//       start: "top top",
//       end: "+=100%"
//     }
//   });

// tl.from(".purple p", {scale: 0.3, rotation:45, autoAlpha: 0, ease: "power2"})
//   .from(".line-3", {scaleX: 0, transformOrigin: "left center", ease: "none"}, 0)
//   .to(".purple", {backgroundColor: "#28a92b"}, 0);



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();

gsap.to("#page>video",{
  scrollTrigger:{
      trigger:`#page>video`,
      start:`2% top`,
      end:`bottom top`,
      scroller:`#main`
  },
  onStart:()=>{
      document.querySelector("#page>video").play()
  }
})


gsap.to("#page",{
  scrollTrigger:{
      trigger:`#page`,
      start:`top top`,
      end:`bottom top`,
      scroller:`#main`,
      pin:true
  }
})


gsap.to("#page-bottom",{
  scrollTrigger:{
      trigger:`#page-bottom`,
      start:`5% top`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5,
  },
  opacity:0
})

var tl = gsap.timeline({
  scrollTrigger:{
      trigger:`#page1`,
      start:`top top`,
      scrub:1,
      scroller:`#main`,
      pin:true
  }
})


tl.to("#page1>h1",{
  top:`-50%`
})