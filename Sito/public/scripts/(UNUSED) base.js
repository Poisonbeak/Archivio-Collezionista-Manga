// window.addEventListener("DOMContentLoaded", e => {
//     const header = document.getElementById("header");
//     const footer = document.getElementById("footer_left");

//     const loginButtonHeader = header.children[3];
//     const profileButtonHeader = header.children[4];
//     const loginButtonFooter = footer.children[4];
//     const profileButtonFooter = footer.children[5];

//     function getCookie(name) {
//         let matches = document.cookie.match(new RegExp(
//           "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//         ));
//         return matches ? decodeURIComponent(matches[1]) : undefined;
//       }
//       console.log(getCookie("nickname"));
      

//     if (getCookie("nickname") != "") {
//         profileButtonHeader.removeAttribute("display");
//         loginButtonHeader.setAttribute("display", "none");
//         profileButtonFooter.removeAttribute("display");
//         loginButtonFooter.setAttribute("display", "none");
//     }
// })