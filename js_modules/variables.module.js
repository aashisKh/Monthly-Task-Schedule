// document.addEventListener('visibilitychange', function() {
//   if (document.visibilityState === 'visible') {
//       console.log('Page is visible');
//       // Resume tasks or animations
//   } else {
//       console.log('Page is hidden');
//       // Pause tasks or animations
//   }
// });

// document.addEventListener('readystatechange', function() {
//   if (document.readyState === 'loading') {
//       console.log('Document is still loading...');
//   } else if (document.readyState === 'interactive') {
//       console.log('DOM is fully parsed and interactive.');
//       // The DOM is ready, but external resources may still be loading
//   } else if (document.readyState === 'complete') {
//       console.log('DOM and all resources are fully loaded.');
//       // Everything is fully loaded
//   }
// }); 
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('DOM fully loaded and parsed');
//   // Your code here
// });


// function outerFunction(outerVariable) {
//   console.log('Outer variable: ' + outerVariable);
//   return function innerFunction(innerVariable) {
     
//       console.log('Inner variable: ' + innerVariable);
//   };
// }

// const myClosure = outerFunction('outerValue');
// myClosure('innerValue');
// myClosure('innerValue');