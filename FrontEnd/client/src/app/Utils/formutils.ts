// export class FormUtils {
//     public static setFocus(component : string){
//         let count = 0;
        
//         if (!component || typeof component != 'string' || component.trim().length == 0){
//             return;
//         }

//         const element : any = window.document.getElementById(component);

//         if (!element && count > 3){        
//             return;
//         }

//         if (!element && count <= 3){
//             setTimeout(() => {
//                 FormUtils.setFocus(component);
//                 count = count + 1;
//             }, 100);
//             return;
//         }

//         element.focus();
//     }
// }